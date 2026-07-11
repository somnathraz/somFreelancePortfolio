"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import {
  ArrowRight,
  ArrowUpRight,
  Bot,
  Calendar,
  CheckCircle2,
  ExternalLink,
  FileText,
  Globe,
  IdCard,
  Instagram,
  LayoutTemplate,
  MapPin,
  MessageCircle,
  Pencil,
  RefreshCw,
  ShieldCheck,
  Sparkles,
} from "lucide-react";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { ClientMobileNav } from "@/components/ClientMobileNav";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

const TOC = [
  { id: "summary", label: "Summary" },
  { id: "problem", label: "Problem" },
  { id: "solution", label: "Solution" },
  { id: "sources", label: "Sources" },
  { id: "preview", label: "Preview" },
  { id: "features", label: "Features" },
  { id: "booking", label: "Booking" },
  { id: "architecture", label: "Architecture" },
  { id: "contribution", label: "My role" },
  { id: "challenges", label: "Challenges" },
  { id: "status", label: "Status" },
  { id: "learnings", label: "Learnings" },
] as const;

const TECH = [
  "Next.js",
  "TypeScript",
  "PostgreSQL",
  "AI APIs",
  "Razorpay",
  "AWS SES",
  "Vercel",
];

const SUMMARY = [
  { label: "Role", value: "Founder and Full-Stack Developer" },
  { label: "Product", value: "AI website and booking platform" },
  { label: "Market", value: "India-first" },
  { label: "Audience", value: "Small businesses and solo professionals" },
  { label: "Status", value: "In active development" },
  { label: "Website", value: "paperchaiapp.com", href: "https://paperchaiapp.com" },
];

const PROBLEMS = [
  {
    title: "Information scattered across platforms",
    body: "Services live on WhatsApp, reviews on Google, photos on Instagram — with no single place customers can trust.",
  },
  {
    title: "Website builders begin with a blank page",
    body: "Most tools ask owners to write copy, pick layouts and invent structure from scratch. That is the wrong starting point.",
  },
  {
    title: "Customers cannot easily discover or book",
    body: "Without a clear site, people struggle to find services, hours, location and a simple way to book or enquire.",
  },
];

const WORKFLOW = [
  "Select a source",
  "Import existing information",
  "Review extracted details",
  "Generate the website",
  "Add booking settings",
  "Publish and share",
];

const SOURCES = [
  { name: "Google Business", detail: "Primary launch source", primary: true, icon: MapPin },
  { name: "Visiting card", detail: "Image upload", primary: false, icon: IdCard },
  { name: "Brochure or PDF", detail: "Document import", primary: false, icon: FileText },
  { name: "Existing website", detail: "URL import", primary: false, icon: Globe },
  { name: "Social profile", detail: "Coming soon", primary: false, icon: Instagram, planned: true },
  { name: "Resume or CV", detail: "Document import", primary: false, icon: FileText },
  { name: "Manual brief", detail: "Guided form", primary: false, icon: Pencil },
];

const SITE_SECTIONS = [
  "Hero",
  "About",
  "Services",
  "Reviews",
  "Gallery",
  "Opening hours",
  "Map",
  "Booking",
  "WhatsApp",
];

const FEATURES = [
  {
    icon: Sparkles,
    title: "AI-assisted content generation",
    body: "Turn imported business facts into clear website copy and structure — then let the owner review every line.",
  },
  {
    icon: ShieldCheck,
    title: "Review before publishing",
    body: "Nothing goes live until the owner checks services, photos, hours and contact details.",
  },
  {
    icon: RefreshCw,
    title: "Edit and republish",
    body: "Update the site after launch and republish to the same URL without breaking the public link.",
  },
  {
    icon: Calendar,
    title: "Booking and scheduling",
    body: "Email booking, WhatsApp booking, calendar embeds and native slot scheduling from one profile.",
  },
  {
    icon: Globe,
    title: "Subdomain and custom domains",
    body: "Ship on a PaperChai wildcard subdomain first, then attach an owner custom domain when ready.",
  },
  {
    icon: MessageCircle,
    title: "WhatsApp and enquiry actions",
    body: "Put the conversation where Indian businesses already work — WhatsApp, email and booking requests.",
  },
];

const ARCH_STEPS = [
  "Sources",
  "Import & extraction",
  "Structured profile",
  "AI composition",
  "Website renderer",
  "Published site",
  "Booking & dashboard",
];

