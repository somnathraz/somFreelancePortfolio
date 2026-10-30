import type { ConceptId } from "@/lib/concepts";
import type { DesignFlow } from "@/lib/trap-designs";

/**
 * Trap lessons: a bug inside a system, taught with the lesson template and played in Break the
 * Backend (`level`). Unlike the root episodes they have no recorded trace yet; the runnable code
 * lands in github.com/somnathraz/interview-traps under `sourcePath`.
 */
export interface TrapAttempt {
    label: string;
    /** One line. Full code belongs in `code` at the end of the lesson. */
    code: string;
    verdict: "fails" | "partly" | "works";
    why: string;
}

export interface TrapLessonContent {
    slug: string;
    title: string;
    question: string;
    system: string;
    /** Break the Backend level id. */
    level: string;
    /** The interview answer in one breath. Also used for the meta description. */
    rule: string;
    summary: { problem: string; cause: string; fix: string };
    why: string[];
    words: ConceptId[];
    picture: { intro: string; flows: DesignFlow[] };
    attempts: TrapAttempt[];
    fix: { paragraphs: string[]; cost: string; alsoSay?: { title: string; body: string } };
    checks: { q: string; a: string }[];
    code: { label: string; filename: string; code: string; lang?: string; note?: string }[];
    remember: string;
    sourcePath: string;
    /** ISO date, used for the sitemap. */
    updated: string;
}

const NOTE = "Example code. The tested version, with a proof test against real Postgres, lands in the repo.";

const ID_BUG = `import type { Pool } from "pg";
import { toBase62 } from "./base62";

// Read, then write: two requests can both read the same n.
export async function createLink(db: Pool, longUrl: string) {
  const { rows } = await db.query(
    "SELECT value FROM counters WHERE name = 'links'",
  );
  const n = BigInt(rows[0].value);
  await db.query(
    "UPDATE counters SET value = $1 WHERE name = 'links'",
    [String(n + 1n)],
  );

  const code = toBase62(n);
  await db.query(
    "INSERT INTO links (code, target) VALUES ($1, $2)",
    [code, longUrl],
  );
  return code;
}
`;

const ID_FIX = `import type { Pool } from "pg";
import { toBase62 } from "./base62";

// The database reads and bumps the counter in one step, so
// two requests at the same instant still get different numbers.
export async function createLink(db: Pool, longUrl: string) {
  const { rows } = await db.query("SELECT nextval('link_ids') AS n");
  const code = toBase62(BigInt(rows[0].n));

  await db.query(
    "INSERT INTO links (code, target) VALUES ($1, $2)",
    [code, longUrl],
  );
  return code;
}

// Also correct, if you keep a counters table:
//   UPDATE counters SET value = value + 1
//   WHERE name = 'links' RETURNING value - 1 AS n
`;

const ID_SCHEMA = `CREATE SEQUENCE link_ids START 1000;

CREATE TABLE links (
  code   text PRIMARY KEY, -- the safety net: a duplicate is rejected
  target text NOT NULL
);
`;

const STALE_BUG = `import type { Pool } from "pg";
import type Redis from "ioredis";

const TTL = 86_400; // one day

// Redirect: serve from Redis, fill it from Postgres on a miss.
export async function resolve(db: Pool, redis: Redis, code: string) {
  const key = \`link:\${code}\`;
  const hit = await redis.get(key);
  if (hit) return hit;

  const { rows } = await db.query(
    "SELECT target FROM links WHERE code = $1", [code],
  );
  const target: string | undefined = rows[0]?.target;
  // If an edit landed after the SELECT, this writes the old target back.
  if (target) await redis.set(key, target, "EX", TTL);
  return target;
}

// Edit: update Postgres, then drop the cached copy.
export async function updateTarget(
  db: Pool, redis: Redis, code: string, target: string,
) {
  await db.query(
    "UPDATE links SET target = $2 WHERE code = $1", [code, target],
  );
  await redis.del(\`link:\${code}\`);
}
`;

