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
status: used (post drafted 2026-10-29 as content/blog/double-booked-seat-booking-race-condition.mdx, awaiting approval; was: ready, facts confirmed by the author on 2026-10-28; gotchas are common developer experience, not personal; one open item: 'what I would do differently' may stay blank)
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

---

### What a SaaS technical audit includes
status: draft (entry added by the Monday run on 2026-11-02; editorial guide queue week 6, after the rebuild-or-repair post)
slot: Monday (buyer post)
brief (editorial guide): explain inputs, review scope, deliverables and remediation priorities; link to /saas-mvp-audit and /services/production-readiness-upgrade.
related existing post to link: what-to-audit-in-a-vibe-coded-mvp-before-real-users-see-it.
questions (rough one-line answers are enough):
1. What do you ask a founder to hand over before you start (repo access, hosting, database, env/secrets list, error logs, analytics)?
2. Which areas do you actually review, in the order you look at them (for example auth, data model, deploys, tests, payments, performance)?
3. What does the founder get at the end: a written report, a call, a prioritised fix list, effort estimates? Roughly how long is it?
4. How long does an audit usually take you, in days, for a typical small SaaS? (only if true)
5. What is the most common serious problem you find, and how do you decide what gets fixed first?
6. One real example you can share without naming the client (what you found, what changed). Leave blank if none.
7. Your honest opinion: when is an audit NOT worth paying for?

---

### Five bugs in one URL shortener (traps: URL Shortener world rollup)
status: used (auto-written 2026-11-12 as content/blog/url-shortener-five-bugs-system-design.mdx, awaiting approval; was: draft, entry added by the Thursday run on 2026-11-05)
slot: Thursday (traps post, next possible Thursday 2026-11-12)
framing: not set yet, author to confirm. Default until then: educational scenario. Traps are common developer mistakes, never "it happened to me". First person only for what I built and tested and for my opinions.
what the repo already says (from interview-traps systems/url-shortener, author to confirm these are the numbers to quote):
- A 7-day build (commits 2026-10-28 to 2026-11-03): one design lesson, five runnable traps, a rollup, and `npm run shortener:all`.
- Scoreboard: "5/5 naive versions broke. 5/5 fixes held." 50 concurrent users each, real Postgres. Exact counts move between runs.
- Rollup output: 42.7 ms slowest redirect with the click counter on the hot path vs 0.8 ms batched. One DELETE of 300,000 expired rows hit the statement timeout and rolled back; the batched version cleared them and left 30,000 live links untouched.
- The cleanup demo scales the timeout to the laptop (production would be 30 s against billions of rows), so that number is a demo, not a benchmark.
- Latest commit in the rollup: two of the five bugs share the check-then-act shape, not three.
- Links: /labs/systems/url-shortener, https://github.com/somnathraz/interview-traps/tree/main/systems/url-shortener
questions (rough one-line answers are enough):
1. Why did you make this a week of one system instead of one-off traps? What did that change in how you built them?
2. Which of the five traps took you longest to make reproducible, and what was wrong with the first attempt? (You can only count what really happened while building the demo.)
3. The rollup was corrected from three check-then-act bugs to two. What made you recheck it, and which bug had been counted wrongly?
4. Which single number from `npm run shortener:all` do you want the post to lead with, and why that one? Run it once and paste the output with the date and your machine.
5. Scaling the statement timeout down for the cleanup trap: are you comfortable explaining that as a scaled demo, and is there anything you would change about it?
6. How have the reels and trap pages done so far: one real number each (views, repo stars, page visits, with date)? Leave blank if you have not checked.
7. Your honest opinion: which of the five would most candidates miss in an interview, and which is really a production problem and not an interview one?
8. What would you do differently in the Rate Limiter week now that this one is finished?
screenshots or files (paths):
-
