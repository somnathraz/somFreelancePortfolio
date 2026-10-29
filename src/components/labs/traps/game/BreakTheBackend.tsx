"use client";

import { useEffect, useMemo, useRef, useState, useSyncExternalStore } from "react";
import Link from "next/link";
import { AnimatePresence, motion } from "framer-motion";
import { ArrowRight, Check, Copy, Lightbulb, RotateCcw, Undo2, X } from "lucide-react";
import {
    bestBreak, canStep, checkInvariants, countSwitches, createSim, isBlocked, isFinished, replay, step, verify,
    type StepEvent,
} from "@/lib/trap-game/engine";
import { LEVELS, getLevel } from "@/lib/trap-game/levels";
import { SEVERITY_COLORS, alpha } from "../palette";
import { DbPanel, EventLog, LaneCard, ScheduleStrip } from "./Panels";
import { SeatScene, type SceneOutcome } from "./SeatScene";

type Mode = "break" | "patch";
interface PatchState { fixId: string; schedule: number[]; at: number }

const BAD = SEVERITY_COLORS.bad;
const OK = SEVERITY_COLORS.ok;
const EMOJI = ["🟨", "🟦"];

/** Levels drawn as an animated scene. The rest use the plain lane view. */
const SCENES: Partial<Record<string, typeof SeatScene>> = { "double-booked-seat": SeatScene };
/** Gives a packet time to land before the next step, so the scene stays readable. */
const SCENE_STEP_MS = 450;

