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
} satisfies Record<string, Concept>;

export type ConceptId = keyof typeof CONCEPTS;

export const getConcept = (id: ConceptId): Concept => CONCEPTS[id];
