export type WebStory = {
  slug: string;
  title: string;
  description: string;
  poster: string;
  sourceBlogUrl: string;
  serviceUrl: string;
  accent: string;
  pages: Array<{
    id: string;
    kicker: string;
    headline: string;
    body: string;
    bullets?: string[];
    layout?: "cover" | "list" | "split" | "cta";
  }>;
};

export const webStories: WebStory[] = [
  {
    slug: "saas-mvp-cost-2026",
    title: "How Much Should a SaaS MVP Cost in 2026?",
    description:
      "A six-page Web Story on what actually drives SaaS MVP cost: scope, complexity, launch quality, and smarter budgeting.",
    poster: "/images/blog/Sass_mvp_coast_in_2026.png",
    sourceBlogUrl: "/blog/saas-mvp-cost-2026",
    serviceUrl: "/services/saas-mvp-development",
    accent: "#22d3ee",
    pages: [
      {
        id: "cover",
        kicker: "Web Story",
        headline: "How Much Should a SaaS MVP Cost in 2026?",
        body: "The real answer is not one price. It depends on scope, trust, and what you actually need to launch.",
        layout: "cover",
      },
      {
        id: "scope",
        kicker: "The Core Idea",
        headline: "MVP cost is really about scope",
        body: "Founders usually overspend when version-one starts absorbing version-two ideas. The smallest useful product is cheaper than the broadest possible one.",
        layout: "split",
      },
      {
        id: "drivers",
        kicker: "Main Cost Drivers",
        headline: "These are the features that expand budget fast",
        body: "A narrow MVP stays controllable. Complexity jumps when you add more product surface and more edge cases.",
        bullets: [
          "roles, permissions, workspaces",
          "billing, taxes, trials, plan logic",
          "AI workflows, uploads, retrieval",
          "admin tools, analytics, integrations",
        ],
        layout: "list",
      },
      {
        id: "mistakes",
        kicker: "Common Mistakes",
        headline: "Founders overspend by trying to impress everyone in version one",
        body: "Investor polish, customer features, admin controls, and enterprise-grade workflows at the same time turn an MVP into a much larger product.",
        bullets: [
          "unclear priorities",
          "too many early integrations",
          "roadmap mixed into launch scope",
        ],
        layout: "list",
      },
      {
        id: "framework",
        kicker: "Better Budgeting",
        headline: "Use a four-layer budget frame",
        body: "Think in layers: the core user problem, minimum credibility, launch essentials, and the delay list. That keeps cost grounded in reality.",
        bullets: [
          "core workflow",
          "minimum trust signals",
          "real launch essentials",
          "everything else waits",
        ],
        layout: "split",
      },
      {
        id: "cta",
        kicker: "Next Step",
        headline: "A strong MVP is not the cheapest build",
        body: "It is the smallest version worth shipping. Read the full guide or see the SaaS MVP service page for the deeper breakdown.",
        layout: "cta",
      },
    ],
  },
  {
    slug: "why-your-nextjs-app-feels-slow-after-launch",
    title: "Why Your Next.js App Feels Slow After Launch",
    description:
      "A six-page Web Story on why Next.js apps slow down after launch and what actually causes the drag.",
    poster: "/images/blog/why_your_next_js_app_feels_slow.png",
    sourceBlogUrl: "/blog/why-your-nextjs-app-feels-slow-after-launch",
    serviceUrl: "/services/nextjs-performance-optimization",
    accent: "#22d3ee",
    pages: [
      {
        id: "cover",
        kicker: "Web Story",
        headline: "Why Your Next.js App Feels Slow After Launch",
        body: "It usually is not one big failure. Performance debt builds from many small choices stacking up over time.",
        layout: "cover",
      },
      {
        id: "growth",
        kicker: "What Changes",
        headline: "Apps feel fine early because they are still small",
        body: "After launch you add more widgets, more dependencies, more data, and more scripts. The original assumptions stop holding.",
        layout: "split",
      },
      {
        id: "js",
        kicker: "Common Cause",
        headline: "Too much client-side JavaScript is still the biggest culprit",
        body: "Hydration, heavy libraries, state sprawl, and interactive wrappers make the browser do too much work before the app feels ready.",
        bullets: [
          "large bundles",
          "heavy dashboards",
          "laggy filters",
          "weak mobile performance",
        ],
        layout: "list",
      },
      {
        id: "data",
        kicker: "Another Cause",
        headline: "Bad data-fetching patterns make UI feel slower than it should",
        body: "Sequential requests, duplicate fetching, and oversized payloads delay the moment users see meaningful content.",
        bullets: [
          "too many round trips",
          "page shell loads first, real data later",
          "overlapping fetches across components",
        ],
        layout: "list",
      },
      {
        id: "workflow",
        kicker: "What To Fix",
        headline: "Do not start with random micro-optimizations",
        body: "First isolate where slowness actually happens, then identify the heaviest recurring pattern: JS, data, assets, state, or APIs.",
        layout: "split",
      },
      {
        id: "cta",
        kicker: "Next Step",
        headline: "A fast product feels more valuable",
        body: "If your app is live and speed is already hurting UX, read the full article or see the Next.js performance service.",
        layout: "cta",
      },
    ],
  },
  {
    slug: "5-signs-your-mvp-is-not-production-ready",
    title: "5 Signs Your MVP Is Not Production-Ready",
    description:
      "A six-page Web Story on the operational and architectural signs that an MVP is no longer strong enough for growth.",
    poster: "/images/blog/5_signs-your_mvp_is_not_production_ready.png",
    sourceBlogUrl: "/blog/5-signs-your-mvp-is-not-production-ready",
    serviceUrl: "/services/production-readiness-upgrade",
    accent: "#22d3ee",
    pages: [
      {
        id: "cover",
        kicker: "Web Story",
        headline: "5 Signs Your MVP Is Not Production-Ready",
        body: "Launching version one is not the same thing as being ready for real growth.",
        layout: "cover",
      },
      {
        id: "features",
        kicker: "Sign 1",
        headline: "Every new feature feels harder than it should",
        body: "If small changes touch too many files and feel risky, the structure underneath is already slowing the team down.",
        layout: "split",
      },
      {
        id: "fragile",
        kicker: "Signs 2 and 3",
        headline: "Fragile auth and stressful deployments are early warnings",
        body: "When permissions are scattered or every release feels risky, the product may be live but the workflow is not production-grade.",
        bullets: [
          "weak roles and access logic",
          "manual release steps",
          "poor rollback confidence",
        ],
        layout: "list",
      },
      {
        id: "bugs",
        kicker: "Signs 4 and 5",
        headline: "Recurring bugs and codebase avoidance are business problems",
        body: "If the same areas keep breaking or the team avoids touching certain flows, technical debt is already affecting delivery speed.",
        bullets: [
          "repeat bugs in billing or auth",
          "messy dashboard code",
          "nobody wants to touch risky pages",
        ],
        layout: "list",
      },
      {
        id: "response",
        kicker: "What To Do",
        headline: "The answer is usually not a full rewrite",
        body: "The better move is targeted cleanup: stabilize risk areas, improve architecture where it matters, and remove recurring failure patterns.",
        layout: "split",
      },
      {
        id: "cta",
        kicker: "Next Step",
        headline: "Production readiness creates leverage",
        body: "If your MVP works but feels fragile behind the scenes, read the full article or see the Production Readiness Upgrade service.",
        layout: "cta",
      },
    ],
  },
  {
    slug: "which-ai-features-are-worth-building-in-saas",
    title: "Which AI Features Are Actually Worth Building in a SaaS Product Right Now?",
    description:
      "A six-page Web Story on the AI features that are actually useful in SaaS and the ones that are mostly hype.",
    poster: "/images/blog/AI_Features_that_wroth_building.png",
    sourceBlogUrl: "/blog/which-ai-features-are-worth-building-in-saas",
    serviceUrl: "/services/ai-saas-development",
    accent: "#22d3ee",
    pages: [
      {
        id: "cover",
        kicker: "Web Story",
        headline: "Which AI Features Are Actually Worth Building in SaaS?",
        body: "The useful AI features are the ones that save time, reduce complexity, or improve decisions.",
        layout: "cover",
      },
      {
        id: "rule",
        kicker: "Core Rule",
        headline: "The question is not how to add AI. It is which feature makes the product more useful.",
        body: "Strong AI work usually feels simple from the user side because it is attached to a real workflow, not just a trend.",
        layout: "split",
      },
      {
        id: "useful",
        kicker: "Worth Building",
        headline: "The best early AI bets are narrow and obvious",
        body: "The strongest use cases are easy for users to understand and clearly tied to work they already do.",
        bullets: [
          "summarization",
          "semantic search",
          "writing assistance",
          "workflow automation",
        ],
        layout: "list",
      },
      {
        id: "hype",
        kicker: "Overhyped",
        headline: "Generic chat and vague AI insights are often weak bets",
        body: "If the feature is disconnected from real product context, users usually stop trusting it or ignore it completely.",
        bullets: [
          "chat with no real job",
          "fake-sounding dashboard insights",
          "autonomous agents too early",
        ],
        layout: "list",
      },
      {
        id: "test",
        kicker: "Decision Filter",
        headline: "Test each AI idea against one simple standard",
        body: "Does it remove a real pain point, fit the workflow, and save enough time to justify the added complexity?",
        layout: "split",
      },
      {
        id: "cta",
        kicker: "Next Step",
        headline: "Useful AI beats impressive AI",
        body: "If you want product-shaped AI features instead of hype, read the full article or see the AI SaaS Development service.",
        layout: "cta",
      },
    ],
  },
  {
    slug: "when-a-founder-needs-a-technical-partner",
    title: "When a Founder Needs a Technical Partner — Not Just a Freelance Developer",
    description:
      "A six-page Web Story on when a founder needs technical judgment, not just implementation.",
    poster: "/images/blog/WHen_founder_needs_a_techinal_parnter.png",
    sourceBlogUrl: "/blog/when-a-founder-needs-a-technical-partner",
    serviceUrl: "/book",
    accent: "#22d3ee",
    pages: [
      {
        id: "cover",
        kicker: "Web Story",
        headline: "When a Founder Needs a Technical Partner",
        body: "There is a point where shipping tickets is not enough. The product needs better technical judgment too.",
        layout: "cover",
      },
      {
        id: "difference",
        kicker: "Main Difference",
        headline: "A freelance developer executes. A technical partner helps make better decisions.",
        body: "That includes tradeoffs, sequencing, scope control, architecture direction, and technical risk reduction.",
        layout: "split",
      },
      {
        id: "signals",
        kicker: "Signals",
        headline: "You need more than implementation when the product is changing fast",
        body: "Execution-only help breaks down when the product direction, architecture, or priorities are still unstable.",
        bullets: [
          "version-one scope is unclear",
          "the product already feels fragile",
          "stack decisions have business impact",
        ],
        layout: "list",
      },
      {
        id: "value",
        kicker: "Why It Matters",
        headline: "Technical judgment protects long-term speed",
        body: "Fast output in the short term can still create months of drag later. Strategic speed matters more than raw coding hours.",
        bullets: [
          "better sequencing",
          "less rework",
          "fewer risky decisions",
        ],
        layout: "list",
      },
      {
        id: "when-dev",
        kicker: "Balance",
        headline: "Sometimes a freelance developer is enough",
        body: "If the scope is narrow and the technical direction is already defined, execution-only help is completely fine. The issue is using that model when judgment is also required.",
        layout: "split",
      },
      {
        id: "cta",
        kicker: "Next Step",
        headline: "When you need clarity, not just tickets, book the call",
        body: "Read the full article or book a 20-minute strategy call if the product needs technical judgment and direction.",
        layout: "cta",
      },
    ],
  },
  {
    slug: "recent-npm-security-changes-what-saas-teams-should-fix-right-now",
    title: "Recent npm Security Changes: What SaaS Teams Should Fix Right Now",
    description:
      "A six-page Web Story on trusted publishing, token changes, and the supply-chain fixes SaaS teams should make now.",
    poster: "/images/blog/recent-npm-security-changes.png",
    sourceBlogUrl: "/blog/recent-npm-security-changes-what-saas-teams-should-fix-right-now",
    serviceUrl: "/services/production-readiness-upgrade",
    accent: "#22d3ee",
    pages: [
      {
        id: "cover",
        kicker: "Web Story",
        headline: "Recent npm Security Changes: What SaaS Teams Should Fix Right Now",
        body: "Supply-chain security is no longer just about vulnerabilities. It is also about publishing, tokens, and malware detection.",
        layout: "cover",
      },
      {
        id: "shift",
        kicker: "Main Shift",
        headline: "The ecosystem moved toward safer publishing and tighter token rules",
        body: "Long-lived token habits are being pushed out in favor of trusted publishing and shorter-lived credentials.",
        layout: "split",
      },
      {
        id: "changes",
        kicker: "What Changed",
        headline: "Three changes matter most for typical SaaS teams",
        body: "Even if you do not publish public packages every day, your workflows still sit inside this dependency chain.",
        bullets: [
          "trusted publishing with OIDC",
          "classic token revocation",
          "malware alerts for npm in Dependabot",
        ],
        layout: "list",
      },
      {
        id: "fixes",
        kicker: "This Week",
        headline: "The practical fixes are boring and important",
        body: "Security here is mostly workflow hygiene: remove weak token patterns, enable visibility, and assign ownership.",
        bullets: [
          "audit npm tokens",
          "move CI publishing to OIDC where possible",
          "enable and triage alerts properly",
        ],
        layout: "list",
      },
      {
        id: "ownership",
        kicker: "Real Risk",
        headline: "An alert nobody owns is not a security process",
        body: "Supply-chain hygiene matters because weak workflows can hit build integrity, secrets handling, and deployment safety long before users see a visible incident.",
        layout: "split",
      },
      {
        id: "cta",
        kicker: "Next Step",
        headline: "Treat dependency hygiene like production readiness",
        body: "Read the full article or see the Production Readiness Upgrade service if the workflow behind your product needs cleanup.",
        layout: "cta",
      },
    ],
  },
];

export function getWebStoryBySlug(slug: string) {
  return webStories.find((story) => story.slug === slug);
}