export function BreakTheBackend({ levelId, trapPublished }: { levelId: string; trapPublished: boolean }) {
    const level = getLevel(levelId)!;
    const Scene = SCENES[level.id];
    const nextLevel = LEVELS[LEVELS.indexOf(level) + 1];

    const [picks, setPicks] = useState<number[]>([]);
    const [demo, setDemo] = useState<number[] | null>(null);
    const [dismissed, setDismissed] = useState(false);
    const [mode, setMode] = useState<Mode>("break");
    const [patch, setPatch] = useState<PatchState | null>(null);
    const [showHint, setShowHint] = useState(false);
    const [copied, setCopied] = useState(false);

    // A shared result arrives as ?m=0101… : who moved at each step.
    const search = useSyncExternalStore(() => () => {}, () => window.location.search, () => "");
    const m = new URLSearchParams(search).get("m");
    const sharedPicks = m && /^[01]{2,40}$/.test(m) ? [...m].map(Number).filter((n) => n < level.lanes.length) : null;
    const shared = dismissed ? null : sharedPicks;

    const par = useMemo(() => bestBreak(level), [level]);

    const run = useMemo(() => {
        let sim = createSim(level, level.bug);
        const events: StepEvent[] = [];
        for (const lane of picks) {
            const out = step(level, sim, lane);
            sim = out.sim;
            events.push(out.event);
        }
        return { sim, events };
    }, [level, picks]);

    const finished = isFinished(run.sim);
    const results = finished ? checkInvariants(level, run.sim) : [];
    const broken = results.filter((r): r is string => r !== null);
    const won = finished && broken.length > 0;
    const switches = countSwitches(picks);

    // Autoplay for "show me" and for watching a shared solution.
    const demoing = !!demo && picks.length < demo.length;
    useEffect(() => {
        if (!demo || !demoing) return;
        const id = window.setTimeout(() => setPicks((p) => [...p, demo[p.length]]), 650);
        return () => window.clearTimeout(id);
    }, [demo, demoing, picks]);

    const play = (schedule: number[]) => { setMode("break"); setPatch(null); setPicks([]); setDemo(schedule); };
    const lastMove = useRef(0);
    const move = (lane: number) => {
        if (mode !== "break" || demoing || finished || !canStep(level, run.sim, lane)) return;
        if (Scene && Date.now() - lastMove.current < SCENE_STEP_MS) return;
        lastMove.current = Date.now();
        setPicks((p) => [...p, lane]);
    };
    const reset = () => { setDemo(null); setPicks([]); setMode("break"); setPatch(null); };

    useEffect(() => {
        const onKey = (e: KeyboardEvent) => {
            const tag = (e.target as HTMLElement | null)?.tagName;
            if (tag === "INPUT" || tag === "TEXTAREA" || tag === "SELECT" || e.metaKey || e.ctrlKey) return;
            const lane = Number(e.key) - 1;
            if (lane >= 0 && lane < level.lanes.length) move(lane);
        };
        window.addEventListener("keydown", onKey);
        return () => window.removeEventListener("keydown", onKey);
    });

    // Patch mode: replay the schedule against the chosen fix, then prove it against every ordering.
    const fix = level.fixes.find((f) => f.id === patch?.fixId);
    const rep = fix && patch ? replay(level, fix.program, patch.schedule) : null;
    const verdict = fix ? verify(level, fix.program) : null;

    useEffect(() => {
        if (!patch || !rep || patch.at >= rep.frames.length) return;
        const id = window.setTimeout(() => setPatch({ ...patch, at: patch.at + 1 }), 600);
        return () => window.clearTimeout(id);
    }, [patch, rep]);

    const choose = (fixId: string) => setPatch({ fixId, schedule: picks, at: 0 });
    const replayDone = !!(patch && rep && patch.at >= rep.frames.length);
    const ownBreak = rep ? checkInvariants(level, rep.final).find(Boolean) : undefined;

    const view = (() => {
        if (mode === "patch" && fix && rep && patch) {
            const frame = patch.at > 0 ? rep.frames[patch.at - 1] : undefined;
            return { sim: frame?.sim ?? createSim(level, fix.program), event: frame?.event, events: rep.frames.slice(0, patch.at).map((f) => f.event), interactive: false };
        }
        return { sim: run.sim, event: run.events.at(-1), events: run.events, interactive: mode === "break" };
    })();

    const shareText = `I broke "${level.title}" with ${switches} switch${switches === 1 ? "" : "es"} (par ${par ? countSwitches(par) : "?"})\n${picks.map((p) => EMOJI[p] ?? "⬜").join("")}\nCan you break it?`;
    const shareUrl = () => `${window.location.origin}/labs/traps/play/${level.id}?m=${picks.join("")}`;
    const copy = async () => {
        try {
            await navigator.clipboard.writeText(`${shareText}\n${shareUrl()}`);
            setCopied(true);
            window.setTimeout(() => setCopied(false), 1800);
        } catch { /* clipboard blocked: the X link below still works */ }
    };

    const holdingAfterPatch = replayDone && verdict?.holds;
    const sceneOutcome: SceneOutcome | undefined =
        mode === "break" ? (finished ? (won ? { ok: false, text: broken[0] } : { ok: true, text: "Nothing broke this time. Try another order." }) : undefined)
        : replayDone && rep ? (ownBreak ? { ok: false, text: ownBreak } : { ok: true, text: "The fix held against your order." }) : undefined;

    return (
        <div className="flex flex-col gap-6">
            <header className="max-w-3xl">
                <p className="mb-3 font-mono text-xs uppercase tracking-[0.2em] text-indigo-300">Level {level.number} of {LEVELS.length} <span className="mx-2 text-white/25">/</span> you are the scheduler</p>
                <h1 className="font-[family-name:var(--font-labs-display)] text-4xl font-bold leading-[1.05] tracking-tight sm:text-5xl">{level.title}</h1>
                <p className="mt-4 text-lg leading-relaxed text-white/70">{level.story}</p>
            </header>

            <AnimatePresence>
                {shared && mode === "break" && picks.length === 0 && (
                    <motion.div initial={{ opacity: 0, y: -6 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }} className="flex flex-wrap items-center gap-4 rounded-2xl border border-indigo-400/30 bg-indigo-400/[0.06] px-5 py-4">
                        <div className="flex flex-1 flex-wrap items-center gap-3 text-sm text-white/80">
                            <span>A friend broke this with {countSwitches(shared)} switches:</span>
                            <ScheduleStrip level={level} schedule={shared} />
                        </div>
                        <button type="button" onClick={() => play(shared)} className="rounded-full bg-white px-4 py-2 text-sm font-semibold text-black hover:bg-white/90">Watch their order</button>
                        <button type="button" onClick={() => setDismissed(true)} aria-label="Dismiss" className="text-white/50 hover:text-white"><X size={16} /></button>
                    </motion.div>
                )}
            </AnimatePresence>

            <section aria-label="Goal" className="rounded-2xl border border-white/10 bg-white/[0.02] p-5">
                <h2 className="mb-1 text-xs font-semibold uppercase tracking-[0.14em] text-white/45">
                    {mode === "break" ? "Your goal: make one of these false" : fix ? `Testing: ${fix.title}` : "Pick a fix"}
                </h2>
                <ul className="mt-3 grid gap-2 sm:grid-cols-2">
                    {level.invariants.map((inv, i) => {
                        const state = mode === "break" ? (finished ? (results[i] ? "bad" : "ok") : "idle") : replayDone && rep ? (checkInvariants(level, rep.final)[i] ? "bad" : "ok") : "idle";
                        return (
                            <li key={inv.label} className="flex items-center gap-3 rounded-xl border px-4 py-3 text-sm" style={{ borderColor: state === "bad" ? alpha(BAD, 0.5) : state === "ok" ? alpha(OK, 0.4) : "rgba(255,255,255,0.1)", background: state === "bad" ? alpha(BAD, 0.08) : "transparent" }}>
                                <span aria-hidden="true" className="flex h-5 w-5 shrink-0 items-center justify-center rounded-full text-[11px]" style={{ background: state === "bad" ? BAD : state === "ok" ? OK : "rgba(255,255,255,0.12)", color: "#000" }}>
                                    {state === "bad" ? <X size={12} /> : state === "ok" ? <Check size={12} /> : ""}
                                </span>
                                <span className={state === "idle" ? "text-white/70" : "text-white"}>{inv.label}</span>
                                <span className="sr-only">{state === "bad" ? "broken" : state === "ok" ? "holds" : "not checked yet"}</span>
                            </li>
                        );
                    })}
                </ul>
            </section>

            {Scene ? (
                <div className="flex flex-col gap-4">
                    <Scene level={level} sim={view.sim} event={view.event} eventIndex={view.events.length} interactive={view.interactive && !demoing} onStep={move} outcome={sceneOutcome} />
                    <EventLog level={level} events={view.events} />
                </div>
            ) : (
            <div className="grid gap-4 lg:grid-cols-[minmax(0,1fr)_minmax(0,1fr)_300px]">
                {level.lanes.map((lane, i) => (
                    <LaneCard
                        key={lane.id}
                        lane={lane}
                        program={view.sim.programs[i]}
                        run={view.sim.lanes[i]}
                        blocked={isBlocked(level, view.sim, i)}
                        locked={view.sim.lanes[i].held.length > 0}
                        onStep={() => move(i)}
                        hotkey={String(i + 1)}
                        lastLine={view.event?.lane === i ? view.event.line : undefined}
                        interactive={view.interactive && !demoing}
                    />
                ))}
                <div className="flex min-w-0 flex-col gap-4 md:col-span-2 lg:col-span-1">
                    <DbPanel level={level} db={view.sim.db} lanes={view.sim.lanes} changed={view.event?.changed ?? []} />
                    <EventLog level={level} events={view.events} />
                </div>
            </div>
            )}

            {mode === "break" && !won && (
                <div className="flex flex-wrap items-center gap-3">
                    <button type="button" onClick={() => setPicks((p) => p.slice(0, -1))} disabled={!picks.length || demoing} className="inline-flex items-center gap-2 rounded-full border border-white/15 px-4 py-2 text-sm text-white/80 hover:bg-white/5 disabled:opacity-30"><Undo2 size={14} aria-hidden="true" /> Undo</button>
                    <button type="button" onClick={reset} disabled={!picks.length} className="inline-flex items-center gap-2 rounded-full border border-white/15 px-4 py-2 text-sm text-white/80 hover:bg-white/5 disabled:opacity-30"><RotateCcw size={14} aria-hidden="true" /> Reset</button>
                    <button type="button" onClick={() => setShowHint(true)} className="inline-flex items-center gap-2 rounded-full px-3 py-2 text-sm text-white/55 hover:text-white"><Lightbulb size={14} aria-hidden="true" /> Stuck?</button>
                    <span className="ml-auto font-mono text-xs text-white/45">{picks.length} steps · {switches} switches{par ? ` · par ${countSwitches(par)}` : ""}</span>
                </div>
            )}

            {mode === "break" && showHint && !won && (
                <div className="rounded-2xl border border-amber-300/25 bg-amber-300/[0.05] p-5 text-sm text-white/80">
                    <p><span className="font-semibold text-amber-200">Hint.</span> {level.hint}</p>
                    {par && <button type="button" onClick={() => play(par)} className="mt-3 rounded-full border border-white/20 px-4 py-1.5 text-white hover:bg-white/10">Show me the shortest way</button>}
                </div>
            )}

            {mode === "break" && finished && !won && (
                <div role="status" className="rounded-2xl border border-white/10 bg-white/[0.03] p-5">
                    <p className="font-semibold">It held this time.</p>
                    <p className="mt-1 text-sm text-white/65">In this order the requests never overlapped badly. Reset and let one request pause in the middle while the other runs.</p>
                    <button type="button" onClick={reset} className="mt-3 rounded-full bg-white px-4 py-2 text-sm font-semibold text-black">Try another order</button>
                </div>
            )}

            <AnimatePresence>
                {mode === "break" && won && (
                    <motion.section initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} aria-label="Result" className="rounded-2xl border p-6 sm:p-8" style={{ borderColor: alpha(BAD, 0.5), background: alpha(BAD, 0.06) }}>
                        <p className="font-mono text-xs uppercase tracking-[0.18em]" style={{ color: BAD }}>Broken</p>
                        <h2 className="mt-2 font-[family-name:var(--font-labs-display)] text-3xl font-semibold">You broke it in {picks.length} steps with {switches} switch{switches === 1 ? "" : "es"}.</h2>
                        <ul className="mt-3 space-y-1 text-white/80">{broken.map((b) => <li key={b}>{b}</li>)}</ul>
                        <div className="mt-5 flex flex-wrap items-center gap-4"><ScheduleStrip level={level} schedule={picks} />{par && <span className="text-sm text-white/55">{switches <= countSwitches(par) ? "Matches par." : `Par is ${countSwitches(par)}.`}</span>}</div>
                        <div className="mt-6 flex flex-wrap gap-3">
                            <button type="button" onClick={() => setMode("patch")} className="inline-flex items-center gap-2 rounded-full bg-white px-5 py-2.5 text-sm font-semibold text-black hover:bg-white/90">Now patch it <ArrowRight size={15} aria-hidden="true" /></button>
                            <button type="button" onClick={copy} className="inline-flex items-center gap-2 rounded-full border border-white/20 px-5 py-2.5 text-sm font-semibold hover:bg-white/10">{copied ? <Check size={15} aria-hidden="true" /> : <Copy size={15} aria-hidden="true" />} {copied ? "Copied" : "Copy result"}</button>
                            <a href={`https://twitter.com/intent/tweet?text=${encodeURIComponent(`${shareText}\n${typeof window === "undefined" ? "" : shareUrl()}`)}`} target="_blank" rel="noopener noreferrer" className="inline-flex items-center rounded-full border border-white/20 px-5 py-2.5 text-sm font-semibold hover:bg-white/10">Share on X</a>
                            <button type="button" onClick={reset} className="rounded-full px-4 py-2.5 text-sm text-white/55 hover:text-white">Break it differently</button>
                        </div>
                    </motion.section>
                )}
            </AnimatePresence>

            {mode === "patch" && (
                <section aria-label="Choose a fix" className="rounded-2xl border border-white/10 bg-white/[0.02] p-5 sm:p-6">
                    <h2 className="font-[family-name:var(--font-labs-display)] text-2xl font-semibold">Patch it</h2>
                    <p className="mt-1 text-sm text-white/60">Pick a fix. We replay your exact order against it, then try every other order too.</p>
                    <div className="mt-4 grid gap-3 md:grid-cols-2">
                        {level.fixes.map((f) => {
                            const active = f.id === patch?.fixId;
                            return (
                                <button key={f.id} type="button" onClick={() => choose(f.id)} aria-pressed={active} className="rounded-xl border p-4 text-left transition-colors hover:bg-white/[0.04]" style={{ borderColor: active ? "rgba(165,180,252,0.7)" : "rgba(255,255,255,0.12)", background: active ? "rgba(99,102,241,0.1)" : undefined }}>
                                    <span className="block font-semibold text-white">{f.title}</span>
                                    <span className="mt-1 block font-mono text-xs text-white/55">{f.blurb}</span>
                                </button>
                            );
                        })}
                    </div>

                    {fix && rep && verdict && (
                        <div role="status" className="mt-5 rounded-xl border p-5" style={{ borderColor: !replayDone ? "rgba(255,255,255,0.12)" : verdict.holds ? alpha(OK, 0.5) : alpha(BAD, 0.5), background: !replayDone ? "transparent" : verdict.holds ? alpha(OK, 0.06) : alpha(BAD, 0.06) }}>
                            {!replayDone ? (
                                <div className="flex items-center justify-between gap-4 text-sm text-white/70">
                                    <span>Replaying your order against this fix…</span>
                                    <button type="button" onClick={() => setPatch({ ...patch!, at: rep.frames.length })} className="rounded-full border border-white/20 px-3 py-1 hover:bg-white/10">Skip</button>
                                </div>
                            ) : verdict.holds ? (
                                <>
                                    <p className="font-semibold" style={{ color: OK }}>It holds.</p>
                                    <p className="mt-1 text-white/80">We tried all {verdict.explored.toLocaleString()} possible orderings of these requests and the invariants never broke.</p>
                                    <p className="mt-3 text-sm text-white/65">{fix.why}</p>
                                    <div className="mt-5 flex flex-wrap gap-3">
                                        {nextLevel ? <Link href={`/labs/traps/play/${nextLevel.id}`} className="inline-flex items-center gap-2 rounded-full bg-white px-5 py-2.5 text-sm font-semibold text-black hover:bg-white/90">Next: {nextLevel.title} <ArrowRight size={15} aria-hidden="true" /></Link> : <Link href="/labs/traps/play" className="rounded-full bg-white px-5 py-2.5 text-sm font-semibold text-black">All levels cleared</Link>}
                                        {trapPublished && <Link href={`/labs/traps/${level.trap}`} className="rounded-full border border-white/20 px-5 py-2.5 text-sm font-semibold hover:bg-white/10">Read the full trap</Link>}
                                    </div>
                                </>
                            ) : (
                                <>
                                    <p className="font-semibold" style={{ color: BAD }}>Still breaks.</p>
                                    <p className="mt-1 text-white/80">{rep.deadlock ? "Your order deadlocked." : ownBreak ? `Your own order still breaks it. ${ownBreak}` : `Your order happened to be fine, but another one is not. ${verdict.reason}`}</p>
                                    <p className="mt-3 text-sm text-white/65">{fix.why}</p>
                                    {verdict.counterexample && (
                                        <div className="mt-4 flex flex-wrap items-center gap-4">
                                            <ScheduleStrip level={level} schedule={verdict.counterexample} />
                                            <button type="button" onClick={() => setPatch({ fixId: fix.id, schedule: verdict.counterexample!, at: 0 })} className="rounded-full border border-white/20 px-4 py-1.5 text-sm hover:bg-white/10">Watch it break</button>
                                        </div>
                                    )}
                                </>
                            )}
                        </div>
                    )}
                    {!holdingAfterPatch && <button type="button" onClick={reset} className="mt-4 text-sm text-white/45 hover:text-white">Back to breaking it</button>}
                </section>
            )}
        </div>
    );
}
