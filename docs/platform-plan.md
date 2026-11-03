# Developer platform plan

Goal: be known as a senior engineer who ships, and send qualified readers to somanathkhadanga.com, without looking promotional.

Data pulled 2026-10-30: SEMrush SERP analysis (US) for six blog topics, plus dev.to dashboard stats.

## What the data says

### Which platforms rank on Google page one for our topics

| Topic searched | Third-party platforms in the top 10 |
|---|---|
| react compiler | dev.to, reddit.com, linkedin.com, news.ycombinator.com, x.com, stackoverflow.com, github.com |
| vibe coding security | reddit.com, youtube.com (rest are security vendors) |
| npm supply chain attack | reddit.com, youtube.com, github.blog (rest are vendors and CISA) |
| how much does an mvp cost | reddit.com (#1), then agency blogs |

Reddit appears in every result. Medium, Hashnode, HackerNoon and Substack did not appear on page one for any of these topics.

### How full cross-posts are doing

dev.to: 10 cross-posted articles, under 500 views in total, 2 reactions, 0 comments, 7 followers. Long blog posts copied onto community platforms get little reach there; those communities reward native, shorter, discussion-style posts.

## Verdict per platform

| Platform | Worth it? | How to use it |
|---|---|---|
| Reddit (r/nextjs, r/reactjs, r/webdev, r/SaaS, r/startups) | High | Answer questions with real detail. Link to a post only when it directly answers the question, and say it is yours. Never post the same link to several subreddits. |
| LinkedIn | High | Native text posts (no link in the post body), 2 a week. Best channel for founder and agency buyers. |
| X / Bluesky | Medium | Short build notes and threads from blog content; 3-4 a week. |
| Hacker News | Medium, occasional | Show HN for Labs / Traps or an open-source template. Not for blog dumps. |
| daily.dev | Medium | Request blog source using `/rss.xml` so new posts enter feeds automatically; share in one relevant Squad. |
| dev.to | Medium | Switch from full copies to short native posts ("3 bugs after upgrading to Next.js 16") and discussion threads; keep canonical on any full copy. |
| Substack | Medium (owned audience) | A newsletter every 2 weeks: 3-5 takeaways and links to the full posts. No full copies (Substack has no canonical setting). |
| HackerNoon | Low-medium | 1-2 strongest pieces a quarter, submitted for editorial review with the canonical URL set. |
| Medium, Hashnode | Low | Keep existing posts (canonicals now fixed). Cross-post only the best pieces, always with canonical set. |
| Stack Overflow | Low effort, steady | Answer Next.js caching / App Router questions; profile links to the site. |

## Posting rules

1. Value first: at least 4 of every 5 posts or comments contain no link.
2. Platform-native: rewrite for each platform; never paste the same text in several places on the same day.
3. Canonical always: any full copy of an article points its canonical URL at the original.
4. Disclose: when linking your own post or service, say it is yours.
5. No mass posting: one subreddit or community per link, and only where it answers a real question.
6. No engagement pods, bought upvotes, or link exchanges.

## Weekly rhythm (about 3-4 hours)

| Day | Post |
|---|---|
| Mon | LinkedIn: one lesson from a project or a blog post |
| Tue | X/Bluesky: short build note |
| Wed | Reddit: answer 2-3 questions |
| Thu | LinkedIn or dev.to short post |
| Fri | X/Bluesky thread from the week's blog post |
| Every 2nd week | Substack issue |

## Drafts for approval

Nothing below has been posted. Each one needs your yes before publishing.

### LinkedIn (from the Next.js 16 caching post, no link in the body)

> Three bugs I keep seeing after teams upgrade to Next.js 16:
>
> 1. "The dashboard got slower." fetch() is no longer cached by default, so widgets that used to be served from cache now hit the API on every load. Find the 3-4 widgets that don't need to be live and cache them.
>
> 2. "Some users see other users' data." A caching directive copied from a tutorial onto a per-user function, without the user or org ID in the cache key. Rare, but serious. Every cached function that returns per-user data needs the user or org in its key.
>
> 3. "Revalidation stopped working." Old revalidate config kept around with 'use cache' added on top. They don't combine the way you'd expect. Pick one strategy per route.
>
> If you're planning the upgrade: measure first, upgrade on a branch without touching caching, then decide what to cache route by route.

(Full write-up link goes in the first comment only if someone asks.)

### X / Bluesky thread (from the vibe-coded MVP audit post)

> 1/ Built your MVP with Cursor or Claude Code? Before more people use it, check the parts AI tools skip. Short list:
>
> 2/ Auth on every API route. Middleware is a convenience layer, not a security boundary. If /api/admin/users doesn't check the session itself, it's open.
>
> 3/ Webhook signatures. Stripe CLI verifies locally, so the missing check never shows up in dev. In production, anyone can POST fake events.
>
> 4/ Error messages. Stack traces and SQL errors in API responses tell attackers your schema.
>
> 5/ Rate limits on sign-up, login and anything that sends email or calls an LLM.
>
> 6/ Full checklist in my write-up: https://somanathkhadanga.com/blog/what-to-audit-in-a-vibe-coded-mvp-before-real-users-see-it

### dev.to short post (native, not a copy)

Title: "Middleware is not your auth layer (a Next.js footgun I keep finding)"

Body outline: the unsafe route handler pattern and the fixed version (from the audit post's auth section), why middleware can be skipped or misconfigured, a one-line rule ("every route that touches user data verifies the session itself"), and a question to readers: "Do you re-check auth in route handlers or rely on middleware?" Optional last line: "Longer checklist on my blog" with the link.

### daily.dev source request

Blocked for now: daily.dev says the account does not have enough reputation to suggest a source. Reputation comes from upvotes on comments and posts there. Retry https://somanathkhadanga.com/rss.xml at daily.dev/sources > "Suggest new source" after a few weeks of genuine comments.

## Status 2026-10-30

- X: thread posted (6 posts) https://x.com/KhadangaSomnath/status/2116142565066199189
- daily.dev: source request blocked by reputation (see above).
- Bluesky: not signed in. Reddit: cannot be opened in the in-app browser (use Chrome or post yourself).
- LinkedIn: skipped at your request.
- dev.to: posted "Middleware is not your auth layer" (tags nextjs, security, webdev, javascript): https://dev.to/somnath_khadanga_2e5c2364/middleware-is-not-your-auth-layer-a-nextjs-footgun-i-keep-finding-2n31
- Substack: issue #1 "Three things that break after you ship" sent to everyone, without subscribe buttons.
- HackerNoon (later, 2026-10-30): link-free version of "Your SaaS Login Is Not Tenant Isolation" submitted for editorial review (draft 6ae48f64973fb0422c2fc540). Settings: republished from personal site, original URL set, distribution "BACKLINK" (canonical to the blog), category Software Engineering, tags saas/cybersecurity/postgresql/software-architecture/multi-tenancy, 0 links to somanathkhadanga.com in the body. Text in docs/hackernoon-tenant-isolation.md.
- HackerNoon (earlier): editors rejected earlier submissions on 2026-07-17 and 2026-10-29 with "Promoting links in stories? You would need to enter our brand as author program instead." Any HackerNoon piece must have no links to service pages or CTAs (one link to a relevant blog post at most), or it will be rejected again.
- Substack already has 3 older posts that are full copies of blog articles (Substack cannot set a canonical). Consider trimming them to summaries that link to the originals.

## Final texts awaiting approval

### dev.to (native post, not a copy)

Title: Middleware is not your auth layer (a Next.js footgun I keep finding)

Tags: nextjs, security, webdev, javascript

> When I audit Next.js apps built quickly (often with AI tools), one pattern shows up more than any other: routes are protected in `middleware.ts`, and the API route handlers trust that.
>
> ```ts
> // app/api/admin/users/route.ts
> export async function GET(request: NextRequest) {
>   // "middleware already checked"
>   const users = await db.user.findMany()
>   return NextResponse.json(users)
> }
> ```
>
> Middleware can be skipped by a matcher that doesn't cover a new route, misconfigured during a refactor, or bypassed by calling the API directly. If the handler doesn't check, the data is open.
>
> The fix is boring: every handler that touches user data verifies the session and role itself.
>
> ```ts
> export async function GET(request: NextRequest) {
>   const session = await getServerSession(authOptions)
>   if (!session) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
>   if (session.user.role !== 'admin') return NextResponse.json({ error: 'Forbidden' }, { status: 403 })
>
>   const users = await db.user.findMany()
>   return NextResponse.json(users)
> }
> ```
>
> Two related checks worth doing while you're there:
>
> - Hiding the admin dashboard in React when `role !== 'admin'` is UI gating, not access control. The API behind it still needs the server-side check.
> - Delete a user's session row and make a request with their old cookie. If it still works, revocation isn't wired up.
>
> Rule of thumb: middleware is a convenience layer for redirects and early exits. The security boundary is the handler.
>
> How do you handle this in your apps: a shared `requireUser()` helper, or checks inline in each route?

(No link to the site in the body. If someone asks for more, reply with the full audit checklist link.)

### Substack issue #1 (publication "Somanath")

Title: Three things that break after you ship

Subtitle: Notes from production SaaS work, every two weeks

> Hi, I'm Somanath. I build and fix SaaS products for founders, mostly Next.js, Node.js and PostgreSQL. Every two weeks I'll send a short note on what actually breaks in production and how to avoid it. No fluff, no sales pitch.
>
> **1. Next.js 16 caching moved to opt-in.** `fetch()` is no longer cached by default, so dashboards that felt fast can suddenly hit the API on every load. Measure before upgrading, upgrade on a branch without changing caching, then cache the few widgets that don't need to be live. If a cached function returns per-user data, the user or org ID must be in its cache key.
>
> **2. Middleware is not an auth layer.** Route handlers that touch user data should check the session and role themselves. UI gating in React is not access control.
>
> **3. Webhooks need signature checks.** Stripe CLI verifies locally, so a missing check never shows up in development. In production, anyone can POST fake events to an unverified endpoint.
>
> Longer write-ups if you want the detail:
> - Next.js 16 caching changes: https://somanathkhadanga.com/blog/nextjs-16-app-router-caching-changes-saas
> - What to audit in a vibe-coded MVP: https://somanathkhadanga.com/blog/what-to-audit-in-a-vibe-coded-mvp-before-real-users-see-it
>
> Reply and tell me what broke in your last release. I read every reply.

### HackerNoon (editorial submission)

Proposed piece: "Your SaaS Login Is Not Tenant Isolation: A Founder's Blueprint" (/blog/saas-tenant-isolation-authorization-blueprint, ~2,500 words). Chosen because it has not been cross-posted anywhere yet and is evergreen. Submit the full article with the canonical URL set to the original; HackerNoon editors review before publishing.

## What needs you

- Log in (in the in-app browser) to: Substack, HackerNoon, daily.dev, Reddit, X/Bluesky.
- Approve or edit each draft before it is posted.
- Reddit and LinkedIn are best written in your own voice; use the drafts as starting points.
