"use client";

import { motion } from "framer-motion";
import { Lock } from "lucide-react";
import { alpha } from "../palette";
import type { DbState, Lane, LaneRun, Level, Step, StepEvent, Val } from "@/lib/trap-game/engine";

const fmt = (v: Val) => (Array.isArray(v) ? (v.length ? `[ ${v.join(", ")} ]` : "[ ]") : JSON.stringify(v));

export function LaneCard({ lane, program, run, blocked, locked, onStep, hotkey, lastLine, interactive }: {
    lane: Lane;
    program: Step[];
    run: LaneRun;
    blocked: boolean;
    locked: boolean;
    onStep?: () => void;
    hotkey: string;
    lastLine?: number;
    interactive: boolean;
}) {
    return (
        <div className="flex min-w-0 flex-col rounded-2xl border bg-white/[0.02]" style={{ borderColor: alpha(lane.color, 0.35) }}>
            <div className="flex items-center justify-between gap-3 border-b px-4 py-3" style={{ borderColor: alpha(lane.color, 0.2) }}>
                <div className="flex min-w-0 items-center gap-2.5">
                    <span aria-hidden="true" className="h-2.5 w-2.5 shrink-0 rounded-full" style={{ background: lane.color }} />
                    <span className="truncate font-semibold" style={{ color: lane.color }}>{lane.label}</span>
                    <span className="rounded-full border border-white/10 px-2 py-0.5 font-mono text-[10px] text-white/45">{lane.server}</span>
                </div>
                {run.response && (
                    <span className="shrink-0 rounded-full px-2.5 py-1 font-mono text-[11px] font-semibold" style={{ background: alpha(lane.color, 0.16), color: lane.color }}>
                        {run.response}
                    </span>
                )}
            </div>

            <ol className="py-2 font-mono text-[12px] leading-relaxed sm:text-[12.5px]">
                {program.map((step, i) => {
                    const next = !run.done && i === run.pc;
                    const ran = i < run.pc;
                    const skipped = run.done && i >= run.pc;
                    return (
                        <li
                            key={i}
                            className={`flex gap-2 px-4 py-[3px] ${skipped ? "text-white/20" : ran ? "text-white/45" : next ? "text-white" : "text-white/60"}`}
                            style={next ? { background: alpha(lane.color, 0.12), boxShadow: `inset 2px 0 0 ${lane.color}` } : i === lastLine ? { background: "rgba(255,255,255,0.03)" } : undefined}
                        >
                            <span aria-hidden="true" className="w-3 shrink-0 text-center" style={{ color: lane.color }}>{next ? "▶" : ran ? "✓" : ""}</span>
                            <span className="min-w-0 whitespace-pre-wrap break-words">{step.code}</span>
                        </li>
                    );
                })}
            </ol>

            <div className="mt-auto flex flex-wrap items-center justify-between gap-3 border-t px-4 py-3" style={{ borderColor: alpha(lane.color, 0.2) }}>
                <div className="min-w-0 font-mono text-[11px] text-white/45">
                    {Object.entries(run.locals).length ? Object.entries(run.locals).map(([k, v]) => <span key={k} className="mr-3">{k} = <span className="text-white/75">{fmt(v)}</span></span>) : "no local variables yet"}
                </div>
                {interactive && (
                    <button
                        type="button"
                        onClick={onStep}
                        disabled={run.done || blocked}
                        aria-label={`Step ${lane.label}`}
                        className="inline-flex shrink-0 items-center gap-2 rounded-full px-4 py-2 text-sm font-semibold text-black transition-opacity disabled:cursor-not-allowed disabled:opacity-30"
                        style={{ background: lane.color }}
                    >
                        {blocked ? <><Lock size={13} aria-hidden="true" /> Waiting on lock</> : run.done ? "Finished" : <>Step <kbd className="rounded bg-black/20 px-1.5 text-[11px]">{hotkey}</kbd></>}
                    </button>
                )}
                {!interactive && locked && <span className="inline-flex items-center gap-1.5 text-xs text-white/50"><Lock size={12} aria-hidden="true" /> holds a lock</span>}
            </div>
        </div>
    );
}

export function DbPanel({ level, db, lanes, changed }: { level: Level; db: DbState; lanes: LaneRun[]; changed: string[] }) {
    const locks = lanes.flatMap((l, i) => l.held.map((h) => ({ name: h, lane: level.lanes[i] })));
    return (
        <div className="rounded-2xl border border-white/10 bg-white/[0.02]">
            <h3 className="border-b border-white/10 px-4 py-3 text-xs font-semibold uppercase tracking-[0.14em] text-indigo-300">Database</h3>
            <dl className="divide-y divide-white/5 font-mono text-[12.5px]">
                {Object.entries(db).map(([key, value]) => (
                    <div key={key} className="flex items-baseline justify-between gap-4 px-4 py-2">
                        <dt className="text-white/50">{key}</dt>
                        <motion.dd
                            // a new key per value replays the flash whenever the cell changes
                            key={`${key}:${fmt(value)}`}
                            initial={changed.includes(key) ? { backgroundColor: "rgba(251,191,36,0.35)" } : false}
                            animate={{ backgroundColor: "rgba(251,191,36,0)" }}
                            transition={{ duration: 1.1 }}
                            className="rounded px-1.5 text-right text-white"
                        >
                            {fmt(value)}
                        </motion.dd>
                    </div>
                ))}
            </dl>
            {locks.length > 0 && (
                <ul className="flex flex-wrap gap-2 border-t border-white/10 px-4 py-3">
                    {locks.map((l) => (
                        <li key={l.name + l.lane.id} className="inline-flex items-center gap-1.5 rounded-full border border-white/10 px-2.5 py-1 text-[11px] text-white/70">
                            <Lock size={11} aria-hidden="true" /> {l.name} <span style={{ color: l.lane.color }}>· {l.lane.label}</span>
                        </li>
                    ))}
                </ul>
            )}
        </div>
    );
}

export function EventLog({ level, events }: { level: Level; events: StepEvent[] }) {
    return (
        <div className="rounded-2xl border border-white/10 bg-white/[0.02]">
            <h3 className="border-b border-white/10 px-4 py-3 text-xs font-semibold uppercase tracking-[0.14em] text-indigo-300">What happened</h3>
            <ol aria-live="polite" className="max-h-56 space-y-1.5 overflow-y-auto px-4 py-3 font-mono text-[12px]">
                {events.length === 0 && <li className="text-white/35">Step a request to begin.</li>}
                {events.map((e, i) => (
                    <li key={i} className="flex gap-2 text-white/70">
                        <span className="w-5 shrink-0 text-right text-white/30">{i + 1}</span>
                        <span style={{ color: level.lanes[e.lane].color }}>{level.lanes[e.lane].label}</span>
                        <span className="min-w-0 break-words text-white/55">{e.text}</span>
                    </li>
                ))}
            </ol>
        </div>
    );
}

/** Wordle-style strip of who moved when. Also what gets shared. */
export function ScheduleStrip({ level, schedule }: { level: Level; schedule: number[] }) {
    return (
        <span className="inline-flex flex-wrap gap-1" role="img" aria-label={`Order: ${schedule.map((p) => level.lanes[p].label).join(", then ")}`}>
            {schedule.map((lane, i) => <span key={i} className="h-4 w-4 rounded-[4px]" style={{ background: level.lanes[lane].color }} />)}
        </span>
    );
}
