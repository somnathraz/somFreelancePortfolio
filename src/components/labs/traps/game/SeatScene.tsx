"use client";

import { AnimatePresence, motion } from "framer-motion";
import { CreditCard, Lock } from "lucide-react";
import { isBlocked, type Level, type Op, type Sim, type StepEvent } from "@/lib/trap-game/engine";
import { SEVERITY_COLORS, alpha } from "../palette";

/**
 * Level 1 as a scene, in the style of the booking animation: two phones, packets travelling to
 * Postgres, and the seat itself. Same simulator underneath; this only changes what the player sees.
 */

const DB_COLOR = "#818cf8";
const BAD = SEVERITY_COLORS.bad;
const OK = SEVERITY_COLORS.ok;
const WARN = SEVERITY_COLORS.warn;
const LINE = "rgba(255,255,255,0.1)";
const PACKET_S = 0.55;

/** What pressing the phone's button will do next, in plain words. */
function verb(op: Op): string {
    switch (op.k) {
        case "read": return "Check the seat";
        case "guard": return "Decide";
        case "push": return op.key === "charges" ? "Charge the card" : "Save the booking";
        case "write": return "Mark seat booked";
        case "respond": return "Reply to phone";
        case "cas": return "Claim the seat";
        case "pushUnique": return "Insert booking";
        case "lock": return "Lock the row";
        case "unlock": return "Commit";
        default: return "Next step";
    }
}

/** The statement on the wire, or null when the step never reaches the database. */
function sql(op: Op): string | null {
    switch (op.k) {
        case "read": return "SELECT";
        case "write": case "cas": return "UPDATE";
        case "pushUnique": return "INSERT";
        case "push": return op.key === "bookings" ? "INSERT" : null;
        case "lock": return "FOR UPDATE";
        case "unlock": return "COMMIT";
        default: return null;
    }
}

const roundTrip = (op: Op) => op.k === "read" || op.k === "cas" || op.k === "pushUnique" || op.k === "lock";

export interface SceneOutcome { ok: boolean; text: string }

