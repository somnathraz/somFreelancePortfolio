/**
 * Break the Backend: a tiny interleaving simulator.
 *
 * Every request ("lane") is a list of steps. One step is one atomic moment: the player decides
 * which lane moves next, so they control the schedule. Anything that is a single `Op` here
 * (cas, incr, pushUnique) is a single indivisible statement in the database.
 */

export type Val = number | string | boolean | null | string[];
export type DbState = Record<string, Val>;
export type Expr = string | number | boolean | null | { var: string; add?: number };

export type Op =
    | { k: "read"; key: string; into: string }
    | { k: "write"; key: string; value: Expr }
    | { k: "push"; key: string; value: Expr }
    /** Passes when `var` satisfies `test` against `to`; otherwise the request ends with `else`. */
    | { k: "guard"; var: string; test: "eq" | "neq" | "gte"; to: Expr; else: string }
    /** A call to something outside the database (payment API, email). No DB effect of its own. */
    | { k: "call"; label: string }
    | { k: "respond"; text: string }
    /** `scope: "server"` is an in-process mutex: it only blocks lanes on the same server. */
    | { k: "lock"; key: string; scope?: "db" | "server" }
    | { k: "unlock"; key: string; scope?: "db" | "server" }
    /** UPDATE … WHERE key = expect SET key = set. `into` = whether a row matched. */
    | { k: "cas"; key: string; expect: Expr; set: Expr; into: string }
    /** UPDATE … SET key = key + by WHERE key + by >= min. `into` = whether it applied. */
    | { k: "incr"; key: string; by: number; min?: number; into: string }
    /** INSERT … with a UNIQUE constraint. `into` = false when the value already exists. */
    | { k: "pushUnique"; key: string; value: Expr; into: string }
    /** UPDATE … RETURNING: increments and hands back the previous value. */
    | { k: "fetchIncr"; key: string; by: number; into: string };

export interface Step {
    /** Source line shown to the player. */
    code: string;
    op: Op;
}

export interface Lane {
    id: string;
    label: string;
    server: string;
    color: string;
}

export interface Invariant {
    /** Shown to the player as the goal. */
    label: string;
    /** Returns a human explanation when broken, otherwise null. Only evaluated once every request finished. */
    check: (db: DbState, responses: Record<string, string | undefined>) => string | null;
}

export interface Fix {
    id: string;
    title: string;
    /** What the player is choosing, one line. */
    blurb: string;
    /** Shown after the verdict. */
    why: string;
    program: (lane: Lane) => Step[];
}

export interface Level {
    id: string;
    number: number;
    title: string;
    /** Catalogue slug of the matching interview trap, if there is one. */
    trap: string;
    story: string;
    hint: string;
    lanes: Lane[];
    initial: DbState;
    invariants: Invariant[];
    bug: (lane: Lane) => Step[];
    fixes: Fix[];
}

export interface LaneRun {
    pc: number;
    locals: Record<string, Val>;
    done: boolean;
    response?: string;
    held: string[];
}

export interface Sim {
    db: DbState;
    lanes: LaneRun[];
    programs: Step[][];
}

export interface StepEvent {
    lane: number;
    line: number;
    text: string;
    changed: string[];
    blocked?: boolean;
}

const clone = <T>(v: T): T => structuredClone(v);

export function createSim(level: Level, programFor: (lane: Lane) => Step[]): Sim {
    return {
        db: clone(level.initial),
        lanes: level.lanes.map(() => ({ pc: 0, locals: {}, done: false, held: [] })),
        programs: level.lanes.map(programFor),
    };
}

const lockName = (op: { key: string; scope?: "db" | "server" }, server: string) =>
    op.scope === "server" ? `${op.key}@${server}` : op.key;

const evalExpr = (e: Expr, locals: Record<string, Val>): Val => {
    if (e !== null && typeof e === "object") {
        const v = locals[e.var];
        return typeof v === "number" ? v + (e.add ?? 0) : v;
    }
    return e;
};

const show = (v: Val | undefined) => (Array.isArray(v) ? `[${v.join(", ")}]` : JSON.stringify(v));

