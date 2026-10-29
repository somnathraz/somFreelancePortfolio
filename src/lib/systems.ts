/**
 * System-design tracks: the guided path through one system. Learn the design, break it with
 * its traps, then build it. A step without `href` is still being written and shows as "soon".
 * Trap pages and game levels keep their own URLs; a track only orders and links them.
 */

export type StepKind = "learn" | "trap" | "build";
export type Difficulty = "Easy" | "Medium" | "Hard" | "Expert" | "Boss";

export interface TrackStep {
    id: string;
    kind: StepKind;
    title: string;
    summary: string;
    href?: string;
    /** How the step is consumed today. "play" = an interactive Break the Backend level. */
    format?: "read" | "play";
}

export interface SystemTrack {
    id: string;
    /** Position in the learning order. Each world is one system, harder than the last. */
    world: number;
    difficulty: Difficulty;
    title: string;
    /** Short name for navigation. */
    name: string;
    tagline: string;
    requirements: { functional: string[]; scale: { label: string; value: string; note: string }[] };
    steps: TrackStep[];
    repoPath: string;
}

const TRACKS: SystemTrack[] = [
    {
        id: "url-shortener",
        world: 1,
        difficulty: "Easy",
        title: "Design a URL shortener",
        name: "URL Shortener",
        tagline: "Learn the design, watch it break five ways, then build one that survives launch day.",
        requirements: {
            functional: [
                "Turn a long URL into a short code, and redirect anyone who opens it",
                "Let people pick a custom alias like /launch",
                "Let the owner change where a link points",
                "Expire links after a set time",
                "Count clicks for the owner",
            ],
            scale: [
                { label: "New links", value: "100M / month", note: "about 40 writes a second" },
                { label: "Redirects", value: "~4,000 / s", note: "100 reads for every write, 10× at peak" },
                { label: "Stored links", value: "~6B rows", note: "kept for five years" },
                { label: "Redirect budget", value: "< 50 ms", note: "it sits in front of every click" },
            ],
        },
        steps: [
            { id: "requirements", kind: "learn", title: "What we are building", summary: "The features and the numbers every later decision depends on.", href: "/labs/systems/url-shortener#requirements", format: "read" },
            { id: "core-design", kind: "learn", title: "Hash or counter", summary: "How the short code gets made, and what each choice costs.", href: "/labs/traps/url-shortener-core-design", format: "read" },
            { id: "id-collision", kind: "trap", title: "The ID collision", summary: "Two requests read the counter at the same instant and get the same code.", href: "/labs/traps/play/id-collision", format: "play" },
            { id: "stale-redirect", kind: "trap", title: "The stale redirect", summary: "The cache keeps sending visitors to a destination the owner already changed." },
            { id: "analytics-hot-path", kind: "trap", title: "Analytics on the hot path", summary: "Recording a click makes the redirect itself slow." },
            { id: "vanity-alias-race", kind: "trap", title: "The vanity alias race", summary: "Two users claim /launch at once, and both are told it is theirs.", href: "/labs/traps/play/vanity-alias", format: "play" },
            { id: "expired-cleanup", kind: "trap", title: "Cleanup at scale", summary: "One DELETE of expired links locks the table everyone redirects from." },
            { id: "build", kind: "build", title: "Build it", summary: "Pick the code pattern for every step, then let every request ordering run and see which traps your design falls into." },
        ],
        repoPath: "systems/url-shortener",
    },
];

/** Worlds after the open ones, in learning order. Shown as one compact row, never as cards. See doc/SYSTEM_DESIGN_SERIES.md. */
export const UPCOMING_WORLDS: { world: number | "Final"; name: string; difficulty: Difficulty }[] = [
    { world: 2, name: "Ticket booking", difficulty: "Medium" },
    { world: 3, name: "Payments", difficulty: "Medium" },
    { world: 4, name: "Rate limiter", difficulty: "Hard" },
    { world: 5, name: "Notifications & queues", difficulty: "Hard" },
    { world: 6, name: "Chat", difficulty: "Hard" },
    { world: 7, name: "News feed", difficulty: "Expert" },
    { world: 8, name: "Ride & food delivery", difficulty: "Expert" },
    { world: "Final", name: "URL shortener at scale", difficulty: "Boss" },
];

export const DIFFICULTY_COLORS: Record<Difficulty, string> = {
    Easy: "#34d399",
    Medium: "#fbbf24",
    Hard: "#fb923c",
    Expert: "#fb7185",
    Boss: "#c084fc",
};

export const getAllTracks = () => TRACKS;
export const getTrack = (id: string) => TRACKS.find((track) => track.id === id);

/** The track and step that link to `href`, for "you are here" and "next step" on existing pages. */
export function findTrackStep(href: string): { track: SystemTrack; index: number } | undefined {
    for (const track of TRACKS) {
        const index = track.steps.findIndex((step) => step.href === href);
        if (index >= 0) return { track, index };
    }
    return undefined;
}

/** The next step after `index` that is available today. */
export const nextLiveStep = (track: SystemTrack, index: number) => track.steps.slice(index + 1).find((step) => step.href);

export const liveStepCount = (track: SystemTrack) => track.steps.filter((step) => step.href).length;