const ENGINEERING = [
  "Shared structured data model",
  "Safe AI-generated content",
  "OAuth state and token handling",
  "Postgres persistence",
  "Stable slugs during editing",
  "Wildcard domain routing",
  "Custom-domain verification",
  "Native-slot conflict prevention",
  "Serverless-compatible email and booking flows",
];

const CONTRIBUTIONS = [
  "Product ideation and positioning",
  "UX flow and onboarding",
  "Full-stack architecture",
  "Source-import implementation",
  "AI generation pipeline",
  "Authentication and database design",
  "Booking system",
  "Publishing and custom domains",
  "Subscription and plan architecture",
  "Deployment and production setup",
];

const CHALLENGES = [
  {
    title: "Converting different sources into one format",
    body: "Google Maps, resumes, social profiles and business documents all arrive with different structures. PaperChai normalises them into one reusable website-data format so templates and booking can share the same profile.",
  },
  {
    title: "Editing without breaking the published website",
    body: "Owners need to update and republish while keeping the same slug and public URL. Publishing had to treat identity as stable and content as replaceable.",
  },
  {
    title: "Turning a generated page into a useful business tool",
    body: "A pretty AI page is not enough. Booking, WhatsApp, services, maps and contact actions are what make the product valuable for real small businesses.",
  },
];

const BUILT = [
  "Website generation",
  "Multiple source inputs",
  "Review step",
  "Post-publish editing",
  "Subdomain publishing",
  "Custom-domain owner flow",
  "Email and WhatsApp booking",
  "Calendar integration",
  "Native scheduling",
  "Booking dashboard",
];

const NEXT = [
  "Razorpay production billing",
  "Production testing",
  "Google Business import refinement",
  "Onboarding simplification",
  "Customer validation",
  "Analytics",
  "Selected social integrations",
];

const LEARNINGS = [
  "Product focus matters more than feature count",
  "Imported data must always be reviewed",
  "Stable publishing architecture is essential",
  "Small businesses care about outcomes, not website-builder terminology",
  "Booking and enquiries create clearer value than design alone",
  "User validation should decide which integrations are built next",
];

function Section({
  id,
  children,
  className,
}: {
  id: string;
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <section id={id} className={cn("scroll-mt-28 border-b border-white/5 py-20 md:py-28", className)}>
      {children}
    </section>
  );
}

function Eyebrow({ children }: { children: React.ReactNode }) {
  return (
    <p className="mb-4 font-mono text-[11px] uppercase tracking-[0.2em] text-amber-500/80">
      {children}
    </p>
  );
}

