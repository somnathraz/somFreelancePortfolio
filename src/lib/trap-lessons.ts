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
    /** Break the Backend level id. Omit when the trap has no playable level yet. */
    level?: string;
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

const CLICK_BUG = `import type { Pool } from "pg";
import type Redis from "ioredis";

// Redirect, and count the click right here.
export async function redirect(db: Pool, redis: Redis, code: string) {
  // Every click writes to the same row, one transaction at a time.
  await db.query(
    "UPDATE links SET clicks = clicks + 1 WHERE code = $1",
    [code],
  );
  const dest = await redis.get(\`dest:\${code}\`);
  return \`302 → \${dest}\`;
}
`;

const CLICK_FIX = `import type { Pool } from "pg";
import type Redis from "ioredis";

// The redirect only redirects. INCR is atomic and in memory: no row lock.
export async function redirect(redis: Redis, code: string) {
  await redis.incr(\`clicks:\${code}\`);
  const dest = await redis.get(\`dest:\${code}\`);
  return \`302 → \${dest}\`;
}

// Background worker, every ~5 seconds: one write for the whole batch.
export async function flushClicks(db: Pool, redis: Redis, code: string) {
  const n = Number(await redis.getdel(\`clicks:\${code}\`));
  if (n > 0) {
    await db.query(
      "UPDATE links SET clicks = clicks + $2 WHERE code = $1",
      [code, n],
    );
  }
}
`;

const VANITY_BUG = `import type { Pool } from "pg";

export async function claimAlias(db: Pool, alias: string, dest: string, owner: string) {
  // Check…
  const taken = await db.query("SELECT 1 FROM links WHERE code = $1", [alias]);
  if (taken.rowCount! > 0) return "TAKEN";

  // …then act. Everyone who checked before the first save gets here.
  await db.query(
    \`INSERT INTO links (code, dest, owner) VALUES ($1, $2, $3)
     ON CONFLICT (code) DO UPDATE
       SET dest = EXCLUDED.dest, owner = EXCLUDED.owner\`,
    [alias, dest, owner],
  );
  return "CLAIMED"; // the upsert never complains
}
`;

const VANITY_FIX = `import type { Pool } from "pg";

export async function claimAlias(db: Pool, alias: string, dest: string, owner: string) {
  // One statement. The unique index decides who got there first.
  const won = await db.query(
    \`INSERT INTO links (code, dest, owner) VALUES ($1, $2, $3)
     ON CONFLICT (code) DO NOTHING
     RETURNING code\`,
    [alias, dest, owner],
  );
  if (won.rowCount === 1) return "CLAIMED";

  // Zero rows: taken, or my own retry. Decide by owner, never by overwriting.
  const { rows } = await db.query("SELECT owner FROM links WHERE code = $1", [alias]);
  return rows[0]?.owner === owner ? "CLAIMED" : "TAKEN";
}
`;

const VANITY_SCHEMA = `CREATE TABLE links (
  code  text PRIMARY KEY, -- the index that decides the race
  dest  text NOT NULL,
  owner text NOT NULL
);
`;

const CLEAN_BUG = `import type { Pool } from "pg";

// Nightly job: one statement for every expired link.
export async function cleanup(db: Pool) {
  // One transaction. If it runs past the statement timeout,
  // Postgres cancels it and undoes every row it deleted.
  const res = await db.query("DELETE FROM links WHERE expires_at < now()");
  return \`DELETED \${res.rowCount}\`;
}
`;

const CLEAN_FIX = `import type { Pool } from "pg";

const BATCH = 2000;

// Walk the primary key in ranges. Each range is its own short transaction.
export async function cleanup(db: Pool) {
  const { rows } = await db.query("SELECT min(id) AS lo, max(id) AS hi FROM links");
  const { lo, hi } = rows[0];
  for (let from = Number(lo); from <= Number(hi); from += BATCH) {
    await db.query(
      "DELETE FROM links WHERE id >= $1 AND id < $2 AND expires_at < now()",
      [from, from + BATCH],
    );
    // In production, sleep a little here so replicas and vacuum keep up.
  }
}
`;

