import type { TrapBundle } from "@/types/traps";
import { getAllDesigns } from "@/lib/trap-designs";
import { getAllTrapLessons } from "@/lib/trap-lessons";

export interface CatalogueEntry {
    slug: string;
    title: string;
    question: string;
    published: boolean;
    /** "design" pages are read-only system-design episodes with no replay. */
    kind?: "replay" | "design";
}

export interface CatalogueTopic {
    id: string;
    title: string;
    description: string;
    /** Parent heading when this topic sits under a broader section, for example "System design". */
    group?: string;
    entries: CatalogueEntry[];
}

type PlannedTopic = Omit<CatalogueTopic, "entries"> & {
    entries: [slug: string, title: string, question: string][];
};

// Editorial roadmap only. A trace bundle, not this list, makes a trap available.
const TOPICS: PlannedTopic[] = [
    { id: "url-shortener", title: "URL Shortener", group: "System design", description: "The design decision, then the real bugs hiding inside it.", entries: [
        ["url-shortener-core-design", "Hash or counter", "How does a URL shortener generate its short code, and what does each choice cost?"],
        ["url-shortener-id-collision", "The ID collision", "What if two requests ask the counter for an ID at the same instant?"],
        ["url-shortener-stale-redirect", "The stale redirect", "A link is cached, then its destination is updated. Which URL does the next visitor get?"],
        ["url-shortener-analytics-hot-path", "Analytics on the hot path", "Can recording a click slow down the redirect itself?"],
        ["url-shortener-vanity-alias-race", "The vanity alias race", "Two users claim the same custom alias at once. Who gets it?"],
        ["url-shortener-expired-cleanup", "Cleanup at scale", "One nightly DELETE of expired links deletes nothing. Why?"],
    ] },
    { id: "rate-limiter", title: "Rate Limiter", group: "System design", description: "How Stripe limits requests, then the bugs hiding inside the version most people draw.", entries: [
        ["rate-limiter-core-design", "Token bucket or counter", "How does an API decide, request by request, whether to let one through?"],
        ["rate-limiter-counter-race", "The counter race", "Your limit is 10 and a script sends 50 at once. How many get through?"],
        ["rate-limiter-window-burst", "The window boundary burst", "Can a user get twice the limit by timing requests around the window edge?"],
        ["rate-limiter-per-server", "One limiter per server", "Behind a load balancer, what does an in-memory limiter actually allow?"],
        ["rate-limiter-immortal-key", "The key that never expires", "What if the process dies between INCR and EXPIRE?"],
        ["rate-limiter-redis-down", "Redis goes down, the API goes down", "Should a limiter block or allow when its own store is unreachable?"],
    ] },
    { id: "concurrency", title: "Concurrency", description: "When requests collide and shared state stops being safe.", entries: [
        ["booking-race-condition", "The double-booking race", "Can two requests book the same last seat?"],
        ["lost-update", "The lost update", "Why does a counter lose increments under load?"],
        ["check-then-act", "Check, then act", "What changes between checking a condition and writing?"],
        ["deadlock", "The deadlock", "What happens when two transactions wait on each other?"],
    ] },
    { id: "databases", title: "Databases", description: "Queries that look correct until the data or traffic grows.", entries: [
        ["offset-pagination", "Shifting pagination", "Why do records repeat or disappear between pages?"],
        ["n-plus-one", "The N+1 query", "How does one endpoint turn into hundreds of queries?"],
        ["write-skew", "Write skew", "Can two valid transactions break a shared rule?"],
        ["connection-pool-exhaustion", "An exhausted connection pool", "Why do more workers make the database slower?"],
    ] },
    { id: "caching", title: "Caching", description: "The hidden costs of making reads faster.", entries: [
        ["cache-stampede", "The cache stampede", "What happens when a popular cache key expires?"],
        ["stale-cache-write", "The stale cache write", "Can an old read overwrite a freshly invalidated cache?"],
        ["cache-penetration", "Caching what does not exist", "Why do missing records keep hitting the database?"],
        ["hot-key", "The hot key", "Can one popular key overwhelm a distributed cache?"],
    ] },
    { id: "apis", title: "APIs & idempotency", description: "Retries, timeouts, and requests that arrive more than once.", entries: [
        ["duplicate-payment", "The duplicate payment", "What happens when a client retries a successful charge?"],
        ["idempotency-race", "The idempotency race", "Can two requests claim the same idempotency key?"],
        ["retry-storm", "The retry storm", "When do retries turn a small outage into a bigger one?"],
        ["rate-limit-race", "The rate-limit race", "Can concurrent requests slip past a request limit?"],
    ] },
    { id: "queues", title: "Queues & workers", description: "Background work still needs guarantees.", entries: [
        ["duplicate-delivery", "Delivered twice", "What if a worker finishes the job but never acknowledges it?"],
        ["out-of-order-events", "Out-of-order events", "What happens when an older event arrives last?"],
        ["poison-message", "The poison message", "Can one failing job block everyone behind it?"],
        ["dual-write", "The dual-write gap", "What if the database commits but publishing the event fails?"],
    ] },
    { id: "distributed-systems", title: "Distributed systems", description: "Failures that appear when there is more than one machine.", entries: [
        ["replica-lag", "Reading your own stale data", "Why can a successful update disappear on the next read?"],
        ["expired-lock", "The expired distributed lock", "What if a worker keeps running after its lock expires?"],
        ["clock-skew", "Clocks that disagree", "Can timestamps tell you which write really happened last?"],
        ["partial-failure", "The partial failure", "Does a timeout mean the operation failed?"],
    ] },
];

export function buildTrapCatalogue(traps: Pick<TrapBundle, "slug" | "title" | "question">[]): CatalogueTopic[] {
    const published = new Map(traps.map((trap) => [trap.slug, trap]));
    const designs = new Map(getAllDesigns().map((design) => [design.slug, design]));
    const lessons = new Set(getAllTrapLessons().map((lesson) => lesson.slug));
    const topics = TOPICS.map((topic) => ({
        ...topic,
        entries: topic.entries.map(([slug, title, question]) => ({
            slug,
            title: published.get(slug)?.title ?? title,
            question: published.get(slug)?.question ?? question,
            published: published.has(slug) || designs.has(slug) || lessons.has(slug),
            kind: designs.has(slug) || lessons.has(slug) ? "design" as const : "replay" as const,
        })),
    }));
    const known = new Set(topics.flatMap((topic) => topic.entries.map((entry) => entry.slug)));
    const extra = traps.filter((trap) => !known.has(trap.slug));
    // Newly synced traces must remain discoverable even before editorial categorization.
    if (extra.length) topics.push({ id: "more-traps", title: "More traps", description: "New replays from the lab.", entries: extra.map((trap) => ({ ...trap, published: true, kind: "replay" as const })) });
    return topics;
}
