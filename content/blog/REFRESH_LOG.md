# SEO Refresh Log

Monthly refresh of titles, descriptions and outdated facts, driven by Search Console. Not a published post. Task: `top-posts-monthly-refresh` (1st of each month, 10:00). Pages changed in the last 30 days are skipped so results can show.

## 2026-11-17 (manual run)

Search Console, last 28 days (Oct 19 – Nov 16): **35 clicks, 4,310 impressions, 0.8% CTR, average position 10.7.** The previous three months together had about 35 clicks.

Meta-only changes (frontmatter `metaTitle` and `description`; URL, H1, `date` and `updated` unchanged):

| Page | Clicks / impressions / CTR / position before | Old metaTitle | New metaTitle | Matching queries |
| --- | --- | --- | --- | --- |
| /blog/chrome-unload-event-migration | 4 / 675 / 0.6% / 7.4 | Chrome Unload Event Migration Guide for SaaS | Chrome Unload Event Deprecation: Migration Guide | chrome unload, deprecate the unload event chrome, chrome deprecate unload |
| /blog/vercel-deployment-retention-rollback-plan | 4 / 503 / 0.8% / 8.1 | Vercel Deployment Retention and Rollback Plan | Vercel Deployment Retention, Storage and Rollback | vercel deployment storage, vercel rollback, instant rollback |
| /blog/github-actions-execution-policies-saas | 4 / 402 / 1.0% / 9.4 | GitHub Actions Execution Policies for SaaS Teams | GitHub Actions Policies: Execution Rules for SaaS CI | github actions policies, github actions policy, github actions permissions |
| /blog/nodejs-26-saas-production-upgrade | 2 / 361 / 0.6% / 7.4 | Node.js 26 LTS Upgrade: A SaaS Production Plan | Node.js 26 Breaking Changes and LTS Upgrade Plan | node.js 26 breaking changes from node 24 (lts / migration guide) |
| /blog/react-19-3-saas-upgrade-guide | 3 / 223 / 1.3% / 7.7 | React 19.3 for SaaS: A Practical Upgrade Guide | React 19.3: New Features and a Practical Upgrade | react 19.3, react 19.3 release notes |
| /blog/github-app-token-format-migration | 0 / 200 / 0% / 6.7 | GitHub App Token Migration for SaaS Teams | GitHub App Token Format Change: What to Fix | (mostly long-tail) |
| /blog/vercel-websockets-realtime-saas | 0 / 116 / 0% / 8.3 | Vercel WebSockets for Realtime SaaS | Vercel WebSockets: Server Support for Realtime Apps | vercel functions websocket server support, why does my websocket connection die on vercel |
| /blog/npm-release-control-oidc-dist-tags | 0 / 112 / 0% / 8.3 | npm Release Controls With OIDC and Dist-Tags | npm Dist-Tags and OIDC: Safer Release Promotion | npm dist tag |
| /tools/saas-mvp-cost-calculator | 0 / 87 / 0% / 44.9 | SaaS MVP Cost Calculator \| Free Estimate Tool | MVP Cost Calculator: SaaS Cost and Timeline Estimator | mvp cost calculator, mvp estimation, mvp cost and timeline estimator |

Descriptions were rewritten to match; see git history for exact text.

Structural fixes so the posts pass `validate:blog`: added `## Related Reading` and `## Next Step` to react-19-3-saas-upgrade-guide (plus a link to /services/react-development) and npm-release-control-oidc-dist-tags.

Other observations:
- New service pages are indexed and getting impressions but rank deep: /services/react-development 146 impressions at position 42.9 (queries: custom react js development services, react development services). Too early to change; recheck Dec 1.
- Buyer posts still earn almost nothing: freelancer-vs-agency 81 impressions at 18.9, outsource-saas-development-agency-guide 22 at 42.8.
- Recent news briefs are picking up impressions quickly at good positions: better-auth (65 / 6.4), mongoose (38 / 6.2), openssh (33 / 8.4), nodejs-november-security (58 / 8.3).

Check on Dec 1: CTR for the nine pages above versus the "before" column.
