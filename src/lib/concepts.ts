/**
 * Plain-English definitions shared by every lesson's "Words you need". Write a concept once;
 * any lesson lists it by id. One or two sentences, no jargon inside the definition.
 */
export interface Concept {
    term: string;
    definition: string;
}

const CONCEPTS = {
    "short-code": { term: "Short code", definition: "The few characters after the domain in a short link, like g8 in sho.rt/g8." },
    hash: { term: "Hash", definition: "A function that turns any input into a fixed-length jumble of characters. The same input always gives the same output." },
    collision: { term: "Collision", definition: "Two different inputs ending up with the same code." },
    "birthday-paradox": { term: "Birthday paradox", definition: "Shared codes show up far sooner than you would guess. With N possible codes, a collision is likely after only about √N items." },
    base62: { term: "Base62", definition: "Writing a number with 62 symbols (0–9, a–z, A–Z), so big numbers become short codes. Seven characters cover about 3.5 trillion numbers." },
    sequence: { term: "Sequence (counter)", definition: "A database counter that hands out the next number, exactly once, every time it is asked." },
    bottleneck: { term: "Bottleneck", definition: "The one part that everything else has to wait for." },
    "read-heavy": { term: "Read-heavy", definition: "Read far more often than written. A URL shortener serves about 100 redirects for every new link." },
    "race-condition": { term: "Race condition", definition: "A bug that only appears when two requests overlap in an unlucky order. Each request is correct on its own." },
    "read-modify-write": { term: "Read, then write", definition: "Read a value, change it in your code, write it back. Another request can read the same old value in between." },
    atomic: { term: "Atomic", definition: "Done as one step that nothing can interrupt. Another request sees it either not started or fully finished." },
    "unique-index": { term: "Unique index", definition: "A database rule that rejects a second row with the same value. A safety net: it turns a silent duplicate into an error." },
    cache: { term: "Cache", definition: "A fast copy of data kept close by, here in Redis, so most reads skip the database." },
    "cache-aside": { term: "Cache-aside", definition: "Read from the cache; on a miss, read the database and put the result in the cache. The most common way to cache." },
    invalidation: { term: "Invalidation", definition: "Removing or replacing a cached copy after the real data changed, so nobody reads the old one." },
    ttl: { term: "TTL (time to live)", definition: "How long a cached copy lives before it expires on its own. It caps how long a wrong copy can survive." },
    lease: { term: "Lease", definition: "A marker a request leaves in the cache on a miss. Its later fill only counts if the marker is still there." },
    "hot-path": { term: "Hot path", definition: "The code that runs on every request and that the user is waiting on. Here, the redirect itself. Anything extra you put there is paid on every click." },
    "row-lock": { term: "Row lock", definition: "While one transaction updates a row, the database makes every other update to that row wait its turn." },
    batching: { term: "Batching", definition: "Collecting many small changes and writing them once. 10,000 clicks become one UPDATE." },
    upsert: { term: "Upsert", definition: "INSERT … ON CONFLICT DO UPDATE: insert the row, or overwrite it if one already exists. Handy for retries, dangerous when the conflict was the thing you needed to know about." },
    idempotent: { term: "Idempotent", definition: "Safe to repeat. A retried request ends in the same state as the first attempt, instead of an error or a second effect." },
    "rate-limit": { term: "Rate limit", definition: "A cap on how many requests one user can make in a period. Past it, the API answers 429 Too Many Requests." },
    "fixed-window": { term: "Fixed window", definition: "Count requests in each clock minute and reset at the edge. Simple, but a burst that straddles the edge can pass twice the limit." },
    "sliding-window": { term: "Sliding window", definition: "Count the requests in the last 60 seconds, measured back from now, so there is no edge to exploit. Exact versions store every timestamp; cheaper ones blend two windows." },
    "token-bucket": { term: "Token bucket", definition: "A bucket holds up to N tokens and refills at a steady rate. Each request takes one, and an empty bucket means reject. It allows short bursts and holds the average." },
    "fail-open": { term: "Fail open", definition: "When the limiter itself breaks, let traffic through instead of blocking it, so a limiter outage does not become an API outage." },
    transaction: { term: "Transaction", definition: "A group of changes the database treats as one: all of them are saved, or none of them." },
    "statement-timeout": { term: "Statement timeout", definition: "A limit on how long one query may run. Past it, the database cancels the query and undoes what it did." },
    "load-balancer": { term: "Load balancer", definition: "The component in front of several identical servers that hands each incoming request to one of them, so no single server takes all the traffic." },
    partition: { term: "Partition", definition: "A big table split into pieces, for example one per month. Dropping an old piece is instant, with no row-by-row delete." },
} satisfies Record<string, Concept>;

export type ConceptId = keyof typeof CONCEPTS;

export const getConcept = (id: ConceptId): Concept => CONCEPTS[id];
