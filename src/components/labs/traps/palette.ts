import type { TrapActor, TrapSeverity } from "@/types/traps";

const CLIENT_COLORS = ["#fbbf24", "#22d3ee", "#f472b6", "#a3e635"];

const KIND_COLORS: Record<string, string> = {
    db: "#818cf8",
    cache: "#f87171",
    queue: "#c084fc",
    server: "#34d399",
    external: "#a1a1aa",
};

export const SEVERITY_COLORS: Record<TrapSeverity, string> = {
    ok: "#34d399",
    warn: "#fbbf24",
    bad: "#fb7185",
};

/** Stable color per actor: clients get distinct hues in order, infra by kind. */
export function actorColors(actors: TrapActor[]): Record<string, string> {
    let clientIndex = 0;
    return Object.fromEntries(
        actors.map((a) => [
            a.id,
            a.kind === "client"
                ? CLIENT_COLORS[clientIndex++ % CLIENT_COLORS.length]
                : (KIND_COLORS[a.kind] ?? "#a1a1aa"),
        ]),
    );
}

/** hex + alpha (0-1) → #rrggbbaa */
export function alpha(hex: string, a: number) {
    return `${hex}${Math.round(a * 255).toString(16).padStart(2, "0")}`;
}
