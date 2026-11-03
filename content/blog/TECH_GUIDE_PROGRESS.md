# Tech Guide Progress (tech-guide-weekly)

Weekly practical upgrade / migration / fix guide. Not a published post. `draft-ready` means the draft and all checks are done and it is waiting for approval; it does not mean published.

| Run date (Asia/Kolkata) | Topic | Slug | Trigger + primary sources | Status | Validation | Notes |
| --- | --- | --- | --- | --- | --- | --- |
| 2026-11-01 | Node.js 26 is now LTS: SaaS production upgrade plan (**refresh**) | `nodejs-26-saas-production-upgrade` | Node.js 26 promoted to Active LTS on 2026-10-28 (26.13.0 "Lithium"); Oct 21 security release. Sources: [v26.13.0 notes](https://nodejs.org/en/blog/release/v26.13.0), [Release schedule](https://github.com/nodejs/Release), [v26.0.0 notes](https://nodejs.org/en/blog/release/v26.0.0), [Oct 2026 security releases](https://nodejs.org/en/blog/vulnerability/october-2026-security-releases), [deprecations](https://nodejs.org/api/deprecations.html) | draft-ready | validate:blog passed (2,166 prose words, 5 internal links, metaTitle 46, description 136, 3 FAQ); lint: 0 issues in content/blog (776 pre-existing errors elsewhere in src, untouched); `npx next build` passed (postbuild IndexNow hook skipped), page prerendered | Refresh in place: URL and original date 2026-07-27 kept, `updated` 2026-11-01. Existing cover reused (no new cover generated, to keep the URL's image and avoid --force). See notes below. |

## 2026-11-01 notes

**Why a refresh, not a new post.** The existing post's whole question was "Test now or wait for LTS?" and LTS arrived on Oct 28. Search Console already sends Node.js 26 upgrade traffic to this URL, so a new post would compete with it.

**What changed in the post.** New title ("Node.js 26 Is Now LTS: A SaaS Production Upgrade Plan"), metaTitle, description, primaryKeyword (`Node.js 26 LTS upgrade`); added support table (26 Active LTS to 2029-04-30, 24 Maintenance since 2026-10-20 to 2028-04-30, 22 EOL 2027-04-30), the Node 27 annual schedule change, libatomic warning, NODE_MODULE_VERSION 147, minimum safe patch 26.12.1 (Oct 21 security fixes), "what commonly breaks", rollback plan, FAQ (frontmatter + visible), Related Reading and Next Step. Trimmed the July-specific recommendation.

**Candidates considered and rejected this week.**
- Next.js 15 leaving maintenance LTS (reported 2026-10-21) + Next.js 16.4.1/15.5.28 security release (reported 2026-10-14): strong candidate, but only verified through secondary sites so far (CVE IDs not checked on nextjs.org / GitHub advisories). **Good pick for next week** after verifying on nextjs.org and the GitHub security advisories; different product from this week.
- Prisma 8: only a single community post claims an October GA; not verified from Prisma's changelog. Rejected.
- TypeScript 7.0: GA was July 8, 2026, outside the 30-day window. Rejected.

**Draft dev.to / Hashnode intro (not posted).**
Node.js 26 became Active LTS on October 28, 2026, so the "wait for LTS" advice no longer applies. This guide covers what actually changed (native addon rebuilds, libatomic on Linux, removed stream internals, Undici 8), which patch to deploy after the October 21 security release, and a step-by-step upgrade, test and rollback plan for production SaaS apps.

**Draft X thread outline (not posted).**
1. Node.js 26 is now LTS (26.13.0 "Lithium", Oct 28) and supported to April 2029. Node 24 moved to maintenance; Node 22 reaches end of life April 30, 2027.
2. The LTS release itself changes nothing but metadata. The breaking changes came in 26.0.0: NODE_MODULE_VERSION 147 (rebuild native addons), removed `writeHeader()` and `_stream_*` internals, runtime-deprecated `module.register()`.
3. Easy-to-miss one: official Linux binaries are linked against libatomic since Node 25. Slim images can build fine and fail at start-up.
4. Deploy 26.12.1 or newer: the Oct 21 security release fixed ten CVEs, four high (including the Brotli decoder and TLS IP checks).
5. Plan: inventory every place Node runs, baseline metrics, CI matrix 24+26, update all version sources together, canary, keep the last 24 image for rollback. Full guide: <canonical URL>
