"use client";

import { useEffect, useRef, useState } from "react";
import type { TrapActor, TrapEvent } from "@/types/traps";
import { SEVERITY_COLORS, alpha } from "./palette";

const LABEL_W = 112;
const MIN_COL_W = 60;
const MAX_COL_W = 110;
const ROW_H = 50;
const TOP = 30;
const BOTTOM = 22;

/**
 * Swimlanes: one row per actor, one column per recorded event.
 * Slow work (e.g. a payment call) is drawn as a bar so overlapping
 * windows are visible at a glance.
 */
export function TrapTimeline({
    actors,
    events,
    index,
    colors,
    onSelect,
}: {
    actors: TrapActor[];
    events: TrapEvent[];
    index: number;
    colors: Record<string, string>;
    onSelect: (i: number) => void;
}) {
    const boxRef = useRef<HTMLDivElement>(null);
    const [boxW, setBoxW] = useState(0);

    // columns stretch to fill wide screens; narrow screens scroll horizontally
    useEffect(() => {
        const el = boxRef.current;
        if (!el) return;
        const ro = new ResizeObserver(([entry]) => setBoxW(entry.contentRect.width));
        ro.observe(el);
        return () => ro.disconnect();
    }, []);

    const COL_W = Math.min(MAX_COL_W, Math.max(MIN_COL_W, (boxW - LABEL_W - 16) / Math.max(events.length, 1)));
    const row = Object.fromEntries(actors.map((a, i) => [a.id, i]));
    const width = LABEL_W + events.length * COL_W + 16;
    const lanesH = actors.length * ROW_H;
    const height = TOP + lanesH + BOTTOM;
    const x = (k: number) => LABEL_W + k * COL_W + COL_W / 2;
    const y = (actor: string) => TOP + (row[actor] ?? 0) * ROW_H + ROW_H / 2;

    const waits = events.flatMap((e, k) => {
        if (e.type !== "wait") return [];
        const end = events.findIndex((n, m) => m > k && n.actor === e.actor);
        return [{ k, end: end === -1 ? events.length - 1 : end, actor: e.actor }];
    });

    // race window: columns where 2+ actors are mid-slow-work at the same time
    // span every wait that overlaps another actor's wait
    const racing = waits.filter((w) => waits.some((o) => o.actor !== w.actor && o.k < w.end && w.k < o.end));
    const raceStart = racing.length ? Math.min(...racing.map((w) => w.k)) : -1;
    const raceEnd = racing.length ? Math.max(...racing.map((w) => w.end)) : -1;

    // keep the playhead visible when the timeline scrolls (phones)
    useEffect(() => {
        const el = boxRef.current;
        if (!el || index < 0 || el.scrollWidth <= el.clientWidth) return;
        const px = LABEL_W + index * COL_W + COL_W / 2;
        if (px < el.scrollLeft + LABEL_W || px > el.scrollLeft + el.clientWidth - COL_W) {
            el.scrollTo({ left: Math.max(0, px - el.clientWidth / 2), behavior: "smooth" });
        }
    }, [index, COL_W]);

    // show a time label only when the clock moved noticeably, so clustered events don't overlap
    const timeLabels = events.reduce<number[]>((acc, e, k) => {
        const prev = acc.length ? events[acc[acc.length - 1]].t : -Infinity;
        return e.t - prev >= 8 ? [...acc, k] : acc;
    }, []);

    return (
        <div className="rounded-2xl border border-white/10 bg-white/[0.02]">
            <div ref={boxRef} className="overflow-x-auto">
            <svg
                viewBox={`0 0 ${width} ${height}`}
                width={width}
                height={height}
                className="block min-w-full"
                role="img"
                aria-label="Timeline of the recorded run, one lane per actor"
            >
                <defs>
                    <marker id="trap-arrow" viewBox="0 0 8 8" refX="7" refY="4" markerWidth="7" markerHeight="7" orient="auto-start-reverse">
                        <path d="M0,0 L8,4 L0,8 z" fill="rgba(255,255,255,0.55)" />
                    </marker>
                </defs>

                {actors.map((a) => (
                    <g key={a.id}>
                        <line x1={LABEL_W - 8} x2={width - 8} y1={y(a.id)} y2={y(a.id)} stroke="rgba(255,255,255,0.07)" />
                        <circle cx={14} cy={y(a.id)} r={4} fill={colors[a.id]} />
                        <text x={26} y={y(a.id) + 4} fontSize={13} fill="rgba(255,255,255,0.8)" fontWeight={500}>
                            {a.label}
                        </text>
                    </g>
                ))}

                {raceStart >= 0 && (
                    <g opacity={index >= raceStart ? 1 : 0.35} style={{ transition: "opacity 300ms" }}>
                        <rect
                            x={x(raceStart) - COL_W / 2}
                            y={TOP - 6}
                            width={(raceEnd - raceStart + 1) * COL_W}
                            height={lanesH + 8}
                            rx={10}
                            fill={alpha(SEVERITY_COLORS.bad, 0.07)}
                            stroke={alpha(SEVERITY_COLORS.bad, 0.4)}
                            strokeDasharray="4 4"
                        />
                        <text x={x(raceStart) - COL_W / 2 + 8} y={TOP + lanesH + 16} fontSize={11} fontWeight={600} fill={SEVERITY_COLORS.bad}>
                            race window: requests overlap here, so each one decides on stale data
                        </text>
                    </g>
                )}

                {/* playhead */}
                {index >= 0 && (
                    <rect x={x(index) - COL_W / 2 + 4} y={TOP - 6} width={COL_W - 8} height={lanesH + 8} rx={10} fill="rgba(255,255,255,0.06)" />
                )}

                {/* time labels: real ms from the recorded run */}
                {timeLabels.map((k) => {
                    const e = events[k];
                    return (
                        <text key={`t${k}`} x={x(k)} y={16} fontSize={10} textAnchor="middle" fill={k <= index ? "rgba(255,255,255,0.55)" : "rgba(255,255,255,0.22)"} fontFamily="ui-monospace, monospace">
                            {Math.round(e.t)}ms
                        </text>
                    );
                })}

                {waits.map(({ k, end, actor }) => (
                    <g key={`w${k}`} opacity={k <= index ? 1 : 0.25}>
                        <rect x={x(k)} y={y(actor) - 6} width={Math.max(x(end) - x(k), 4)} height={12} rx={6} fill={alpha(colors[actor], 0.22)} stroke={alpha(colors[actor], 0.6)} strokeDasharray="3 3" />
                    </g>
                ))}

                {events.map((e, k) => {
                    const played = k <= index;
                    const current = k === index;
                    const fill = e.severity ? SEVERITY_COLORS[e.severity] : colors[e.actor];
                    const ay = y(e.actor);
                    const ty = e.target ? y(e.target) : ay;
                    const dir = ty > ay ? 1 : -1;
                    return (
                        <g key={k} opacity={played ? 1 : 0.2} style={{ transition: "opacity 300ms" }}>
                            {e.target && (
                                <line x1={x(k)} x2={x(k)} y1={ay + dir * 9} y2={ty - dir * 9} stroke={played ? alpha(colors[e.actor], 0.8) : "rgba(255,255,255,0.4)"} strokeWidth={1.5} markerEnd="url(#trap-arrow)" />
                            )}
                            {e.target && <circle cx={x(k)} cy={ty} r={4} fill="none" stroke="rgba(255,255,255,0.45)" />}
                            {current && <circle cx={x(k)} cy={ay} r={13} fill="none" stroke={fill} strokeOpacity={0.5} strokeWidth={2} />}
                            {e.type === "response" ? (
                                <rect x={x(k) - 8} y={ay - 8} width={16} height={16} rx={4} fill={fill} />
                            ) : (
                                <circle cx={x(k)} cy={ay} r={e.type === "write" ? 7.5 : 6} fill={e.type === "read" ? "#0a0a0a" : fill} stroke={fill} strokeWidth={2} />
                            )}
                            {e.type === "response" && (
                                <text x={x(k)} y={ay + 4} fontSize={11} fontWeight={700} textAnchor="middle" fill="#0a0a0a">
                                    {e.severity === "ok" ? "✓" : "!"}
                                </text>
                            )}
                            <rect
                                x={x(k) - COL_W / 2}
                                y={TOP - 6}
                                width={COL_W}
                                height={actors.length * ROW_H + 8}
                                fill="transparent"
                                className="cursor-pointer"
                                onClick={() => onSelect(k)}
                            >
                                <title>{`${Math.round(e.t)}ms · ${e.actor}: ${e.label}`}</title>
                            </rect>
                        </g>
                    );
                })}
            </svg>
            </div>
            <div className="flex flex-wrap gap-x-5 gap-y-1 border-t border-white/10 px-4 py-2.5 text-[11px] text-white/45">
                <Legend shape="ring">read</Legend>
                <Legend shape="dot">write</Legend>
                <Legend shape="bar">slow work (overlap = race window)</Legend>
                <Legend shape="square">response to user</Legend>
            </div>
        </div>
    );
}

function Legend({ shape, children }: { shape: "ring" | "dot" | "bar" | "square"; children: React.ReactNode }) {
    const base = "inline-block align-middle mr-1.5";
    const el =
        shape === "ring" ? <span className={`${base} h-2.5 w-2.5 rounded-full border-2 border-white/60`} />
        : shape === "dot" ? <span className={`${base} h-2.5 w-2.5 rounded-full bg-white/60`} />
        : shape === "bar" ? <span className={`${base} h-2 w-5 rounded-full border border-dashed border-white/50 bg-white/15`} />
        : <span className={`${base} h-2.5 w-2.5 rounded-[3px] bg-white/60`} />;
    return <span>{el}{children}</span>;
}
