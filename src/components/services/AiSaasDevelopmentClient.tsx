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
  "Want to add AI features to an existing SaaS product",
  "Are building an AI-first product and need a strong technical partner",
  "Want practical AI workflows, not just a demo",
  "Need help deciding what should and should not be powered by AI",
  "Want AI features that fit cleanly into a real product experience",
];

const problemItems = [
  "AI features with no clear user value",
  "Messy chat or copilot UX that confuses users",
  "Weak retrieval, search, or document workflows",
  "Automation ideas that sound smart but break real operations",
  "AI features bolted onto a product without product thinking",
  "Poor integration between AI functionality and the rest of the SaaS app",
  "Unclear tradeoffs around speed, quality, reliability, and cost",
];

const deliverableItems = [
  "AI product strategy and feature scoping",
  "Chat and copilot-style product experiences",
  "Document understanding and summarization workflows",
  "Semantic search and knowledge retrieval experiences",
  "AI-assisted admin and internal-tool workflows",
  "AI automation for repetitive product or ops tasks",
  "Prompt and workflow design",
  "Frontend and backend implementation",
  "Guardrails, fallback behavior, and monitoring-minded integration",
  "Production-ready integration into your real product experience",
];

const outcomeItems = [
  "More useful product workflows",
  "Faster user actions in repetitive or complex tasks",
  "Stronger product differentiation",
  "AI features that feel integrated, not bolted on",
  "Better internal efficiency through automation and summarization",
  "A cleaner path from AI concept to launch-ready implementation",
];

const differentiators = [
  {
    title: "I build AI features around product value, not hype",
    body: "The goal is not to have AI. The goal is to make a workflow faster, more useful, or easier for the user.",
  },
  {
    title: "I think beyond the demo",
    body: "A good AI feature has to fit the product, support real usage, and feel reliable enough to keep.",
  },
  {
    title: "I focus on practical implementation",
    body: "That means deciding where AI helps, where standard product logic is better, and how the full experience should behave.",
  },
  {
    title: "I keep it founder-friendly",
    body: "You get direct communication, realistic tradeoffs, and AI features designed to support the business, not distract from it.",
  },
];

const processSteps: [string, string][] = [
  ["1. Identify the real use case", "We define where AI adds real value in the product and where it does not."],
  ["2. Scope the feature", "I help shape the workflow, UX, integration points, and technical tradeoffs."],
  ["3. Build the experience", "I implement the frontend, backend, and product logic needed to make the AI feature usable in context."],
  ["4. Refine for real usage", "We improve quality, reliability, and usability based on how the feature is meant to work in practice."],
  ["5. Support what comes next", "I can continue helping with iteration, product expansion, and further AI workflow improvements."],
];

const proofItems = [
  {
    title: "AI-assisted workflow design",
    body: "Built product features and internal flows where AI improved usability and reduced repetitive manual work.",
  },
  {
    title: "SaaS-focused implementation",
    body: "Worked on AI in the context of real products, not isolated demos, so the output fits actual user journeys and product constraints.",
  },
  {
    title: "Production-minded delivery",
    body: "Focused on implementation that can live inside a real SaaS product experience, with practical decisions around scope and behavior.",
  },
];

const faqItems = [
  {
    q: "What kinds of AI features can you build?",
    a: "Things like chat-based workflows, copilots, search, summarization, internal assistant tools, document workflows, and useful automation inside SaaS products.",
  },
  {
    q: "Can you help decide whether AI is even the right choice?",
    a: "Yes. Part of the work is deciding where AI adds real value and where regular product logic is the better solution.",
  },
  {
    q: "Is this only for brand-new AI startups?",
    a: "No. This service also fits existing SaaS products that want to add practical AI capabilities.",
  },
  {
    q: "Can you integrate AI into an existing app?",
    a: "Yes. In many cases, the best path is adding AI into an existing workflow rather than rebuilding the whole product around it.",
  },
  {
    q: "Do you work only with OpenAI?",
    a: "Not necessarily. If your product uses OpenAI, I design integrations around current platform best practices and stable production patterns.",
  },
];

