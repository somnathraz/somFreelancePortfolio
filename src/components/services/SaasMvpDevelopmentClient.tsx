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

const fitItems = [
  "A founder with a validated idea who needs an MVP built fast",
  "A startup team with product direction but no senior technical execution",
  "A non-technical founder who wants a reliable technical partner",
  "A team that wants to launch quickly without cutting every important corner",
];

const problemItems = [
  "Unclear product scope that keeps expanding",
  "Weak architecture that slows future development",
  "Rushed frontend and backend decisions that create rework",
  "Poor performance and unstable user experience after launch",
  "No clear plan for auth, payments, dashboards, admin tools, or AI features",
  "A launch plan that ignores production basics",
];

const deliverableItems = [
  "Product scoping and feature prioritization",
  "Technical architecture planning",
  "Responsive frontend with Next.js / React",
  "Backend APIs and database design",
  "Authentication and user roles",
  "Payments, subscriptions, or billing flows",
  "Dashboards and admin panels",
  "AI-powered workflows or integrations where they add real value",
  "Deployment setup and launch support",
  "Core performance, SEO, and production-readiness basics",
];

const outcomeItems = [
  "Launch faster with fewer technical mistakes",
  "Validate your idea with a real product",
  "Avoid rebuilding core decisions too early",
  "Create a foundation that supports future features and scale",
  "Move from concept to traction with less friction",
];

const faqItems = [
  {
    q: "How fast can you build an MVP?",
    a: "Timeline depends on scope, but the focus is shipping the smallest version that solves a real user problem instead of overbuilding version one.",
  },
  {
    q: "Can you help with product planning too?",
    a: "Yes. I help shape scope, decide what belongs in the MVP, and avoid technical choices that create expensive rework.",
  },
  {
    q: "Do you only work with SaaS founders?",
    a: "Mostly, yes. This service is designed for SaaS founders and startup teams building or validating product ideas.",
  },
  {
    q: "Can you improve the product after launch?",
    a: "Yes. I can continue with performance improvements, production-readiness upgrades, feature development, and technical guidance after the MVP is live.",
  },
];

const differentiators = [
  {
    title: "Fast, but not careless",
    body: "I move quickly, but your MVP is never treated like a throwaway prototype.",
  },
  {
    title: "Built for launch, not demo day",
    body: "The goal is a usable product you can show customers, test in market, and keep improving.",
  },
  {
    title: "Production-minded from the start",
    body: "Architecture, maintainability, performance, and future scale are considered early.",
  },
  {
    title: "Founder-friendly execution",
    body: "You get direct communication, practical tradeoff decisions, and clear progress.",
  },
];

const processSteps: [string, string][] = [
  ["1. Discovery", "Define the product goal, users, core workflow, and what version one needs."],
  ["2. Scope and architecture", "Shape the MVP into a buildable plan with the right stack and priorities."],
  ["3. Build", "Develop in focused iterations so progress stays visible and practical."],
  ["4. Launch", "Prepare release essentials: deployment, stability, and launch support."],
  ["5. Improve", "Continue with performance, feature expansion, and production upgrades."],
];

