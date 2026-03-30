# Somanath Studio Portfolio

Marketing site and content platform for a SaaS-focused product engineer.

This project is built to position clear service offers for SaaS founders: MVP builds, performance optimization, and production-readiness upgrades. It combines a conversion-focused homepage, case-study style project highlights, and an MDX-driven blog.

## Live site

- Add your production URL here: `https://your-domain.com`

## Why this exists

- Present a focused value proposition for SaaS founders and startup teams
- Demonstrate technical credibility through outcomes, process, and proof
- Publish buyer-intent and technical content through a fast MDX blog

## What is included

- Homepage with offer-led sections (hero, services, client fit, work, process, testimonials, CTA)
- Case studies page and project detail content
- MDX blog with practical SaaS engineering topics
- Booking/contact flow for intro calls
- Reusable UI system with modern motion and interaction patterns

## Screenshots

No screenshots are currently checked into `public/`.

Recommended additions:
- Homepage hero + offers section
- Selected work and proof metrics section
- Blog index page

## Tech stack

- Next.js 16 (App Router)
- React 19 + TypeScript
- Tailwind CSS 4
- MDX content (`content/blog/*.mdx`)
- Motion/UI libraries for premium interactions

## Content system

- Blog posts live in `content/blog/` as MDX
- Dynamic route rendering under `src/app/blog/[slug]/page.tsx`
- Blog listing under `src/app/blog/page.tsx`

## Performance-minded choices

From `next.config.ts`:

- `reactCompiler: true`
- `experimental.optimizePackageImports` for `lucide-react`, `framer-motion`, and `motion`
- `compress: true` for response compression
- Production `removeConsole` (keeps `error` and `warn`)
- Remote image allowlist for `avatar.vercel.sh`

## Getting started

```bash
npm install
npm run dev
```

Then open [http://localhost:3000](http://localhost:3000).

## Scripts

- `npm run dev` - start local dev server
- `npm run build` - build for production
- `npm run start` - run production build locally
- `npm run lint` - run ESLint
