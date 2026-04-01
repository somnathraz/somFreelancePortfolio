"use client";

import Link from "next/link";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { MobileNav } from "@/components/MobileNav";
import { ContactSheet } from "@/components/ContactSheet";
import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";
import { Particles } from "@/components/ui/particles";
import ShimmerButton from "@/components/ui/shimmer-button";
import { ServiceSectionCard } from "@/components/services/ServiceSectionCard";
import { motion } from "motion/react";

// ─── Data ─────────────────────────────────────────────────────────────────────

const fitItems = [
  "Already launched an MVP, but the codebase feels fragile, rushed, or hard to change",
  "Seeing more bugs, slower delivery, or unclear architecture decisions piling up",
  "Want to improve auth, roles, APIs, deployment, monitoring, or overall stability",
  "Need a stronger technical foundation before growing the product or team further",
  "Want to reduce the risk of painful rework, outages, or scaling failures later",
];

const problemItems = [
  "Technical debt from rushed launch decisions slowing every new feature",
  "Weak or unclear architecture that makes additions expensive and risky",
  "Unstable deployment and release workflows that make shipping nerve-wracking",
  "Missing monitoring, logging, or observability — you find out about problems from users",
  "Auth, permissions, or admin flows that were done quickly and need tightening",
  "Inconsistent API design or backend structure that confuses the team",
  "Performance issues that keep coming back because the root cause was never fixed",
  "Poor maintainability making every new change slower and harder than it should be",
];

const deliverableItems = [
  "Architecture review and targeted cleanup of high-risk areas",
  "Frontend and backend refactoring where the code is most fragile",
  "Auth, session, and role/permission improvements",
  "API and database structure cleanup and consistency improvements",
  "Deployment and release-flow improvements for safer, faster shipping",
  "Monitoring, logging, and observability setup recommendations",
  "Performance and stability fixes in key product flows",
  "Security hardening of common weak points",
  "Maintainability improvements to support future team velocity",
  "A clearer technical foundation for scaling users and features",
];

const outcomeItems = [
  "A product that is easier to maintain, extend, and improve week to week",
  "Less technical risk as usage, features, and team size grow",
  "Cleaner architecture and more consistent decisions across the codebase",
  "Better reliability in real product flows — fewer surprises in production",
  "Stronger foundations for scaling users, features, and team velocity",
  "More confidence shipping changes quickly without breaking what already works",
];

const differentiators = [
  {
    title: "I don't treat your MVP like a dead end",
    body: "A lot of teams assume a full rebuild is inevitable. Often, a focused upgrade and cleanup is the smarter, faster, more cost-effective move.",
  },
  {
    title: "Practical improvements first",
    body: "I focus on the changes that reduce risk, improve delivery speed, and make the product easier to scale — not everything that could theoretically be better.",
  },
  {
    title: "I think beyond launch",
    body: "Production readiness is about what happens after users arrive, features multiply, and the team needs to move faster with confidence.",
  },
  {
    title: "Founder-friendly execution",
    body: "You get clear tradeoff explanations, practical recommendations, and direct communication — not unnecessary complexity or jargon.",
  },
];

const processSteps: [string, string][] = [
  ["1. Review", "Assess the product's current architecture, code quality, delivery workflow, and major technical risks."],
  ["2. Prioritize", "Identify the highest-impact improvements first — based on product pain, engineering drag, and business importance."],
  ["3. Upgrade", "Improve the parts of the system that most affect stability, maintainability, and future scale."],
  ["4. Validate", "Confirm the product is more stable, easier to work in, and better prepared for real growth."],
  ["5. Support", "Continue helping with performance, feature delivery, technical planning, and longer-term product evolution."],
];

const proofItems = [
  {
    title: "21-day MVP launch",
    body: "Delivered launch-ready product work fast enough to hit business timelines without skipping core foundations.",
  },
  {
    title: "60% latency reduction",
    body: "Improved performance in product flows where speed directly affected usability and customer experience.",
  },
  {
    title: "Build and workflow cleanup",
    body: "Reduced friction in technical delivery by improving engineering workflows and lowering bottlenecks across the release cycle.",
  },
];

