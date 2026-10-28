"use client";

import { useMemo } from "react";
import { AbsoluteFill, Easing, spring, useCurrentFrame, useVideoConfig } from "remotion";
import type { StoreState, TrapBundle, TrapEvent, TrapVariantName } from "@/types/traps";
import { SEVERITY_COLORS, actorColors, alpha } from "../palette";
import { buildTimeline, eventAt } from "./timeline";

export type SceneProps = { trap: TrapBundle; variantName: TrapVariantName };

const MONO = "ui-monospace, SFMono-Regular, Menlo, monospace";
const SANS = "ui-sans-serif, system-ui, -apple-system, 'Segoe UI', sans-serif";
const INK = "#fff";
const DIM = "rgba(255,255,255,0.5)";
const PANEL = "rgba(255,255,255,0.035)";
const LINE = "rgba(255,255,255,0.1)";

// layout (composition is 1280×720)
const CODE = { x: 24, y: 24, w: 556, h: 672 };
const RIGHT_X = 600;
const CAPTION = { y: 24, h: 94 };
const PHONE = { y: 134, w: 320, h: 236, gap: 16 };
const DB = { y: 432, h: 264, w: 656 };

const clamp01 = (n: number) => Math.min(1, Math.max(0, n));
const ease = Easing.bezier(0.22, 1, 0.36, 1);

export function BookingScene({ trap, variantName }: SceneProps) {
    const frame = useCurrentFrame();
    const { fps } = useVideoConfig();
    const variant = trap.variants[variantName];
    const events = variant.events;
    const colors = useMemo(() => actorColors(trap.actors), [trap.actors]);
    const { starts, durs } = useMemo(() => buildTimeline(events), [events]);

    const k = eventAt(starts, frame);
    const local = k >= 0 ? frame - starts[k] : 0;
    const clients = trap.actors.filter((a) => a.kind === "client").slice(0, 2);
    const dbColor = colors[trap.actors.find((a) => a.kind === "db")?.id ?? ""] ?? "#818cf8";
    const label = (id: string) => trap.actors.find((a) => a.id === id)?.label ?? id;
    const seatId = String(variant.initialState.seats?.[0]?.id ?? "A1");

    // ── derived world at this frame ─────────────────────────────────────────
    const stateAt = (i: number): StoreState => {
        for (let j = i; j >= 0; j--) if (events[j].state) return events[j].state!;
        return variant.initialState;
    };
    let stateEvent = -1;
    for (let j = k; j >= 0; j--) if (events[j].state) { stateEvent = j; break; }
    const state = stateAt(k);
    const prevState = stateEvent >= 0 ? stateAt(stateEvent - 1) : state;
    const flash = stateEvent >= 0 ? clamp01(1 - (frame - starts[stateEvent]) / 60) : 0;
    const flashColor = stateEvent >= 0 ? colors[events[stateEvent].actor] : dbColor;

    const latestOf = (actor: string): number => {
        for (let j = k; j >= 0; j--) if (events[j].actor === actor) return j;
        return -1;
    };

    const positions: Record<string, string> = {};
    for (let j = 0; j <= k; j++) if (events[j].step) positions[events[j].actor] = events[j].step!;

    const group = k >= 0 ? events.map((_, i) => i).filter((i) => starts[i] === starts[k]) : [];
    const current: TrapEvent | undefined = events[k];

    // packets travelling phone ⇄ database
    const phoneX = (i: number) => RIGHT_X + i * (PHONE.w + PHONE.gap);
    const packets = clients.flatMap((c, i) => {
        const a = latestOf(c.id);
        if (a < 0) return [];
        const e = events[a];
        const l = frame - starts[a];
        if (e.target !== "db" || l < 0 || l > durs[a]) return [];
        const p = l / durs[a];
        const top = PHONE.y + PHONE.h;
        const bottom = DB.y;
        const t = e.type === "read" ? (p < 0.5 ? p * 2 : 2 - p * 2) : clamp01(p / 0.6);
        const fade = e.type === "write" ? 1 - clamp01((p - 0.7) / 0.3) : 1;
        return [{ x: phoneX(i) + PHONE.w / 2, y: top + (bottom - top) * ease(t), color: colors[c.id], fade, arrive: e.type === "read" ? 1 - Math.abs(p - 0.5) * 4 : 1 - Math.abs(p * 1.66 - 1) * 2 }];
    });
    const dbPulse = clamp01(Math.max(0, ...packets.map((p) => p.arrive)));

    const isLast = k === events.length - 1;
    const outcomeIn = isLast ? clamp01((local - 24) / 14) : 0;

    return (
        <AbsoluteFill style={{ background: "#07070b", fontFamily: SANS, color: INK }}>
            <AbsoluteFill style={{ background: "radial-gradient(900px 500px at 78% 0%, rgba(99,102,241,0.14), transparent 70%)" }} />

            <CodePanel
                source={variant.source}
                steps={variant.steps}
                fileName={`${variantName}.ts`}
                activeStep={current?.step}
                activeColor={current ? colors[current.actor] : undefined}
                positions={positions}
                colors={colors}
                clients={clients.map((c) => c.id)}
                label={label}
                frame={frame}
                startFrame={k >= 0 ? starts[k] : 0}
                severity={current?.severity}
            />

            <Caption
                current={current}
                group={group.map((i) => events[i])}
                local={local}
                colors={colors}
                label={label}
                clientNames={clients.map((c) => c.label)}
                outcome={isLast ? { ok: variant.outcome.ok, headline: variant.outcome.headline, t: outcomeIn } : undefined}
            />

            {clients.map((c, i) => {
                const a = latestOf(c.id);
                return (
                    <Phone
                        key={c.id}
                        x={phoneX(i)}
                        name={c.label}
                        color={colors[c.id]}
                        event={a >= 0 ? events[a] : undefined}
                        local={a >= 0 ? frame - starts[a] : 0}
                        dur={a >= 0 ? durs[a] : 1}
                        fps={fps}
                        seatId={seatId}
                    />
                );
            })}

            <svg width={1280} height={720} style={{ position: "absolute", inset: 0, pointerEvents: "none" }}>
                {clients.map((c, i) => (
                    <line key={c.id} x1={phoneX(i) + PHONE.w / 2} y1={PHONE.y + PHONE.h} x2={phoneX(i) + PHONE.w / 2} y2={DB.y} stroke="rgba(255,255,255,0.14)" strokeDasharray="4 6" />
                ))}
                {packets.map((p, i) => (
                    <g key={i} opacity={p.fade}>
                        <circle cx={p.x} cy={p.y} r={16} fill={alpha(p.color, 0.18)} />
                        <circle cx={p.x} cy={p.y} r={7} fill={p.color} />
                    </g>
                ))}
            </svg>

            <DbPanel
                state={state}
                prev={prevState}
                flash={flash}
                flashColor={flashColor}
                dbColor={dbColor}
                pulse={dbPulse}
                seatId={seatId}
                colors={colors}
                frame={frame}
                label={label}
            />
        </AbsoluteFill>
    );
}

