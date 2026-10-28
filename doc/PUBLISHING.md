# Publishing plan — 2 posts a week

Status: proposed. Nothing is posted to any external site without your approval of that post.

## Schedule (created 2026-10-28)

Scheduled task `studio-twice-weekly-post`: Monday and Thursday 09:00 local time (runs while the Claude app is open; if closed, it runs on next launch).
- Each run prepares the next post from your notes in `content/blog/NOTES_INBOX.md` (status `ready`) and stops. It never commits, deploys or posts by itself.
- No `ready` notes: it writes no post, adds questions to the inbox, and notifies you.
- You approve in a live session by saying "go"; then publishing runs in the in-app browser in the order below.

## Where each post goes (decided 2026-10-28)

| Post | Slot | Goes to | Skips |
|---|---|---|---|
| Buyer / evergreen | Monday 09:00 | Studio site first, then Dev.to, Hashnode, Medium (canonical link back, Medium a day later via Import), Facebook Page (Buildwithsom), a short Peerlist post | Hackernoon, Indie Hackers, daily.dev |
| Traps / Labs build story | Thursday 09:00 | Studio site first, then Dev.to, Hashnode, Medium, daily.dev, Indie Hackers, Peerlist, Facebook Page and personal profile, X (if confirmed). LinkedIn is posted by you | Hackernoon unless it is an original first-person piece (about monthly, not a copy) |
| Weekly digest | Thursday run | Substack: short digest of the week's two posts, web only, no email | |

Why: developers on Dev.to and Hashnode are not buyers (a buyer-style post got 32 views there), so buyer posts mainly rank on the Studio site and the copies are cheap backlinks. Traps posts reach developers, who star repos.

Ground rules:
1. Studio site first, every copy carries the canonical link.
2. Medium a day later, using Import.
3. Do not paste identical text where an original is expected; change the intro for Indie Hackers and Peerlist.
4. Judge the third-party copies by GitHub stars, trap-page clicks and Studio search visits, not by views on those sites. Give it 60 to 90 days.
5. Daily Labs and traps reels (Instagram, Facebook, Shorts, X) are handled by you; each should link to its trap page on the Studio site. Blog posts on dev sites are the weekly roundup or one deep dive, never one per daily trap.

## Order (every post)

1. **somanathkhadanga.com first** (canonical). Commit, deploy, confirm the live URL loads.
2. Then the other sites, in the order of `scripts/publish-log.mjs platforms`.
3. Every attempt is logged: `node scripts/publish-log.mjs set <slug> <platform> <success|failed|manual|skipped> --url ... --note ...`
4. Weekly: `node scripts/publish-log.mjs report` shows what succeeded, what failed and why. Log file: `doc/publish-log.json`.

Slots: Monday 9:00 IST buyer/evergreen post, Thursday 9:00 IST dev post (news posts at most once a month).

## Platforms

| Platform | How | Who acts | Notes |
|---|---|---|---|
| Studio site | git commit + deploy | You approve, Claude prepares | verify live URL, then log success |
| Dev.to | API (needs a DEV API key) or browser | Claude after your approval | set `canonical_url` to the site post |
| Hashnode (BuildSaas) | GraphQL API (needs token) or browser | Claude after your approval | set original article URL |
| Medium | Import-from-URL in the browser | Claude after your approval, or you | next day; import sets the canonical tag. Medium's own API may not issue new tokens: unverified |
| Substack | browser only (no public posting API) | Claude after your approval | weekly roundup of the two posts |
| Hackernoon | submission editor (editorial review) | you or Claude | may be rejected or delayed; log as manual/pending |
| Peerlist | browser, "Scroll" post | you or Claude | short post with link |
| Facebook (Page + profile) | browser or Graph API | Claude after your approval | all-in: every post, cover, link; groups by hand |
| LinkedIn | manual | **you** | **only posts about things built for Labs and traps** (Somanath Labs / interview-traps / WebGL templates); written as developer experience, no promotion |
| Instagram | manual | **you** | Claude only observes (public numbers, screenshots) |
| YouTube | manual | **you** | Claude only observes (Studio numbers you share, public page) |

## Labs and traps posts (separate track)

Posts about things built for Somanath Labs and traps (interview-traps, traps lab, WebGL templates) go to:
- **LinkedIn** (you post), **Facebook personal profile**, **Indie Hackers**, **Hackernoon**, **daily.dev**.
- The Facebook **personal profile** gets Labs/traps posts only. Normal dev and buyer posts go to the **Buildwithsom Page**, not the personal profile.

## Observation (Instagram and YouTube)

Sunday: Claude reads the public pages (and any Studio screenshots you send) and writes followers, subscribers, views and top video into the weekly table in `doc/GOALS.md`. Claude does not post, comment or change anything there.

## Rules

- One approval per post before anything is sent outside the repo.
- Failures are never hidden: a failed platform stays `failed` with the reason until fixed.
- Credentials (API keys, tokens) live in `.env` only; never in the log.
- Covers come from `scripts/generate-cover.mjs` (about $0.135 each).
