# SomSite Blog Editorial and SEO Pipeline

This file is the canonical contract for automated and human blog creation. It is not a published post.

## Objective

Create useful, evidence-backed articles for SaaS founders and technical buyers that can earn qualified search traffic and lead naturally to `/contact` or a relevant SomSite service.

Optimize for the reader's decision, not merely for a keyword. Never promise that a post will rank or go viral. Select topics with credible opportunity signals, a differentiated angle, and a clear connection to SomSite's expertise.

## Inputs

A requested post may provide:

- `TOPIC`: the subject or decision to cover;
- `KEYWORD`: the primary search phrase;
- `SERVICE_PATH`: the most relevant SomSite service URL.

When one or more inputs are missing, infer them only after completing the site and opportunity analysis below. For recurring automated runs, follow the weeks 3–12 buyer-post queue below first. Research sharpens the assigned topic; it does not replace it with a trend article. Outside this campaign, choose missing inputs from evidence.

## Weeks 3–12: one buyer post a week

Prepare one buyer post each Monday at 09:00 Asia/Kolkata, starting with week 3 on October 26, 2026. These are local drafts for review, not automatic external publication. Week numbers are campaign slots; do not skip unfinished slots or create catch-up batches after a missed run. Weeks 1–2 are outside this queue.

| Week | Buyer post | Primary keyword | Related service | Required angle / evidence |
| --- | --- | --- | --- | --- |
| 3 | How Agencies Can Outsource SaaS Development | outsource SaaS development | `/services/saas-mvp-development` | Partner selection, scope, delivery ownership, handoff and client communication; link to `/agency-development-partner`. |
| 4 | Freelancer vs Agency for SaaS Development | freelancer vs agency for SaaS development | `/services/saas-mvp-development` | Compare accountability, capacity, cost drivers and stage fit with a practical decision matrix. |
| 5 | Should You Rebuild or Repair Your SaaS? | rebuild or repair SaaS | `/services/production-readiness-upgrade` | Compare repair, incremental replacement and rebuild using risks, downtime and migration costs; link to `/saas-mvp-audit`. |
| 6 | What a SaaS Technical Audit Includes | SaaS technical audit | `/services/production-readiness-upgrade` | Explain inputs, review scope, deliverables and remediation priorities; link to `/saas-mvp-audit`. |
| 7 | How to Rescue an Unfinished SaaS Project | rescue unfinished SaaS project | `/services/production-readiness-upgrade` | Access recovery, code assessment, salvage decisions, ownership and a staged recovery plan. |
| 8 | SaaS MVP Cost in India vs US | SaaS MVP cost India vs US | `/services/saas-mvp-development` | Compare equivalent scope and total delivery cost; also refresh `content/blog/saas-mvp-cost-2026.mdx` in the same run. |
| 9 | Next.js Performance Case Study with Real Numbers | Next.js performance case study | `/services/nextjs-performance-optimization` | Verified before/after measurements, project context, changes, measurement method and limitations. |
| 10 | Authentication Platform Case Study | authentication platform case study | `/services/custom-software-development` | Verified project problem, auth architecture, implementation, challenges and supported outcomes. |
| 11 | White-label Development for Agencies | white-label development for agencies | `/services/custom-software-development` | Client ownership, NDA/IP, branding, delivery workflow and support boundaries; link to `/agency-development-partner`. Distinguish this operating model from week 3's outsourcing selection guide. |
| 12 | Fractional CTO vs a Technical Partner | fractional CTO vs technical partner | `/services/custom-software-development` | Compare strategic leadership and hands-on delivery, responsibilities, stage fit and engagement expectations. |

### Queue execution and completion tracking

