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

const RL_FIXED_WINDOW = `import type Redis from "ioredis";

// Option A: fixed window. One counter per user per minute.
export async function allow(redis: Redis, user: string, limit: number) {
  const key = \`count:\${user}:\${Math.floor(Date.now() / 60_000)}\`;
  const count = await redis.incr(key);
  // These are two calls. That gap is a trap of its own (Day 5).
  if (count === 1) await redis.expire(key, 60);
  return count <= limit;
}
`;

const RL_TOKEN_BUCKET = `-- Option B: token bucket, as a Lua script so check and spend are one step.
-- KEYS[1] bucket key. ARGV: capacity, refill per second, now in seconds.
local data   = redis.call("HMGET", KEYS[1], "tokens", "ts")
local tokens = tonumber(data[1]) or tonumber(ARGV[1])
local ts     = tonumber(data[2]) or tonumber(ARGV[3])

-- Refill for the time that passed, never above capacity.
tokens = math.min(tonumber(ARGV[1]), tokens + (tonumber(ARGV[3]) - ts) * tonumber(ARGV[2]))

local allowed = tokens >= 1
if allowed then tokens = tokens - 1 end

redis.call("HSET", KEYS[1], "tokens", tokens, "ts", ARGV[3])
redis.call("EXPIRE", KEYS[1], 120)
return allowed and 1 or 0
`;

const PAY_NAIVE = `import type { Pool } from "pg";

// Option A: what most people draw. Client → server → bank.
export async function pay(db: Pool, bank: Bank, orderId: string, amount: number) {
  const charge = await bank.charge(orderId, amount); // times out? the app retries
  await db.query(
    "INSERT INTO payments (order_id, amount, charge_id) VALUES ($1, $2, $3)",
    [orderId, amount, charge.id],
  );
  return charge;
}
`;