const faqItems = [
  {
    q: "What does 'production-ready' actually mean?",
    a: "It means your product is in a much better state to support real users, future features, and day-to-day engineering work without falling apart under growth or pressure.",
  },
  {
    q: "Do you only work on products you built yourself?",
    a: "No. This service is especially useful for products built quickly by previous freelancers or early teams that now need cleanup, consistency, and stronger stability.",
  },
  {
    q: "Is this a full rewrite?",
    a: "Usually not. In most cases the best result comes from focused upgrades and targeted cleanup — not rebuilding everything from scratch.",
  },
  {
    q: "Can this include security and deployment improvements?",
    a: "Yes. Depending on the product, I can help improve auth, roles, release flow, stability, and common security weak points.",
  },
  {
    q: "Can you continue supporting the product after the upgrade?",
    a: "Yes. I can continue with feature work, performance improvements, and long-term technical direction after the core upgrade is done.",
  },
];

// ─── Component ────────────────────────────────────────────────────────────────

export function ProductionReadinessClient() {
  return (
    <main className="min-h-screen bg-black text-foreground selection:bg-white/20">
      <Navbar />

      {/* ── Hero ── */}
      <section className="relative flex min-h-[min(100svh,920px)] flex-col items-center justify-center overflow-hidden bg-background px-4 pb-20 pt-28 text-center md:pt-32">
        <div className="absolute inset-0 z-0 bg-grid-white pointer-events-none [mask-image:radial-gradient(ellipse_at_center,transparent_20%,black)]" />
        <div className="pointer-events-none absolute inset-0 flex items-center justify-center bg-transparent [mask-image:radial-gradient(ellipse_at_center,transparent_20%,black)]">
          <div className="h-[20rem] w-[20rem] rounded-full bg-violet-500/20 blur-[100px]" />
        </div>

        <div className="relative z-10 mx-auto max-w-5xl space-y-8">
          <header className="space-y-4">
            <div className="inline-flex items-center rounded-full border border-zinc-800 bg-zinc-900/50 px-3 py-1 text-sm text-zinc-400 backdrop-blur-sm">
              <span className="mr-2 flex h-2 w-2 animate-pulse rounded-full bg-violet-400" />
              Production Readiness Upgrade
            </div>
            <h1 className="text-4xl font-bold tracking-tighter text-white sm:text-5xl xl:text-6xl">
              Turn your MVP into a production-ready SaaS product.
            </h1>
            <p className="mx-auto max-w-3xl text-lg text-zinc-400 sm:text-xl">
              I help founders and growing startup teams strengthen architecture, improve stability,
              tighten security, and clean up technical debt — so the product is easier to maintain,
              safer to scale, and more reliable for real users.
            </p>
          </header>

          <div className="flex flex-col items-center justify-center gap-4 sm:flex-row">
            <ContactSheet>
              <Button size="lg" className="h-12 min-w-[220px] bg-white text-base text-black hover:bg-zinc-200">
                Book a 20-minute strategy call
                <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </ContactSheet>
            <Button
              asChild
              variant="outline"
              size="lg"
              className="h-12 min-w-[220px] border-white/10 text-base hover:bg-white/5 hover:text-white"
            >
              <Link href="/case-studies">See relevant case studies</Link>
            </Button>
          </div>

          {/* Proof strip */}
          <div className="mx-auto mt-6 w-full max-w-4xl border-y border-white/10 bg-white/[0.02] px-4 py-6 backdrop-blur-sm">
            <div className="grid grid-cols-1 gap-6 sm:grid-cols-3 sm:gap-4">
              <div className="text-center sm:border-r sm:border-white/10 sm:pr-4">
                <p className="text-2xl font-bold tabular-nums text-white">21 Days</p>
                <p className="mt-1 text-xs font-medium uppercase tracking-widest text-zinc-500">MVP shipped</p>
              </div>
              <div className="text-center sm:border-r sm:border-white/10 sm:px-4">
                <p className="text-2xl font-bold tabular-nums text-white">60%</p>
                <p className="mt-1 text-xs font-medium uppercase tracking-widest text-zinc-500">Latency reduced</p>
              </div>
              <div className="text-center sm:pl-4">
                <p className="text-2xl font-bold tabular-nums text-violet-400">Launch + Scale</p>
                <p className="mt-1 text-xs font-medium uppercase tracking-widest text-zinc-500">Built for both</p>
              </div>
            </div>
          </div>
        </div>

        <div className="pointer-events-none absolute -bottom-8 left-0 right-0 z-20 h-32 bg-gradient-to-t from-black to-transparent" />
      </section>

      {/* ── Who this is for ── */}
      <section className="relative border-b border-white/5 px-4 py-20">
        <div className="pointer-events-none absolute inset-0 bg-grid-white/[0.02]" />
        <div className="container relative z-10 mx-auto max-w-5xl">
          <motion.h2
            initial={{ opacity: 0, y: 12 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-3xl font-bold tracking-tight text-white md:text-5xl"
          >
            Who this is for
          </motion.h2>
          <ul className="mt-8 grid gap-4 md:grid-cols-2">
            {fitItems.map((item, i) => (
              <ServiceSectionCard key={item} delay={i * 0.05}>{item}</ServiceSectionCard>
            ))}
          </ul>
          <p className="mt-6 text-zinc-500">
            Not for brochure sites or cosmetic redesigns. This is for SaaS products where reliability,
            maintainability, and engineering quality directly affect growth.
          </p>
        </div>
      </section>

      {/* ── Problems I solve ── */}
      <section className="relative border-b border-white/5 px-4 py-20">
        <div className="container mx-auto max-w-5xl">
          <h2 className="text-3xl font-bold tracking-tight text-white md:text-5xl">The problems I solve</h2>
          <p className="mt-6 max-w-3xl text-zinc-400">
            A lot of MVPs work just well enough to launch, but not well enough to support real growth.
            The codebase that got you here often becomes the thing slowing you down next.
          </p>
          <ul className="mt-8 grid gap-4 md:grid-cols-2">
            {problemItems.map((item, i) => (
              <ServiceSectionCard key={item} delay={i * 0.04} className="bg-black/40">
                {item}
              </ServiceSectionCard>
            ))}
          </ul>
        </div>
      </section>

      {/* ── What you get ── */}
      <section className="relative border-b border-white/5 px-4 py-20">
        <div className="pointer-events-none absolute inset-0 bg-grid-white/[0.02]" />
        <div className="container relative z-10 mx-auto max-w-5xl">
          <h2 className="text-3xl font-bold tracking-tight text-white md:text-5xl">What you get</h2>
          <p className="mt-6 max-w-3xl text-zinc-400">
            The goal is simple: move from "it works for now" to "it can support real users and real
            growth." The specific scope depends on what the product needs most.
          </p>
          <ul className="mt-8 grid gap-4 md:grid-cols-2">
            {deliverableItems.map((item, i) => (
              <ServiceSectionCard key={item} delay={i * 0.03}>{item}</ServiceSectionCard>
            ))}
          </ul>
        </div>
      </section>

      {/* ── What makes my approach different ── */}
      <section className="border-b border-white/5 px-4 py-20">
        <div className="container mx-auto max-w-5xl">
          <h2 className="text-3xl font-bold tracking-tight text-white md:text-5xl">
            What makes my approach different
          </h2>
          <div className="mt-8 grid gap-4 md:grid-cols-2">
            {differentiators.map((d, i) => (
              <ServiceSectionCard key={d.title} delay={i * 0.06}>
                <h3 className="text-xl font-semibold text-white">{d.title}</h3>
                <p className="mt-3 text-zinc-400">{d.body}</p>
              </ServiceSectionCard>
            ))}
          </div>
        </div>
      </section>

      {/* ── Typical outcomes ── */}
      <section className="relative border-b border-white/5 px-4 py-20">
        <div className="pointer-events-none absolute inset-0 bg-grid-white/[0.02]" />
        <div className="container relative z-10 mx-auto max-w-5xl">
          <h2 className="text-3xl font-bold tracking-tight text-white md:text-5xl">Typical outcomes</h2>
          <ul className="mt-8 grid gap-4 md:grid-cols-2">
            {outcomeItems.map((item, i) => (
              <ServiceSectionCard key={item} delay={i * 0.04} className="bg-black/40">
                {item}
              </ServiceSectionCard>
            ))}
          </ul>
        </div>
      </section>

      {/* ── Process ── */}
      <section className="border-b border-white/5 px-4 py-20">
        <div className="container mx-auto max-w-5xl">
          <h2 className="text-3xl font-bold tracking-tight text-white md:text-5xl">My process</h2>
          <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-5">
            {processSteps.map(([title, body], i) => (
              <ServiceSectionCard key={title} delay={i * 0.05} className="h-full min-h-[140px] lg:min-h-[180px]">
                <h3 className="text-xs font-semibold uppercase tracking-widest text-white">{title}</h3>
                <p className="mt-3 text-sm text-zinc-400">{body}</p>
              </ServiceSectionCard>
            ))}
          </div>
        </div>
      </section>

      {/* ── Selected proof ── */}
      <section className="border-b border-white/5 px-4 py-20">
        <div className="container mx-auto max-w-5xl">
          <h2 className="text-3xl font-bold tracking-tight text-white md:text-5xl">Selected proof</h2>
          <div className="mt-8 grid gap-4 md:grid-cols-3">
            {proofItems.map((p, i) => (
              <ServiceSectionCard key={p.title} delay={i * 0.08}>
                <p className="text-2xl font-bold text-white md:text-3xl">{p.title}</p>
                <p className="mt-3 text-zinc-400">{p.body}</p>
              </ServiceSectionCard>
            ))}
          </div>
        </div>
      </section>

      {/* ── FAQ ── */}
      <section className="border-b border-white/5 px-4 py-20">
        <div className="container mx-auto max-w-5xl">
          <h2 className="text-3xl font-bold tracking-tight text-white md:text-5xl">FAQ</h2>
          <div className="mt-8 space-y-4">
            {faqItems.map((item, i) => (
              <ServiceSectionCard key={item.q} delay={i * 0.06}>
                <h3 className="text-lg font-semibold text-white">{item.q}</h3>
                <p className="mt-3 text-zinc-400">{item.a}</p>
              </ServiceSectionCard>
            ))}
          </div>
        </div>
      </section>

      <section className="border-b border-white/5 px-4 py-16">
        <div className="container mx-auto max-w-5xl">
          <h2 className="text-2xl font-bold tracking-tight text-white md:text-3xl">Related resources</h2>
          <div className="mt-6 flex flex-wrap gap-3">
            <Link href="/services/saas-mvp-development" className="rounded-full border border-white/15 px-4 py-2 text-sm text-zinc-300 hover:bg-white/5 hover:text-white">
              SaaS MVP Development
            </Link>
            <Link href="/services/nextjs-performance-optimization" className="rounded-full border border-white/15 px-4 py-2 text-sm text-zinc-300 hover:bg-white/5 hover:text-white">
              Next.js Performance Optimization
            </Link>
            <Link href="/case-studies" className="rounded-full border border-white/15 px-4 py-2 text-sm text-zinc-300 hover:bg-white/5 hover:text-white">
              Case Studies
            </Link>
            <Link href="/blog/production-ready-saas-mvp" className="rounded-full border border-white/15 px-4 py-2 text-sm text-zinc-300 hover:bg-white/5 hover:text-white">
              Production-ready SaaS MVP Guide
            </Link>
          </div>
        </div>
      </section>

      {/* ── Final CTA ── */}
      <section className="relative flex w-full flex-col items-center justify-center overflow-hidden border-t border-white/10 bg-black px-4 py-32 text-center">
        <div className="pointer-events-none absolute inset-0 bg-gradient-to-b from-zinc-900/50 to-black" />
        <Particles
          className="pointer-events-none absolute inset-0"
          quantity={200}
          staticity={30}
          ease={50}
          color="#ffffff"
          refresh
        />
        <div className="relative z-10 mx-auto flex max-w-4xl flex-col items-center gap-8">
          <div className="animate-in fade-in slide-in-from-bottom-8 duration-700 flex flex-col gap-4 items-center">
            <h2 className="text-4xl font-bold tracking-tighter text-transparent bg-clip-text bg-gradient-to-b from-white via-white/90 to-white/50 md:text-6xl">
              Your MVP got you to launch. Now it needs to support real growth.
            </h2>
            <p className="max-w-3xl text-lg text-zinc-400 md:text-xl">
              I help founders strengthen the product behind the scenes — so it becomes easier to scale,
              safer to maintain, and more reliable for the people using it.
            </p>
          </div>
          <div className="animate-in fade-in slide-in-from-bottom-8 duration-700 delay-150 flex flex-col items-center gap-4">
            <ContactSheet>
              <ShimmerButton className="shadow-[0_0_40px_-10px_rgba(255,255,255,0.3)] transition-transform duration-300 hover:scale-105">
                <span className="whitespace-pre-wrap px-4 text-center text-base font-semibold leading-none tracking-tight text-white lg:text-lg">
                  Book a 20-minute strategy call
                </span>
              </ShimmerButton>
            </ContactSheet>
            <Link
              href="/case-studies"
              className="inline-flex items-center gap-2 text-zinc-300 underline underline-offset-4 hover:text-white"
            >
              View relevant case studies
              <ArrowRight className="h-4 w-4" />
            </Link>
            <p className="text-xs text-zinc-500 max-w-xl">
              Best for founders and teams with a live product that needs to be stronger, safer, and
              ready for the next stage of growth.
            </p>
          </div>
        </div>
      </section>

      <Footer />
      <MobileNav />
    </main>
  );
}
