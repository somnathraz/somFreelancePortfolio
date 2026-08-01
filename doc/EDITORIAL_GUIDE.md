# SomSite Blog Editorial Guide

This file is guidance for automated and human blog creation. It is not a published post.

## Audience and purpose

- Write for SaaS founders, small product teams, and developers responsible for shipping real products.
- Turn current engineering developments into practical decisions, audits, and implementation guidance.
- Demonstrate senior technical judgment without sounding like an agency brochure.

## Core topic mix

Prioritize these themes:

1. SaaS security and software supply-chain incidents
2. AI SaaS, AI agents, MCP, and responsible production adoption
3. Next.js, React, performance, caching, and production operations
4. Production readiness, technical debt, architecture, and MVP audits
5. Founder decisions: scope, cost, hiring, technical partnerships, and product strategy
6. Genuine first-person case studies only when the repository contains evidence for the work

Rotate themes. Do not publish three near-identical security or release-summary posts in succession.

## Voice

- Direct, experienced, practical, and calm
- Founder-friendly plain English with enough technical detail to be useful
- First person is acceptable for recommendations and clearly supported experience
- Avoid hype, filler, generic motivational language, and unsupported personal claims
- Explain why a development matters before diving into technical detail
- Prefer “what I would do next” guidance over a simple news recap

## Research standard

- Search the web at the time of writing.
- Prefer primary sources: official security advisories, release notes, vendor documentation, standards, research papers, and maintainer announcements.
- Use reputable secondary reporting only to add context.
- Verify dates, affected versions, severity, availability, pricing, and rollout status.
- Clearly distinguish confirmed facts from interpretation.
- Never invent an incident, product release, statistic, quote, client result, or first-hand experience.
- Include 3–6 useful inline source links where current factual claims are made.
- If a current topic cannot be verified reliably, choose a different topic.

## Topic selection

Before drafting:

1. Read the titles, descriptions, dates, categories, and tags of existing files in `content/blog`.
2. Search recent sources for developments relevant to the core topic mix.
3. Reject topics already covered unless there is a material new event or a clearly different search intent.
4. Favor a topic that is timely, useful for the site’s audience, and connected to the services offered on the site.
5. Use an evergreen practical guide when no timely development is strong enough.

## Post structure

- Target 1,700–2,500 words when the subject supports it. Do not pad.
- Open with the problem or development and why it matters.
- Use descriptive `##` and `###` headings.
- Include concrete examples, failure modes, trade-offs, or decision criteria.
- Include a practical checklist or ordered action plan.
- End with a concise conclusion and a natural internal link or service call to action when relevant.
- Add 2–4 relevant internal links to existing posts or service pages.
- Keep paragraphs short and scannable.

## Frontmatter

Every new `.mdx` file must contain:

```yaml
---
title: "Expressive on-page title"
metaTitle: "SEO title under roughly 60 characters"
description: "Specific summary under roughly 160 characters"
date: "YYYY-MM-DD"
updated: "YYYY-MM-DD"
author: "Somanath Khadanga"
category: "Existing or clearly appropriate category"
tags:
  - focused primary keyword
  - related keyword
readTime: "N min read"
shareImage: "/images/blog/kebab-case-slug.png"
---
```

The filename should be the same concise, lowercase, kebab-case slug used by the article URL.

## Cover image

- Create one original landscape cover image for every post.
- Use a polished editorial technology illustration or realistic product/engineering scene.
- Favor dark charcoal or deep navy backgrounds with restrained cyan, blue, violet, or amber accents, matching the current site.
- Use strong depth, clear focal hierarchy, and generous safe margins.
- Do not include logos unless editorially necessary.
- Avoid embedded text because generated text is unreliable and the article already supplies the title.
- Avoid watermarks, stock-photo clichés, cluttered dashboards, and generic glowing-brain imagery.
- Save the final asset as `public/images/blog/<slug>.png`.
- Use a descriptive image alt line immediately after frontmatter and ensure `shareImage` points to the same file.

## Quality checks

Before finishing:

- Confirm the post is not a duplicate.
- Confirm all time-sensitive facts against live sources.
- Check the publication date uses the current local date.
- Check every internal link resolves to an existing route.
- Confirm image path and filename match exactly.
- Run the project lint and build checks.
- Leave the new post and image as local project changes for review; do not commit, push, or deploy unless explicitly requested.