- Before drafting, inspect this queue, existing MDX and previous run evidence. Select the earliest unfinished slot. A rerun must not create a second version of an already completed article.
- Track progress in `content/blog/BUYER_POST_PROGRESS.md`, creating it on the first campaign run. Record the campaign week, status (`draft-ready` or `blocked`), actual Asia/Kolkata run date, article/image paths, sources or internal evidence, validation results and any remaining work. `draft-ready` means all required artifacts and checks are complete; it does not mean published.
- Produce at most one new buyer article and one original cover per week. If that week's draft is already ready, report its paths without generating another post. After week 12 is ready, report campaign completion without creating another article until a new plan is supplied.
- If substantially matching content exists, improve it in place and record that path against the slot instead of creating competing content. Do not mark a slot complete from a title match alone.
- Week 8 requires both the geographic comparison and the existing cost-guide refresh before it is complete. Keep the existing cost-guide URL and original `date`, set `updated` to the actual refresh date, verify current pricing/currency assumptions, and cross-link the two articles with distinct general-budget versus location-comparison intent. Reuse the existing cost guide's cover; the new comparison gets the single new cover. Bring refreshed metadata and image references into compliance, copying the existing cover to the canonical filename if necessary.
- Weeks 9–10 require actual project evidence. For performance, record before/after values with units, metric definitions, dates, environment, tool and comparable test conditions; distinguish lab measurements from field data. For authentication, verify implementation details and any outcomes against repository artifacts or user-supplied evidence. Do not invent clients, screenshots, results, metrics or first-person delivery claims. If evidence is missing, record the slot as blocked, list the precise missing inputs and stop that run without substituting a generic guide or advancing the queue.
- Supporting AI/security/dev posts and unrelated old-post refreshes are outside this campaign automation. They must not displace the weekly buyer slot.
- Apply all research, image, SEO and quality gates below to the selected article and any refreshed article. For refreshes, preserve the original publication date and update only `updated` to the current Asia/Kolkata date.

## Audience and voice

- Write for SaaS founders, technical buyers, small product teams, and engineers responsible for shipping real products.
- Use direct, experienced, practical, and calm language.
- Explain business consequences without removing the engineering detail needed to make a sound decision.
- Prefer short paragraphs, concrete examples, trade-offs, failure modes, and actionable criteria.
- Avoid hype, agency fluff, generic motivation, fear-based claims, keyword stuffing, and unsupported first-person experience.
- First person is acceptable for recommendations and for experience supported by repository evidence.

## Topic areas

Prioritize:

1. SaaS security and software supply-chain risk;
2. AI SaaS, agents, MCP, evaluation, and responsible production adoption;
3. Next.js, React, performance, caching, and production operations;
4. production readiness, technical debt, architecture, and MVP audits;
5. founder decisions about scope, cost, hiring, technical partnerships, and product strategy;
6. genuine case studies only when the repository contains evidence for the work.

Outside the assigned buyer campaign, rotate categories. Do not publish three near-identical security, release-summary, AI-model, or framework-update posts in succession.

## Site and SEO opportunity analysis

Complete this analysis before choosing a topic or drafting.

### 1. Inventory the existing site

Inspect every `content/blog/*.mdx` file and the relevant routes in `src/app`.

Record or compare:

- title, `metaTitle`, description, date, category, tags, `primaryKeyword`, and `relatedService`;
- the apparent search intent and reader decision each post serves;
- recurring topic clusters, weak clusters, missing cluster pages, and recent category rotation;
- internal links, service links, Related Reading sections, and CTA patterns;
- posts that could compete for the same query or require consolidation rather than another article;
- available service paths, especially `/services/saas-mvp-development`, `/services/ai-saas-development`, `/services/nextjs-performance-optimization`, `/services/production-readiness-upgrade`, `/services/custom-software-development`, and `/contact`.

Reject a new topic when an existing article already satisfies substantially the same intent, unless a material development or a distinctly different buyer question justifies it.

### 2. Research current opportunity

Search the live web at writing time.