const CLEAN_PARTITION = `-- At billions of rows: one partition per month.
CREATE TABLE links (
  id         bigint NOT NULL,
  code       text   NOT NULL,
  target     text   NOT NULL,
  expires_at timestamptz NOT NULL
) PARTITION BY RANGE (expires_at);

CREATE TABLE links_2026_09 PARTITION OF links
  FOR VALUES FROM ('2026-09-01') TO ('2026-10-01');

-- Cleanup is instant: no row-by-row delete, no bloat.
DROP TABLE links_2026_09;
`;

const RL_BUG = `import type Redis from "ioredis";

export async function allow(redis: Redis, user: string, limit = 10) {
  const key = \`rate:\${user}\`;
  // Read…
  const count = Number((await redis.get(key)) ?? 0);
  if (count >= limit) return "429 Too Many Requests";
  // …then write. Everyone who read before the first write saw 0.
  await redis.set(key, count + 1, "EX", 60);
  return "200 OK";
}
`;

const RL_FIX = `import type Redis from "ioredis";

// INCR and the expiry in one atomic step, as a Lua script.
const INCR_WITH_EXPIRY = [
  'local n = redis.call("INCR", KEYS[1])',
  'if n == 1 then redis.call("EXPIRE", KEYS[1], ARGV[1]) end',
  "return n",
].join("\\n");

export async function allow(redis: Redis, user: string, limit = 10) {
  // Every request gets its own number: 1..10 pass, the rest are rejected.
  const count = Number(
    await redis.eval(INCR_WITH_EXPIRY, 1, \`rate:\${user}\`, 60),
  );
  if (count > limit) return "429 Too Many Requests";
  return "200 OK";
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
    {
        slug: "url-shortener-analytics-hot-path",
        title: "Analytics on the hot path",
        question: "The owner wants a click count, so the redirect adds one to a column. Why does a viral link make every redirect slow?",
        system: "URL Shortener",
        rule: "The hot path does only what the user is waiting for. Count in memory, flush to the database in batches, and say the trade-off out loud: counts lag by a few seconds.",
        summary: {
            problem: "After the redirect starts counting clicks in Postgres, it gets slower with every click on a popular link, and can take unrelated links down with it.",
            cause: "Every click runs an UPDATE on the same row, and Postgres lets one transaction change a row at a time. Click number 50 waits for the 49 ahead of it.",
            fix: "Count in Redis with INCR on each click, and let a background worker add the total to Postgres every few seconds.",
        },
        why: [
            "We cached the destination so a redirect never touches the database. The click counter puts a database write back on every single click, on the one row everyone shares.",
            "In our run, 50 simultaneous clicks took about 68 ms at the median and 79 ms for the slowest, against a 50 ms budget for a redirect. That is 50 clicks on a laptop with an idle database. A real viral link is thousands a second on a database that is busy with other work, and each waiting click also holds a connection from the pool. When the pool runs dry, every other link waits too.",
        ],
        words: ["hot-path", "row-lock", "bottleneck", "batching", "atomic"],
        picture: {
            intro: "Three people click the same link in the same instant.",
            flows: [
                {
                    title: "Counting inside the redirect",
                    steps: ["Click 1 locks the row", "Click 2 waits", "Click 3 waits", "Click 1 commits", "Click 2 runs", "Click 3 runs"],
                    outcome: "The count is right, but every redirect now waits for its turn on one row. The more clicks, the longer the queue.",
                    tone: "bug",
                },
                {
                    title: "Counting off the hot path",
                    steps: ["Click 1 INCR in Redis", "Click 2 INCR in Redis", "Click 3 INCR in Redis", "Worker adds 3 to Postgres"],
                    outcome: "Each redirect finishes in under a millisecond. Postgres gets one write for the whole batch.",
                    tone: "fix",
                },
            ],
        },
        attempts: [
            { label: "UPDATE in the redirect", code: "UPDATE links SET clicks = clicks + 1", verdict: "fails", why: "Correct count, but every click queues on one row and holds a connection while it waits." },
            { label: "Fire and forget the UPDATE", code: "db.query(…) // no await", verdict: "partly", why: "The redirect stops waiting, but the writes still pile up on the same row and still use the pool. You moved the queue, not removed it." },
            { label: "Insert a row per click", code: "INSERT INTO clicks (code, at) …", verdict: "partly", why: "Inserts do not fight over one row, so it scales much further. It is still a database write on every click." },
            { label: "Spread over N counter rows", code: "clicks_shard = random(0, 9)", verdict: "works", why: "Spreads the lock across several rows and sums them on read. Good when the count has to stay in Postgres." },
            { label: "Redis INCR and a periodic flush", code: "INCR clicks:<code>; flush every ~5s", verdict: "works", why: "No row lock, no disk, no queue on the redirect. Ten thousand clicks become one write." },
            { label: "Click events to a queue", code: "queue.send({ code, at, country })", verdict: "works", why: "The right answer when you need per-click data (country, referrer), durability, or replays." },
        ],
        fix: {
            paragraphs: [
                "Make the redirect do only the redirect. On each click, run INCR on a Redis key: it is atomic, in memory, and takes no row lock. A background worker reads and clears the key every few seconds with GETDEL and adds the total to Postgres in one UPDATE.",
                "This is the same idea as the cache we already have: keep the slow, shared thing off the path the user is waiting on.",
            ],
            cost: "Counts lag by the flush interval, so analytics can be a few seconds late. If the worker crashes between GETDEL and the UPDATE, that batch is lost. Fine for click counts, not for money.",
            alsoSay: {
                title: "Interviewers also listen for: durability and 301",
                body: "If losing a batch is not acceptable, push click events to a durable queue (Kafka, SQS) and aggregate from there. And counting only works with 302 redirects: a browser caches a 301, so repeat clicks never reach you.",
            },
        },
        checks: [
            {
                q: "The count is correct. Why is this still a bug?",
                a: "The cost is the problem, not the number. The read path now writes, and every click waits on one row lock and holds a connection while it does.",
            },
            {
                q: "Why can one hot link slow down other links?",
                a: "Waiting clicks each hold a database connection. When the pool runs out, requests for every other link wait for a free one.",
            },
            {
                q: "What do you give up with the Redis counter?",
                a: "Freshness: counts lag by the flush interval, and a crash between reading and flushing loses that batch. For click counts that is acceptable, and you say so before the interviewer asks.",
            },
        ],
        code: [
            { label: "The bug · count in the redirect", filename: "redirect.bug.ts", code: CLICK_BUG, note: NOTE },
            { label: "The fix · count off the hot path", filename: "redirect.fix.ts", code: CLICK_FIX, note: NOTE },
        ],
        remember: "Whatever you add to the redirect is paid on every click. Count off the path, flush in batches, and say that counts lag.",
        sourcePath: "systems/url-shortener/03-click-counter",
        updated: "2026-11-02",
    },
    {
        slug: "url-shortener-vanity-alias-race",
        title: "The vanity alias race",
        question: "Two people claim the same custom alias at the same second, and both are told it is theirs. Who gets it?",
        system: "URL Shortener",
        level: "vanity-alias",
        rule: "Let the unique index decide, in one statement. Zero rows back means taken, or your own retry. Never let an upsert turn a conflict into an overwrite.",
        summary: {
            problem: "Every request that claims /launch at the same time is told it got it, but only one of them owns it. The others now share a link that sends their clicks to a stranger.",
            cause: "The handler checks that the alias is free and then saves it with an upsert. The check and the save are separate moments, and the upsert quietly overwrites instead of failing.",
            fix: "Insert with ON CONFLICT DO NOTHING RETURNING and let the unique index pick one winner.",
        },
        why: [
            "A custom alias is a promise: /launch is yours. Checking that it is free and then saving it feels safe, and with one request at a time it is: the second person gets TAKEN. That is why it passes QA.",
            "In our run, 50 users claimed /launch at once against a real Postgres with a primary key on the alias the whole time. All 50 were told CLAIMED. The alias belonged to one of them, and the other 49 were sharing a link that now sent every click to the winner's site. The index was there. The upsert walked straight through it.",
        ],
        words: ["race-condition", "unique-index", "upsert", "idempotent", "atomic"],
        picture: {
            intro: "Alice and Bob both want /launch. Nobody has it yet.",
            flows: [
                {
                    title: "One at a time (what QA does)",
                    steps: ["Alice checks: free", "Alice saves", "Bob checks: taken"],
                    outcome: "Alice gets CLAIMED, Bob gets TAKEN. Correct.",
                    tone: "fix",
                },
                {
                    title: "At the same moment (what launch day does)",
                    steps: ["Alice checks: free", "Bob checks: free", "Alice saves", "Bob's upsert overwrites Alice"],
                    outcome: "Both are told CLAIMED. The row now says Bob owns it, and Alice's link sends her visitors to Bob's site.",
                    tone: "bug",
                },
            ],
        },
        attempts: [
            { label: "Read back after saving", code: "save; SELECT owner; compare", verdict: "fails", why: "The last write wins and each request reads back its own write, so both see themselves as the owner and both report success." },
            { label: "A mutex in the API", code: "await mutex.acquire()", verdict: "fails", why: "A mutex lives inside one process. Two servers have two mutexes, and their requests never wait for each other." },
            { label: "SELECT … FOR UPDATE", code: "SELECT 1 FROM links … FOR UPDATE", verdict: "fails", why: "You cannot lock a row that does not exist yet. There is nothing to lock until someone has saved." },
            { label: "Advisory lock on the alias", code: "pg_advisory_xact_lock(hashtext(alias))", verdict: "works", why: "The second request waits, then sees the first one's save. Correct, but it is extra machinery for something the index already does." },
            { label: "INSERT … ON CONFLICT DO NOTHING", code: "… DO NOTHING RETURNING code", verdict: "works", why: "Claiming and checking are one statement. Exactly one insert gets a row back; every other one gets zero." },
            { label: "A plain INSERT, catch the duplicate", code: "catch (e) { e.code === '23505' }", verdict: "works", why: "Same guarantee when your ORM has no ON CONFLICT: an exception instead of zero rows." },
        ],
        fix: {
            paragraphs: [
                "Drop the pre-check. Run one INSERT … ON CONFLICT DO NOTHING RETURNING code. Postgres serializes the inserts on the index: exactly one gets a row back, and everyone else gets zero rows and nothing changes.",
                "The upsert was added so a retried request would not error, and that is a real need. Handle it by owner: if zero rows came back, read who owns the alias. Your own retry is a success; anyone else's claim is TAKEN. That is idempotency done right: decide by who owns the row, never by overwriting it.",
            ],
            cost: "The losing requests need one extra read to tell a retry from a real conflict. If aliases are paid or need a confirmation step, hold the alias in a reservation table with an expiry instead.",
            alsoSay: {
                title: "Interviewers also listen for: when an upsert is right",
                body: "ON CONFLICT DO UPDATE is fine when overwriting is the feature, such as \"update my own link\". Then add WHERE links.owner = EXCLUDED.owner, so it can only overwrite your own row.",
            },
        },
        checks: [
            {
                q: "The alias column is a primary key. Why didn't that stop the duplicate?",
                a: "The upsert turns the conflict into an update. The one thing that would have caught the race was converted into a silent overwrite.",
            },
            {
                q: "Why doesn't SELECT … FOR UPDATE work here?",
                a: "It locks existing rows. Before anyone claims the alias there is no row, so there is nothing to lock.",
            },
            {
                q: "A user clicks Claim twice because of a slow network. How should that behave?",
                a: "The second request gets zero rows back, reads that the owner is the same user, and returns CLAIMED. A retry from the owner succeeds; a claim from anyone else is TAKEN.",
            },
        ],
        code: [
            { label: "The bug · check, then upsert", filename: "claim-alias.bug.ts", code: VANITY_BUG, note: NOTE },
            { label: "The fix · the index decides", filename: "claim-alias.fix.ts", code: VANITY_FIX, note: NOTE },
            { label: "Schema", filename: "schema.sql", code: VANITY_SCHEMA, lang: "sql" },
        ],
        remember: "A check followed by a save is two moments. Make it one statement and let the unique index decide.",
        sourcePath: "systems/url-shortener/04-vanity-alias-race",
        updated: "2026-11-02",
    },
    {
        slug: "url-shortener-expired-cleanup",
        title: "Cleanup at scale",
        question: "A nightly job deletes expired links. One morning you check and not a single row was deleted, and the same last night. Why?",
        system: "URL Shortener",
        rule: "Never delete millions of rows in one statement. Delete in short batches over the primary key, and at real scale partition by time so cleanup is DROP PARTITION.",
        summary: {
            problem: "The nightly cleanup deletes nothing, night after night, and the table keeps growing.",
            cause: "One DELETE is one transaction. It runs past the statement timeout, so Postgres cancels it and undoes every row it had deleted. Tomorrow's run is longer still.",
            fix: "Delete in short batches over the primary key, each its own tiny transaction, so progress sticks.",
        },
        why: [
            "Links expire, so old rows have to go. The obvious job is one line of SQL, and it works on staging with 2,000 rows.",
            "In our run, scaled down to a laptop, 300,000 expired links sat next to 30,000 live ones. The timeout was set between the time one 2,000-row batch takes and the time the one-shot DELETE takes. The one-shot hit it and rolled back: all 300,000 expired links were still there. Production is the same story with a 30-second timeout and billions of rows.",
            "It did not block redirects: reads in Postgres never wait on a DELETE, and 50 visitors were redirected fine during the run. The damage is quieter. The job never finishes, and while it runs it locks every row it touches, writes a mountain of log that makes replicas fall behind, and holds back vacuum.",
        ],
        words: ["transaction", "statement-timeout", "batching", "partition"],
        picture: {
            intro: "300,000 links have expired. The cleanup starts at midnight.",
            flows: [
                {
                    title: "One DELETE for everything",
                    steps: ["DELETE starts", "Deletes rows for a while", "Hits the statement timeout", "Postgres rolls everything back"],
                    outcome: "0 rows deleted. Tomorrow there are more rows, so it fails again.",
                    tone: "bug",
                },
                {
                    title: "Short batches",
                    steps: ["Delete ids 1 to 2,000", "Commit", "Delete ids 2,001 to 4,000", "Commit", "And so on"],
                    outcome: "Each batch takes milliseconds. If the job dies at batch 80, batches 1 to 79 are already done.",
                    tone: "fix",
                },
            ],
        },
        attempts: [
            { label: "One DELETE for everything", code: "DELETE FROM links WHERE expires_at < now()", verdict: "fails", why: "One transaction. It runs past the statement timeout or the next deploy, and Postgres undoes every row." },
            { label: "A bigger timeout", code: "SET statement_timeout = 0", verdict: "partly", why: "Lets it finish, once. Meanwhile every deleted row stays locked until the end, the log balloons, replicas fall behind and vacuum is held back. Tomorrow's table is bigger." },
            { label: "Batches with LIMIT", code: "WHERE id IN (SELECT id … WHERE expires_at < now() LIMIT 2000)", verdict: "partly", why: "Progress sticks, but every batch rescans the dead index entries the earlier batches left, so it slows down as it goes. Fine for small tables." },
            { label: "Check expiry when a link is opened", code: "if (link.expires_at < now()) return 404", verdict: "partly", why: "Expired links stop working at once, but their rows are still there and storage keeps growing. Pair it with a cleanup, not instead of one." },
            { label: "Primary-key range batches", code: "DELETE … WHERE id >= $1 AND id < $2 AND expires_at < now()", verdict: "works", why: "Each batch is a short transaction, and walking the key never revisits a range. If the job is killed, it can resume." },
            { label: "Partition by month, drop the old one", code: "DROP TABLE links_2026_09", verdict: "works", why: "The real answer at billions of rows. Dropping a whole month is instant, with no row-by-row delete and no bloat." },
        ],
        fix: {
            paragraphs: [
                "Walk the primary key in ranges of a couple of thousand ids and delete the expired rows in each range. Every range is its own transaction: a few milliseconds, then commit. In production add a short sleep between batches so replicas and vacuum can keep up.",
                "Why ranges and not LIMIT? A LIMIT subquery has to skip the dead index entries earlier batches left behind, so each batch is slower than the last, and in our prototype it crept toward the timeout. Walking the primary key never revisits a range.",
            ],
            cost: "Cleanup now takes longer on the clock, and it is a loop with a position to resume from instead of one statement. At billions of rows even batches are slow, so partition the table by month and drop old partitions instead.",
            alsoSay: {
                title: "Interviewers also listen for: lazy expiry",
                body: "Check expires_at when a link is opened and return 404, so an expired link stops working at once. The cleanup job then only reclaims space, which means it is allowed to be slow.",
            },
        },
        checks: [
            {
                q: "The DELETE is correct SQL. Why did it delete nothing?",
                a: "It is one transaction. It ran past the statement timeout, so Postgres cancelled it and rolled back every row, not just the unfinished part.",
            },
            {
                q: "Does it block redirects while it runs?",
                a: "No. Reads in Postgres do not wait on a DELETE. The cost is load, replicas falling behind, held-back vacuum, and a job that never catches up.",
            },
            {
                q: "Why walk the primary key and not use LIMIT?",
                a: "A LIMIT subquery rescans the dead index entries the previous batches left, so it gets slower as it goes. Key ranges never revisit a range.",
            },
        ],
        code: [
            { label: "The bug · one DELETE", filename: "cleanup.bug.ts", code: CLEAN_BUG, note: NOTE },
            { label: "The fix · key-range batches", filename: "cleanup.fix.ts", code: CLEAN_FIX, note: NOTE },
            { label: "At scale · partitions", filename: "partitions.sql", code: CLEAN_PARTITION, lang: "sql" },
        ],
        remember: "One statement is all or nothing. Delete in short batches, and say partitions when the table is huge.",
        sourcePath: "systems/url-shortener/05-cleanup-at-scale",
        updated: "2026-11-05",
    },
    {
        slug: "rate-limiter-counter-race",
        title: "The counter race",
        question: "Your limiter allows 10 requests a minute. A script fires 50 at once. How many get through?",
        system: "Rate Limiter",
        rule: "Never GET-then-SET a counter. Increment and check in one atomic step, and set the key's expiry in that same step.",
        summary: {
            problem: "The limit is 10 and all 50 requests get through. Afterwards the counter says 1.",
            cause: "The limiter reads the count, checks it, then writes count + 1. Every request that reads before the first write lands sees 0, passes, and writes 1.",
            fix: "Increment first and check the number you get back. INCR is atomic, so every request gets a number of its own.",
        },
        why: [
            "A limiter stands between a runaway script and your database, and this one fails exactly when it is needed: in a burst.",
            "One request at a time it is perfect: 10 pass and the 11th gets a 429. That is why it survives QA. In our run, with a limit of 10, 50 of 50 concurrent requests got through and the counter said 1, because every write overwrote the others. The fix let exactly 10 through and counted all 50.",
        ],
        words: ["rate-limit", "race-condition", "read-modify-write", "atomic", "ttl"],
        picture: {
            intro: "The limit is 10 a minute. 50 requests arrive together and the counter is at 0.",
            flows: [
                {
                    title: "One at a time (what QA does)",
                    steps: ["Request 1 reads 0", "Writes 1", "Request 2 reads 1", "Writes 2"],
                    outcome: "Requests 1 to 10 pass. The 11th reads 10 and gets a 429.",
                    tone: "fix",
                },
                {
                    title: "All at once (what a script does)",
                    steps: ["All 50 read 0", "All 50 pass the check", "All 50 write 1"],
                    outcome: "50 of 50 get through, and the counter says 1.",
                    tone: "bug",
                },
            ],
        },
        attempts: [
            { label: "GET, check, SET", code: "count = GET; if count >= limit …; SET count + 1", verdict: "fails", why: "Two round trips with a gap between them. Every request that reads inside the gap sees the same count." },
            { label: "A lock around GET and SET", code: "await lock.acquire()", verdict: "partly", why: "Correct if every API server shares the lock, but every request now queues on it, and you have a lock to manage." },
            { label: "WATCH, then retry", code: "WATCH key; MULTI … EXEC", verdict: "partly", why: "Works, but the retries pile up under exactly the burst you are trying to limit." },
            { label: "MULTI / EXEC", code: "MULTI; INCR; EXPIRE; EXEC", verdict: "partly", why: "Applies commands together, but you cannot branch on a value you read inside it." },
            { label: "INCR, then compare", code: "n = INCR key; if n > limit …", verdict: "works", why: "One atomic call, and the number you get back is yours alone. The default for a fixed-window counter." },
            { label: "A Lua script", code: "EVAL check-and-spend", verdict: "works", why: "Check and spend in one atomic step. What Stripe does, and what you need once the limiter has more than one key or field." },
        ],
        fix: {
            paragraphs: [
                "Increment first, then check. Redis runs INCR one at a time, so each request gets its own number: 1 to 10 pass, 11 to 50 are rejected. There is no read-then-write gap to race through.",
                "Set the expiry in the same atomic step. INCR followed by a separate EXPIRE is two calls again, and that gap is a trap of its own, later this week.",
            ],
            cost: "Rejected requests are counted too, so a user who keeps hammering keeps the counter high. For a token bucket, or anything with more than one field, move the whole check into a Lua script.",
            alsoSay: {
                title: "Interviewers also listen for: Stripe's version",
                body: "Stripe describes running the check-and-spend as a Lua script inside Redis, so no other operation can run between reading the count and writing the new one.",
            },
        },
        checks: [
            {
                q: "Why does it pass QA and fail under a script?",
                a: "One request at a time, each read sees the previous write. A script sends them together, so many read the same count before any write lands.",
            },
            {
                q: "Why does the counter say 1 after 50 requests?",
                a: "Every request wrote count + 1 from the same starting count, so each write overwrote the others.",
            },
            {
                q: "Why not INCR and then a separate EXPIRE?",
                a: "That is two calls again. If the process dies between them, the key never expires, and the user stays blocked. Set the expiry in the same atomic step.",
            },
        ],
        code: [
            { label: "The bug · GET, check, SET", filename: "limiter.bug.ts", code: RL_BUG, note: NOTE },
            { label: "The fix · increment first", filename: "limiter.fix.ts", code: RL_FIX, note: NOTE },
        ],
        remember: "If your code reads a counter and writes it back, requests can overlap in between. Let Redis increment it in one step.",
        sourcePath: "systems/rate-limiter/01-counter-race",
        updated: "2026-11-05",
    },
];

export function getAllTrapLessons(): TrapLessonContent[] {
    return LESSONS;
}

export function getTrapLessonBySlug(slug: string): TrapLessonContent | undefined {
    return LESSONS.find((lesson) => lesson.slug === slug);
}
