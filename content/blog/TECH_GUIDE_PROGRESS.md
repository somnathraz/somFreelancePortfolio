# Tech Guide Progress (tech-guide-weekly)

Weekly practical upgrade / migration / fix guide. Not a published post. `draft-ready` means the draft and all checks are done and it is waiting for approval; it does not mean published.

| Run date (Asia/Kolkata) | Topic | Slug | Trigger + primary sources | Status | Validation | Notes |
| --- | --- | --- | --- | --- | --- | --- |
| 2026-11-01 | Node.js 26 is now LTS: SaaS production upgrade plan (**refresh**) | `nodejs-26-saas-production-upgrade` | Node.js 26 promoted to Active LTS on 2026-10-28 (26.13.0 "Lithium"); Oct 21 security release. Sources: [v26.13.0 notes](https://nodejs.org/en/blog/release/v26.13.0), [Release schedule](https://github.com/nodejs/Release), [v26.0.0 notes](https://nodejs.org/en/blog/release/v26.0.0), [Oct 2026 security releases](https://nodejs.org/en/blog/vulnerability/october-2026-security-releases), [deprecations](https://nodejs.org/api/deprecations.html) | draft-ready | validate:blog passed (2,166 prose words, 5 internal links, metaTitle 46, description 136, 3 FAQ); lint: 0 issues in content/blog (776 pre-existing errors elsewhere in src, untouched); `npx next build` passed (postbuild IndexNow hook skipped), page prerendered | Refresh in place: URL and original date 2026-07-27 kept, `updated` 2026-11-01. Existing cover reused (no new cover generated, to keep the URL's image and avoid --force). See notes below. |
| 2026-11-04 | Prisma Accelerate retires December 1: SaaS migration guide | `prisma-accelerate-retirement-migration` | Accelerate retirement on 2026-12-01; Prisma ORM 6 security patches end 2026-11-19; `prisma@latest` is the ORM 8 RC. Sources: [Prisma changelog 2026-10-02](https://www.prisma.io/changelog/2026-10-02), [Connect without Accelerate](https://www.prisma.io/docs/postgres/database/switch-from-accelerate), [Keep your existing database](https://www.prisma.io/docs/accelerate/keep-your-database), [Connection pooling](https://www.prisma.io/docs/postgres/database/connection-pooling), [Release status](https://www.prisma.io/docs/orm/release-status), npm dist-tags | draft-ready | validate:blog passed (1,975 prose words, 3 internal blog links, metaTitle 57, description 159, 3 FAQ); lint: 0 errors from this post (776 pre-existing errors elsewhere, untouched); `npx next build` passed (postbuild IndexNow hook skipped), page prerendered (build ran before three small wording edits; validate:blog re-run after them) | New post, diagram cover. Local and uncommitted. See notes below. |
| 2026-11-11 | `ubuntu-latest` moves to Ubuntu 26.04 in GitHub Actions: migration guide | `github-actions-ubuntu-latest-26-04-migration` | `ubuntu-latest` label migrates from Ubuntu 24.04 to 26.04 between 2026-10-19 and 2026-11-19 (26.04 images GA 2026-09-17). Sources: [GitHub changelog 2026-09-17](https://github.blog/changelog/2026-09-17-ubuntu-26-generally-available-and-latest-migration/), [runner-images #14748](https://github.com/actions/runner-images/issues/14748), [#14747](https://github.com/actions/runner-images/issues/14747), [Ubuntu 24.04 software list](https://github.com/actions/runner-images/blob/main/images/ubuntu/Ubuntu2404-Readme.md), [Ubuntu 26.04 software list](https://github.com/actions/runner-images/blob/main/images/ubuntu/Ubuntu2604-Readme.md), [Ubuntu 22.04 deprecation #14254](https://github.com/actions/runner-images/issues/14254), [runner-images README policy](https://github.com/actions/runner-images) | draft-ready | validate:blog passed (2,034 prose words, 3 internal blog links, metaTitle 55, description 158, 3 FAQ); lint: 776 errors, same pre-existing count, none from this post; `npx next build` passed (postbuild IndexNow hook skipped), page prerendered | New post, diagram cover. Local and uncommitted. See notes below. |

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

## 2026-11-04 notes

**Topic choice.** Prisma had no existing post, and the last guide was a Node.js refresh, so product and type both rotate. It is a dated forced migration, not a security advisory.

**Rejected this week.**
- Next.js Nov 3 security release (16.4.5, 15.5.29): seven advisories, a third security item in the same week as Better Auth and the GitHub Actions update. Primary sources also disagree on one severity (see NEWS_CHECK_LOG).
- PostgreSQL 19: GA is planned for Nov 19, so it is not out yet. Refresh `postgresql-19-saas-upgrade-rehearsal` after GA. Strong candidate for a later slot.
- Claude Sonnet 4.5 retirement Nov 30 (primary source: Anthropic deprecations page): a credible next candidate. OpenAI Nov 30 and Dec 11 dates were still aggregator-only here, so unverified.
- Stripe `2026-09-30.endive`: breaking items are narrow (SEPA, BLIK, PayTo) and only bite on an explicit version upgrade.
- TypeScript 7: July release, outside the window, and only secondary sources were found.
- pnpm 11: April release, outside the window.

**Recheck before publishing.**
- Prisma ORM 8 status. The release-status page still says RC and "expected in October 2026" (`prisma` 8.0.0-rc.30 on `latest`, npm checked 2026-11-04), while the docs banner says "Prisma ORM 8 is here". If GA ships, update "Pin your Prisma version first" and the third FAQ.
- The rollout table is labeled illustrative and its dates assume publication this week. Publishing later needs new dates.
- Prisma's pages do not say how requests fail after Dec 1. The post says so and tells readers to assume the URL stops working.
- "Static IP blocks the new route" and "old builds cannot roll back after Dec 1" are inferences from the docs, not Prisma statements.

**Draft dev.to / Hashnode intro (not posted).**
Prisma Accelerate retires on December 1, 2026, and only half of what it did has a replacement: connection pooling carries over, query caching does not. This guide shows how to identify your setup from the deployed URL, choose a replacement connection, sort your cached queries, test under real concurrency, and keep a rollback that still works after the cutoff.

**Draft X thread outline (not posted).**
1. Prisma Accelerate retires Dec 1, 2026, including hosted Accelerate connections to Prisma Postgres. Check your deployed DATABASE_URL: `prisma://` or `prisma+postgres://accelerate.prisma-data.net` means you are affected.
2. Only the connection has to change, and your data can stay put. Pooling carries over to Prisma Postgres, but query caching has no replacement from Prisma.
3. Pin first. `npm install prisma` now gives the ORM 8 CLI, which does not read schema.prisma. Lock to `^7`, use `npx prisma@7` in CI, and keep the ORM upgrade as separate work.
4. Sort every `cacheStrategy` query: drop it, fix the query, or cache it yourself. If you used `$accelerate.invalidate()`, your replacement cache needs invalidation too.
5. Load test, because one-user previews will not show connection exhaustion. After Dec 1, instant rollback to a pre-migration build restores a dead connection, so cut a new known-good deployment. Full guide: <canonical URL>

## 2026-11-11 notes

**Topic choice.** GitHub Actions has not had a tech-guide slot yet (Node.js, then Prisma), and this is a platform default change, not a security advisory or a product retirement. No existing post covers runner images; the three GitHub Actions posts are about execution policies, lockfiles and token formats.

**How the version table was made.** Both software lists were downloaded from the runner-images repository on 2026-11-11 (image versions 20261101.360 for 24.04 and 20261101.186 for 26.04) and compared line by line. Every version and every "no longer preinstalled" tool in the post comes from that comparison.

**Rejected this week.**
- Claude Sonnet 4.5 retirement on Nov 30 (Anthropic deprecations page): valid, but it would be the third retirement-type item in a row after Prisma Accelerate (Nov 4) and Cloudflare Workers AI (Nov 8). **Good pick for next week** if it is still unwritten; the deadline is close.
- PostgreSQL 19: still not out. RC 1 was Oct 15, RC 2 is planned for Nov 12, GA for Nov 19. Refresh `postgresql-19-saas-upgrade-rehearsal` after GA.
- Next.js Nov 3 security release (16.4.5 / 15.5.29) and the Node.js Nov 11 security release: security items, and the daily check already tracks both.
- macOS 14 runner retirement (Nov 2): already past, and narrow for a web SaaS audience. Not mentioned in the post.

**Recheck before publishing.**
- Whether the rollout has finished. On Nov 11 the runner-images README still listed `ubuntu-latest` beside Ubuntu 24.04, and the post says so. After Nov 19, update that paragraph and the first FAQ answer.
- The Java default. The announcement issues (#14747, #14748) say Java 17 is the default on both images; the 26.04 software list marks Java 25. The post reports both and tells readers to run `java -version`.
- Patch versions in the table move with each weekly image.
- `ImageOS` / `ImageVersion` are used in a snippet and in the cache-key advice. They are long-standing runner variables, but the exact 26.04 value was not confirmed from a live run. The snippets were not run.
- The "what can break" list is inference from the version changes (labelled as such in the post), except the prebuilt-binaries item, which the announcement states.
- The setup action majors in the example (setup-node v7, setup-python v7, setup-java v6) were the latest releases on Nov 11.
- **Cover:** regenerated 2026-11-12 with `--force` after the first version showed Ubuntu-style logo marks. The current cover uses generic icons (gear, server, checklist, server with an up arrow), no brand marks, and all text is spelled correctly. Two API calls in total.
- The 22.04 brownout dates in issue #14254 have no year; the post gives them next to the April 17, 2027 end date.

**Draft dev.to / Hashnode intro (not posted).**
GitHub Actions is moving `ubuntu-latest` from Ubuntu 24.04 to 26.04, with the rollout due to finish on November 19, 2026. The default Node.js, Python, Java, Docker Compose, Helm and PostgreSQL versions all change, and tools such as Miniconda, Pulumi and Java 8 are no longer preinstalled. This guide shows how to find the workflows that depend on those defaults, test on both images, pin versions, and roll back.

**Draft X thread outline (not posted).**
1. `ubuntu-latest` in GitHub Actions is moving from Ubuntu 24.04 to 26.04, gradually, between Oct 19 and Nov 19, 2026. Until it finishes, the same workflow can land on either image.
2. Defaults that change on the runner: Node.js 22 to 24, npm 10 to 11, Python 3.12 to 3.14, Java 17 to 25, Helm 3 to 4, CMake 3 to 4, Docker Compose 2 to 5, PostgreSQL 16 to 18.
3. No longer preinstalled: Java 8, Miniconda, Julia, Pulumi, Fastlane, Lerna, Parcel, Newman, Mercurial.
4. The tool cache is the same on both images, so workflows that use setup-node, setup-python or setup-java get the same runtime. Only jobs that use whatever is on the PATH see a change.
5. Fix: grep for `ubuntu-latest`, run a matrix of `ubuntu-24.04` and `ubuntu-26.04`, declare tool versions, add the image to cache keys. Rollback is `runs-on: ubuntu-24.04`. Full guide: <canonical URL>