- Prefer primary sources: official advisories, release notes, vendor documentation, standards, maintainer announcements, and research papers.
- Use current search-result patterns to understand the dominant intent and questions, but do not copy competitors' structure or claims.
- Look for timely triggers, recurring founder questions, new deadlines, version changes, operational pain, and under-explained trade-offs.
- Treat trend data, keyword volume, difficulty scores, or traffic estimates as claims. Use them only when a named, current source verifies them.
- Never invent search volume, rankings, traffic potential, incidents, releases, statistics, quotes, client results, or first-person experience.

### 3. Score candidate topics

Create a private shortlist of at least three candidates when the topic is not supplied. Score each from 1–5 on:

| Dimension | Question |
| --- | --- |
| Audience fit | Will a SaaS founder or technical buyer make a better decision after reading it? |
| Search intent | Is there a specific, useful question the article can answer completely? |
| Timeliness | Is there a current trigger or durable recurring need? |
| Differentiation | Can SomSite offer a clearer framework, checklist, or implementation angle than existing results? |
| Authority | Can the important claims be supported by primary or authoritative sources? |
| Conversion fit | Is there a natural, non-forced path to a relevant service or `/contact`? |
| Cannibalization risk | Would the post compete with an existing SomSite article? Score 5 for low risk. |

Choose the strongest defensible opportunity, not the most sensational headline. A lower-volume, high-intent buyer question can be more valuable than a broad trend. If no timely candidate is strong, write an evergreen practical guide grounded in authoritative sources.

### 4. Define the search brief

Before drafting, settle:

- one primary keyword;
- the reader's actual job or decision behind that keyword;
- two to five related concepts or questions to cover naturally;
- one related service path;
- the distinct angle and why the article is not a duplicate;
- the evidence required to support time-sensitive claims.

Use the primary keyword naturally in the `metaTitle`, description, opening, and at least one useful heading when it reads well. Do not chase a fixed keyword density or repeat an awkward exact match.

## Research and evidence standard

- Verify dates, affected versions, severity, availability, pricing, limits, rollout status, and other time-sensitive facts.
- Clearly distinguish confirmed facts from interpretation or recommendations.
- Include 3–6 useful inline source links near the claims they support when the article depends on current facts.
- Use reputable secondary reporting only for necessary context.
- If an important claim cannot be verified reliably, remove it or choose a different topic.
- Label quantitative examples explicitly:
  - **Verified:** supported by a linked authoritative source;
  - **Internal:** supported by repository evidence or supplied business data;
  - **Illustrative:** a hypothetical example, estimate, threshold, or model for explanation.
- Never present illustrative numbers as benchmarks, guarantees, or client results.

## Required frontmatter

Every new `content/blog/<slug>.mdx` file must use this shape:

```yaml
---
title: "Expressive on-page title"
metaTitle: "SEO title no longer than 60 characters"
description: "Specific 120–160 character summary"
primaryKeyword: "One primary search phrase"
date: "YYYY-MM-DD"
updated: "YYYY-MM-DD"
author: "Somanath Khadanga"
readTime: "N min read"
category: "Existing or clearly appropriate category"
tags:
  - focused tag
  - related tag
  - buyer-intent tag
shareImage: "/images/blog/kebab-case-slug.png"
relatedService: "/services/relevant-service"
faq:
  - question: "Optional question that also appears in the article"
    answer: "Optional concise answer that also appears in the article"
---
```

Rules:

- `metaTitle` must be 60 characters or fewer.
- `description` must be 120–160 characters.
- `primaryKeyword` must contain one intentional search phrase, not a list.
- Use 3–6 focused tags.
- `relatedService` must resolve to an existing service route or `/contact`.
- `updated` records a meaningful content change, not a rebuild, checkout, or metadata-only keyword backfill. Sitemap and article modification dates use `updated` (or `date` when absent), never filesystem timestamps.
- `faq` is optional. When included, use 2–4 useful Q&As. Every question and answer must also appear visibly and substantively in the article body; frontmatter-only FAQ content is not allowed.
- The filename, canonical slug, `shareImage`, and opening image path must use the same concise lowercase kebab-case slug.