export function SeatScene({ level, sim, event, eventIndex, interactive, onStep, outcome }: {
    level: Level;
    sim: Sim;
    event?: StepEvent;
    eventIndex: number;
    interactive: boolean;
    onStep: (lane: number) => void;
    outcome?: SceneOutcome;
}) {
    const bookings = (sim.db.bookings as string[]) ?? [];
    const charges = (sim.db.charges as string[]) ?? [];
    const conflict = bookings.length > 1;
    const lastOp = event ? sim.programs[event.lane][event.line]?.op : undefined;
    const label = (id: string) => level.lanes.find((l) => l.id === id)?.label ?? id;
    const color = (id: string) => level.lanes.find((l) => l.id === id)?.color ?? "#fff";

    return (
        <motion.div
            // a break shakes the whole scene once
            key={outcome && !outcome.ok ? "broken" : "live"}
            animate={outcome && !outcome.ok ? { x: [0, -8, 8, -5, 5, 0] } : { x: 0 }}
            transition={{ duration: 0.45 }}
            className="grid gap-4 rounded-3xl border bg-[#07070b] p-3 sm:p-5 lg:grid-cols-[minmax(0,330px)_minmax(0,1fr)]"
            style={{ borderColor: outcome ? alpha(outcome.ok ? OK : BAD, 0.5) : LINE, backgroundImage: "radial-gradient(800px 400px at 78% 0%, rgba(99,102,241,0.12), transparent 70%)" }}
        >
            <CodePanel level={level} sim={sim} event={event} />

            <div className="order-first flex min-w-0 flex-col gap-3 lg:order-none">
                <Caption level={level} event={event} eventIndex={eventIndex} outcome={outcome} />

                <div className="grid grid-cols-2 gap-2 sm:gap-4">
                    {level.lanes.map((lane, i) => {
                        const run = sim.lanes[i];
                        const next = sim.programs[i][run.pc]?.op;
                        const blocked = isBlocked(level, sim, i);
                        const mine = event?.lane === i;
                        const wireOp = mine && lastOp ? lastOp : undefined;
                        const belief = run.locals.seat as string | undefined;
                        // stale only when someone else changed the seat; your own write is not news to you
                        const wroteSeat = sim.programs[i].slice(0, run.pc).some((s) => (s.op.k === "write" || s.op.k === "cas") && s.op.key === "seat");
                        const stale = belief !== undefined && !run.done && !wroteSeat && belief !== sim.db.seat;
                        const charged = charges.includes(lane.id);
                        const response = run.response;
                        const soldOut = response === "SOLD_OUT";
                        const resColor = soldOut ? WARN : conflict ? BAD : OK;

                        return (
                            <div key={lane.id} className="flex min-w-0 flex-col">
                                <div className="flex min-w-0 flex-1 flex-col rounded-2xl border bg-white/[0.035]" style={{ borderColor: response ? alpha(resColor, 0.6) : run.pc > 0 ? alpha(lane.color, 0.5) : LINE }}>
                                    <div className="flex items-center gap-2 border-b px-3 py-2.5 sm:px-4" style={{ borderColor: LINE }}>
                                        <span className="grid h-6 w-6 shrink-0 place-items-center rounded-full text-xs font-extrabold text-black" style={{ background: lane.color }}>{lane.label[0]}</span>
                                        <span className="truncate text-sm font-bold">{lane.label}</span>
                                        <span className="ml-auto hidden font-mono text-[10px] text-white/40 sm:inline">{lane.server}</span>
                                    </div>
                                    <div className="flex flex-1 flex-col gap-2.5 p-3 sm:p-4">
                                        <div>
                                            <p className="text-[10px] uppercase tracking-[0.12em] text-white/45">Midnight Jazz · Row A</p>
                                            <p className="mt-0.5 flex items-baseline justify-between"><span className="text-lg font-bold sm:text-xl">Seat A1</span><span className="font-mono text-xs text-white/45">$120</span></p>
                                        </div>

                                        <div className="min-h-[38px] text-[11px] leading-snug sm:text-xs">
                                            {belief === undefined ? (
                                                <span className="text-white/35">Hasn&apos;t looked at the seat yet.</span>
                                            ) : (
                                                <span className="text-white/70">
                                                    Server thinks A1 is <span className="font-mono font-semibold text-white">{belief}</span>
                                                    {stale && <motion.span initial={{ scale: 0.6, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} className="ml-1.5 inline-block rounded-full px-1.5 py-px text-[10px] font-bold text-black" style={{ background: WARN }}>stale</motion.span>}
                                                </span>
                                            )}
                                        </div>

                                        <div className="flex items-center gap-1.5 text-[11px] sm:text-xs" style={{ color: charged ? lane.color : "rgba(255,255,255,0.35)" }}>
                                            <CreditCard size={13} aria-hidden="true" />
                                            <AnimatePresence mode="wait" initial={false}>
                                                <motion.span key={String(charged)} initial={{ opacity: 0, y: 4 }} animate={{ opacity: 1, y: 0 }}>{charged ? "$120 charged" : "Card not charged"}</motion.span>
                                            </AnimatePresence>
                                        </div>

                                        <div className="mt-auto">
                                            {response ? (
                                                <motion.div initial={{ scale: 0.92, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} className="flex h-11 items-center justify-center rounded-xl border text-sm font-extrabold sm:h-12 sm:text-base" style={{ background: alpha(resColor, 0.14), color: resColor, borderColor: alpha(resColor, 0.55) }}>
                                                    {soldOut ? "Sold out" : "✓ Confirmed"}
                                                </motion.div>
                                            ) : (
                                                <motion.button
                                                    type="button"
                                                    whileTap={{ scale: 0.95 }}
                                                    onClick={() => onStep(i)}
                                                    disabled={!interactive || blocked}
                                                    aria-label={`${lane.label}: ${next ? verb(next) : "next step"}`}
                                                    className="flex h-11 w-full items-center justify-center gap-2 rounded-xl px-2 text-[13px] font-bold transition-opacity disabled:cursor-not-allowed sm:h-12 sm:text-sm"
                                                    style={blocked ? { background: alpha(lane.color, 0.1), color: lane.color, border: `1px dashed ${alpha(lane.color, 0.6)}` } : { background: lane.color, color: "#0b0b10", opacity: interactive ? 1 : 0.45 }}
                                                >
                                                    {blocked ? <><Lock size={14} aria-hidden="true" /> Waiting on lock</> : <><span className="truncate">{run.pc === 0 ? "Book seat A1" : next ? verb(next) : "Next"}</span><kbd className="hidden rounded bg-black/20 px-1.5 text-[11px] sm:inline">{i + 1}</kbd></>}
                                                </motion.button>
                                            )}
                                        </div>
                                    </div>
                                </div>

                                <Wire color={lane.color} op={wireOp} eventIndex={eventIndex} blocked={blocked} />
                            </div>
                        );
                    })}
                </div>

                <Postgres level={level} sim={sim} conflict={conflict} pulse={!!lastOp && !!sql(lastOp)} eventIndex={eventIndex} label={label} color={color} />
            </div>
        </motion.div>
    );
}

function Wire({ color, op, eventIndex, blocked }: { color: string; op?: Op; eventIndex: number; blocked: boolean }) {
    const statement = op ? sql(op) : null;
    const back = op ? roundTrip(op) : false;
    return (
        <div className="relative mx-auto h-[68px] w-px" style={{ backgroundImage: `linear-gradient(${LINE} 50%, transparent 50%)`, backgroundSize: "1px 10px" }} aria-hidden="true">
            {blocked && <span className="absolute left-1/2 top-1/2 grid h-7 w-7 -translate-x-1/2 -translate-y-1/2 place-items-center rounded-full border bg-black" style={{ borderColor: color, color }}><Lock size={13} /></span>}
            <AnimatePresence>
                {statement && (
                    <motion.div
                        key={eventIndex}
                        className="absolute left-1/2 top-0 flex -translate-x-1/2 items-center"
                        initial={{ y: 0, opacity: 1 }}
                        animate={back ? { y: [0, 44, 0], opacity: 1 } : { y: [0, 44], opacity: [1, 1, 0] }}
                        exit={{ opacity: 0 }}
                        transition={{ duration: back ? PACKET_S * 1.4 : PACKET_S, ease: [0.22, 1, 0.36, 1] }}
                    >
                        <span className="relative grid h-6 w-6 place-items-center">
                            <span className="absolute inset-0 rounded-full" style={{ background: alpha(color, 0.25) }} />
                            <span className="h-3 w-3 rounded-full" style={{ background: color }} />
                        </span>
                        <span className="absolute left-7 whitespace-nowrap rounded-md px-1.5 py-0.5 font-mono text-[10px] font-bold" style={{ background: alpha(color, 0.18), color }}>{statement}</span>
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    );
}

function Postgres({ sim, conflict, pulse, eventIndex, label, color }: {
    level: Level;
    sim: Sim;
    conflict: boolean;
    pulse: boolean;
    eventIndex: number;
    label: (id: string) => string;
    color: (id: string) => string;
}) {
    const bookings = (sim.db.bookings as string[]) ?? [];
    const charges = (sim.db.charges as string[]) ?? [];
    const booked = sim.db.seat === "booked";
    const seatColor = conflict ? BAD : booked ? DB_COLOR : OK;
    const owner = bookings.length === 1 && bookings[0] !== "A1" ? label(bookings[0]) : undefined;

    return (
        <motion.div
            key={pulse ? `db-${eventIndex}` : "db"}
            initial={pulse ? { boxShadow: `0 0 36px ${alpha(DB_COLOR, 0.35)}` } : false}
            animate={{ boxShadow: `0 0 0px ${alpha(DB_COLOR, 0)}` }}
            transition={{ duration: 0.9 }}
            className="rounded-2xl border bg-white/[0.035] p-3 sm:p-4"
            style={{ borderColor: conflict ? alpha(BAD, 0.7) : alpha(DB_COLOR, 0.35) }}
        >
            <div className="flex items-center gap-2">
                <span className="h-2.5 w-2.5 rounded-full" style={{ background: DB_COLOR }} />
                <span className="text-sm font-bold">Postgres</span>
                <span className="hidden text-xs text-white/45 sm:inline">what the database holds right now</span>
            </div>

            <div className="mt-3 flex items-end gap-1.5 sm:gap-2">
                <div className="text-center">
                    <motion.div
                        animate={conflict ? { scale: [1, 1.08, 1] } : { scale: 1 }}
                        transition={conflict ? { duration: 0.9, repeat: Infinity } : { duration: 0.2 }}
                        className="grid h-12 w-16 place-items-center rounded-xl border-2 text-sm font-extrabold sm:h-14 sm:w-20"
                        style={{ borderColor: seatColor, background: alpha(seatColor, 0.2), color: seatColor, boxShadow: conflict ? `0 0 26px ${alpha(BAD, 0.6)}` : undefined }}
                    >
                        {conflict ? `A1 ×${bookings.length}` : "A1"}
                    </motion.div>
                    <p className="mt-1 text-[11px]" style={{ color: conflict ? BAD : "rgba(255,255,255,0.5)", fontWeight: conflict ? 700 : 400 }}>
                        {conflict ? "sold twice!" : booked ? `booked${owner ? ` · ${owner}` : ""}` : "available"}
                    </p>
                </div>
                {["A2", "A3", "A4", "A5", "A6"].map((d, i) => (
                    <div key={d} className={`mb-[22px] h-9 w-9 place-items-center rounded-lg border text-[10px] text-white/25 sm:h-10 sm:w-11 ${i > 2 ? "hidden sm:grid" : "grid"}`} style={{ borderColor: LINE, background: "rgba(255,255,255,0.04)" }}>{d}</div>
                ))}
            </div>

            <div className="mt-3 grid gap-3 font-mono text-[11px] sm:grid-cols-2 sm:text-xs">
                <Ledger title="bookings" empty="no bookings" rows={bookings.map((b) => ({ key: b, text: b === "A1" ? "seat A1" : `A1 → ${label(b)}`, color: b === "A1" ? undefined : color(b) }))} bad={conflict} />
                <Ledger title="payments" empty="no charges" rows={charges.map((c) => ({ key: c, text: `${label(c)} · $120`, color: color(c) }))} bad={charges.length > bookings.length && bookings.length > 0} />
            </div>
        </motion.div>
    );
}

function Ledger({ title, rows, empty, bad }: { title: string; rows: { key: string; text: string; color?: string }[]; empty: string; bad: boolean }) {
    return (
        <div>
            <p className="mb-1 text-white/45">{title}</p>
            <ul className="min-h-[60px] overflow-hidden rounded-lg border" style={{ borderColor: bad ? alpha(BAD, 0.6) : LINE }}>
                {rows.length === 0 && <li className="px-2.5 py-1.5 text-white/30">({empty})</li>}
                <AnimatePresence initial={false}>
                    {rows.map((r, i) => (
                        <motion.li key={r.key + i} initial={{ opacity: 0, x: -10, backgroundColor: "rgba(251,191,36,0.3)" }} animate={{ opacity: 1, x: 0, backgroundColor: "rgba(251,191,36,0)" }} transition={{ duration: 0.8 }} className="border-t px-2.5 py-1.5 first:border-t-0" style={{ borderColor: LINE, color: r.color ?? "#e5e7eb" }}>
                            {r.text}
                        </motion.li>
                    ))}
                </AnimatePresence>
            </ul>
        </div>
    );
}

function Caption({ level, event, eventIndex, outcome }: { level: Level; event?: StepEvent; eventIndex: number; outcome?: SceneOutcome }) {
    const lane = event ? level.lanes[event.lane] : undefined;
    const accent = outcome ? (outcome.ok ? OK : BAD) : lane?.color ?? "rgba(255,255,255,0.3)";
    return (
        <div className="min-h-[72px] rounded-2xl border px-4 py-3 sm:px-5" style={{ borderColor: outcome ? alpha(accent, 0.6) : LINE, background: outcome ? alpha(accent, 0.1) : "rgba(255,255,255,0.035)", boxShadow: `inset 4px 0 0 ${accent}` }} aria-live="polite">
            <AnimatePresence mode="wait" initial={false}>
                <motion.div key={outcome ? `out-${outcome.text}` : eventIndex} initial={{ opacity: 0, y: 6 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -4 }} transition={{ duration: 0.2 }}>
                    {outcome ? (
                        <p className="text-base font-bold sm:text-lg" style={{ color: accent }}>{outcome.ok ? "✓" : "✗"} {outcome.text}</p>
                    ) : event && lane ? (
                        <>
                            <p className="text-[11px] font-bold uppercase tracking-[0.12em]" style={{ color: lane.color }}>{lane.label} · step {eventIndex}</p>
                            <p className="mt-1 font-mono text-sm text-white sm:text-base">{event.text}</p>
                        </>
                    ) : (
                        <>
                            <p className="text-base font-semibold sm:text-lg">Alice and Bob hit Book at the same moment.</p>
                            <p className="mt-0.5 text-xs text-white/50 sm:text-sm">You decide whose request moves next. Get the seat sold twice.</p>
                        </>
                    )}
                </motion.div>
            </AnimatePresence>
        </div>
    );
}

function CodePanel({ level, sim, event }: { level: Level; sim: Sim; event?: StepEvent }) {
    // Both requests run the same handler; show it once with each user's position marked.
    const first = level.lanes[0].id;
    const lines = sim.programs[0].map((s) => s.code.replaceAll(`"${first}"`, "userId"));
    return (
        <div className="min-w-0 overflow-hidden rounded-2xl border bg-[#08080e]/90" style={{ borderColor: LINE }}>
            <div className="flex h-9 items-center gap-1.5 border-b bg-white/[0.03] px-3" style={{ borderColor: LINE }}>
                {["#ff5f57", "#febc2e", "#28c840"].map((c) => <span key={c} className="h-2.5 w-2.5 rounded-full opacity-80" style={{ background: c }} />)}
                <span className="ml-2 font-mono text-xs text-white/45">bookSeat.ts</span>
            </div>
            <ol className="py-2 font-mono text-[11.5px] leading-[1.6]">
                {lines.map((code, n) => {
                    const here = level.lanes.filter((_, i) => !sim.lanes[i].done && sim.lanes[i].pc === n);
                    const active = event && event.line === n ? level.lanes[event.lane].color : undefined;
                    return (
                        <li key={n} className="relative flex gap-2 py-[3px] pr-2" style={{ background: active ? alpha(active, 0.14) : undefined, boxShadow: active ? `inset 3px 0 0 ${active}` : here.length ? `inset 3px 0 0 ${alpha(here[0].color, 0.5)}` : undefined }}>
                            <span className="w-7 shrink-0 text-right text-white/25">{n + 1}</span>
                            <span className="min-w-0 flex-1 whitespace-pre-wrap break-words text-white/85">{code}</span>
                            <span className="flex shrink-0 flex-col gap-0.5">
                                {here.map((lane) => (
                                    <motion.span layoutId={`pc-${lane.id}`} key={lane.id} className="rounded-full px-1.5 text-[10px] font-bold text-black" style={{ background: lane.color }}>{lane.label}</motion.span>
                                ))}
                            </span>
                        </li>
                    );
                })}
            </ol>
        </div>
    );
}