export function SaasMvpDevelopmentClient() {
  return (
    <main className="min-h-screen bg-black text-foreground selection:bg-white/20">
      <Navbar />

      {/* Hero — match homepage Hero faded grid + spotlight + bottom fade */}
      <section className="relative flex min-h-[min(100svh,920px)] flex-col items-center justify-center overflow-hidden bg-background px-4 pb-20 pt-28 text-center md:pt-32">
        <div className="absolute inset-0 z-0 bg-grid-white pointer-events-none [mask-image:radial-gradient(ellipse_at_center,transparent_20%,black)]" />
        <div className="pointer-events-none absolute inset-0 flex items-center justify-center bg-transparent [mask-image:radial-gradient(ellipse_at_center,transparent_20%,black)]">
          <div className="h-[20rem] w-[20rem] rounded-full bg-indigo-500/20 blur-[100px]" />
        </div>

        <div className="relative z-10 mx-auto max-w-5xl space-y-8">
          <header className="space-y-4">
            <div className="inline-flex items-center rounded-full border border-zinc-800 bg-zinc-900/50 px-3 py-1 text-sm text-zinc-400 backdrop-blur-sm">
              <span className="mr-2 flex h-2 w-2 animate-pulse rounded-full bg-green-500" />
              SaaS MVP Development
            </div>
            <h1 className="text-4xl font-bold tracking-tighter text-white sm:text-5xl xl:text-6xl">
              Build your SaaS MVP fast — with the right foundation from day one.
            </h1>
            <p className="mx-auto max-w-3xl text-lg text-zinc-400 sm:text-xl">
              I help SaaS founders turn ideas into launch-ready products with clean architecture,
              strong UX, and production-minded engineering. You move faster now without creating
              avoidable problems later.
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

          <div className="mx-auto mt-6 w-full max-w-4xl border-y border-white/10 bg-white/[0.02] px-4 py-6 backdrop-blur-sm">
            <div className="grid grid-cols-1 gap-6 sm:grid-cols-3 sm:gap-4">
              <div className="text-center sm:border-r sm:border-white/10 sm:pr-4">
                <p className="text-2xl font-bold tabular-nums text-white">4+ years</p>
                <p className="mt-1 text-xs font-medium uppercase tracking-widest text-zinc-500">Building products</p>
              </div>
              <div className="text-center sm:border-r sm:border-white/10 sm:px-4">
                <p className="text-2xl font-bold tabular-nums text-white">21 days</p>
                <p className="mt-1 text-xs font-medium uppercase tracking-widest text-zinc-500">MVP shipped</p>
              </div>
              <div className="text-center sm:pl-4">
                <p className="text-2xl font-bold tabular-nums text-white">60%</p>
                <p className="mt-1 text-xs font-medium uppercase tracking-widest text-zinc-500">Latency reduced</p>
              </div>
            </div>
          </div>
        </div>

        <div className="pointer-events-none absolute -bottom-8 left-0 right-0 z-20 h-32 bg-gradient-to-t from-black to-transparent" />
      </section>

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
              <ServiceSectionCard key={item} delay={i * 0.05}>
                {item}
              </ServiceSectionCard>
            ))}
          </ul>
          <p className="mt-6 text-zinc-500">
            Not for brochure websites, cheap template-only work, or projects without a clear product goal.
          </p>
        </div>
      </section>

      <section className="relative border-b border-white/5 px-4 py-20">
        <div className="container mx-auto max-w-5xl">
          <h2 className="text-3xl font-bold tracking-tight text-white md:text-5xl">The problems I solve</h2>
          <p className="mt-6 max-w-3xl text-zinc-400">
            Most MVPs do not fail because they launched too slowly. They fail because they launched fast in the wrong way.
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

      <section className="relative border-b border-white/5 px-4 py-20">
        <div className="pointer-events-none absolute inset-0 bg-grid-white/[0.02]" />
        <div className="container relative z-10 mx-auto max-w-5xl">
          <h2 className="text-3xl font-bold tracking-tight text-white md:text-5xl">What you get</h2>
          <p className="mt-6 max-w-3xl text-zinc-400">
            Ship the smallest version that is useful, credible, and ready to grow.
          </p>
          <ul className="mt-8 grid gap-4 md:grid-cols-2">
            {deliverableItems.map((item, i) => (
              <ServiceSectionCard key={item} delay={i * 0.03}>
                {item}
              </ServiceSectionCard>
            ))}
          </ul>
        </div>
      </section>

      <section className="border-b border-white/5 px-4 py-20">
        <div className="container mx-auto max-w-5xl">
          <h2 className="text-3xl font-bold tracking-tight text-white md:text-5xl">
            What makes my MVP approach different
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

      <section className="relative border-b border-white/5 px-4 py-20">
        <div className="pointer-events-none absolute inset-0 bg-grid-white/[0.02]" />
        <div className="container relative z-10 mx-auto max-w-5xl">
          <h2 className="text-3xl font-bold tracking-tight text-white md:text-5xl">Typical MVP outcomes</h2>
          <ul className="mt-8 grid gap-4 md:grid-cols-2">
            {outcomeItems.map((item, i) => (
              <ServiceSectionCard key={item} delay={i * 0.04} className="bg-black/40">
                {item}
              </ServiceSectionCard>
            ))}
          </ul>
        </div>
      </section>

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

      <section className="border-b border-white/5 px-4 py-20">
        <div className="container mx-auto max-w-5xl">
          <h2 className="text-3xl font-bold tracking-tight text-white md:text-5xl">Selected proof</h2>
          <div className="mt-8 grid gap-4 md:grid-cols-3">
            {[
              {
                title: "21-day MVP launch",
                body: "Delivered an early-stage product fast enough to hit launch goals without skipping critical foundations.",
              },
              {
                title: "60% latency reduction",
                body: "Improved performance in product flows where speed directly affected usability and customer experience.",
              },
              {
                title: "15m → 3m build time",
                body: "Reduced delivery friction by cleaning up build and workflow bottlenecks.",
              },
            ].map((p, i) => (
              <ServiceSectionCard key={p.title} delay={i * 0.08}>
                <p className="text-2xl font-bold text-white md:text-3xl">{p.title}</p>
                <p className="mt-3 text-zinc-400">{p.body}</p>
              </ServiceSectionCard>
            ))}
          </div>
        </div>
      </section>

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
            <Link href="/services/nextjs-performance-optimization" className="rounded-full border border-white/15 px-4 py-2 text-sm text-zinc-300 hover:bg-white/5 hover:text-white">
              Next.js Performance Optimization
            </Link>
            <Link href="/services/production-readiness-upgrade" className="rounded-full border border-white/15 px-4 py-2 text-sm text-zinc-300 hover:bg-white/5 hover:text-white">
              Production Readiness Upgrade
            </Link>
            <Link href="/blog/production-ready-saas-mvp" className="rounded-full border border-white/15 px-4 py-2 text-sm text-zinc-300 hover:bg-white/5 hover:text-white">
              Production-ready SaaS MVP Guide
            </Link>
            <Link href="/blog/from-saas-idea-to-production" className="rounded-full border border-white/15 px-4 py-2 text-sm text-zinc-300 hover:bg-white/5 hover:text-white">
              From SaaS Idea to Production
            </Link>
          </div>
        </div>
      </section>

      {/* Final CTA — match homepage Cta (Particles + ShimmerButton) */}
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
              Need to launch your SaaS MVP without creating a mess behind the scenes?
            </h2>
            <p className="max-w-3xl text-lg text-zinc-400 md:text-xl">
              I help founders ship faster, make better technical decisions, and build products that are ready for real users — not just internal demos.
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
              View case studies
              <ArrowRight className="h-4 w-4" />
            </Link>
            <p className="text-xs text-zinc-500 max-w-xl">
              Best for founders and teams who need real product engineering, not just another generic freelancer.
            </p>
          </div>
        </div>
      </section>

      <Footer />
      <MobileNav />
    </main>
  );
}
