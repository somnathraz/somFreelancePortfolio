# Notes inbox

The scheduled post run (Mon and Thu 9:00) only writes from entries marked `ready`. Your real notes are what make a post yours. Rough bullets or a voice-memo transcript are fine; typos are fine.

Status values: `draft` (I'm still collecting), `ready` (write it), `used` (already turned into a post).

Slots: Monday = buyer/evergreen post. Thursday = developer post from your own build work.

## Template (copy this block)

### <working title>
status: draft
slot: Monday | Thursday
what I built or did:
-
what broke or surprised me:
-
one real number (with unit, date, tool):
-
what I would do differently:
-
my honest opinion (one or two sentences):
-
screenshots or files (paths):
-

---

## Entries

### The double-booked seat (trap 01 of the booking series)
status: ready (facts confirmed by the author on 2026-10-28; gotchas are common developer experience, not personal; one open item: 'what I would do differently' may stay blank)
slot: Thursday (first traps post)
not before: 2026-10-29 (released: the author is ready to post this on Thursday 2026-10-29)
framing: educational scenario. Do NOT say it happened to me or that I experienced it. Write about what developers commonly experience ("developers often...", "a common mistake is..."). Label the scenario as a scenario. First person is only for my own opinions and for what I actually built and tested.
what I built or did:
- A growing list of "traps": known, popular bugs that many developers run into. Each has broken code, the fix and a test that proves it, so developers, especially new ones, can learn and avoid them.
- Series plan: first "how to design a bulletproof booking management system" (all booking traps), then the next topic. See doc/BOOKING_TRAPS_SERIES.md.
- Trap 01, from repo `somnathraz/interview-traps/01-booking-race-condition` (bug.ts, fix.ts, episode.ts, proof.test.ts, trace.json, schema.sql) and the replay at /labs/traps/booking-race-condition.
how I proved the fix (source: repo `proof.test.ts` and README; author to confirm):
- The test runs 50 concurrent users against one seat on a real Postgres.
- Bug test asserts: more than one booking row exists, and every booking row was told CONFIRMED.
- Fix test asserts: exactly one booking, exactly one CONFIRMED, the other 49 get SOLD_OUT, and the seat's owner matches the booking row.
- README run output: bug "Seat A1 sold 50 times. 50 users were told CONFIRMED."; fix "Seat A1 sold exactly once. 49 user(s) got SOLD_OUT."
- The recorded replay (2 users): the bug path ends with "Seat A1 sold 2 times. 2 users were told CONFIRMED."; the fix path ends with "Seat A1 sold exactly once. 1 user(s) got SOLD_OUT."
common gotchas (what many developers run into; NOT my personal experience, so never write "I hit this" or "it surprised me"):
- Race tests need a warmed-up connection pool. In this repo's own test run, a cold pool showed the bug only about 2 times out of 50, so a race test can look fine when the bug is still there (source: repo HANDOFF.md).
- The UPDATE in the buggy version overwrites booked_by with whoever wrote last, so the seat's owner and the bookings table do not even agree.
- With the slow step removed (the ~80 ms payment call) the bug still exists, just rarer, which is worse because it ships (README).
one real number (with unit, date, tool):
- 50 concurrent users, one seat, real Postgres, node:test (repo proof.test.ts). Payment call simulated at about 80 ms (README).
the fix (source: repo):
- Make the check part of the write: UPDATE seats SET status = 'booked', booked_by = $2 WHERE id = $1 AND status = 'available' RETURNING id; zero rows means SOLD_OUT. Then add a UNIQUE constraint on bookings(seat_id) as the safety net; the repo schema leaves it out on purpose so the bug is visible.
- Other accepted fixes (README table): SELECT ... FOR UPDATE inside a short transaction, UNIQUE constraint plus catching the violation, optimistic locking with a version column, a distributed lock (usually overkill).
what I would do differently:
- (not answered yet)
my honest opinion (one or two sentences):
- Most developers face the same problems, so listing the known bugs up front helps developers, especially new ones, avoid them.
- Rule from the repo: never check-then-act across two statements.
already published reels of this trap (from the tech pipeline, episode movie-ticket-race-condition-v2, published 2026-10-21):
- YouTube Short: https://www.youtube.com/shorts/IL_yaTJ-g3c ("This Code Sold One Seat To Two People. Find The Bug.")
- Instagram Reel: https://www.instagram.com/reel/18075774254741055/ ("INTERVIEW: BUILD BOOKING MANAGER. YOUR CODE HAS A BUG.")
- Facebook: not posted (confirmed by the author). Do not link a Facebook reel; the pipeline has a ready Facebook caption in output/packaging/movie-ticket-race-condition-v2/facebook.txt if he wants to post the video there.
- Script points already covered in the reel (claims reviewed as supported in the pipeline; verify against the PostgreSQL docs before publishing): code that passes one-request-at-a-time tests races under concurrent requests; "just add a transaction" is a common but incomplete answer (the READ COMMITTED trap); fix by putting the condition inside the write; other options: SELECT FOR UPDATE, optimistic locking with a version column, a unique constraint on show plus seat; interview rule: never do check and update in two separate round trips.
- Next-episode tease used in the reel: payment succeeded but the response timed out; retry or charge twice (idempotency).
screenshots or files (paths):
- content/traps/booking-race-condition.json (replay), repo: https://github.com/somnathraz/interview-traps/tree/main/01-booking-race-condition

---

### Should you rebuild or repair your SaaS?
status: draft (material collected from the site on 2026-10-28; needs the author's own opinion before it is ready)
slot: Monday (buyer post, target Monday 2026-11-02; editorial guide queue week 5)
brief (editorial guide): compare repair, incremental replacement and rebuild using risks, downtime and migration costs; link to /saas-mvp-audit and /services/production-readiness-upgrade.
what the Studio site already says (his published position, to confirm):
- /services/production-readiness-upgrade FAQ: "Usually not. In most cases the best result comes from focused upgrades and targeted cleanup, not rebuilding everything from scratch."
- Related existing posts to link: firebase-technical-debt, vercel-security-incident-production-readiness.
what I would say (author to fill in, even rough bullets):
- When I would repair:
-
- When I would replace one part at a time:
-
- When I would rebuild:
-
- The first thing I check before deciding (for example tests, deploys, data model, auth):
-
one real number or example (only if true, with unit and date; otherwise leave blank):
-
my honest opinion (one or two sentences):
-