// ── code ────────────────────────────────────────────────────────────────────

const KEYWORD = /^(import|type|from|export|async|function|const|await|return|if|else)$/;

function highlight(line: string, inTemplate: boolean): React.ReactNode {
    const t = line.trim();
    if (t.startsWith("//") || t.startsWith("/*") || t.startsWith("*")) return <span style={{ color: "#6b7280" }}>{line}</span>;
    if (inTemplate) return <span style={{ color: "#86efac" }}>{line}</span>;
    return line.split(/("[^"]*"|`[^`]*`?|\/\/.*$|\b\w+\b)/).map((part, i) => {
        if (!part) return null;
        if (part.startsWith('"') || part.startsWith("`")) return <span key={i} style={{ color: "#86efac" }}>{part}</span>;
        if (part.startsWith("//")) return <span key={i} style={{ color: "#6b7280" }}>{part}</span>;
        if (KEYWORD.test(part)) return <span key={i} style={{ color: "#c4b5fd" }}>{part}</span>;
        return <span key={i}>{part}</span>;
    });
}

const LINE_H = 17.2;

function CodePanel({ source, steps, fileName, activeStep, activeColor, positions, colors, clients, label, frame, startFrame, severity }: {
    source: string;
    steps: Record<string, [number, number]>;
    fileName: string;
    activeStep?: string;
    activeColor?: string;
    positions: Record<string, string>;
    colors: Record<string, string>;
    clients: string[];
    label: (id: string) => string;
    frame: number;
    startFrame: number;
    severity?: TrapEvent["severity"];
}) {
    const lines = source.split("\n");
    const templateFlags: boolean[] = [];
    let inTemplate = false;
    for (const l of lines) {
        templateFlags.push(inTemplate);
        if ((l.match(/`/g) ?? []).length % 2 === 1) inTemplate = !inTemplate;
    }
    const activeRange = activeStep ? steps[activeStep] : undefined;
    const glow = clamp01((frame - startFrame) / 10);
    const accent = severity ? SEVERITY_COLORS[severity] : activeColor;

    return (
        <div style={{ position: "absolute", left: CODE.x, top: CODE.y, width: CODE.w, height: CODE.h, borderRadius: 18, border: `1px solid ${LINE}`, background: "rgba(8,8,14,0.9)", overflow: "hidden" }}>
            <div style={{ display: "flex", alignItems: "center", gap: 8, padding: "0 16px", height: 40, borderBottom: `1px solid ${LINE}`, background: "rgba(255,255,255,0.03)" }}>
                {["#ff5f57", "#febc2e", "#28c840"].map((c) => <span key={c} style={{ width: 10, height: 10, borderRadius: 5, background: c, opacity: 0.8 }} />)}
                <span style={{ marginLeft: 8, fontFamily: MONO, fontSize: 13, color: DIM }}>{fileName}</span>
            </div>
            <div style={{ position: "relative", padding: "12px 0", fontFamily: MONO, fontSize: 11.5, lineHeight: `${LINE_H}px` }}>
                {lines.map((text, i) => {
                    const n = i + 1;
                    const active = !!activeRange && n >= activeRange[0] && n <= activeRange[1];
                    // faint tint where any user currently sits
                    const sitting = clients.find((id) => { const r = steps[positions[id]]; return r && n >= r[0] && n <= r[1]; });
                    const bg = active && accent ? alpha(accent, 0.2 * glow) : sitting ? alpha(colors[sitting], 0.07) : "transparent";
                    const bar = active && accent ? accent : sitting ? alpha(colors[sitting], 0.5) : "transparent";
                    return (
                        <div key={i} style={{ position: "relative", display: "flex", height: LINE_H, background: bg, boxShadow: `inset 3px 0 0 ${bar}`, whiteSpace: "pre" }}>
                            <span style={{ width: 40, flexShrink: 0, paddingRight: 12, textAlign: "right", color: "rgba(255,255,255,0.22)" }}>{n}</span>
                            <span style={{ color: "#e5e7eb" }}>{highlight(text, templateFlags[i])}</span>
                        </div>
                    );
                })}
                {/* per-user program counters */}
                {clients.map((id) => {
                    const r = steps[positions[id]];
                    if (!r) return null;
                    // two users on the same step stack instead of overlapping
                    const sameLine = clients.filter((c) => steps[positions[c]]?.[0] === r[0]);
                    const stack = sameLine.indexOf(id);
                    return (
                        <span
                            key={id}
                            style={{
                                position: "absolute",
                                right: 12 + stack * 62,
                                top: 12 + (r[0] - 1) * LINE_H,
                                padding: "0 8px",
                                height: LINE_H - 2,
                                lineHeight: `${LINE_H - 2}px`,
                                borderRadius: 9,
                                fontSize: 11,
                                fontWeight: 700,
                                background: colors[id],
                                color: "#0b0b10",
                            }}
                        >
                            {label(id)}
                        </span>
                    );
                })}
            </div>
        </div>
    );
}

// ── caption ─────────────────────────────────────────────────────────────────

function Caption({ current, group, local, colors, label, clientNames, outcome }: {
    current?: TrapEvent;
    group: TrapEvent[];
    local: number;
    colors: Record<string, string>;
    label: (id: string) => string;
    clientNames: string[];
    outcome?: { ok: boolean; headline: string; t: number };
}) {
    const sev = current?.severity ? SEVERITY_COLORS[current.severity] : undefined;
    const accent = current ? (sev ?? colors[current.actor]) : "rgba(255,255,255,0.3)";
    const inT = ease(clamp01(local / 10));
    const showOutcome = !!outcome && outcome.t > 0;
    const oc = outcome?.ok ? SEVERITY_COLORS.ok : SEVERITY_COLORS.bad;

    return (
        <div style={{ position: "absolute", left: RIGHT_X, top: CAPTION.y, width: 656, height: CAPTION.h, borderRadius: 18, border: `1px solid ${showOutcome ? alpha(oc, 0.6) : LINE}`, background: showOutcome ? alpha(oc, 0.1) : PANEL, boxShadow: `inset 4px 0 0 ${showOutcome ? oc : accent}`, padding: "12px 22px 0 26px", overflow: "hidden" }}>
            {showOutcome ? (
                <div style={{ opacity: outcome!.t, transform: `translateY(${(1 - outcome!.t) * 10}px)`, display: "flex", alignItems: "center", height: "100%", paddingBottom: 14 }}>
                    <span style={{ fontSize: 24, fontWeight: 700, color: oc }}>{outcome!.ok ? "✓" : "✗"} {outcome!.headline}</span>
                </div>
            ) : current ? (
                <div style={{ opacity: inT, transform: `translateY(${(1 - inT) * 8}px)` }}>
                    <div style={{ display: "flex", gap: 14, alignItems: "center", fontSize: 12, letterSpacing: "0.12em", textTransform: "uppercase", color: DIM }}>
                        <span style={{ color: colors[current.actor], fontWeight: 700 }}>{group.length > 1 ? group.map((g) => label(g.actor)).join(" & ") : label(current.actor)}</span>
                        <span style={{ fontFamily: MONO, letterSpacing: 0, textTransform: "none" }}>{Math.round(current.t)}ms</span>
                    </div>
                    <div style={{ marginTop: 7, fontFamily: MONO, fontSize: 19, color: sev ?? INK }}>{current.label}</div>
                    {current.detail && <div style={{ marginTop: 4, fontSize: 13, color: DIM }}>{current.detail}</div>}
                </div>
            ) : (
                <div style={{ paddingTop: 6 }}>
                    <div style={{ fontSize: 20, fontWeight: 600 }}>{clientNames.join(" and ")} hit “Book” at the same moment.</div>
                    <div style={{ marginTop: 5, fontSize: 13, color: DIM }}>One seat left. Follow both phones and the database below.</div>
                </div>
            )}
        </div>
    );
}

// ── user's browser ──────────────────────────────────────────────────────────

const STATUS: Partial<Record<TrapEvent["type"], string>> = {
    request: "Request sent…",
    read: "Checking the seat…",
    check: "Checking the seat…",
    wait: "Charging your card…",
    write: "Saving your booking…",
    note: "Working…",
};

function Phone({ x, name, color, event, local, dur, fps, seatId }: {
    x: number;
    name: string;
    color: string;
    event?: TrapEvent;
    local: number;
    dur: number;
    fps: number;
    seatId: string;
}) {
    const type = event?.type;
    const requested = !!event;
    const press = type === "request" ? spring({ frame: local, fps, config: { damping: 14, stiffness: 260 }, durationInFrames: 14 }) : 1;
    const scale = type === "request" ? 1 - 0.07 * Math.sin(Math.min(1, press) * Math.PI) : 1;
    const ripple = type === "request" ? clamp01(local / 22) : 0;

    const result = type === "response" ? event! : undefined;
    const soldOut = !!result && /sold/i.test(result.label);
    const resColor = soldOut ? SEVERITY_COLORS.warn : result?.severity === "bad" ? SEVERITY_COLORS.bad : SEVERITY_COLORS.ok;
    const resIn = result ? ease(clamp01(local / 14)) : 0;

    const ring = result ? alpha(resColor, 0.7) : requested ? alpha(color, 0.5) : LINE;
    const pay = type === "wait" ? clamp01(local / (dur * 1.25)) : requested && type !== "request" && type !== "read" && type !== "check" ? 1 : 0;

    return (
        <div style={{ position: "absolute", left: x, top: PHONE.y, width: PHONE.w, height: PHONE.h, borderRadius: 18, border: `1px solid ${ring}`, background: PANEL, overflow: "hidden", boxShadow: result ? `0 0 40px ${alpha(resColor, 0.15 * resIn)}` : undefined }}>
            <div style={{ display: "flex", alignItems: "center", gap: 10, padding: "12px 16px", borderBottom: `1px solid ${LINE}` }}>
                <span style={{ width: 26, height: 26, borderRadius: 13, background: color, color: "#0b0b10", fontWeight: 800, fontSize: 13, display: "grid", placeItems: "center" }}>{name[0]}</span>
                <span style={{ fontWeight: 700, fontSize: 15 }}>{name}</span>
                <span style={{ marginLeft: "auto", fontSize: 11, color: DIM }}>on their phone</span>
            </div>
            <div style={{ padding: "12px 18px" }}>
                <div style={{ fontSize: 12, color: DIM, letterSpacing: "0.1em", textTransform: "uppercase" }}>Midnight Jazz · Row A</div>
                <div style={{ marginTop: 3, display: "flex", justifyContent: "space-between", alignItems: "baseline" }}>
                    <span style={{ fontSize: 22, fontWeight: 700 }}>Seat {seatId}</span>
                    <span style={{ fontFamily: MONO, fontSize: 14, color: DIM }}>$120</span>
                </div>

                <div style={{ position: "relative", marginTop: 12, height: 52 }}>
                    {!result ? (
                        <div style={{ position: "relative", height: "100%", transform: `scale(${scale})`, borderRadius: 14, display: "flex", alignItems: "center", justifyContent: "center", fontWeight: 700, fontSize: 16, overflow: "hidden", background: requested ? alpha(color, 0.16) : color, color: requested ? color : "#0b0b10", border: requested ? `1px solid ${alpha(color, 0.5)}` : "1px solid transparent" }}>
                            {ripple > 0 && ripple < 1 && <span style={{ position: "absolute", left: "50%", top: "50%", width: 260 * ripple, height: 260 * ripple, marginLeft: -130 * ripple, marginTop: -130 * ripple, borderRadius: "50%", background: alpha(color, 0.45 * (1 - ripple)) }} />}
                            <span style={{ position: "relative" }}>{requested ? (STATUS[type!] ?? "Working…") : `Book seat ${seatId}`}</span>
                        </div>
                    ) : (
                        <div style={{ height: "100%", opacity: resIn, transform: `scale(${0.96 + 0.04 * resIn})`, borderRadius: 14, display: "flex", alignItems: "center", justifyContent: "center", gap: 10, fontWeight: 800, fontSize: 17, background: alpha(resColor, 0.14), color: resColor, border: `1px solid ${alpha(resColor, 0.55)}` }}>
                            {soldOut ? "Sold out" : "✓ Booking confirmed"}
                        </div>
                    )}
                </div>

                <div style={{ marginTop: 12, height: 6, borderRadius: 3, background: "rgba(255,255,255,0.08)", overflow: "hidden", opacity: requested && !result ? 1 : 0.35 }}>
                    <div style={{ width: `${pay * 100}%`, height: "100%", background: color }} />
                </div>
                <div style={{ marginTop: 9, minHeight: 32, fontFamily: MONO, fontSize: 11.5, lineHeight: 1.35, color: result?.severity === "bad" ? SEVERITY_COLORS.bad : DIM }}>
                    {result?.severity === "bad" ? "Seat was already taken. Double-booked!" : event ? event.label : "waiting for you to click"}
                </div>
            </div>
        </div>
    );
}

// ── database ────────────────────────────────────────────────────────────────

function DbPanel({ state, prev, flash, flashColor, dbColor, pulse, seatId, colors, frame, label }: {
    state: StoreState;
    prev: StoreState;
    flash: number;
    flashColor: string;
    dbColor: string;
    pulse: number;
    seatId: string;
    colors: Record<string, string>;
    frame: number;
    label: (id: string) => string;
}) {
    const seat = state.seats?.find((s) => s.id === seatId);
    const bookings = (state.bookings ?? []).filter((b) => b.seat_id === seatId);
    const sold = bookings.length;
    const conflict = sold > 1;
    const booked = seat?.status === "booked";
    const pulseAmt = conflict ? 0.5 + 0.5 * Math.sin(frame / 4) : 0;

    const seatFill = conflict ? SEVERITY_COLORS.bad : booked ? dbColor : SEVERITY_COLORS.ok;
    const decor = ["A2", "A3", "A4", "A5", "A6", "A7"];

    return (
        <div style={{ position: "absolute", left: RIGHT_X, top: DB.y, width: DB.w, height: DB.h, borderRadius: 18, border: `1px solid ${conflict ? alpha(SEVERITY_COLORS.bad, 0.5 + 0.3 * pulseAmt) : alpha(dbColor, 0.25 + 0.5 * pulse)}`, background: PANEL, boxShadow: `0 0 ${50 * pulse}px ${alpha(dbColor, 0.25 * pulse)}`, padding: "14px 18px", overflow: "hidden" }}>
            <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
                <span style={{ width: 10, height: 10, borderRadius: 5, background: dbColor }} />
                <span style={{ fontWeight: 700, fontSize: 15 }}>Postgres</span>
                <span style={{ fontSize: 12, color: DIM }}>what the database holds right now</span>
            </div>

            <div style={{ marginTop: 14, display: "flex", alignItems: "flex-end", gap: 10 }}>
                <div style={{ textAlign: "center" }}>
                    <div style={{ width: 74, height: 54, borderRadius: 12, display: "grid", placeItems: "center", background: alpha(seatFill, 0.2), border: `2px solid ${seatFill}`, boxShadow: conflict ? `0 0 ${24 * pulseAmt}px ${alpha(SEVERITY_COLORS.bad, 0.7)}` : undefined, fontWeight: 800, fontSize: 15, color: seatFill }}>
                        {conflict ? `${seatId} ×${sold}` : seatId}
                    </div>
                    <div style={{ marginTop: 5, fontSize: 11, color: conflict ? SEVERITY_COLORS.bad : DIM, fontWeight: conflict ? 700 : 400 }}>
                        {conflict ? "sold twice!" : booked ? `booked · ${seat?.booked_by ? label(String(seat.booked_by)) : ""}` : "available"}
                    </div>
                </div>
                {decor.map((d) => (
                    <div key={d} style={{ width: 42, height: 38, borderRadius: 9, background: "rgba(255,255,255,0.05)", border: `1px solid ${LINE}`, display: "grid", placeItems: "center", fontSize: 11, color: "rgba(255,255,255,0.25)", marginBottom: 19 }}>{d}</div>
                ))}
            </div>

            <div style={{ marginTop: 12, display: "flex", gap: 14 }}>
                {Object.entries(state).map(([name, rows]) => (
                    <MiniTable key={name} name={name} rows={rows} prevRows={prev[name] ?? []} flash={flash} flashColor={flashColor} colors={colors} width={name === "seats" ? 260 : 340} />
                ))}
            </div>
        </div>
    );
}

function MiniTable({ name, rows, prevRows, flash, flashColor, colors, width }: {
    name: string;
    rows: StoreState[string];
    prevRows: StoreState[string];
    flash: number;
    flashColor: string;
    colors: Record<string, string>;
    width: number;
}) {
    const cols = Array.from(new Set(rows.flatMap((r) => Object.keys(r))));
    const shown = cols.length ? cols : name === "bookings" ? ["id", "seat_id", "user_id"] : [];
    const dup = name === "bookings" && rows.length > 1;
    return (
        <div style={{ width, fontFamily: MONO, fontSize: 12 }}>
            <div style={{ marginBottom: 5, color: DIM, fontSize: 11 }}>{name}</div>
            <div style={{ borderRadius: 9, border: `1px solid ${dup ? alpha(SEVERITY_COLORS.bad, 0.5) : LINE}`, overflow: "hidden" }}>
                <div style={{ display: "flex", background: "rgba(255,255,255,0.05)", color: DIM }}>
                    {shown.map((c) => <span key={c} style={{ flex: 1, padding: "4px 8px" }}>{c}</span>)}
                </div>
                {rows.length === 0 && <div style={{ padding: "5px 8px", color: "rgba(255,255,255,0.28)" }}>(empty)</div>}
                {rows.map((r, i) => (
                    <div key={i} style={{ display: "flex", borderTop: `1px solid ${LINE}` }}>
                        {shown.map((c) => {
                            const changed = prevRows[i]?.[c] !== r[c];
                            const v = r[c];
                            const who = typeof v === "string" && colors[v] ? colors[v] : undefined;
                            return (
                                <span key={c} style={{ flex: 1, padding: "4px 8px", background: changed ? alpha(flashColor, 0.3 * flash) : "transparent", color: who ?? "#e5e7eb", fontWeight: changed && flash > 0.3 ? 700 : 400 }}>
                                    {v === null ? "null" : String(v)}
                                </span>
                            );
                        })}
                    </div>
                ))}
            </div>
        </div>
    );
}
