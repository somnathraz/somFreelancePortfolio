import type { TrapEvent } from "@/types/traps";

export const FPS = 30;
export const WIDTH = 1280;
export const HEIGHT = 720;
const LEAD = 24;
const TAIL = 120;

/** Frames each kind of event holds the screen. Recorded ms are far too short to watch, so this is narrative time. */
const BEAT: Record<TrapEvent["type"], number> = { request: 38, read: 48, check: 48, write: 54, wait: 84, response: 58, note: 40 };

export interface Timeline {
    starts: number[];
    durs: number[];
    total: number;
}

/** Events that happened at the same recorded instant (both users click together) share a start frame. */
export function buildTimeline(events: TrapEvent[]): Timeline {
    const starts: number[] = [];
    const durs: number[] = [];
    let at = LEAD;
    events.forEach((e, i) => {
        const prev = events[i - 1];
        const together = prev && e.type === "request" && prev.type === "request" && e.t === prev.t;
        if (together) {
            starts.push(starts[i - 1]);
            durs.push(durs[i - 1]);
        } else {
            starts.push(at);
            durs.push(BEAT[e.type]);
            at += BEAT[e.type];
        }
    });
    return { starts, durs, total: at + TAIL };
}

/** Index of the latest event that has started by `frame`, or -1. */
export function eventAt(starts: number[], frame: number): number {
    let k = -1;
    for (let i = 0; i < starts.length; i++) if (starts[i] <= frame) k = i;
    return k;
}
