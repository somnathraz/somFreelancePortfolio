import type { ConceptId } from "@/lib/concepts";

/**
 * Design lessons: system-design steps that are a decision, not a bug, so they have no recorded
 * trace. Each one fills the lesson template (see src/components/labs/lesson/Lesson.tsx).
 * Design notes for each live in github.com/somnathraz/interview-traps under systems/<system>/<day>/.
 */
export interface DesignOption {
    label: string;
    /** One line. Full code belongs in `code` at the end of the lesson. */
    code: string;
    good: string;
    cost: string;
}

export interface DesignFlow {
    title: string;
    steps: string[];
    outcome: string;
    tone: "bug" | "fix" | "warn" | "info";
}

export interface DesignPageContent {
    slug: string;
    title: string;
    question: string;
    system: string;
    /** The interview answer in one breath. Also used for the meta description. */
    rule: string;
    summary: { problem: string; options: { label: string; text: string }[]; choice: string };
    why: string[];
    words: ConceptId[];
    picture: { intro: string; flows: DesignFlow[] };
    options: DesignOption[];
    choice: { paragraphs: string[]; cost: string; alsoSay?: { title: string; body: string } };
    checks: { q: string; a: string }[];
    code: { label: string; filename: string; code: string; note?: string }[];
    remember: string;
    sourcePath: string;
    /** ISO date, used for the sitemap. */
    updated: string;
}

const HASH_CODE = `import { createHash } from "node:crypto";
import type { Pool } from "pg";

// Option A: hash the URL and keep the first 7 characters.
export function hashCode(input: string): string {
  return createHash("md5").update(input).digest("hex").slice(0, 7);
}

// Two URLs can share a code, so every create checks and retries.
export async function createLink(db: Pool, longUrl: string): Promise<string> {
  for (let attempt = 0; attempt < 5; attempt++) {
    const code = hashCode(attempt === 0 ? longUrl : \`\${longUrl}#\${attempt}\`);
    const saved = await db.query(
      \`INSERT INTO links (code, target) VALUES ($1, $2)
       ON CONFLICT (code) DO NOTHING\`,
      [code, longUrl],
    );
    if (saved.rowCount === 1) return code; // the code was free
    // The same URL shortened twice also ends up here.
  }
  throw new Error("No free code after 5 tries");
}
`;

const COUNTER_CODE = `import type { Pool } from "pg";

const ALPHABET = "0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ";

// 1000 -> "g8", 1001 -> "g9": a different number always gives a different code.
export function toBase62(n: bigint): string {
  let out = "";
  do {
    out = ALPHABET[Number(n % 62n)] + out;
    n /= 62n;
  } while (n > 0n);
  return out;
}

// Option B: the database hands out each number exactly once.
export async function createLink(db: Pool, longUrl: string): Promise<string> {
  const { rows } = await db.query("SELECT nextval('link_ids') AS id");
  const code = toBase62(BigInt(rows[0].id));
  await db.query(
    "INSERT INTO links (id, code, target) VALUES ($1, $2, $3)",
    [rows[0].id, code, longUrl],
  );
  return code;
}
`;