const STALE_FIX = `import { randomUUID } from "node:crypto";
import type { Pool } from "pg";
import type Redis from "ioredis";

const TTL = 86_400; // the safety net, not the fix

// Write the value only if our marker is still in the key.
const FILL_IF_OURS = \`
if redis.call("GET", KEYS[1]) == ARGV[1] then
  return redis.call("SET", KEYS[1], ARGV[2], "EX", ARGV[3])
end
return nil\`;

export async function resolve(db: Pool, redis: Redis, code: string) {
  const key = \`link:\${code}\`;
  const hit = await redis.get(key);
  if (hit && !hit.startsWith("fill:")) return hit;

  // Miss: leave a marker that expires in 5 s. An edit's DEL removes it.
  const marker = \`fill:\${randomUUID()}\`;
  const leased =
    !hit && (await redis.set(key, marker, "PX", 5000, "NX")) === "OK";

  const { rows } = await db.query(
    "SELECT target FROM links WHERE code = $1", [code],
  );
  const target: string | undefined = rows[0]?.target;
  if (leased && target) {
    await redis.eval(FILL_IF_OURS, 1, key, marker, target, TTL);
  }
  return target;
}

// The edit does not change: update Postgres, then delete the key.
// The DEL also removes any marker, so an older fill is refused.
export async function updateTarget(
  db: Pool, redis: Redis, code: string, target: string,
) {
  await db.query(
    "UPDATE links SET target = $2 WHERE code = $1", [code, target],
  );
  await redis.del(\`link:\${code}\`);
}
`;

