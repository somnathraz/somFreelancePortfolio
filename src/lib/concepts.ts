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
} satisfies Record<string, Concept>;

export type ConceptId = keyof typeof CONCEPTS;

export const getConcept = (id: ConceptId): Concept => CONCEPTS[id];
