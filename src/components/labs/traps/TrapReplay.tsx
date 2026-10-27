"use client";

import { useEffect, useMemo, useState } from "react";
import { Pause, Play, RotateCcw, SkipBack, SkipForward } from "lucide-react";
import type { StoreState, TrapBundle, TrapEvent, TrapVariantName } from "@/types/traps";
import { SEVERITY_COLORS, actorColors, alpha } from "./palette";
import { TrapTimeline } from "./TrapTimeline";
import { TrapCode } from "./TrapCode";
import { TrapState } from "./TrapState";

const SPEEDS = [0.5, 1, 2] as const;
const BASE_MS = 1150;

/**
 * Replays a recorded trace (see github.com/somnathraz/interview-traps, TRACE_SCHEMA.md).
 * Renders any trap generically: no per-episode code here.
 */
export function TrapReplay({ trap }: { trap: TrapBundle }) {
    const [variantName, setVariantName] = useState<TrapVariantName>("bug");
    const [index, setIndex] = useState(-1);
    const [playRequested, setPlaying] = useState(false);
    const [speed, setSpeed] = useState<(typeof SPEEDS)[number]>(1);

    const variant = trap.variants[variantName];
    const events = variant.events;
    const last = events.length - 1;
    const colors = useMemo(() => actorColors(trap.actors), [trap.actors]);
    const current: TrapEvent | undefined = events[index];
    const done = index === last;
    const playing = playRequested && !done;

    const switchVariant = (name: TrapVariantName) => {
        setVariantName(name);
        setIndex(-1);
        setPlaying(false);
    };

    // React Compiler memoizes these; no manual useCallback needed.
    const step = (delta: number) => {
        setPlaying(false);
        setIndex((i) => Math.min(last, Math.max(-1, i + delta)));
    };

    const togglePlay = () => {
        if (done) { setIndex(-1); setPlaying(true); }
        else setPlaying(!playing);
    };

    // autoplay; slow work gets a little more screen time
    useEffect(() => {
        if (!playing) return;
        const next = events[index + 1];
        const ms = (next?.type === "wait" ? BASE_MS * 1.3 : BASE_MS) / speed;
        const id = window.setTimeout(() => setIndex((i) => i + 1), index === -1 ? 350 : ms);
        return () => window.clearTimeout(id);
    }, [playing, index, last, events, speed]);

    useEffect(() => {
        const onKey = (e: KeyboardEvent) => {
            const tag = (e.target as HTMLElement | null)?.tagName;
            if (tag === "INPUT" || tag === "TEXTAREA" || tag === "SELECT") return;
            if (e.key === " ") { e.preventDefault(); togglePlay(); }
            else if (e.key === "ArrowRight") { e.preventDefault(); step(1); }
            else if (e.key === "ArrowLeft") { e.preventDefault(); step(-1); }
        };
        window.addEventListener("keydown", onKey);
        return () => window.removeEventListener("keydown", onKey);
    }, [togglePlay, step]);

    const derived = useMemo(() => {
        const stateAt = (k: number): StoreState => {
            for (let j = k; j >= 0; j--) if (events[j].state) return events[j].state!;
            return variant.initialState;
        };
        const positions: Record<string, string> = {};
        const responses: Record<string, TrapEvent | undefined> = {};
        for (let j = 0; j <= index; j++) {
            const e = events[j];
            if (e.step) positions[e.actor] = e.step;
            if (e.type === "response") responses[e.actor] = e;
        }
        return { state: stateAt(index), prevState: stateAt(index - 1), positions, responses };
    }, [events, index, variant.initialState]);

    const actorLabel = (id: string) => trap.actors.find((a) => a.id === id)?.label ?? id;
    const sevColor = current?.severity ? SEVERITY_COLORS[current.severity] : undefined;

    return (
        <section aria-label="Interactive replay" className="flex flex-col gap-4">
            {/* variant switch */}
            <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
                <div role="tablist" aria-label="Choose implementation" className="inline-flex w-full rounded-full border border-white/10 bg-white/[0.03] p-1 sm:w-auto">
                    {(["bug", "fix"] as const).map((name) => {
                        const active = name === variantName;
                        const c = name === "bug" ? SEVERITY_COLORS.bad : SEVERITY_COLORS.ok;
                        return (
                            <button
                                key={name}
                                role="tab"
                                aria-selected={active}
                                onClick={() => switchVariant(name)}
                                className="flex-1 rounded-full px-4 py-2 text-sm transition-colors sm:flex-none"
                                style={active ? { background: alpha(c, 0.16), color: c, boxShadow: `inset 0 0 0 1px ${alpha(c, 0.45)}` } : { color: "rgba(255,255,255,0.55)" }}
                            >
                                <span className="font-semibold">{name === "bug" ? "The bug" : "The fix"}</span>
                                <span className="hidden opacity-70 md:inline"> · {trap.variants[name].label}</span>
                            </button>
                        );
                    })}
                </div>
                <p className="text-xs text-white/40">Recorded from a real run against Postgres. Timings are real.</p>
            </div>

            {/* narration */}
            <div
                aria-live="polite"
                className="min-h-[92px] rounded-2xl border px-5 py-4 transition-colors duration-300"
                style={{ borderColor: sevColor ? alpha(sevColor, 0.45) : "rgba(255,255,255,0.1)", background: sevColor ? alpha(sevColor, 0.06) : "rgba(255,255,255,0.02)" }}
            >
                {current ? (
                    <>
                        <div className="mb-1.5 flex flex-wrap items-center gap-x-3 gap-y-1 text-[11px] uppercase tracking-[0.14em] text-white/40">
                            <span>Event {index + 1} / {events.length}</span>
                            <span className="font-mono normal-case tracking-normal">{Math.round(current.t)}ms</span>
                            <span className="inline-flex items-center gap-1.5 normal-case tracking-normal" style={{ color: colors[current.actor] }}>
                                <span className="h-2 w-2 rounded-full" style={{ background: colors[current.actor] }} />
                                {actorLabel(current.actor)}
                                {current.target && <span className="text-white/40">→ {actorLabel(current.target)}</span>}
                            </span>
                        </div>
                        <p className="font-mono text-[15px] text-white" style={sevColor ? { color: sevColor } : undefined}>{current.label}</p>
                        {current.detail && <p className="mt-1 text-sm text-white/55">{current.detail}</p>}
                    </>
                ) : (
                    <div className="flex h-full flex-col justify-center">
                        <p className="text-[15px] text-white/80">
                            {trap.actors.filter((a) => a.kind === "client").map((a) => a.label).join(" and ")} hit the button at the same moment.
                        </p>
                        <p className="mt-1 text-sm text-white/45">Press play, or step with ← → . Click any event on the timeline to jump to it.</p>
                    </div>
                )}
            </div>

            <TrapTimeline actors={trap.actors} events={events} index={index} colors={colors} onSelect={(k) => { setPlaying(false); setIndex(k); }} />

            {/* controls */}
            <div className="flex flex-wrap items-center gap-3">
                <div className="flex items-center gap-1">
                    <IconButton label="Restart" onClick={() => { setPlaying(false); setIndex(-1); }}><RotateCcw size={16} /></IconButton>
                    <IconButton label="Previous event" onClick={() => step(-1)} disabled={index < 0}><SkipBack size={16} /></IconButton>
                    <button
                        onClick={togglePlay}
                        aria-label={playing ? "Pause" : "Play"}
                        className="flex h-11 w-11 items-center justify-center rounded-full bg-white text-black transition-transform hover:scale-105 active:scale-95"
                    >
                        {playing ? <Pause size={18} fill="currentColor" /> : <Play size={18} fill="currentColor" className="ml-0.5" />}
                    </button>
                    <IconButton label="Next event" onClick={() => step(1)} disabled={done}><SkipForward size={16} /></IconButton>
                </div>
                <input
                    type="range"
                    min={-1}
                    max={last}
                    value={index}
                    onChange={(e) => { setPlaying(false); setIndex(Number(e.target.value)); }}
                    aria-label="Scrub through events"
                    className="h-1.5 min-w-[140px] flex-1 cursor-pointer accent-white"
                />
                <div className="flex items-center rounded-full border border-white/10 p-0.5 text-xs">
                    {SPEEDS.map((s) => (
                        <button
                            key={s}
                            onClick={() => setSpeed(s)}
                            aria-pressed={speed === s}
                            className={`rounded-full px-2.5 py-1 font-mono transition-colors ${speed === s ? "bg-white/15 text-white" : "text-white/45 hover:text-white/80"}`}
                        >
                            {s}×
                        </button>
                    ))}
                </div>
            </div>

            {done && (
                <div
                    className="flex flex-col gap-3 rounded-2xl border px-5 py-4 sm:flex-row sm:items-center sm:justify-between"
                    style={{ borderColor: alpha(variant.outcome.ok ? SEVERITY_COLORS.ok : SEVERITY_COLORS.bad, 0.5), background: alpha(variant.outcome.ok ? SEVERITY_COLORS.ok : SEVERITY_COLORS.bad, 0.08) }}
                >
                    <p className="text-[15px] font-medium" style={{ color: variant.outcome.ok ? SEVERITY_COLORS.ok : SEVERITY_COLORS.bad }}>
                        {variant.outcome.ok ? "✓ " : "✗ "}{variant.outcome.headline}
                    </p>
                    {variantName === "bug" ? (
                        <button onClick={() => { switchVariant("fix"); setPlaying(true); }} className="shrink-0 rounded-full bg-white px-4 py-2 text-sm font-semibold text-black hover:bg-white/90">
                            Now replay the fix →
                        </button>
                    ) : (
                        <a href={trap.links.repo} target="_blank" rel="noopener" className="shrink-0 rounded-full bg-white px-4 py-2 text-sm font-semibold text-black hover:bg-white/90">
                            Run it on your machine →
                        </a>
                    )}
                </div>
            )}

            <div className="grid gap-4 lg:grid-cols-[1.15fr_1fr]">
                <TrapCode
                    source={variant.source}
                    steps={variant.steps}
                    activeStep={current?.step}
                    activeActor={current?.actor}
                    positions={derived.positions}
                    actors={trap.actors}
                    colors={colors}
                    fileName={`${variantName}.ts`}
                />
                <TrapState
                    state={derived.state}
                    prevState={derived.prevState}
                    changedBy={current?.state ? current.actor : undefined}
                    colors={colors}
                    actors={trap.actors}
                    responses={derived.responses}
                />
            </div>
        </section>
    );
}

function IconButton({ label, onClick, disabled, children }: { label: string; onClick: () => void; disabled?: boolean; children: React.ReactNode }) {
    return (
        <button
            onClick={onClick}
            disabled={disabled}
            aria-label={label}
            title={label}
            className="flex h-9 w-9 items-center justify-center rounded-full text-white/70 transition-colors hover:bg-white/10 hover:text-white disabled:pointer-events-none disabled:opacity-30"
        >
            {children}
        </button>
    );
}
