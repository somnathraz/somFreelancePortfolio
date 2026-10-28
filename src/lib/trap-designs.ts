/**
 * Design-day pages: system-design episodes that have no bug or recorded trace
 * (for example Monday of a themed week). Content mirrors the episode's README in
 * github.com/somnathraz/interview-traps under systems/<system>/<day>/.
 */
export interface DesignOption {
    label: string;
    code: string[];
    good: string;
    cost: string;
}

export interface DesignPageContent {
    slug: string;
    title: string;
    question: string;
    system: string;
    day: number;
    days: number;
    options: DesignOption[];
    secondSignal: { title: string; body: string };
    rule: string;
    week: { day: number; title: string; summary: string }[];
    sourcePath: string;
    /** ISO date, used for the sitemap. */
    updated: string;
}

const DESIGNS: DesignPageContent[] = [
    {
        slug: "url-shortener-core-design",
        title: "Hash or counter: the URL shortener decision",
        question: "You are asked to design a URL shortener. Before any code: how does the short code get generated?",
        system: "URL Shortener",
        day: 1,
        days: 7,
        options: [
            {
                label: "Option A: hash truncation",
                code: ["short_code = md5(long_url)[:7]"],
                good: "Simple, stateless, and the same URL always maps to the same code.",
                cost: "A truncated hash can collide, and the chance grows as you store more URLs. Every create needs an existence check and a retry.",
            },
            {
                label: "Option B: counter + base62",
                code: ["id = next_id()", "short_code = to_base62(id)"],
                good: "Unique by construction. Each ID is issued once, so there is no collision to handle.",
                cost: "The counter becomes a central point: a contention and failure hotspot once writes get heavy. The next trap breaks exactly this.",
            },
        ],
        secondSignal: {
            title: "The other senior signal: it is read-heavy",
            body: "Redirects far outnumber creates, often by around 100 to 1. Design for reads first (caching, a CDN in front), then worry about the write path.",
        },
        rule: "The signal is not the code. It is naming the trade-off out loud: hashing avoids a central bottleneck but needs collision handling; a counter avoids collisions but you now have to scale the ID generator.",
        week: [
            { day: 1, title: "Core design", summary: "Hash vs counter + base62. The decision, not a bug." },
            { day: 2, title: "ID collision", summary: "The counter from today, hit by two concurrent requests." },
            { day: 3, title: "Stale redirect", summary: "The read-heavy cache serving an out-of-date destination." },
            { day: 4, title: "Analytics on the hot path", summary: "Recording a click slowing down the redirect." },
            { day: 5, title: "Vanity alias race", summary: "Two users claiming the same custom alias at once." },
            { day: 6, title: "Cleanup at scale", summary: "A plain DELETE of expired links locking the table." },
            { day: 7, title: "Rollup", summary: "One write-up covering the whole series." },
        ],
        sourcePath: "systems/url-shortener/00-core-design",
        updated: "2026-10-28",
    },
];

export function getAllDesigns(): DesignPageContent[] {
    return DESIGNS;
}

export function getDesignBySlug(slug: string): DesignPageContent | undefined {
    return DESIGNS.find((design) => design.slug === slug);
}
