"use client";

import type { StoreState, TrapActor, TrapEvent } from "@/types/traps";
import { SEVERITY_COLORS, alpha } from "./palette";

type Cell = string | number | boolean | null;

function fmt(v: Cell) {
    if (v === null || v === undefined) return "NULL";
    return typeof v === "string" ? v : String(v);
}

/**
 * The store's real state after the current event (snapshotted from the DB
 * during the recorded run), plus what each user has been told so far.
 */
export function TrapState({
    state,
    prevState,
    changedBy,
    colors,
    actors,
    responses,
}: {
    state: StoreState;
    prevState: StoreState;
    /** actor whose event produced this state (for highlight color) */
    changedBy?: string;
    colors: Record<string, string>;
    actors: TrapActor[];
    responses: Record<string, TrapEvent | undefined>;
}) {
    const hl = changedBy ? colors[changedBy] : "#ffffff";
    const clients = actors.filter((a) => a.kind === "client");

    return (
        <div className="flex flex-col gap-4 rounded-2xl border border-white/10 bg-white/[0.02] p-4">
            <div>
                <p className="mb-2 text-[11px] font-medium uppercase tracking-[0.14em] text-white/40">What users were told</p>
                <div className="flex flex-wrap gap-2">
                    {clients.map((c) => {
                        const r = responses[c.id];
                        const sev = r?.severity ? SEVERITY_COLORS[r.severity] : undefined;
                        return (
                            <span
                                key={c.id}
                                className="inline-flex items-center gap-2 rounded-full border px-3 py-1 text-xs"
                                style={{ borderColor: sev ? alpha(sev, 0.5) : "rgba(255,255,255,0.12)", background: sev ? alpha(sev, 0.1) : "transparent" }}
                            >
                                <span className="h-2 w-2 rounded-full" style={{ background: colors[c.id] }} />
                                <span className="text-white/70">{c.label}</span>
                                <span className="font-mono font-semibold" style={{ color: sev ?? "rgba(255,255,255,0.35)" }}>
                                    {r ? r.label : "waiting…"}
                                </span>
                            </span>
                        );
                    })}
                </div>
            </div>

            {Object.entries(state).map(([table, rows]) => {
                const before = prevState[table] ?? [];
                const columns = Array.from(new Set([...rows, ...before].flatMap((r) => Object.keys(r))));
                return (
                    <div key={table}>
                        <p className="mb-2 font-mono text-xs text-white/50">
                            <span className="text-indigo-300">{table}</span>
                            <span className="text-white/30"> · {rows.length} row{rows.length === 1 ? "" : "s"}</span>
                        </p>
                        <div className="overflow-x-auto rounded-lg border border-white/10">
                            <table className="w-full font-mono text-xs">
                                <thead>
                                    <tr className="bg-white/[0.04] text-left text-white/45">
                                        {columns.map((c) => <th key={c} className="px-3 py-1.5 font-medium">{c}</th>)}
                                    </tr>
                                </thead>
                                <tbody>
                                    {rows.length === 0 && (
                                        <tr><td colSpan={columns.length || 1} className="px-3 py-2 text-white/25">(empty)</td></tr>
                                    )}
                                    {rows.map((row, i) => {
                                        const old = before[i];
                                        const isNew = !old;
                                        return (
                                            <tr key={i} className="border-t border-white/5 transition-colors duration-500" style={isNew && changedBy ? { background: alpha(hl, 0.16) } : undefined}>
                                                {columns.map((c) => {
                                                    const changed = !isNew && old && fmt(old[c]) !== fmt(row[c]);
                                                    return (
                                                        <td
                                                            key={c}
                                                            className="px-3 py-1.5 transition-colors duration-500"
                                                            style={changed ? { background: alpha(hl, 0.22), color: hl } : { color: row[c] === null ? "rgba(255,255,255,0.25)" : "rgba(255,255,255,0.85)" }}
                                                        >
                                                            {fmt(row[c])}
                                                            {changed && <span className="ml-1.5 text-white/35 line-through">{fmt(old[c])}</span>}
                                                        </td>
                                                    );
                                                })}
                                            </tr>
                                        );
                                    })}
                                </tbody>
                            </table>
                        </div>
                    </div>
                );
            })}
        </div>
    );
}