/** True while the lane's next step is a lock someone else holds. */
export function isBlocked(level: Level, sim: Sim, lane: number): boolean {
    const run = sim.lanes[lane];
    if (run.done) return false;
    const op = sim.programs[lane][run.pc]?.op;
    if (op?.k !== "lock") return false;
    const name = lockName(op, level.lanes[lane].server);
    return sim.lanes.some((other, i) => i !== lane && !other.done && other.held.includes(name));
}

export const canStep = (level: Level, sim: Sim, lane: number) => !sim.lanes[lane].done && !isBlocked(level, sim, lane);

export const isFinished = (sim: Sim) => sim.lanes.every((l) => l.done);

function finish(run: LaneRun, response: string) {
    run.done = true;
    run.response = response;
    run.held = []; // commit or rollback releases every lock
}

/** Runs one step of one lane. Does not mutate `sim`. */
export function step(level: Level, sim: Sim, laneIndex: number): { sim: Sim; event: StepEvent } {
    const next = clone(sim);
    const run = next.lanes[laneIndex];
    const line = run.pc;
    const entry = next.programs[laneIndex][line];
    const server = level.lanes[laneIndex].server;
    const changed: string[] = [];
    let text = "";

    if (isBlocked(level, sim, laneIndex)) return { sim, event: { lane: laneIndex, line, text: "waiting for a lock", changed, blocked: true } };
    const op = entry.op;
    const set = (key: string, value: Val) => { next.db[key] = value; changed.push(key); };
    const list = (key: string) => (Array.isArray(next.db[key]) ? [...(next.db[key] as string[])] : []);

    switch (op.k) {
        case "read": run.locals[op.into] = next.db[op.key]; text = `${op.key} is ${show(next.db[op.key])}`; break;
        case "write": { const v = evalExpr(op.value, run.locals); set(op.key, v); text = `${op.key} = ${show(v)}`; break; }
        case "push": { const v = String(evalExpr(op.value, run.locals)); set(op.key, [...list(op.key), v]); text = `${op.key} gets ${show(v)}`; break; }
        case "guard": {
            const have = run.locals[op.var];
            const want = evalExpr(op.to, run.locals);
            const pass = op.test === "eq" ? have === want : op.test === "neq" ? have !== want : Number(have) >= Number(want);
            text = pass ? "check passed" : `check failed → ${op.else}`;
            if (!pass) { finish(run, op.else); run.pc = line + 1; return { sim: next, event: { lane: laneIndex, line, text, changed } }; }
            break;
        }
        case "call": text = op.label; break;
        case "respond": finish(run, op.text); text = `responds ${op.text}`; run.pc = line + 1; return { sim: next, event: { lane: laneIndex, line, text, changed } };
        case "lock": run.held.push(lockName(op, server)); text = op.scope === "server" ? "took the in-process mutex" : "took the row lock"; break;
        case "unlock": run.held = run.held.filter((h) => h !== lockName(op, server)); text = "released the lock"; break;
        case "cas": {
            const hit = next.db[op.key] === evalExpr(op.expect, run.locals);
            run.locals[op.into] = hit;
            if (hit) set(op.key, evalExpr(op.set, run.locals));
            text = hit ? `${op.key} = ${show(next.db[op.key])}, 1 row updated` : "0 rows updated";
            break;
        }
        case "incr": {
            const cur = Number(next.db[op.key]);
            const hit = cur + op.by >= (op.min ?? -Infinity);
            run.locals[op.into] = hit;
            if (hit) set(op.key, cur + op.by);
            text = hit ? `${op.key} = ${cur + op.by}, 1 row updated` : "0 rows updated";
            break;
        }
        case "pushUnique": {
            const v = String(evalExpr(op.value, run.locals));
            const exists = list(op.key).includes(v);
            run.locals[op.into] = !exists;
            if (!exists) set(op.key, [...list(op.key), v]);
            text = exists ? "UNIQUE violation, insert rejected" : `${op.key} gets ${show(v)}`;
            break;
        }
        case "fetchIncr": {
            const cur = Number(next.db[op.key]);
            run.locals[op.into] = cur;
            set(op.key, cur + op.by);
            text = `${op.key} = ${cur + op.by}, returned ${cur}`;
            break;
        }
    }

    run.pc = line + 1;
    if (run.pc >= next.programs[laneIndex].length && !run.done) finish(run, run.response ?? "done");
    return { sim: next, event: { lane: laneIndex, line, text, changed } };
}

