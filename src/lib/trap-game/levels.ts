import type { DbState, Lane, Level, Step } from "./engine";

const A = "#fbbf24";
const B = "#22d3ee";

const twoUsers = (a: string, b: string): Lane[] => [
    { id: "alice", label: a, server: "api-1", color: A },
    { id: "bob", label: b, server: "api-2", color: B },
];

const s = (code: string, op: Step["op"]): Step => ({ code, op });

const uniqueCodes = (db: DbState) => {
    const codes = (db.codes as string[]) ?? [];
    return codes.find((c, i) => codes.indexOf(c) !== i);
};

const count = (db: DbState, key: string) => ((db[key] as string[]) ?? []).length;

/** The in-process mutex fix is the same shape in several levels: it only holds on a single server. */
const mutexed = (lock: string, body: Step[]): Step[] => [
    s("const release = await mutex.acquire(); // this process only", { k: "lock", key: lock, scope: "server" }),
    ...body,
    s("release();", { k: "unlock", key: lock, scope: "server" }),
];

/** A redirect with cache-aside: serve from Redis, fill it from Postgres on a miss. */
const cacheAsideRedirect = (): Step[] => [
    s('const hit = await redis.get("link:g8");', { k: "read", key: "redis.link:g8", into: "hit" }),
    s('if (hit) return "SERVED_FROM_CACHE";', { k: "guard", var: "hit", test: "eq", to: null, else: "SERVED_FROM_CACHE" }),
    s('const target = await db.query("SELECT target …");', { k: "read", key: "postgres.target", into: "target" }),
    s('await redis.set("link:g8", target, "EX", 86400);', { k: "write", key: "redis.link:g8", value: { var: "target" } }),
    s('return "REDIRECTED";', { k: "respond", text: "REDIRECTED" }),
];