export function PaperChaiCaseStudy() {
  const [active, setActive] = useState<string>(TOC[0].id);

  useEffect(() => {
    const els = TOC.map((t) => document.getElementById(t.id)).filter(Boolean) as HTMLElement[];
    if (!els.length) return;

    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((e) => e.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio);
        if (visible[0]?.target?.id) setActive(visible[0].target.id);
      },
      { rootMargin: "-20% 0px -55% 0px", threshold: [0.1, 0.35, 0.6] }
    );

    els.forEach((el) => observer.observe(el));
    return () => observer.disconnect();
  }, []);

  return (
    <main className="min-h-screen bg-black text-foreground selection:bg-amber-500/20">
      <Navbar />

      {/* Hero */}
      <section className="relative overflow-hidden border-b border-white/5 px-4 pb-16 pt-28 md:px-6 md:pb-24 md:pt-32">
        <div className="pointer-events-none absolute inset-0 bg-grid-white opacity-40 [mask-image:radial-gradient(ellipse_at_top,black_20%,transparent_70%)]" />
        <div className="pointer-events-none absolute -left-24 top-24 h-72 w-72 rounded-full bg-amber-600/15 blur-[100px]" />
        <div className="pointer-events-none absolute -right-16 bottom-0 h-64 w-64 rounded-full bg-orange-700/10 blur-[90px]" />

        <div className="relative z-10 mx-auto grid max-w-6xl items-center gap-12 lg:grid-cols-[1.05fr_0.95fr]">
          <motion.div
            initial={{ opacity: 0, y: 18 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.55, ease: [0.22, 1, 0.36, 1] }}
            className="space-y-6"
          >
            <div className="inline-flex items-center gap-2 rounded-full border border-amber-500/20 bg-amber-500/5 px-3 py-1 text-xs text-amber-200/90">
              <span className="h-1.5 w-1.5 rounded-full bg-amber-400" />
              Founder Project · SaaS · AI
            </div>

            <div>
              <h1 className="text-5xl font-bold tracking-tight text-white md:text-7xl">PaperChai</h1>
              <p className="mt-4 max-w-xl text-xl font-medium leading-snug text-zinc-200 md:text-2xl">
                Turning existing business information into booking-ready websites
              </p>
            </div>

            <p className="max-w-xl text-base leading-relaxed text-zinc-400 md:text-lg">
              PaperChai creates one-page websites from sources such as Google Maps, visiting cards,
              documents and existing profiles — so small businesses do not start from a blank template.
            </p>

            <div className="flex flex-col gap-3 sm:flex-row sm:items-center">
              <Button
                asChild
                size="lg"
                className="h-12 bg-amber-500 text-base text-black hover:bg-amber-400"
              >
                <a href="https://paperchaiapp.com" target="_blank" rel="noopener noreferrer">
                  Visit PaperChai
                  <ExternalLink className="ml-1 h-4 w-4" />
                </a>
              </Button>
              <Button
                asChild
                variant="outline"
                size="lg"
                className="h-12 border-white/15 text-base hover:bg-white/5 hover:text-white"
              >
                <a href="#summary">
                  Read the build story
                  <ArrowRight className="ml-1 h-4 w-4" />
                </a>
              </Button>
            </div>

            <div className="flex flex-wrap gap-2 pt-2">
              {TECH.map((t) => (
                <span
                  key={t}
                  className="rounded-full border border-white/10 bg-white/[0.03] px-3 py-1 font-mono text-[10px] uppercase tracking-wider text-zinc-400"
                >
                  {t}
                </span>
              ))}
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.65, delay: 0.1, ease: [0.22, 1, 0.36, 1] }}
            className="relative mx-auto w-full max-w-md"
          >
            <div className="absolute -inset-3 rounded-[2rem] bg-gradient-to-br from-amber-500/20 via-transparent to-orange-600/10 blur-2xl" />
            <div className="relative overflow-hidden rounded-[1.75rem] border border-white/10 bg-zinc-950 shadow-[0_40px_80px_-40px_rgba(0,0,0,0.9)]">
              <div className="flex items-center gap-2 border-b border-white/5 bg-white/[0.03] px-4 py-3">
                <span className="h-2.5 w-2.5 rounded-full bg-zinc-700" />
                <span className="h-2.5 w-2.5 rounded-full bg-zinc-700" />
                <span className="h-2.5 w-2.5 rounded-full bg-zinc-700" />
                <span className="ml-2 truncate font-mono text-[10px] text-zinc-500">
                  glowgrace.paperchaiapp.com
                </span>
              </div>
              <div className="relative aspect-[9/16] max-h-[520px] bg-zinc-900">
                <Image
                  src="/images/Project-1.png"
                  alt="PaperChai generated website preview"
                  fill
                  priority
                  sizes="(max-width: 768px) 90vw, 420px"
                  className="object-cover object-top"
                />
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      <div className="mx-auto flex max-w-6xl gap-10 px-4 md:px-6">
        {/* Sticky TOC — desktop */}
        <aside className="sticky top-28 hidden h-fit w-44 shrink-0 py-20 lg:block">
          <p className="mb-4 font-mono text-[10px] uppercase tracking-[0.2em] text-zinc-600">
            On this page
          </p>
          <nav className="flex flex-col gap-1.5 border-l border-white/10 pl-3">
            {TOC.map((item) => (
              <a
                key={item.id}
                href={`#${item.id}`}
                className={cn(
                  "text-sm transition-colors",
                  active === item.id
                    ? "font-medium text-amber-400"
                    : "text-zinc-500 hover:text-zinc-300"
                )}
              >
                {item.label}
              </a>
            ))}
          </nav>
        </aside>

        <div className="min-w-0 flex-1">
          {/* Summary */}
          <Section id="summary">
            <Eyebrow>01 — Product summary</Eyebrow>
            <h2 className="mb-10 max-w-2xl text-3xl font-bold tracking-tight text-white md:text-4xl">
              A founder-built case study, not a pitch deck
            </h2>
            <div className="grid gap-px overflow-hidden rounded-2xl border border-white/10 bg-white/10 sm:grid-cols-2 lg:grid-cols-3">
              {SUMMARY.map((row) => (
                <div key={row.label} className="bg-zinc-950/90 p-5">
                  <p className="font-mono text-[10px] uppercase tracking-widest text-zinc-500">
                    {row.label}
                  </p>
                  {row.href ? (
                    <a
                      href={row.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="mt-2 inline-flex items-center gap-1.5 text-sm font-medium text-amber-400 hover:text-amber-300"
                    >
                      {row.value}
                      <ArrowUpRight className="h-3.5 w-3.5" />
                    </a>
                  ) : (
                    <p className="mt-2 text-sm font-medium text-zinc-200">{row.value}</p>
                  )}
                </div>
              ))}
            </div>
          </Section>

          {/* Problem */}
          <Section id="problem">
            <Eyebrow>02 — Problem</Eyebrow>
            <h2 className="mb-4 max-w-3xl text-3xl font-bold tracking-tight text-white md:text-4xl">
              Small businesses are online, but their information is scattered
            </h2>
            <p className="mb-10 max-w-2xl text-zinc-400 leading-relaxed">
              Many businesses depend on Google Maps, Instagram and WhatsApp but do not have one clear
              place showing services, reviews, location, contact information and bookings.
            </p>
            <div className="grid gap-4 md:grid-cols-3">
              {PROBLEMS.map((p, i) => (
                <motion.div
                  key={p.title}
                  initial={{ opacity: 0, y: 16 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.08, duration: 0.45 }}
                  className="rounded-2xl border border-white/10 bg-white/[0.02] p-6"
                >
                  <span className="font-mono text-[11px] text-amber-500/80">0{i + 1}</span>
                  <h3 className="mt-3 text-lg font-semibold text-white">{p.title}</h3>
                  <p className="mt-2 text-sm leading-relaxed text-zinc-400">{p.body}</p>
                </motion.div>
              ))}
            </div>
          </Section>

          {/* Solution */}
          <Section id="solution">
            <Eyebrow>03 — Solution</Eyebrow>
            <h2 className="mb-4 max-w-3xl text-3xl font-bold tracking-tight text-white md:text-4xl">
              Start with what the business already has
            </h2>
            <p className="mb-10 max-w-2xl text-zinc-400 leading-relaxed">
              PaperChai imports existing information, structures it into a business profile, generates
              a one-page site, then layers booking and contact actions on top.
            </p>

            {/* Desktop horizontal flow */}
            <div className="hidden overflow-x-auto md:block">
              <ol className="flex min-w-max items-stretch gap-0">
                {WORKFLOW.map((step, i) => (
                  <li key={step} className="flex items-center">
                    <div className="w-40 rounded-xl border border-white/10 bg-zinc-950/60 px-4 py-5 text-center">
                      <span className="font-mono text-[10px] text-amber-500">{i + 1}</span>
                      <p className="mt-2 text-sm font-medium text-zinc-200">{step}</p>
                    </div>
                    {i < WORKFLOW.length - 1 && (
                      <div className="mx-1 h-px w-6 bg-gradient-to-r from-amber-500/50 to-transparent" />
                    )}
                  </li>
                ))}
              </ol>
            </div>

            {/* Mobile stacked flow */}
            <ol className="space-y-3 md:hidden">
              {WORKFLOW.map((step, i) => (
                <li
                  key={step}
                  className="flex items-start gap-4 rounded-xl border border-white/10 bg-zinc-950/60 px-4 py-4"
                >
                  <span className="font-mono text-sm text-amber-500">{i + 1}</span>
                  <p className="text-sm font-medium text-zinc-200">{step}</p>
                </li>
              ))}
            </ol>
          </Section>

          {/* Sources */}
          <Section id="sources">
            <Eyebrow>04 — Source inputs</Eyebrow>
            <h2 className="mb-4 max-w-3xl text-3xl font-bold tracking-tight text-white md:text-4xl">
              Import from the places businesses already live
            </h2>
            <p className="mb-10 max-w-2xl text-zinc-400 leading-relaxed">
              Google Business is the primary launch source. Other inputs are supported or planned —
              social OAuth integrations are labelled when they are not publicly available yet.
            </p>
            <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
              {SOURCES.map((s) => {
                const Icon = s.icon;
                return (
                  <div
                    key={s.name}
                    className={cn(
                      "relative rounded-2xl border p-5 transition-colors",
                      s.primary
                        ? "border-amber-500/40 bg-amber-500/[0.06]"
                        : "border-white/10 bg-white/[0.02]"
                    )}
                  >
                    {s.primary && (
                      <span className="absolute right-4 top-4 rounded-full bg-amber-500/15 px-2 py-0.5 font-mono text-[9px] uppercase tracking-wider text-amber-300">
                        Primary
                      </span>
                    )}
                    {"planned" in s && s.planned && (
                      <span className="absolute right-4 top-4 rounded-full border border-white/10 px-2 py-0.5 font-mono text-[9px] uppercase tracking-wider text-zinc-500">
                        Coming soon
                      </span>
                    )}
                    <Icon className={cn("h-5 w-5", s.primary ? "text-amber-400" : "text-zinc-400")} />
                    <h3 className="mt-4 text-base font-semibold text-white">{s.name}</h3>
                    <p className="mt-1 text-sm text-zinc-500">{s.detail}</p>
                  </div>
                );
              })}
            </div>
          </Section>

          {/* Preview */}
          <Section id="preview">
            <Eyebrow>05 — Generated website</Eyebrow>
            <h2 className="mb-4 max-w-3xl text-3xl font-bold tracking-tight text-white md:text-4xl">
              One profile, multiple website designs
            </h2>
            <p className="mb-8 max-w-2xl text-zinc-400 leading-relaxed">
              A structured business profile can power different one-page templates while keeping the
              same services, reviews, hours and booking settings.
            </p>

            <div className="overflow-hidden rounded-2xl border border-white/10 bg-zinc-950">
              <div className="flex items-center gap-2 border-b border-white/5 px-4 py-3">
                <span className="h-2.5 w-2.5 rounded-full bg-zinc-700" />
                <span className="h-2.5 w-2.5 rounded-full bg-zinc-700" />
                <span className="h-2.5 w-2.5 rounded-full bg-zinc-700" />
                <span className="ml-2 font-mono text-[10px] text-zinc-500">
                  yourname.paperchaiapp.com
                </span>
              </div>
              <div className="grid md:grid-cols-[1.2fr_0.8fr]">
                <div className="relative aspect-[4/5] md:aspect-auto md:min-h-[420px]">
                  <Image
                    src="/images/Project-1.png"
                    alt="PaperChai generated site mockup"
                    fill
                    sizes="(max-width: 768px) 100vw, 60vw"
                    className="object-cover object-top"
                  />
                </div>
                <div className="border-t border-white/5 p-6 md:border-l md:border-t-0">
                  <p className="font-mono text-[10px] uppercase tracking-widest text-zinc-500">
                    Site sections
                  </p>
                  <ul className="mt-4 space-y-2">
                    {SITE_SECTIONS.map((s) => (
                      <li key={s} className="flex items-center gap-2 text-sm text-zinc-300">
                        <LayoutTemplate className="h-3.5 w-3.5 text-amber-500/70" />
                        {s}
                      </li>
                    ))}
                  </ul>
                  <p className="mt-8 text-xs leading-relaxed text-zinc-500">
                    One structured business profile can power multiple website designs.
                  </p>
                </div>
              </div>
            </div>
          </Section>

          {/* Features */}
          <Section id="features">
            <Eyebrow>06 — Features</Eyebrow>
            <h2 className="mb-10 max-w-3xl text-3xl font-bold tracking-tight text-white md:text-4xl">
              Built for outcomes, not website-builder jargon
            </h2>
            <div className="grid gap-4 sm:grid-cols-2">
              {FEATURES.map((f, i) => {
                const Icon = f.icon;
                return (
                  <motion.div
                    key={f.title}
                    initial={{ opacity: 0, y: 14 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: i * 0.05, duration: 0.4 }}
                    className="rounded-2xl border border-white/10 bg-white/[0.02] p-6"
                  >
                    <Icon className="h-5 w-5 text-amber-400" />
                    <h3 className="mt-4 text-lg font-semibold text-white">{f.title}</h3>
                    <p className="mt-2 text-sm leading-relaxed text-zinc-400">{f.body}</p>
                  </motion.div>
                );
              })}
            </div>
          </Section>

          {/* Booking */}
          <Section id="booking">
            <Eyebrow>07 — Booking workflow</Eyebrow>
            <h2 className="mb-10 max-w-3xl text-3xl font-bold tracking-tight text-white md:text-4xl">
              Visitor and owner sides of the same loop
            </h2>
            <div className="grid gap-4 md:grid-cols-2">
              <div className="rounded-2xl border border-white/10 bg-white/[0.02] p-6 md:p-8">
                <p className="font-mono text-[10px] uppercase tracking-widest text-amber-500">
                  Visitor experience
                </p>
                <ul className="mt-6 space-y-4">
                  {[
                    "Choose service",
                    "Select date and time",
                    "Enter contact details",
                    "Submit request or continue through WhatsApp",
                  ].map((item) => (
                    <li key={item} className="flex items-start gap-3 text-sm text-zinc-300">
                      <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-amber-500/80" />
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
              <div className="rounded-2xl border border-white/10 bg-white/[0.02] p-6 md:p-8">
                <p className="font-mono text-[10px] uppercase tracking-widest text-amber-500">
                  Owner experience
                </p>
                <ul className="mt-6 space-y-4">
                  {[
                    "Set services and availability",
                    "Review upcoming bookings",
                    "Confirm, reschedule or cancel",
                    "Export booking information",
                  ].map((item) => (
                    <li key={item} className="flex items-start gap-3 text-sm text-zinc-300">
                      <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-amber-500/80" />
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </Section>

          {/* Architecture */}
          <Section id="architecture">
            <Eyebrow>08 — Technical architecture</Eyebrow>
            <h2 className="mb-8 max-w-3xl text-3xl font-bold tracking-tight text-white md:text-4xl">
              From source to published site
            </h2>

            <div className="mb-10 overflow-x-auto rounded-2xl border border-white/10 bg-zinc-950/80 p-5 md:p-8">
              <div className="flex min-w-max flex-col gap-3 md:flex-row md:items-center md:gap-0">
                {ARCH_STEPS.map((step, i) => (
                  <div key={step} className="flex items-center md:flex-row">
                    <div className="rounded-lg border border-amber-500/20 bg-amber-500/[0.06] px-3 py-2 text-center">
                      <p className="whitespace-nowrap text-xs font-medium text-amber-100/90">{step}</p>
                    </div>
                    {i < ARCH_STEPS.length - 1 && (
                      <span className="mx-2 hidden text-zinc-600 md:inline">→</span>
                    )}
                    {i < ARCH_STEPS.length - 1 && (
                      <span className="my-1 ml-4 text-zinc-600 md:hidden">↓</span>
                    )}
                  </div>
                ))}
              </div>
            </div>

            <p className="mb-4 font-mono text-[10px] uppercase tracking-widest text-zinc-500">
              Engineering considerations
            </p>
            <ul className="grid gap-2 sm:grid-cols-2">
              {ENGINEERING.map((item) => (
                <li
                  key={item}
                  className="flex items-start gap-2 rounded-lg border border-white/5 bg-white/[0.02] px-3 py-2.5 text-sm text-zinc-300"
                >
                  <Bot className="mt-0.5 h-3.5 w-3.5 shrink-0 text-amber-500/70" />
                  {item}
                </li>
              ))}
            </ul>
          </Section>

          {/* Contribution */}
          <Section id="contribution">
            <Eyebrow>09 — My contribution</Eyebrow>
            <h2 className="mb-4 max-w-3xl text-3xl font-bold tracking-tight text-white md:text-4xl">
              What I built as founder and engineer
            </h2>
            <p className="mb-8 max-w-2xl text-zinc-400 leading-relaxed">
              I own the product end to end — from positioning and onboarding to architecture,
              publishing and production setup.
            </p>
            <ul className="grid gap-2 sm:grid-cols-2">
              {CONTRIBUTIONS.map((item) => (
                <li
                  key={item}
                  className="flex items-center gap-3 rounded-xl border border-white/10 bg-white/[0.02] px-4 py-3 text-sm text-zinc-200"
                >
                  <span className="h-1.5 w-1.5 shrink-0 rounded-full bg-amber-400" />
                  {item}
                </li>
              ))}
            </ul>
          </Section>

          {/* Challenges */}
          <Section id="challenges">
            <Eyebrow>10 — Key challenges</Eyebrow>
            <h2 className="mb-10 max-w-3xl text-3xl font-bold tracking-tight text-white md:text-4xl">
              The hard parts that shaped the product
            </h2>
            <div className="space-y-4">
              {CHALLENGES.map((c, i) => (
                <div
                  key={c.title}
                  className="rounded-2xl border border-white/10 bg-gradient-to-br from-white/[0.03] to-transparent p-6 md:p-8"
                >
                  <span className="font-mono text-[11px] text-amber-500">Challenge 0{i + 1}</span>
                  <h3 className="mt-2 text-xl font-semibold text-white">{c.title}</h3>
                  <p className="mt-3 max-w-3xl text-sm leading-relaxed text-zinc-400 md:text-base">
                    {c.body}
                  </p>
                </div>
              ))}
            </div>
          </Section>

          {/* Status */}
          <Section id="status">
            <Eyebrow>11 — Current status</Eyebrow>
            <h2 className="mb-10 max-w-3xl text-3xl font-bold tracking-tight text-white md:text-4xl">
              What is built, and what comes next
            </h2>
            <div className="grid gap-4 md:grid-cols-2">
              <div className="rounded-2xl border border-emerald-500/20 bg-emerald-500/[0.04] p-6 md:p-8">
                <p className="font-mono text-[10px] uppercase tracking-widest text-emerald-400">
                  Available or substantially built
                </p>
                <ul className="mt-6 space-y-2.5">
                  {BUILT.map((item) => (
                    <li key={item} className="flex items-center gap-2 text-sm text-zinc-300">
                      <CheckCircle2 className="h-4 w-4 shrink-0 text-emerald-500" />
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
              <div className="rounded-2xl border border-white/10 bg-white/[0.02] p-6 md:p-8">
                <p className="font-mono text-[10px] uppercase tracking-widest text-zinc-400">
                  Next focus
                </p>
                <ul className="mt-6 space-y-2.5">
                  {NEXT.map((item) => (
                    <li key={item} className="flex items-center gap-2 text-sm text-zinc-400">
                      <span className="h-1.5 w-1.5 shrink-0 rounded-full bg-zinc-600" />
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </Section>

          {/* Learnings */}
          <Section id="learnings">
            <Eyebrow>12 — Learnings</Eyebrow>
            <h2 className="mb-10 max-w-3xl text-3xl font-bold tracking-tight text-white md:text-4xl">
              What building PaperChai has taught me
            </h2>
            <ol className="space-y-3">
              {LEARNINGS.map((item, i) => (
                <li
                  key={item}
                  className="flex gap-4 rounded-xl border border-white/10 bg-white/[0.02] px-5 py-4"
                >
                  <span className="font-mono text-sm text-amber-500">{i + 1}</span>
                  <p className="text-sm font-medium text-zinc-200 md:text-base">{item}</p>
                </li>
              ))}
            </ol>
          </Section>

          {/* Final CTA */}
          <section className="py-20 md:py-28">
            <div className="relative overflow-hidden rounded-3xl border border-amber-500/20 bg-gradient-to-br from-amber-500/10 via-zinc-950 to-black px-6 py-14 text-center md:px-12 md:py-20">
              <div className="pointer-events-none absolute inset-0 bg-grid-white opacity-20" />
              <div className="relative z-10 mx-auto max-w-2xl space-y-6">
                <h2 className="text-3xl font-bold tracking-tight text-white md:text-4xl">
                  PaperChai is being built to help small businesses launch without starting from zero.
                </h2>
                <div className="flex flex-col items-center justify-center gap-3 sm:flex-row">
                  <Button
                    asChild
                    size="lg"
                    className="h-12 bg-amber-500 text-base text-black hover:bg-amber-400"
                  >
                    <a href="https://paperchaiapp.com" target="_blank" rel="noopener noreferrer">
                      Explore PaperChai
                      <ExternalLink className="ml-1 h-4 w-4" />
                    </a>
                  </Button>
                  <Button
                    asChild
                    variant="outline"
                    size="lg"
                    className="h-12 border-white/15 text-base hover:bg-white/5 hover:text-white"
                  >
                    <Link href="/book">
                      Discuss a SaaS project
                      <ArrowRight className="ml-1 h-4 w-4" />
                    </Link>
                  </Button>
                </div>
                <p className="pt-2 text-sm text-zinc-500">Built by Somanath Khadanga</p>
              </div>
            </div>
          </section>
        </div>
      </div>

      <Footer />
      <ClientMobileNav />
    </main>
  );
}