## Body and heading requirements

- Do not add an `#` heading in the MDX body. The page template renders the title as the H1.
- Use descriptive `##` and `###` headings in a logical hierarchy.
- Target 1,700–2,500 words for substantive guides. The hard minimum is 1,200 words unless the subject is intentionally a short security or news brief.
- Open with the reader's problem, the relevant development, and why the decision matters.
- Put the hero image Markdown immediately after frontmatter with meaningful, descriptive alt text.
- Keep paragraphs short and scannable.
- Include concrete examples, failure modes, trade-offs, and decision criteria.
- Do not pad a narrow topic to reach a word count.

Every substantive post must cover these reader needs, using natural descriptive headings rather than mechanically repeating the labels:

1. the problem and why it matters;
2. what breaks or what teams commonly miss;
3. how to evaluate options, exposure, readiness, or fit;
4. a practical checklist or ordered action plan;
5. when internal work is enough and when to get expert help.

If `faq` exists in frontmatter, include a visible `## Frequently Asked Questions` section containing the same questions and materially identical answers.

## Internal links and conversion structure

- Add at least two contextually relevant links to existing SomSite blog posts.
- Add at least one natural link to `relatedService` or `/contact`.
- Do not link the same destination repeatedly or insert unrelated commercial anchors.
- Add a `## Related Reading` section near the end with two to four useful internal articles.
- End with a `## Next Step` section that explains who should act, what they should prepare, and why the related service or `/contact` is appropriate.
- The CTA must follow from the article's diagnosis. Avoid vague lines such as “grow your business with us.”

## Cover image

- Create exactly one original landscape cover image per post.
- Inspect at least three representative existing covers before generation and use them as style references.
- Match the established format: premium flat dark technology infographic, nearly black navy or charcoal background, strong sans-serif typography, crisp outlined panels, simple engineering icons, restrained cyan/blue/violet/amber accents, and generous safe margins.
- Prefer 1672×941 16:9 PNG.
- Use a short accurate headline and only a few concise labels when text materially improves the infographic.
- Verify every rendered word. Do not include invented metrics, claims, logos, or watermarks.
- Avoid cinematic 3D machinery, photorealistic stock scenes, generic glowing brains, clutter, and small unreadable annotations.
- Save the asset at `public/images/blog/<slug>.png`.

## Quality gate

Before finishing:

- confirm the topic and primary keyword do not duplicate or cannibalize an existing post;
- confirm the current Asia/Kolkata date is used for new posts' `date` and `updated`; for refreshes preserve the original `date` and use the current date for `updated`;
- confirm the body has no H1;
- confirm `metaTitle`, description, tags, `primaryKeyword`, `relatedService`, and optional FAQ meet the rules above;
- confirm FAQ frontmatter and visible article answers match when FAQ is present;
- confirm all time-sensitive facts and quantitative claims are linked and labeled appropriately;
- confirm at least two internal blog links, a Related Reading section, and a related-service or contact CTA resolve;
- confirm `shareImage` and the opening Markdown image reference match exactly;
- confirm all internal links and image paths resolve;
- run `npm run validate:blog -- content/blog/<slug>.mdx` (add `--allow-short-brief` only for a genuinely short security or news brief);
- serialize or compile the MDX;
- run `npm run lint` and `npm run build`, disabling any external publishing lifecycle hook during validation;
- fix only issues caused by the new post or image;
- leave the post and image as local changes for review;
- do not commit, push, open a pull request, deploy, submit to IndexNow, or publish externally unless explicitly requested.

## Completion report

Summarize:

- chosen topic, primary keyword, intent, and related service;
- why this opportunity was selected and which overlapping topics were rejected;
- authoritative source URLs used;
- new post and image paths;
- word count, link checks, SEO field checks, MDX validation, lint, and build results.