export function AiSaasDevelopmentClient() {
  return (
    <main className="min-h-screen bg-black text-foreground selection:bg-white/20">
      <Navbar />

      <section className="relative flex min-h-[min(100svh,920px)] flex-col items-center justify-center overflow-hidden bg-background px-4 pb-20 pt-28 text-center md:pt-32">
        <div className="absolute inset-0 z-0 bg-grid-white pointer-events-none [mask-image:radial-gradient(ellipse_at_center,transparent_20%,black)]" />
        <div className="pointer-events-none absolute inset-0 flex items-center justify-center bg-transparent [mask-image:radial-gradient(ellipse_at_center,transparent_20%,black)]">
          <div className="h-[20rem] w-[20rem] rounded-full bg-violet-500/20 blur-[100px]" />
        </div>

        <div className="relative z-10 mx-auto max-w-5xl space-y-8">
          <header className="space-y-4">
            <div className="inline-flex items-center rounded-full border border-zinc-800 bg-zinc-900/50 px-3 py-1 text-sm text-zinc-400 backdrop-blur-sm">
              <span className="mr-2 flex h-2 w-2 animate-pulse rounded-full bg-violet-400" />
              AI SaaS Development
            </div>
            <h1 className="text-4xl font-bold tracking-tighter text-white sm:text-5xl xl:text-6xl">
              Build AI features your users will actually use.
            </h1>
            <p className="mx-auto max-w-3xl text-lg text-zinc-400 sm:text-xl">
              I help SaaS founders and startup teams design, build, and ship AI-powered product
              features that solve real workflow problems, from copilots and chat experiences to
              search, summarization, automation, and internal AI tools.
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
                <p className="text-2xl font-bold tabular-nums text-white">AI-powered workflows</p>
                <p className="mt-1 text-xs font-medium uppercase tracking-widest text-zinc-500">Built for product context</p>
              </div>
              <div className="text-center sm:border-r sm:border-white/10 sm:px-4">
                <p className="text-2xl font-bold tabular-nums text-white">Production-minded</p>
                <p className="mt-1 text-xs font-medium uppercase tracking-widest text-zinc-500">Implementation focus</p>
              </div>
              <div className="text-center sm:pl-4">
                <p className="text-2xl font-bold tabular-nums text-violet-400">Real user value</p>
                <p className="mt-1 text-xs font-medium uppercase tracking-widest text-zinc-500">Not just demos</p>
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
              <ServiceSectionCard key={item} delay={i * 0.05}>{item}</ServiceSectionCard>
            ))}
          </ul>
          <p className="mt-6 text-zinc-500">
            This is not for vague "add AI somehow" projects with no user problem behind them.
          </p>
        </div>
      </section>

      <section className="relative border-b border-white/5 px-4 py-20">
        <div className="container mx-auto max-w-5xl">
          <h2 className="text-3xl font-bold tracking-tight text-white md:text-5xl">The problems I solve</h2>
          <p className="mt-6 max-w-3xl text-zinc-400">
            A lot of AI products look impressive in a demo, but fall apart in real usage.
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
            The scope depends on your product stage, but the output is always practical and
            production-ready for real user workflows.
          </p>
          <ul className="mt-8 grid gap-4 md:grid-cols-2">
            {deliverableItems.map((item, i) => (
              <ServiceSectionCard key={item} delay={i * 0.03}>{item}</ServiceSectionCard>
            ))}
          </ul>
        </div>
      </section>

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
            {proofItems.map((p, i) => (
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
            <Link href="/services/saas-mvp-development" className="rounded-full border border-white/15 px-4 py-2 text-sm text-zinc-300 hover:bg-white/5 hover:text-white">
              SaaS MVP Development
            </Link>
            <Link href="/services/production-readiness-upgrade" className="rounded-full border border-white/15 px-4 py-2 text-sm text-zinc-300 hover:bg-white/5 hover:text-white">
              Production Readiness Upgrade
            </Link>
            <Link href="/case-studies" className="rounded-full border border-white/15 px-4 py-2 text-sm text-zinc-300 hover:bg-white/5 hover:text-white">
              Case Studies
            </Link>
            <Link href="/blog/paperchai-from-idea-to-running-saas" className="rounded-full border border-white/15 px-4 py-2 text-sm text-zinc-300 hover:bg-white/5 hover:text-white">
              AI SaaS Case Story
            </Link>
          </div>
        </div>
      </section>

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
              Want AI features that feel useful inside a real product, not just impressive in a demo?
            </h2>
            <p className="max-w-3xl text-lg text-zinc-400 md:text-xl">
              I help founders build AI-powered SaaS experiences that are practical, product-aware,
              and ready to support real users.
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
              Best for founders and teams that want practical AI capabilities tied to real product
              outcomes, not trend-driven feature bloat.
            </p>
          </div>
        </div>
      </section>

      <Footer />
      <MobileNav />
    </main>
  );
}