export const LEVELS: Level[] = [
    {
        id: "double-booked-seat",
        number: 1,
        title: "The double-booked seat",
        trap: "booking-race-condition",
        story: "One seat left. Alice and Bob both press Book, on two different servers. The handler checks that the seat is free, charges the card, then books it.",
        hint: "Let both of them look at the seat before either one books it.",
        lanes: twoUsers("Alice", "Bob"),
        initial: { seat: "available", bookings: [], charges: [] },
        invariants: [
            {
                label: "One seat, one booking",
                check: (db) => (count(db, "bookings") > 1 ? `Seat A1 now has ${count(db, "bookings")} bookings: ${(db.bookings as string[]).join(" and ")}.` : null),
            },
            {
                label: "Nobody pays for a seat they do not get",
                check: (db) => (count(db, "charges") > count(db, "bookings") ? `${count(db, "charges")} people were charged but only ${count(db, "bookings")} got a seat.` : null),
            },
        ],
        bug: (l) => [
            s('const seat = await db.get("seat");', { k: "read", key: "seat", into: "seat" }),
            s('if (seat !== "available") return "SOLD_OUT";', { k: "guard", var: "seat", test: "eq", to: "available", else: "SOLD_OUT" }),
            s(`await payments.charge("${l.id}");`, { k: "push", key: "charges", value: l.id }),
            s('await db.set("seat", "booked");', { k: "write", key: "seat", value: "booked" }),
            s(`await db.insert("bookings", "${l.id}");`, { k: "push", key: "bookings", value: l.id }),
            s('return "CONFIRMED";', { k: "respond", text: "CONFIRMED" }),
        ],
        fixes: [
            {
                id: "unique",
                title: "Add a UNIQUE constraint on bookings.seat_id",
                blurb: "Let the database reject the second booking.",
                why: "The constraint stops the double booking, but the check and the charge still race. The loser is charged and then turned away. A constraint is the backstop, not the fix.",
                program: (l) => [
                    s('const seat = await db.get("seat");', { k: "read", key: "seat", into: "seat" }),
                    s('if (seat !== "available") return "SOLD_OUT";', { k: "guard", var: "seat", test: "eq", to: "available", else: "SOLD_OUT" }),
                    s(`await payments.charge("${l.id}");`, { k: "push", key: "charges", value: l.id }),
                    s('await db.set("seat", "booked");', { k: "write", key: "seat", value: "booked" }),
                    s('const ok = await db.insertUnique("bookings", "A1");', { k: "pushUnique", key: "bookings", value: "A1", into: "ok" }),
                    s('if (!ok) return "SOLD_OUT";', { k: "guard", var: "ok", test: "eq", to: true, else: "SOLD_OUT" }),
                    s('return "CONFIRMED";', { k: "respond", text: "CONFIRMED" }),
                ],
            },
            {
                id: "claim",
                title: "Claim the seat in the UPDATE itself",
                blurb: "UPDATE seats SET status = 'booked' WHERE status = 'available'",
                why: "The check and the write are now one statement. The database lets exactly one request match the row. Whoever loses never reaches the payment.",
                program: (l) => [
                    s('const ok = await db.claim("seat", "available", "booked");', { k: "cas", key: "seat", expect: "available", set: "booked", into: "ok" }),
                    s('if (!ok) return "SOLD_OUT";', { k: "guard", var: "ok", test: "eq", to: true, else: "SOLD_OUT" }),
                    s(`await payments.charge("${l.id}");`, { k: "push", key: "charges", value: l.id }),
                    s(`await db.insert("bookings", "${l.id}");`, { k: "push", key: "bookings", value: l.id }),
                    s('return "CONFIRMED";', { k: "respond", text: "CONFIRMED" }),
                ],
            },
            {
                id: "recheck",
                title: "Check the seat again right before writing",
                blurb: "A second read just before the UPDATE.",
                why: "The window is smaller, not closed. Two requests can still both pass the second check before either one writes.",
                program: (l) => [
                    s('const seat = await db.get("seat");', { k: "read", key: "seat", into: "seat" }),
                    s('if (seat !== "available") return "SOLD_OUT";', { k: "guard", var: "seat", test: "eq", to: "available", else: "SOLD_OUT" }),
                    s(`await payments.charge("${l.id}");`, { k: "push", key: "charges", value: l.id }),
                    s('const again = await db.get("seat");', { k: "read", key: "seat", into: "again" }),
                    s('if (again !== "available") return "SOLD_OUT";', { k: "guard", var: "again", test: "eq", to: "available", else: "SOLD_OUT" }),
                    s('await db.set("seat", "booked");', { k: "write", key: "seat", value: "booked" }),
                    s(`await db.insert("bookings", "${l.id}");`, { k: "push", key: "bookings", value: l.id }),
                    s('return "CONFIRMED";', { k: "respond", text: "CONFIRMED" }),
                ],
            },
            {
                id: "for-update",
                title: "Lock the row with SELECT … FOR UPDATE",
                blurb: "Hold the row lock for the whole transaction.",
                why: "The second request waits at the lock until the first commits, then sees the seat as booked. It holds the lock across the payment call, which is the price: slow payments block everyone behind them.",
                program: (l) => [
                    s("BEGIN; SELECT … FOR UPDATE;", { k: "lock", key: "seat" }),
                    s('const seat = await db.get("seat");', { k: "read", key: "seat", into: "seat" }),
                    s('if (seat !== "available") return "SOLD_OUT";', { k: "guard", var: "seat", test: "eq", to: "available", else: "SOLD_OUT" }),
                    s(`await payments.charge("${l.id}");`, { k: "push", key: "charges", value: l.id }),
                    s('await db.set("seat", "booked");', { k: "write", key: "seat", value: "booked" }),
                    s(`await db.insert("bookings", "${l.id}");`, { k: "push", key: "bookings", value: l.id }),
                    s("COMMIT;", { k: "unlock", key: "seat" }),
                    s('return "CONFIRMED";', { k: "respond", text: "CONFIRMED" }),
                ],
            },
        ],
    },
    {
        id: "lost-update",
        number: 2,
        title: "The lost update",
        trap: "lost-update",
        story: "A wallet holds ₹100. Two checkout tabs each try to pay ₹80, landing on different servers. The handler reads the balance, checks it, then writes the new balance.",
        hint: "Both tabs need to read ₹100 before either one writes.",
        lanes: [
            { id: "tab1", label: "Tab 1", server: "api-1", color: A },
            { id: "tab2", label: "Tab 2", server: "api-2", color: B },
        ],
        initial: { balance: 100, ledger: [] },
        invariants: [
            {
                label: "The balance matches what was paid",
                check: (db) => {
                    const paid = count(db, "ledger");
                    const expected = 100 - 80 * paid;
                    return Number(db.balance) !== expected ? `${paid} payment${paid === 1 ? "" : "s"} of ₹80 went through, but the wallet shows ₹${db.balance} instead of ${expected < 0 ? "-" : ""}₹${Math.abs(expected)}.` : null;
                },
            },
            {
                label: "The wallet never goes below zero",
                check: (db) => (100 - 80 * count(db, "ledger") < 0 ? "₹160 was spent from a ₹100 wallet." : null),
            },
        ],
        bug: (l) => [
            s('const bal = await db.get("balance");', { k: "read", key: "balance", into: "bal" }),
            s("if (bal < 80) return \"INSUFFICIENT\";", { k: "guard", var: "bal", test: "gte", to: 80, else: "INSUFFICIENT" }),
            s('await db.set("balance", bal - 80);', { k: "write", key: "balance", value: { var: "bal", add: -80 } }),
            s('await db.insert("ledger", -80);', { k: "push", key: "ledger", value: `-80 (${l.id})` }),
            s('return "PAID";', { k: "respond", text: "PAID" }),
        ],
        fixes: [
            {
                id: "mutex",
                title: "Wrap it in a mutex",
                blurb: "A mutex around the read and the write.",
                why: "A mutex lives inside one process. These two requests are on different servers, so neither one ever sees the other's lock.",
                program: (l) => mutexed("wallet", [
                    s('const bal = await db.get("balance");', { k: "read", key: "balance", into: "bal" }),
                    s('if (bal < 80) return "INSUFFICIENT";', { k: "guard", var: "bal", test: "gte", to: 80, else: "INSUFFICIENT" }),
                    s('await db.set("balance", bal - 80);', { k: "write", key: "balance", value: { var: "bal", add: -80 } }),
                    s('await db.insert("ledger", -80);', { k: "push", key: "ledger", value: `-80 (${l.id})` }),
                    s('return "PAID";', { k: "respond", text: "PAID" }),
                ]),
            },
            {
                id: "atomic",
                title: "Debit inside the UPDATE",
                blurb: "UPDATE … SET balance = balance - 80 WHERE balance >= 80",
                why: "The database applies the subtraction to the current value, not to the value you read earlier. The condition and the write cannot be pulled apart.",
                program: (l) => [
                    s("const ok = await db.debit(80); // WHERE balance >= 80", { k: "incr", key: "balance", by: -80, min: 0, into: "ok" }),
                    s('if (!ok) return "INSUFFICIENT";', { k: "guard", var: "ok", test: "eq", to: true, else: "INSUFFICIENT" }),
                    s('await db.insert("ledger", -80);', { k: "push", key: "ledger", value: `-80 (${l.id})` }),
                    s('return "PAID";', { k: "respond", text: "PAID" }),
                ],
            },
            {
                id: "optimistic",
                title: "Optimistic locking",
                blurb: "Only write if the balance is still what I read.",
                why: "A stale writer matches zero rows and has to retry against the new balance. No lock is held, so it scales well when conflicts are rare.",
                program: (l) => [
                    s('const bal = await db.get("balance");', { k: "read", key: "balance", into: "bal" }),
                    s('if (bal < 80) return "INSUFFICIENT";', { k: "guard", var: "bal", test: "gte", to: 80, else: "INSUFFICIENT" }),
                    s("const ok = await db.setIf(\"balance\", bal, bal - 80);", { k: "cas", key: "balance", expect: { var: "bal" }, set: { var: "bal", add: -80 }, into: "ok" }),
                    s('if (!ok) return "RETRY";', { k: "guard", var: "ok", test: "eq", to: true, else: "RETRY" }),
                    s('await db.insert("ledger", -80);', { k: "push", key: "ledger", value: `-80 (${l.id})` }),
                    s('return "PAID";', { k: "respond", text: "PAID" }),
                ],
            },
            {
                id: "for-update",
                title: "Lock the wallet row",
                blurb: "SELECT balance FROM wallets FOR UPDATE",
                why: "The second tab waits until the first commits, then reads the new balance. Correct, but every payment on this wallet now queues.",
                program: (l) => [
                    s("BEGIN; SELECT … FOR UPDATE;", { k: "lock", key: "wallet" }),
                    s('const bal = await db.get("balance");', { k: "read", key: "balance", into: "bal" }),
                    s('if (bal < 80) return "INSUFFICIENT";', { k: "guard", var: "bal", test: "gte", to: 80, else: "INSUFFICIENT" }),
                    s('await db.set("balance", bal - 80);', { k: "write", key: "balance", value: { var: "bal", add: -80 } }),
                    s('await db.insert("ledger", -80);', { k: "push", key: "ledger", value: `-80 (${l.id})` }),
                    s("COMMIT;", { k: "unlock", key: "wallet" }),
                    s('return "PAID";', { k: "respond", text: "PAID" }),
                ],
            },
        ],
    },
    {
        id: "vanity-alias",
        number: 3,
        title: "The vanity alias race",
        trap: "url-shortener-vanity-alias-race",
        story: "A URL shortener lets people pick a custom alias. Alice and Bob both want /launch. The handler checks that it is free, then saves it.",
        hint: "Let both of them see /launch as free before either one saves it.",
        lanes: twoUsers("Alice", "Bob"),
        initial: { alias_owner: null },
        invariants: [
            {
                label: "An alias has exactly one owner",
                check: (db, r) => {
                    const told = Object.entries(r).filter(([, v]) => v === "CLAIMED").map(([id]) => id);
                    return told.length > 1 ? `Both were told /launch is theirs. Only ${db.alias_owner} actually owns it.` : null;
                },
            },
        ],
        bug: (l) => [
            s('const owner = await db.get("alias:/launch");', { k: "read", key: "alias_owner", into: "owner" }),
            s('if (owner !== null) return "TAKEN";', { k: "guard", var: "owner", test: "eq", to: null, else: "TAKEN" }),
            s(`await db.set("alias:/launch", "${l.id}");`, { k: "write", key: "alias_owner", value: l.id }),
            s('return "CLAIMED";', { k: "respond", text: "CLAIMED" }),
        ],
        fixes: [
            {
                id: "readback",
                title: "Read it back after saving",
                blurb: "Save, then confirm you are the owner.",
                why: "Last write wins, and each request reads back its own write. Both see themselves as the owner and both report success.",
                program: (l) => [
                    s('const owner = await db.get("alias:/launch");', { k: "read", key: "alias_owner", into: "owner" }),
                    s('if (owner !== null) return "TAKEN";', { k: "guard", var: "owner", test: "eq", to: null, else: "TAKEN" }),
                    s(`await db.set("alias:/launch", "${l.id}");`, { k: "write", key: "alias_owner", value: l.id }),
                    s('const now = await db.get("alias:/launch");', { k: "read", key: "alias_owner", into: "now" }),
                    s(`if (now !== "${l.id}") return "TAKEN";`, { k: "guard", var: "now", test: "eq", to: l.id, else: "TAKEN" }),
                    s('return "CLAIMED";', { k: "respond", text: "CLAIMED" }),
                ],
            },
            {
                id: "unique",
                title: "Unique index, INSERT … ON CONFLICT DO NOTHING",
                blurb: "Let the database decide who got there first.",
                why: "Claiming and checking are one statement. Exactly one insert succeeds and the other is told it affected zero rows.",
                program: (l) => [
                    s(`const ok = await db.insertIfFree("alias:/launch", "${l.id}");`, { k: "cas", key: "alias_owner", expect: null, set: l.id, into: "ok" }),
                    s('if (!ok) return "TAKEN";', { k: "guard", var: "ok", test: "eq", to: true, else: "TAKEN" }),
                    s('return "CLAIMED";', { k: "respond", text: "CLAIMED" }),
                ],
            },
            {
                id: "mutex",
                title: "Mutex around check and save",
                blurb: "An in-memory lock in the API.",
                why: "The mutex only exists inside one process. Two servers means two mutexes, and neither knows about the other.",
                program: (l) => mutexed("alias", [
                    s('const owner = await db.get("alias:/launch");', { k: "read", key: "alias_owner", into: "owner" }),
                    s('if (owner !== null) return "TAKEN";', { k: "guard", var: "owner", test: "eq", to: null, else: "TAKEN" }),
                    s(`await db.set("alias:/launch", "${l.id}");`, { k: "write", key: "alias_owner", value: l.id }),
                    s('return "CLAIMED";', { k: "respond", text: "CLAIMED" }),
                ]),
            },
            {
                id: "advisory",
                title: "Postgres advisory lock on the alias",
                blurb: "pg_advisory_xact_lock(hashtext('/launch'))",
                why: "There is no row to lock yet, so FOR UPDATE would not help here. An advisory lock keyed on the alias makes the second request wait, then see the first one's save.",
                program: (l) => [
                    s("BEGIN; SELECT pg_advisory_xact_lock(…);", { k: "lock", key: "alias" }),
                    s('const owner = await db.get("alias:/launch");', { k: "read", key: "alias_owner", into: "owner" }),
                    s('if (owner !== null) return "TAKEN";', { k: "guard", var: "owner", test: "eq", to: null, else: "TAKEN" }),
                    s(`await db.set("alias:/launch", "${l.id}");`, { k: "write", key: "alias_owner", value: l.id }),
                    s("COMMIT;", { k: "unlock", key: "alias" }),
                    s('return "CLAIMED";', { k: "respond", text: "CLAIMED" }),
                ],
            },
        ],
    },
    {
        id: "idempotency-race",
        number: 4,
        title: "The idempotency race",
        trap: "idempotency-race",
        story: "A client times out and retries the same payment with the same idempotency key. The handler looks the key up first, so a retry should be harmless.",
        hint: "The original request has not saved its key yet when the retry looks it up.",
        lanes: [
            { id: "first", label: "Original", server: "api-1", color: A },
            { id: "retry", label: "Retry", server: "api-2", color: B },
        ],
        initial: { idem_key: null, charges: [] },
        invariants: [
            {
                label: "One order is charged once",
                check: (db) => (count(db, "charges") > 1 ? `The customer was charged ${count(db, "charges")} times for one order.` : null),
            },
        ],
        bug: () => [
            s('const seen = await db.get("idem:ord_42");', { k: "read", key: "idem_key", into: "seen" }),
            s('if (seen) return "REPLAYED";', { k: "guard", var: "seen", test: "eq", to: null, else: "REPLAYED" }),
            s("await payments.charge(₹499);", { k: "push", key: "charges", value: "₹499" }),
            s('await db.set("idem:ord_42", "done");', { k: "write", key: "idem_key", value: "done" }),
            s('return "PAID";', { k: "respond", text: "PAID" }),
        ],
        fixes: [
            {
                id: "mark-early",
                title: "Save the key right after the check",
                blurb: "Mark it as in progress before charging.",
                why: "Checking and marking are still two steps. Both requests can pass the check before either one marks, and both charge.",
                program: () => [
                    s('const seen = await db.get("idem:ord_42");', { k: "read", key: "idem_key", into: "seen" }),
                    s('if (seen) return "REPLAYED";', { k: "guard", var: "seen", test: "eq", to: null, else: "REPLAYED" }),
                    s('await db.set("idem:ord_42", "in_progress");', { k: "write", key: "idem_key", value: "in_progress" }),
                    s("await payments.charge(₹499);", { k: "push", key: "charges", value: "₹499" }),
                    s('return "PAID";', { k: "respond", text: "PAID" }),
                ],
            },
            {
                id: "claim-first",
                title: "Claim the key with a unique insert, then charge",
                blurb: "INSERT idempotency_key … ON CONFLICT DO NOTHING",
                why: "The key is the lock. Only the request that inserts it goes on to charge. A retry that arrives mid-flight gets told to wait or replay.",
                program: () => [
                    s('const ok = await db.insertKey("idem:ord_42");', { k: "cas", key: "idem_key", expect: null, set: "in_progress", into: "ok" }),
                    s('if (!ok) return "REPLAYED";', { k: "guard", var: "ok", test: "eq", to: true, else: "REPLAYED" }),
                    s("await payments.charge(₹499);", { k: "push", key: "charges", value: "₹499" }),
                    s('await db.set("idem:ord_42", "done");', { k: "write", key: "idem_key", value: "done" }),
                    s('return "PAID";', { k: "respond", text: "PAID" }),
                ],
            },
            {
                id: "advisory",
                title: "Advisory lock on the key",
                blurb: "Serialize requests that share a key.",
                why: "Requests with the same key run one after another, so the retry always sees the finished result. It works, but a slow charge makes every retry wait.",
                program: () => [
                    s("BEGIN; SELECT pg_advisory_xact_lock(…);", { k: "lock", key: "idem" }),
                    s('const seen = await db.get("idem:ord_42");', { k: "read", key: "idem_key", into: "seen" }),
                    s('if (seen) return "REPLAYED";', { k: "guard", var: "seen", test: "eq", to: null, else: "REPLAYED" }),
                    s("await payments.charge(₹499);", { k: "push", key: "charges", value: "₹499" }),
                    s('await db.set("idem:ord_42", "done");', { k: "write", key: "idem_key", value: "done" }),
                    s("COMMIT;", { k: "unlock", key: "idem" }),
                    s('return "PAID";', { k: "respond", text: "PAID" }),
                ],
            },
        ],
    },
    {
        id: "id-collision",
        number: 5,
        title: "The ID collision",
        trap: "url-shortener-id-collision",
        story: "A URL shortener turns an auto-increment counter into a short code. Two requests shorten different URLs at the same instant. The handler reads the counter, bumps it, and encodes what it read.",
        hint: "Both requests need to read the same counter value.",
        lanes: twoUsers("Alice", "Bob"),
        initial: { counter: 1000, codes: [] },
        invariants: [
            {
                label: "Every short code is unique",
                check: (db) => {
                    const dup = uniqueCodes(db);
                    return dup ? `Two different URLs now share the code ${dup}. Every click goes to whichever was saved last.` : null;
                },
            },
        ],
        bug: () => [
            s('const n = await db.get("counter");', { k: "read", key: "counter", into: "n" }),
            s('await db.set("counter", n + 1);', { k: "write", key: "counter", value: { var: "n", add: 1 } }),
            s("await db.insert(\"links\", encode(n));", { k: "push", key: "codes", value: { var: "n" } }),
            s('return "SHORTENED";', { k: "respond", text: "SHORTENED" }),
        ],
        fixes: [
            {
                id: "mutex",
                title: "Mutex around the counter",
                blurb: "Only one request touches the counter at a time.",
                why: "Each server has its own mutex, so the two requests never wait for each other.",
                program: () => mutexed("counter", [
                    s('const n = await db.get("counter");', { k: "read", key: "counter", into: "n" }),
                    s('await db.set("counter", n + 1);', { k: "write", key: "counter", value: { var: "n", add: 1 } }),
                    s('await db.insert("links", encode(n));', { k: "push", key: "codes", value: { var: "n" } }),
                    s('return "SHORTENED";', { k: "respond", text: "SHORTENED" }),
                ]),
            },
            {
                id: "returning",
                title: "UPDATE … RETURNING",
                blurb: "Increment and read in the same statement.",
                why: "The database hands each request its own number and moves the counter in one step. This is what a Postgres SEQUENCE does for you.",
                program: () => [
                    s("const n = await db.nextId(); // UPDATE … RETURNING", { k: "fetchIncr", key: "counter", by: 1, into: "n" }),
                    s('await db.insert("links", encode(n));', { k: "push", key: "codes", value: { var: "n" } }),
                    s('return "SHORTENED";', { k: "respond", text: "SHORTENED" }),
                ],
            },
            {
                id: "for-update",
                title: "Lock the counter row",
                blurb: "SELECT value FROM counters FOR UPDATE",
                why: "Correct, but every shorten request now queues on one row. A sequence or an atomic increment gives the same guarantee without the queue.",
                program: () => [
                    s("BEGIN; SELECT … FOR UPDATE;", { k: "lock", key: "counter" }),
                    s('const n = await db.get("counter");', { k: "read", key: "counter", into: "n" }),
                    s('await db.set("counter", n + 1);', { k: "write", key: "counter", value: { var: "n", add: 1 } }),
                    s('await db.insert("links", encode(n));', { k: "push", key: "codes", value: { var: "n" } }),
                    s("COMMIT;", { k: "unlock", key: "counter" }),
                    s('return "SHORTENED";', { k: "respond", text: "SHORTENED" }),
                ],
            },
        ],
    },
    {
        id: "stale-redirect",
        number: 6,
        title: "The stale redirect",
        trap: "url-shortener-stale-redirect",
        story: "sho.rt/g8 points to old-site.com and its cached copy in Redis has just expired. A visitor opens the link at the same moment the owner changes it to new-site.com. Redirects read the cache and fill it from Postgres on a miss; edits update Postgres, then delete the cached copy.",
        hint: "Let the visitor read Postgres before the edit, but write the cache after it.",
        lanes: [
            { id: "visitor", label: "Visitor", server: "api-1", color: A },
            { id: "owner", label: "Owner", server: "api-2", color: B },
        ],
        initial: { "postgres.target": "old-site.com", "redis.link:g8": null },
        invariants: [
            {
                label: "The cache never disagrees with the database",
                check: (db) => {
                    const cached = db["redis.link:g8"];
                    return cached !== null && cached !== db["postgres.target"]
                        ? `Redis still sends visitors to ${cached}, but the link now points to ${db["postgres.target"]}. It stays wrong until the cache entry expires.`
                        : null;
                },
            },
        ],
        bug: (l) => (l.id === "visitor" ? cacheAsideRedirect() : [
            s('await db.query("UPDATE links SET target = $2 …");', { k: "write", key: "postgres.target", value: "new-site.com" }),
            s('await redis.del("link:g8");', { k: "write", key: "redis.link:g8", value: null }),
            s('return "SAVED";', { k: "respond", text: "SAVED" }),
        ]),
        fixes: [
            {
                id: "delete-first",
                title: "Delete the cache first, then update the database",
                blurb: "Clear the old copy before writing the new value.",
                why: "The visitor can still miss, read the old target, and write it back after the delete. Swapping the order just moves the gap.",
                program: (l) => (l.id === "visitor" ? cacheAsideRedirect() : [
                    s('await redis.del("link:g8");', { k: "write", key: "redis.link:g8", value: null }),
                    s('await db.query("UPDATE links SET target = $2 …");', { k: "write", key: "postgres.target", value: "new-site.com" }),
                    s('return "SAVED";', { k: "respond", text: "SAVED" }),
                ]),
            },
            {
                id: "double-delete",
                title: "Delete the cache twice",
                blurb: "Delete, update, wait a moment, delete again.",
                why: "A slow visitor that read the old target before the update can still write it after the second delete. It shrinks the gap; it does not close it.",
                program: (l) => (l.id === "visitor" ? cacheAsideRedirect() : [
                    s('await redis.del("link:g8");', { k: "write", key: "redis.link:g8", value: null }),
                    s('await db.query("UPDATE links SET target = $2 …");', { k: "write", key: "postgres.target", value: "new-site.com" }),
                    s('await sleep(500); await redis.del("link:g8");', { k: "write", key: "redis.link:g8", value: null }),
                    s('return "SAVED";', { k: "respond", text: "SAVED" }),
                ]),
            },
            {
                id: "lease",
                title: "Fill the cache only with a lease",
                blurb: "On a miss, leave a marker. The edit's delete removes it, and the stale fill is refused.",
                why: "The fill only lands if the visitor's marker is still there. Any edit in between deletes the marker, so a value read before the edit can never be written after it.",
                program: (l) => (l.id === "visitor" ? [
                    s('const lease = await redis.set("link:g8", "fill:v1", "NX");', { k: "cas", key: "redis.link:g8", expect: null, set: "fill:v1", into: "lease" }),
                    s('if (!lease) return "SERVED_FROM_CACHE";', { k: "guard", var: "lease", test: "eq", to: true, else: "SERVED_FROM_CACHE" }),
                    s('const target = await db.query("SELECT target …");', { k: "read", key: "postgres.target", into: "target" }),
                    s('await redis.eval(FILL_IF_OURS, "link:g8", "fill:v1", target);', { k: "cas", key: "redis.link:g8", expect: "fill:v1", set: { var: "target" }, into: "filled" }),
                    s('return "REDIRECTED";', { k: "respond", text: "REDIRECTED" }),
                ] : [
                    s('await db.query("UPDATE links SET target = $2 …");', { k: "write", key: "postgres.target", value: "new-site.com" }),
                    s('await redis.del("link:g8"); // also drops any lease', { k: "write", key: "redis.link:g8", value: null }),
                    s('return "SAVED";', { k: "respond", text: "SAVED" }),
                ]),
            },
            {
                id: "lock",
                title: "Lock the link row for misses and edits",
                blurb: "SELECT … FOR UPDATE around the fill and around the edit.",
                why: "Correct: a fill and an edit can no longer overlap. But every cache miss now holds a database lock while it talks to Redis, right on the redirect path.",
                program: (l) => (l.id === "visitor" ? [
                    s('const hit = await redis.get("link:g8");', { k: "read", key: "redis.link:g8", into: "hit" }),
                    s('if (hit) return "SERVED_FROM_CACHE";', { k: "guard", var: "hit", test: "eq", to: null, else: "SERVED_FROM_CACHE" }),
                    s("BEGIN; SELECT target … FOR UPDATE;", { k: "lock", key: "link" }),
                    s('const target = await db.query("SELECT target …");', { k: "read", key: "postgres.target", into: "target" }),
                    s('await redis.set("link:g8", target);', { k: "write", key: "redis.link:g8", value: { var: "target" } }),
                    s("COMMIT;", { k: "unlock", key: "link" }),
                    s('return "REDIRECTED";', { k: "respond", text: "REDIRECTED" }),
                ] : [
                    s("BEGIN; SELECT … FOR UPDATE;", { k: "lock", key: "link" }),
                    s('await db.query("UPDATE links SET target = $2 …");', { k: "write", key: "postgres.target", value: "new-site.com" }),
                    s('await redis.del("link:g8");', { k: "write", key: "redis.link:g8", value: null }),
                    s("COMMIT;", { k: "unlock", key: "link" }),
                    s('return "SAVED";', { k: "respond", text: "SAVED" }),
                ]),
            },
        ],
    },
];

export const getLevel = (id: string) => LEVELS.find((level) => level.id === id);