const PAY_IDEMPOTENT = `import type { Pool } from "pg";

// Option B: Airbnb's three phases, around an idempotency key the client sends.
export async function pay(db: Pool, bank: Bank, key: string, orderId: string, amount: number) {
  // Pre-RPC: claim the key in one statement. Only one request can win it.
  const claimed = await db.query(
    \`INSERT INTO payment_requests (key, order_id, amount, status)
     VALUES ($1, $2, $3, 'pending')
     ON CONFLICT (key) DO NOTHING RETURNING key\`,
    [key, orderId, amount],
  );
  if (claimed.rowCount === 0) {
    // A retry: hand back what the first attempt stored, never charge again.
    const { rows } = await db.query("SELECT status, response FROM payment_requests WHERE key = $1", [key]);
    return rows[0];
  }

  // RPC: the bank call, outside any transaction. Pass the key on, too.
  const result = await bank.charge(orderId, amount, { idempotencyKey: key });

  // Post-RPC: store the outcome so every later retry gets the same answer.
  await db.query("UPDATE payment_requests SET status = $2, response = $3 WHERE key = $1", [key, result.status, result]);
  return result;
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
    {
        slug: "rate-limiter-core-design",
        title: "Token bucket or counter",
        question: "Every user gets 100 requests a minute. How does the API decide, request by request, whether to let one through?",
        system: "Rate Limiter",
        rule: "Use a token bucket per user in a shared store like Redis. Make check-and-spend one atomic step, give every key an expiry, and fail open when the limiter itself breaks.",
        summary: {
            problem: "The API must reject a user's requests once they pass their limit, without slowing down everyone else.",
            options: [
                { label: "Option A: fixed window", text: "Count requests per user per minute and reject past the limit. One key and one INCR, but a burst at the edge of two windows can pass twice the limit." },
                { label: "Option B: token bucket", text: "A bucket refills at a steady rate and each request takes a token. It allows short bursts and holds the average, but check and spend must be one atomic step." },
            ],
            choice: "A token bucket in Redis, shared by every API server, with the check and spend as one atomic script.",
        },
        why: [
            "Without a limit, one runaway script can use up capacity for everyone. Stripe says its request rate limiter is by far the most important of the four limiters it runs, and that it rejected millions of requests in a single month, often from scripts running in test mode.",
            "The question behind the question is three choices: which algorithm decides, where the count lives (one server's memory or a shared store), and what happens when the limiter itself breaks. Each of the next traps is one of those choices going wrong.",
        ],
        words: ["rate-limit", "fixed-window", "sliding-window", "token-bucket", "atomic", "fail-open"],
        picture: {
            intro: "The limit is 10 requests a minute.",
            flows: [
                {
                    title: "Option A: fixed window",
                    steps: ["Count requests in this minute", "10 requests at 0:59 are allowed", "The window resets at 1:00", "10 more at 1:00 are allowed"],
                    outcome: "20 requests in about one second, twice the limit. Simple, but the edges leak.",
                    tone: "bug",
                },
                {
                    title: "Option B: token bucket",
                    steps: ["The bucket holds up to 10 tokens", "Each request takes one", "Tokens refill steadily", "An empty bucket means 429"],
                    outcome: "Short bursts are fine and the average holds. This is what Stripe uses.",
                    tone: "fix",
                },
            ],
        },
        options: [
            {
                label: "Option A: fixed window counter",
                code: "INCR count:{user}:{minute}",
                good: "One key and one INCR. Easy to build and easy to run.",
                cost: "The count resets at the window edge, so a user can send the whole limit at the end of one window and again at the start of the next.",
            },
            {
                label: "Option B: token bucket",
                code: "tokens = min(max, tokens + elapsed × rate); take 1",
                good: "Allows short bursts and holds the average rate. No edge to exploit.",
                cost: "Check and spend must be one atomic step, or two requests can spend the same token. That is the next trap.",
            },
        ],
        choice: {
            paragraphs: [
                "Use a token bucket per user. The bucket lives in Redis, so every API server sees the same count, and the check and spend run as a Lua script inside Redis. Stripe describes this design.",
                "Other options worth naming: a sliding window log is exact but stores one entry per request; a sliding window counter blends this window and the last and is close to exact with two counters; a leaky bucket smooths the output but adds queueing delay.",
            ],
            cost: "More moving parts than one counter: a script to maintain, and Redis on the path of every request. That is why the limiter has to decide what to do when Redis is down.",
            alsoSay: {
                title: "Interviewers also listen for: what Stripe adds",
                body: "Stripe runs four layers: the request rate limiter, a limiter on concurrent requests, and two load shedders that drop non-critical traffic when the fleet is busy. Its advice: fail open, return 429 for over-limit and 503 for shedding, dark-launch a limiter by logging what it would block, and keep a kill switch.",
            },
        },
        checks: [
            {
                q: "Why can a fixed window let through twice the limit?",
                a: "The count resets at the window edge. A user can use the whole limit at the end of one window and the whole limit again at the start of the next.",
            },
            {
                q: "Why must the count live in Redis and not in each server's memory?",
                a: "A user's requests are spread over every API server. With a count per server, four servers allow four times the limit.",
            },
            {
                q: "If Redis is down, should the limiter block or allow?",
                a: "Fail open and alert. A bug in the limiter should not take the whole API down.",
            },
        ],
        code: [
            { label: "Option A · fixed window", filename: "fixed-window.ts", code: RL_FIXED_WINDOW, note: "Example code. The tested versions land in the repo with each trap." },
            { label: "Option B · token bucket", filename: "token-bucket.lua", code: RL_TOKEN_BUCKET, note: "Example code. The tested versions land in the repo with each trap." },
        ],
        remember: "A fixed window is easy and leaks at the edges. A token bucket holds the average, and its check and spend must be one atomic step.",
        sourcePath: "systems/rate-limiter/00-core-design",
        updated: "2026-11-05",
    },
    {
        slug: "payments-core-design",
        title: "Idempotency keys",
        question: "The customer taps Pay, the request times out, and the app retries. Is the customer charged once or twice?",
        system: "Payments",
        rule: "Every payment carries an idempotency key the client creates once and reuses on retry. Claim the key in the database before calling the bank, keep the bank call outside any transaction, store the result after, treat a timeout as unknown, and read keys from the primary.",
        summary: {
            problem: "A timeout looks the same whether the bank never got the request, charged and lost the reply, or is just slow. A plain retry can charge the customer twice.",
            options: [
                { label: "Option A: retry the call", text: "Call the bank again on a timeout. Simple, and it charges twice whenever the first call actually went through." },
                { label: "Option B: idempotency key, three phases", text: "Record the key before the call, store the result after, and answer a retry with the stored result. This is what Airbnb runs." },
            ],
            choice: "An idempotency key on every payment, with Airbnb's three phases: record, call, record the result.",
        },
        why: [
            "A charge is the one write you cannot cheaply take back. The network between your server and the bank can drop the request, drop the reply, or be slow, and from your side all three are the same timeout.",
            "Airbnb built a library called Orpheus for exactly this, used across its payment services, and reports five nines of consistency while its payment volume doubled. Each of this week's traps is one of its rules being skipped.",
        ],
        words: ["idempotent", "idempotency-key", "timeout", "transaction", "unique-index", "replica"],
        picture: {
            intro: "The customer pays ₹2,000. The bank charges the card, but the reply is lost and the app times out.",
            flows: [
                {
                    title: "Option A: just retry",
                    steps: ["Pay → bank charges ₹2,000", "The reply is lost: timeout", "The app retries", "Bank charges ₹2,000 again"],
                    outcome: "₹4,000 taken for one order. The classic \"paise kat gaye\" support ticket.",
                    tone: "bug",
                },
                {
                    title: "Option B: idempotency key",
                    steps: ["Pay with key k1 → key recorded", "Bank charges ₹2,000, reply lost", "The app retries with the same k1", "Server sees k1, returns the stored result"],
                    outcome: "Charged once. The retry is safe and cheap.",
                    tone: "fix",
                },
            ],
        },
        options: [
            {
                label: "Option A: call the bank, retry on timeout",
                code: "charge(); on timeout → charge() again",
                good: "Nothing to build. Works whenever the first call really failed.",
                cost: "When the first call went through and only the reply was lost, the customer pays twice. Not retrying doesn't help: they tap Pay again.",
            },
            {
                label: "Option B: idempotency key with three phases",
                code: "claim key → call bank → store result",
                good: "A retry with the same key gets the first result back. The customer is charged once however many times the request arrives.",
                cost: "Every rule has to hold: claim the key atomically, no bank call inside a transaction, timeouts treated as unknown, keys read from the primary. Skipping any one is a trap this week.",
            },
        ],
        choice: {
            paragraphs: [
                "The client generates an idempotency key once per payment, saves it before calling, and sends the same key with every retry. The server runs Airbnb's three phases: record the request and key (no network calls), call the bank (no database work), record the result (no network calls).",
                "Airbnb's rules make it hold: keys live on the primary database, never a replica; each request holds an expiring lease on its key, longer than the bank call's timeout; 5XX and infrastructure errors are retryable, 4XX validation errors are not; and the client never changes the payload between retries.",
            ],
            cost: "One more table, a write before and after every charge, and a pruning job for old keys. Airbnb notes the three-phase split also makes the code harder to read.",
            alsoSay: {
                title: "Interviewers also listen for: what the key is",
                body: "A random UUID for one request, reused only by its retries. A deterministic key like payment-1234-refund for things that must happen once per entity, so two different clicks on Refund still refund once.",
            },
        },
        checks: [
            {
                q: "Why is a timeout dangerous on a payment?",
                a: "It doesn't tell you whether the bank charged the card. The request may have failed, or only the reply was lost.",
            },
            {
                q: "Why must the key be claimed before the bank call, not after?",
                a: "If two retries arrive together and both check first, both see nothing and both charge. Claiming the key in one statement lets only one through.",
            },
            {
                q: "Why does Airbnb read idempotency keys from the primary only?",
                a: "A replica can lag behind. A retry that reads it may not see the stored result and charge again.",
            },
        ],
        code: [
            { label: "Option A · retry the call", filename: "pay.naive.ts", code: PAY_NAIVE, note: "Example code. The tested versions land in the repo with each trap." },
            { label: "Option B · idempotency key", filename: "pay.idempotent.ts", code: PAY_IDEMPOTENT, note: "Example code. The tested versions land in the repo with each trap." },
        ],
        remember: "A timeout means unknown, not failed. Give every payment a key, claim it before the bank call, and answer retries from what you stored.",
        sourcePath: "systems/payments/00-core-design",
        updated: "2026-11-13",
    },
];

export function getAllDesigns(): DesignPageContent[] {
    return DESIGNS;
}

export function getDesignBySlug(slug: string): DesignPageContent | undefined {
    return DESIGNS.find((design) => design.slug === slug);
}