const DESIGNS: DesignPageContent[] = [
    {
        slug: "url-shortener-core-design",
        title: "Hash or counter",
        question: "Every long URL needs a short code. Where does that code come from?",
        system: "URL Shortener",
        rule: "Hashing avoids a central counter but needs collision handling. A counter avoids collisions but must be scaled. Start with a counter, then hand out ID ranges.",
        summary: {
            problem: "Every long URL needs a short, unique code, like g8 in sho.rt/g8.",
            options: [
                { label: "Option A: hash", text: "Hash the URL and keep 7 characters. Simple, but two URLs can get the same code, so you must check and retry." },
                { label: "Option B: counter", text: "Give each link the next number and write it in base62. It never collides, but every new link asks one central counter." },
            ],
            choice: "The counter, then make it scale by giving each server its own block of numbers.",
        },
        why: [
            "Every short link depends on its code. If two links share one, visitors land on the wrong page, and nobody notices until someone complains.",
            "This choice also decides what you will have to scale later: a collision check on every create, or one counter that every create waits for.",
        ],
        words: ["short-code", "hash", "collision", "birthday-paradox", "base62", "sequence", "bottleneck"],
        picture: {
            intro: "Follow one new link through each option.",
            flows: [
                {
                    title: "Option A: hash",
                    steps: ["Alice pastes a long URL", "md5 gives 32 hex characters", "keep the first 7", "that is her code"],
                    outcome: "Seven hex characters allow only about 268 million codes. By the birthday paradox, there is already a 50% chance that two links share a code after about 19,000 links. We expect 100 million a month.",
                    tone: "bug",
                },
                {
                    title: "Option B: counter",
                    steps: ["Alice's link is number 1,000", "base62 → g8", "Bob's link is 1,001", "base62 → g9"],
                    outcome: "Two numbers are never equal, so two codes never are. The catch: every new link has to ask the same counter for its number.",
                    tone: "warn",
                },
            ],
        },
        options: [
            {
                label: "Option A: hash, keep 7 characters",
                code: "code = md5(longUrl).slice(0, 7)",
                good: "Simple and stateless. The same URL always gives the same code.",
                cost: "Different URLs can share a code. Every create must check and retry, and that gets more likely as links pile up.",
            },
            {
                label: "Option B: counter + base62",
                code: "code = toBase62(nextId())",
                good: "Unique by construction. Each number is handed out once.",
                cost: "Every create asks one central counter. Under heavy writes it becomes the bottleneck, and the next step breaks exactly this.",
            },
        ],
        choice: {
            paragraphs: [
                "The common interview answer is the counter: correctness first, and collisions become impossible instead of rare.",
                "Then fix its weak spot. Instead of asking the database for every number, each server reserves a block, say 1,000 IDs at a time, and hands them out from memory. The database is asked once per block, not once per link.",
            ],
            cost: "Codes come out in order (g8, g9, ga…), so anyone can guess the next one. If links should not be guessable, shuffle the number before encoding it. That is a later step.",
            alsoSay: {
                title: "Interviewers also listen for: it's read-heavy",
                body: "Redirects far outnumber new links, often by about 100 to 1. Design for reads first (a cache, a CDN in front), then worry about the write path.",
            },
        },
        checks: [
            {
                q: "Why can two different URLs get the same code with option A?",
                a: "We keep only 7 characters of the hash, so there are far fewer codes than possible URLs. With md5's hex output that is about 268 million codes, and by the birthday paradox a shared code is likely after only about 19,000 links.",
            },
            {
                q: "Why can the counter never collide?",
                a: "Each number is handed out exactly once, and base62 is just another way of writing a number. Different numbers always give different codes.",
            },
            {
                q: "What is the counter's weak spot, and one way to fix it?",
                a: "Every new link waits on one central counter. Give each server a block of IDs to hand out from memory, so it asks the database only once per block.",
            },
        ],
        code: [
            { label: "Option A · hash", filename: "hash-codes.ts", code: HASH_CODE, note: "Example code. The tested version ships with the reference URL shortener in the repo." },
            { label: "Option B · counter", filename: "counter-codes.ts", code: COUNTER_CODE, note: "Example code. The tested version ships with the reference URL shortener in the repo." },
        ],
        remember: "A hash can collide and a counter can't, but a counter has to be scaled. Say both halves out loud.",
        sourcePath: "systems/url-shortener/00-core-design",
        updated: "2026-10-29",
    },
];

export function getAllDesigns(): DesignPageContent[] {
    return DESIGNS;
}

export function getDesignBySlug(slug: string): DesignPageContent | undefined {
    return DESIGNS.find((design) => design.slug === slug);
}