/** One entry per invariant: null when it holds, otherwise why it broke. */
export function checkInvariants(level: Level, sim: Sim): (string | null)[] {
    const responses = Object.fromEntries(level.lanes.map((l, i) => [l.id, sim.lanes[i].response]));
    return level.invariants.map((inv) => inv.check(sim.db, responses));
}

export const violations = (level: Level, sim: Sim): string[] => checkInvariants(level, sim).filter((v): v is string => v !== null);

/** How many times control passes from one request to the other. Fewer is a more elegant break. */
export const countSwitches = (schedule: number[]) => schedule.reduce((n, lane, i) => n + (i > 0 && lane !== schedule[i - 1] ? 1 : 0), 0);

export interface Frame { sim: Sim; event: StepEvent }

/**
 * Replays the player's schedule against another implementation. A pick that is blocked on a lock
 * waits: whichever other lane can move goes first, then the waiting pick is retried.
 */
export function replay(level: Level, programFor: (lane: Lane) => Step[], schedule: number[]): { frames: Frame[]; final: Sim; deadlock: boolean } {
    let sim = createSim(level, programFor);
    const frames: Frame[] = [];
    const queue = [...schedule];
    let deadlock = false;

    const advance = (lane: number) => {
        const out = step(level, sim, lane);
        sim = out.sim;
        frames.push({ sim, event: out.event });
    };

    while (queue.length) {
        const head = queue[0];
        if (sim.lanes[head].done) { queue.shift(); continue; }
        if (canStep(level, sim, head)) { queue.shift(); advance(head); continue; }
        const alt = queue.findIndex((lane) => canStep(level, sim, lane));
        if (alt === -1) { deadlock = true; break; }
        advance(queue.splice(alt, 1)[0]);
    }
    // the player's schedule ended early or was cut short by the fix being shorter: let the rest run
    while (!deadlock && !isFinished(sim)) {
        const lane = sim.lanes.findIndex((_, i) => canStep(level, sim, i));
        if (lane === -1) { deadlock = true; break; }
        advance(lane);
    }
    return { frames, final: sim, deadlock };
}

export interface Verdict {
    holds: boolean;
    explored: number;
    /** A schedule that still breaks the implementation, as lane indexes in order. */
    counterexample?: number[];
    reason?: string;
}

/** Tries every possible interleaving. Small programs, so this is exhaustive, not sampled. */
export function verify(level: Level, programFor: (lane: Lane) => Step[], budget = 400_000): Verdict {
    let explored = 0;
    let found: Verdict | undefined;

    const walk = (sim: Sim, path: number[]) => {
        if (found || explored > budget) return;
        if (isFinished(sim)) {
            explored++;
            const broken = violations(level, sim);
            if (broken.length) found = { holds: false, explored, counterexample: path, reason: broken[0] };
            return;
        }
        const movable = sim.lanes.map((_, i) => i).filter((i) => canStep(level, sim, i));
        if (!movable.length) { explored++; found = { holds: false, explored, counterexample: path, reason: "Every request is waiting on a lock held by another: deadlock." }; return; }
        for (const lane of movable) walk(step(level, sim, lane).sim, [...path, lane]);
    };

    walk(createSim(level, programFor), []);
    return found ?? { holds: true, explored };
}

/** The break with the fewest switches between requests: the "par" for a level. */
export function bestBreak(level: Level): number[] | undefined {
    let best: number[] | undefined;
    const walk = (sim: Sim, path: number[]) => {
        if (isFinished(sim)) {
            if (violations(level, sim).length && (!best || countSwitches(path) < countSwitches(best))) best = path;
            return;
        }
        for (let i = 0; i < sim.lanes.length; i++) if (canStep(level, sim, i)) walk(step(level, sim, i).sim, [...path, i]);
    };
    walk(createSim(level, level.bug), []);
    return best;
}
