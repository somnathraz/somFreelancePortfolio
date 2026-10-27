# SomSite — Handoff Context (2026-10-25)

Paste into Claude Code: "Read SOMSITE_HANDOFF.md, then start with Priority 1."

## What this project is
Marketing/lead-gen site for **Somanath Studio** (somanathkhadanga.com), run by Somanath Khadanga (MERN dev, 4+ yrs, SDE4 at IQVIA, freelance on the side).
Stack: Next.js 16 (App Router), React 19, TS, Tailwind 4, MDX blog (`content/blog/*.mdx`, 63 posts), Labs/templates (R3F, `content/templates/`), site assistant "Archon" (`src/content/assistant/`, `/api/assistant/chat`), booking + enquiry flows (Google Calendar, nodemailer), IndexNow ping on postbuild.
Positioning: "SaaS development partner for founders, agencies, freelancers and consultants." White-label, NDA-friendly, remote.
Key docs: `README.md`, `GROWTH_CHECKLIST.md`, `content/blog/EDITORIAL_GUIDE.md`.
Do not read or print `.env`.

## SEO audit findings (code + content only; no Search Console/live data)
Solid: canonicals, OG + dynamic `/og`, rich JSON-LD helpers (`src/lib/seo.ts`), sitemap/robots/RSS, IndexNow, metaTitle on 55/63 posts.

Problems:
1. Blog is mostly news-reaction (Next.js releases, npm incidents, model launches). Only ~6/63 posts target buyer intent. Commercial topics on the checklist are unwritten.
2. Publishing pace too high (31 posts in 3 months, 12 in Sep, 10 in Oct); category mix heavy on Security/AI. Editorial guide itself says rotate.
3. `src/app/sitemap.ts`: all 21 static routes use `lastModified: new Date()`; changeFrequency "weekly" on everything.
4. Blog lastmod = file mtime, ~20 posts share 2026-07-13 from a bulk touch. Use `updated` only.
5. FAQ JSON-LD supported but 0/63 posts have `faq` frontmatter.
6. Only 8 posts set `primaryKeyword`/`relatedService`. 5 posts have no service/contact link: ai-saas-fraud-abuse-controls, building-paperchai-booking-ready-website, choosing-technology-for-client-projects, nextjs-instant-navigation-saas-preview, vibe-coding-security-risks-2026.
7. 5 titles >60 chars (worst: nextjs-july-2026-security-release at 79; also how-to-evaluate-ai-agents-before-production, recent-npm-security-changes-..., saas-mvp-cost-2026, vibe-coding-security-risks-2026). 11 meta descriptions >160 chars.
8. `robots.ts` allows everything: no disallow for `/api/`, `/og`; check `/book/thank-you` has noindex.
9. Labs/Templates get sitemap priority 0.95 (above services) — dilutes the SaaS-partner positioning.
10. package name is still `antigravity`; README has no screenshots.

## Strategy direction (agreed)
Stop adding volume; add things clients can use + proof.
1. Free tools (under `/tools`): MVP cost calculator (email-gated breakdown) -> production-readiness scorecard -> AI-generated-code audit checklist. Each ends with CTA to /saas-mvp-audit or /book.
2. Proof: finish authentication + Next.js performance case studies with real numbers (before/after, Lighthouse), founder quote, decisions/trade-offs.
3. Cheap first step: fixed-price audit and/or free 20-min architecture review, with visible pricing range on home.
4. Separate founder vs agency paths from the homepage; white-label pack for agencies.
5. Trust on About: weekly comms process, delivery process, availability callout on home.
6. Demote Labs/Templates in nav/sitemap priority; cap news posts at ~1/month.

## Work queue
Priority 1 (technical SEO fixes) — done 2026-10-27: real sitemap dates; sitemap changeFrequency now honest (weekly only on `/`, `/blog`, `/labs`, `/templates`; monthly elsewhere); Labs/Templates priority lowered to 0.6; robots disallow `/api/` and `/og`; `/book/thank-you` confirmed noindex; trim 5 titles + 11 descriptions; service links added to the 5 posts; primaryKeyword + relatedService now set on all 64 posts; FAQ frontmatter synced on the 4 posts that already had a visible FAQ section (schema now matches visible content).
Priority 2 — done 2026-10-26: MVP cost calculator at `/tools/saas-mvp-cost-calculator`.
Priority 3: home page pricing range + entry-offer CTA.
Priority 4: buyer-intent posts, 1/week, each with FAQ schema + service link + case-study link: How Agencies Can Outsource SaaS Development; Freelancer vs Agency for SaaS; Rebuild or Repair Your SaaS; What a SaaS Technical Audit Includes; Rescue an Unfinished SaaS Project.
Priority 5 (next, not started): remaining 60 posts have no FAQ content yet — rich-result coverage is still thin. Production-readiness scorecard tool (second lead magnet) also queued.

## Working preferences
Direct, decisive, opinionated answers; honest feasibility over encouragement; casual and brief.
