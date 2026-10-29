import { getAllTraps } from "@/lib/traps";
import { getAllTracks } from "@/lib/systems";

export interface NavLink {
    href: string;
    title: string;
    description?: string;
}

/** Live pages outside any track: recorded replays plus the game. Only things a visitor can open. */
export function getStandaloneLinks(): NavLink[] {
    const inTracks = new Set(getAllTracks().flatMap((track) => track.steps.map((step) => step.href)));
    return [
        ...getAllTraps()
            .filter((trap) => !inTracks.has(`/labs/traps/${trap.slug}`))
            .map((trap) => ({ href: `/labs/traps/${trap.slug}`, title: trap.title, description: trap.question })),
        { href: "/labs/traps/play", title: "Break the Backend (game)", description: "You are the scheduler. Break five real backends by choosing who runs next, then patch them." },
    ];
}