const LESSONS: TrapLessonContent[] = [
    {
        slug: "url-shortener-id-collision",
        title: "The ID collision",
        question: "A counter hands out a new number for every link. So how do two links end up with the same code?",
        system: "URL Shortener",
        level: "id-collision",
        rule: "Never read a counter and write it back in two steps. Let the database hand out the number in one statement, a sequence or UPDATE … RETURNING, and keep a unique index on the code as the safety net.",
        summary: {
            problem: "Two different long URLs get the same short code, so one of them sends visitors to the wrong page.",
            cause: "The handler reads the counter, then writes counter + 1. Two requests that overlap both read the same number before either one writes.",
            fix: "Let the database read and bump the counter in one step: nextval() on a sequence, or UPDATE … RETURNING.",
        },
        why: [
            "In the previous step we picked a counter because it can never collide. That promise only holds if each number is handed out exactly once. Written the obvious way, it is not.",
            "It never shows up on your laptop, where you send one request at a time. Do the maths with our own numbers instead: 40 new links a second. If the gap between reading and writing the counter is 5 ms (two trips to the database), the chance that another request reads inside that gap is about 1 in 5 (1 − e^−0.2 ≈ 18%). Not a rare edge case: it happens all day.",
        ],
        words: ["race-condition", "read-modify-write", "atomic", "sequence", "unique-index"],
        picture: {
            intro: "The counter is at 1,000. Alice and Bob shorten two different URLs.",
            flows: [
                {
                    title: "One at a time (what your tests do)",
                    steps: ["Alice reads 1000", "writes 1001", "Bob reads 1001", "writes 1002"],
                    outcome: "Alice gets g8, Bob gets g9. Every test passes.",
                    tone: "fix",
                },
                {
                    title: "Overlapping (what production does)",
                    steps: ["Alice reads 1000", "Bob reads 1000", "Alice writes 1001", "Bob writes 1001"],
                    outcome: "Both encode 1000, so both get g8, and the counter moved by one instead of two. Without a unique index both rows are saved and g8 goes to whichever the lookup finds. With one, Bob's request fails.",
                    tone: "bug",
                },
            ],
        },
        attempts: [
            { label: "A mutex in the API", code: "await mutex.acquire()", verdict: "fails", why: "A mutex lives inside one process. Two servers have two mutexes, and their requests never wait for each other." },
            { label: "A unique index on code", code: "code text PRIMARY KEY", verdict: "partly", why: "Stops the silent duplicate, but the second request now fails with a duplicate-key error. Keep it as the safety net; it is not the fix." },
            { label: "Lock the counter row", code: "SELECT value … FOR UPDATE", verdict: "works", why: "Correct, but every new link queues on one row for a whole transaction." },
            { label: "UPDATE … RETURNING", code: "SET value = value + 1 RETURNING value", verdict: "works", why: "Reads and bumps in one statement. The row is locked only for that statement." },
            { label: "A sequence", code: "SELECT nextval('link_ids')", verdict: "works", why: "Built for exactly this. Never hands out the same number twice, and callers do not wait for each other." },
        ],
        fix: {
            paragraphs: [
                "Use a Postgres sequence. nextval() is atomic: two requests can call it at the same instant and still get different numbers, without queueing behind each other.",
                "Keep the unique index on code anyway. If a bug ever slips through again, the database refuses the duplicate instead of quietly sending visitors to the wrong page.",
            ],
            cost: "A sequence never goes backwards, even when a transaction rolls back, so some numbers are skipped. For short codes that is fine: nobody needs them to be gapless.",
            alsoSay: {
                title: "Interviewers also listen for: many servers",
                body: "One sequence is still one counter. At higher write rates, create it with INCREMENT BY 1000 so each call reserves a block of 1,000 numbers that a server hands out from memory, as in the previous step.",
            },
        },
        checks: [
            {
                q: "Why do the tests pass while production breaks?",
                a: "Tests usually send one request at a time, so the read and the write never overlap. Production sends many at once, and the gap between them is where two requests read the same number.",
            },
            {
                q: "Why doesn't a mutex in the API fix it?",
                a: "It only blocks requests inside the same process. Two servers have two separate mutexes, so their requests still overlap.",
            },
            {
                q: "With a unique index on code, what happens instead?",
                a: "The second insert is rejected with a duplicate-key error. No visitor goes to the wrong page, but that request fails. Better, still not fixed.",
            },
        ],
        code: [
            { label: "The bug · read, then write", filename: "create-link.bug.ts", code: ID_BUG, note: NOTE },
            { label: "The fix · sequence", filename: "create-link.fix.ts", code: ID_FIX, note: NOTE },
            { label: "Schema", filename: "schema.sql", code: ID_SCHEMA, lang: "sql" },
        ],
        remember: "If the database does the read and the write in one step, two requests can't get the same number. If your code does them, they can.",
        sourcePath: "systems/url-shortener",
        updated: "2026-10-30",
    },
    {
        slug: "url-shortener-stale-redirect",
        title: "The stale redirect",
        question: "The owner changed where the link points. Why do visitors still land on the old page?",
        system: "URL Shortener",
        level: "stale-redirect",
        rule: "Update the database, then delete the cache, and expect a slow reader to put the old value back. Fill the cache with a lease, keep a TTL as the safety net, and redirect editable links with 302.",
        summary: {
            problem: "After the owner edits a link, visitors keep going to the old destination for as long as the cached copy lives.",
            cause: "A visitor misses the cache and reads the old target from Postgres. The edit and the cache delete happen. Then the visitor writes the old target into Redis.",
            fix: "Fill the cache with a lease, so a fill that started before an edit is refused. Keep a TTL as the backstop.",
        },
        why: [
            "Redirects are read-heavy, so they go through a cache: about 4,000 redirects a second against a handful of edits. Without the cache, Postgres would serve every click.",
            "The usual recipe, update the database and then delete the cached copy, is right almost every time. The gap is small: a cache miss and an edit on the same link at the same moment. But when it happens nothing repairs it. The wrong copy stays until its TTL runs out, a whole day with our settings.",
        ],
        words: ["cache", "cache-aside", "invalidation", "ttl", "race-condition", "lease"],
        picture: {
            intro: "sho.rt/g8 points to old-site.com, and its cached copy has just expired. A visitor opens it while the owner changes it to new-site.com.",
            flows: [
                {
                    title: "The usual order",
                    steps: ["Owner saves new-site.com", "Owner deletes the cache", "Visitor misses", "reads new-site.com", "caches it"],
                    outcome: "Correct. This is why the recipe looks safe.",
                    tone: "fix",
                },
                {
                    title: "The unlucky order",
                    steps: ["Visitor misses", "reads old-site.com", "Owner saves new-site.com", "Owner deletes the cache", "Visitor caches old-site.com"],
                    outcome: "Postgres says new-site.com and Redis says old-site.com. Every visitor gets the old page for the next 24 hours.",
                    tone: "bug",
                },
            ],
        },
        attempts: [
            { label: "Delete first, then update", code: "redis.del(); db.update()", verdict: "fails", why: "A visitor can miss right after the delete, read the old value, and write it back. The gap moves; it does not close." },
            { label: "Delete twice", code: "del; update; sleep(500); del", verdict: "fails", why: "Shrinks the gap. A visitor slower than the sleep still writes the old value after the second delete." },
            { label: "Write the new value into the cache", code: "db.update(); redis.set(new)", verdict: "fails", why: "Two writers, and the last one wins. The slow visitor's old value can land after the owner's new one." },
            { label: "A short TTL", code: 'redis.set(key, target, "EX", 60)', verdict: "partly", why: "Caps how long a wrong copy lives, but every link expires sooner, so Postgres serves more misses. A good backstop, not a fix." },
            { label: "Lock the row for misses and edits", code: "SELECT target … FOR UPDATE", verdict: "works", why: "Correct, but every cache miss holds a database lock while it talks to Redis, on your busiest path." },
            { label: "Fill with a lease", code: "SET key fill:<id> NX, fill only if still ours", verdict: "works", why: "An edit's delete removes the marker, so a fill that started before the edit is refused. No locks on the redirect path." },
        ],
        fix: {
            paragraphs: [
                "Keep the usual recipe, update Postgres and then delete from Redis, and add a lease to the fill. On a miss, the visitor first writes a marker into the empty key. Then it reads Postgres and fills the cache with a tiny Lua script that writes only if its own marker is still there.",
                "If an edit happened in between, its delete removed the marker and the old value is thrown away. The next visitor misses and reads the new target. Facebook described this idea as leases in its 2013 paper on scaling memcache.",
                "Keep a TTL as the safety net for anything else that goes wrong, like a failed delete. Pick it from how long a wrong redirect is acceptable, not from habit.",
            ],
            cost: "More code on the miss path, and while a marker is in place other visitors read Postgres directly. Give the marker a short expiry, a few seconds, so a crashed request cannot block the cache.",
            alsoSay: {
                title: "Interviewers also listen for: 301 or 302",
                body: "Browsers can cache a 301 (permanent) redirect for a long time, so repeat visitors skip your servers and your cache entirely. Links that can be edited should redirect with 302 or 307.",
            },
        },
        checks: [
            {
                q: "Update the database, then delete the cache. How can the cache still end up wrong?",
                a: "A visitor that missed the cache reads the old target before the update, then writes it into the cache after the delete.",
            },
            {
                q: "Why doesn't deleting twice fix it?",
                a: "It shrinks the gap, but a visitor slower than the wait still writes the old value after the second delete.",
            },
            {
                q: "How does a lease stop the stale fill?",
                a: "The edit's delete also removes the visitor's marker, and the fill only writes while its marker is there. A value read before the edit can't be written after it.",
            },
        ],
        code: [
            { label: "The bug · cache-aside", filename: "redirect.bug.ts", code: STALE_BUG, note: NOTE },
            { label: "The fix · lease", filename: "redirect.fix.ts", code: STALE_FIX, note: NOTE },
        ],
        remember: "Deleting the cache after a write is not enough: a slow reader can put the old value back. Make the fill prove nothing changed since it read.",
        sourcePath: "systems/url-shortener",
        updated: "2026-10-30",
    },
];

export function getAllTrapLessons(): TrapLessonContent[] {
    return LESSONS;
}

export function getTrapLessonBySlug(slug: string): TrapLessonContent | undefined {
    return LESSONS.find((lesson) => lesson.slug === slug);
}
