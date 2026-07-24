"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect } from "react";
import { trackViewedService } from "@/features/visitor-guide/visitor-memory";
import {
  ArrowRight,
  Check,
  Code2,
  Github,
  Linkedin,
  Mail,
  MapPin,
  MessageSquare,
  Rocket,
  ShieldCheck,
  Target,
  Users,
} from "lucide-react";
import { Navbar } from "@/components/Navbar";
import { DeferredParticles } from "@/components/DeferredParticles";
import { DeferredSection } from "@/components/DeferredSection";
import { ServiceSectionCard } from "@/components/services/ServiceSectionCard";
import { AnimatedSectionHeading } from "@/components/services/AnimatedSectionHeading";
import { MvpEnquiryForm } from "@/components/services/MvpEnquiryForm";
import { TrackedBookCallButton, TrackedWhatsAppButton, MvpMobileStickyCtas } from "@/components/services/MvpTrackedCtas";
import { MvpHeroJourney } from "@/components/services/MvpHeroJourney";
import { MvpWhoItsForJourney } from "@/components/services/MvpWhoItsForJourney";
import { MvpTechStackMotion } from "@/components/services/MvpTechStackMotion";
import { DeliveryModelSection } from "@/components/DeliveryModelSection";
import { MvpTestimonials } from "@/components/services/MvpTestimonials";
import {
  CONTACT_EMAIL,
  GITHUB_URL,
  LINKEDIN_URL,
  WORKING_TIMEZONE,
} from "@/lib/contact";

const proofMetrics = [
  { value: "4+ years", label: "Building products" },
  { value: "5 live apps", label: "In production" },
  { value: "21 days", label: "MVP delivery example" },
  { value: "Direct", label: "Founder ↔ engineer" },
];

const caseStudyCards = [
  {
    name: "PaperChai",
    industry: "AI website builder",
    solves: "Turn Google / social business profiles into booking-ready websites",
    timeline: "Founder-built SaaS MVP",
    role: "Solo product + engineering",
    result: "Live AI generation · booking · domains · payments architecture",
    highlights: [
      "AI-powered site generation",
      "Booking + WhatsApp enquiries",
      "Auth & multi-source import",
      "SEO-ready publishing",
      "Subdomain + custom domains",
    ],
    stack: "Next.js · PostgreSQL · AI APIs · Razorpay",
    image: "/images/blog/paperchai-booking-ready-website.png",
    imageAlt: "PaperChai — booking-ready website product",
    href: "/projects/paperchai",
    hrefLabel: "View architecture",
    liveHref: "https://paperchaiapp.com",
  },
  {
    name: "LocalBoyNani",
    industry: "Commerce / delivery",
    solves: "Take seafood orders online with real multi-city operations",
    timeline: "Production commerce platform",
    role: "Full-stack product build",
    result: "Live orders · 3 cities · 120-min delivery UX",
    highlights: [
      "Live production commerce",
      "3-city coverage",
      "Payments + admin dashboard",
      "120-min delivery SLA UX",
    ],
    stack: "Next.js · payments · admin",
    image: "/images/project-7.png",
    imageAlt: "LocalBoyNani Seafoods storefront",
    href: "/case-studies",
    hrefLabel: "View case study",
    liveHref: "https://localboynaniseafoods.com",
  },
  {
    name: "VGT Transport",
    industry: "Live · Fleet & logistics SaaS",
    solves: "Run fleet, shipments, routes and roles in one operations dashboard",
    timeline: "End-to-end transport management",
    role: "Full product architecture + build",
    result: "Live demo: tracking, routes, role-based access",
    highlights: [
      "Fleet + shipment ops",
      "Role-based access",
      "Route management",
      "Production demo live",
    ],
    stack: "Next.js · ops dashboard · auth",
    image: "/images/project-10.png",
    imageAlt: "VGT Transport Management System",
    href: "/case-studies/vgt",
    hrefLabel: "View case study",
    hrefExternal: false,
    liveHref: "https://vgt-silk.vercel.app/login",
  },
];

const moreProofCards = [
  {
    name: "PaperChai Invoice",
    industry: "Live · AI invoicing",
    solves: "Generate invoices and chase payments via Slack / WhatsApp",
    image: "/images/project-8.png",
    imageAlt: "PaperChai Invoice app",
    href: "https://app.paperchaiapp.com/",
    external: true,
    hrefLabel: "Open live app",
    caseStudyHref: "/case-studies/paperchai-invoice",
  },
  {
    name: "Outspokn",
    industry: "Live · AI education",
    solves: "Mobile English learning with course modules and an AI teacher",
    image: "/images/project-9.webp",
    imageAlt: "Outspokn AI English learning app",
    href: "https://play.google.com/store/apps/details?id=com.outspokn&hl=en_IN",
    external: true,
    hrefLabel: "Get on Google Play",
    caseStudyHref: "/case-studies/outspokn",
  },
];

const problemCards = [
  {
    icon: Target,
    title: "Unclear scope",
    body: "Prioritise the smallest product that provides real customer value.",
  },
  {
    icon: Code2,
    title: "Weak technical foundation",
    body: "Build authentication, payments, data and architecture without unnecessary complexity.",
  },
  {
    icon: Rocket,
    title: "Difficult production launch",
    body: "Handle testing, performance, deployment and operational readiness.",
  },
];

const deliverySteps = [
  {
    step: "01",
    title: "Scope",
    body: "Product requirements, user flow and feature prioritisation",
  },
  {
    step: "02",
    title: "Build",
    body: "Frontend, backend, database, authentication and integrations",
  },
  {
    step: "03",
    title: "Launch",
    body: "Testing, deployment, monitoring and production setup",
  },
  {
    step: "04",
    title: "Support",
    body: "Handover, documentation and post-launch improvements",
  },
];

const trustPoints = [
  { icon: MessageSquare, label: "No sales representative" },
  { icon: Users, label: "Direct weekly communication" },
  { icon: Rocket, label: "Milestone-based delivery" },
  { icon: ShieldCheck, label: "Source-code ownership" },
  { icon: MapPin, label: "Remote · India timezone" },
  { icon: Check, label: "International availability" },
];

/** Highlights pulled from the About page — proof founders scan under the profile. */
const profileAchievements = [
  { value: "4+", label: "Years experience" },
  { value: "3", label: "Companies shipped at" },
  { value: "1000+", label: "Concurrent users supported" },
  { value: "50+", label: "Production pages built" },
  { value: "~90%", label: "Billing accuracy (invoice SaaS)" },
  { value: "+25%", label: "User engagement (AI app)" },
  { value: "~40%", label: "Faster SQL / less downtime" },
  { value: "~35%", label: "Fewer React re-renders" },
];

const faqItems = [
  {
    q: "How much does an MVP cost?",
    a: "It depends on scope. Typical SaaS MVP engagements start from ₹75,000 for a focused first version. Auth, billing, admin tools and AI features change the budget. We pin scope before any build starts.",
  },
  {
    q: "How long does development take?",
    a: "Many focused MVPs ship in a few weeks. Timeline depends on the core workflow and how decided the product already is.",
  },
  {
    q: "Is it fixed price?",
    a: "Yes for a defined MVP scope. You get a feature list, timeline and price before work starts. New requests are handled as separate changes — not silent scope creep.",
  },
  {
    q: "Who owns the IP and source code?",
    a: "You do. Repositories, accounts, infrastructure and documentation are yours. Handover is designed so you can continue without me if needed.",
  },
  {
    q: "Do you sign NDAs?",
    a: "Yes. NDA-friendly engagement is standard for founder and agency work, including white-label arrangements.",
  },
  {
    q: "Can you work with a non-technical founder?",
    a: "Yes. A large part of the work is translating product goals into scope, architecture and weekly progress you can understand without writing code.",
  },
  {
    q: "What happens after launch?",
    a: "You get handover and documentation. I can continue with fixes, performance work, production-readiness upgrades and feature development as needed.",
  },
];

export function SaasMvpDevelopmentClient() {
  useEffect(() => {
    trackViewedService("saas-mvp");
  }, []);

  return (
    <main className="min-h-screen bg-black pb-28 text-foreground selection:bg-white/20 md:pb-0">
      <Navbar />

      {/* 1. Hero — offer + product-building journey */}
      <section
        id="saas-mvp"
        className="relative scroll-mt-24 overflow-hidden border-b border-white/5 px-4 pb-16 pt-28 md:pb-24 md:pt-32"
      >
        <div className="absolute inset-0 z-0 bg-grid-white pointer-events-none [mask-image:radial-gradient(ellipse_at_center,transparent_20%,black)]" />
        <div className="pointer-events-none absolute right-0 top-20 h-[28rem] w-[28rem] rounded-full bg-emerald-500/10 blur-[100px]" />

        <div className="relative z-10 container mx-auto grid max-w-6xl items-center gap-12 lg:grid-cols-2 lg:gap-14">
          <div className="text-center lg:text-left">
            <div className="inline-flex items-center rounded-full border border-zinc-800 bg-zinc-900/50 px-3 py-1 text-sm text-zinc-400 backdrop-blur-sm">
              <span className="mr-2 flex h-2 w-2 animate-pulse rounded-full bg-green-500" />
              SaaS MVP Development
            </div>
            <h1 className="mt-5 text-4xl font-bold tracking-tighter text-white sm:text-5xl xl:text-[3.25rem] xl:leading-[1.05]">
              Build Your SaaS MVP With a Senior-Led Product Team
            </h1>
            <p className="mt-5 max-w-xl text-lg text-zinc-400 lg:mx-0 mx-auto">
              Start with one experienced technical lead and add frontend, backend, design, QA, AI,
              or cloud specialists only when your product requires them.
            </p>
            <p className="mt-3 text-sm text-zinc-500">
              Work directly with an experienced technical lead responsible for architecture, scope,
              communication, and delivery.
            </p>

            <div className="mt-8 flex flex-col items-center justify-center gap-3 sm:flex-row sm:justify-center lg:justify-start">
              <TrackedBookCallButton location="mvp_hero" label="Discuss Your Requirements With an Engineer" />
              <Link
                href="#proof"
                className="inline-flex h-12 min-w-[200px] items-center justify-center rounded-md border border-white/10 px-6 text-base font-medium text-white transition-colors hover:bg-white/5"
              >
                See shipped products
              </Link>
            </div>

            <p className="mt-5 text-xs text-zinc-600">
              Best suited for SaaS, custom web apps and AI platforms · Not for brochure websites ·
              From ₹75,000
            </p>
          </div>

          <MvpHeroJourney />
        </div>
      </section>

      {/* Metrics */}
      <section className="border-b border-white/10 bg-white/[0.02] px-4 py-8">
        <div className="container mx-auto grid max-w-6xl grid-cols-2 gap-6 md:grid-cols-4 md:gap-4">
          {proofMetrics.map((item, i) => (
            <div
              key={item.label}
              className={`text-center ${i < proofMetrics.length - 1 ? "md:border-r md:border-white/10" : ""}`}
            >
              <p className="text-xl font-bold text-white md:text-2xl">{item.value}</p>
              <p className="mt-1 text-xs font-medium uppercase tracking-widest text-zinc-500">
                {item.label}
              </p>
            </div>
          ))}
        </div>
      </section>

      <MvpTechStackMotion />

      {/* Product-building portfolio */}
      <section id="proof" className="scroll-mt-24 border-b border-white/5 px-4 py-20">
        <div className="container mx-auto max-w-6xl">
          <AnimatedSectionHeading className="text-3xl font-bold tracking-tight text-white md:text-5xl">
            I don&apos;t build pages. I build products.
          </AnimatedSectionHeading>
          <p className="mt-3 max-w-2xl text-zinc-400">
            Proof that matters to founders: real problems solved, live systems in production,
            and the engineering judgment behind them — not a gallery of pretty screenshots.
          </p>

          <div className="mt-10 grid gap-6 lg:grid-cols-2">
            {caseStudyCards.map((card) => (
              <article
                key={card.name}
                className="group overflow-hidden rounded-2xl border border-white/10 bg-zinc-950/50 transition-colors hover:border-white/20"
              >
                <div className="relative aspect-[16/10] overflow-hidden border-b border-white/5">
                  <Image
                    src={card.image}
                    alt={card.imageAlt}
                    fill
                    className="object-cover object-top transition-transform duration-700 group-hover:scale-[1.03]"
                    sizes="(max-width: 1024px) 100vw, 50vw"
                  />
                  <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/85 via-black/40 to-transparent px-5 pb-4 pt-16">
                    <p className="font-mono text-[10px] uppercase tracking-[0.18em] text-zinc-400">
                      {card.industry}
                    </p>
                    <h3 className="mt-1 text-2xl font-bold text-white">{card.name}</h3>
                  </div>
                </div>
                <div className="p-6">
                  <dl className="space-y-3 text-sm">
                    <div>
                      <dt className="font-mono text-[10px] uppercase tracking-widest text-zinc-600">
                        What it solves
                      </dt>
                      <dd className="mt-1 text-zinc-300">{card.solves}</dd>
                    </div>
                    <div className="grid gap-3 sm:grid-cols-2">
                      <div>
                        <dt className="font-mono text-[10px] uppercase tracking-widest text-zinc-600">
                          My role
                        </dt>
                        <dd className="mt-1 text-zinc-400">{card.role}</dd>
                      </div>
                      <div>
                        <dt className="font-mono text-[10px] uppercase tracking-widest text-zinc-600">
                          Timeline
                        </dt>
                        <dd className="mt-1 text-zinc-400">{card.timeline}</dd>
                      </div>
                    </div>
                    <div>
                      <dt className="font-mono text-[10px] uppercase tracking-widest text-zinc-600">
                        Result
                      </dt>
                      <dd className="mt-1 text-emerald-400/90">{card.result}</dd>
                    </div>
                    {"highlights" in card && card.highlights && (
                      <ul className="mt-2 space-y-1.5">
                        {card.highlights.map((h) => (
                          <li key={h} className="flex items-start gap-2 text-sm text-zinc-300">
                            <Check className="mt-0.5 h-3.5 w-3.5 shrink-0 text-emerald-400" />
                            {h}
                          </li>
                        ))}
                      </ul>
                    )}
                    <div>
                      <dt className="font-mono text-[10px] uppercase tracking-widest text-zinc-600">
                        Stack
                      </dt>
                      <dd className="mt-1 font-mono text-xs text-zinc-500">{card.stack}</dd>
                    </div>
                  </dl>
                  <div className="mt-5 flex flex-wrap gap-4">
                    {card.hrefExternal ? (
                      <a
                        href={card.href}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-1.5 text-sm font-medium text-white underline underline-offset-4 hover:text-zinc-300"
                      >
                        {card.hrefLabel}
                        <ArrowRight className="h-3.5 w-3.5" />
                      </a>
                    ) : (
                      <Link
                        href={card.href}
                        className="inline-flex items-center gap-1.5 text-sm font-medium text-white underline underline-offset-4 hover:text-zinc-300"
                      >
                        {card.hrefLabel}
                        <ArrowRight className="h-3.5 w-3.5" />
                      </Link>
                    )}
                    {card.liveHref && card.liveHref !== card.href ? (
                      <a
                        href={card.liveHref}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-1.5 text-sm text-zinc-500 underline underline-offset-4 hover:text-white"
                      >
                        Visit live
                      </a>
                    ) : null}
                  </div>
                </div>
              </article>
            ))}
          </div>

          <div className="mt-6 grid gap-6 sm:grid-cols-2">
            {moreProofCards.map((card) => (
              <article
                key={card.name}
                className="flex overflow-hidden rounded-xl border border-white/10 bg-zinc-950/40"
              >
                <div className="relative w-36 shrink-0 sm:w-44">
                  <Image
                    src={card.image}
                    alt={card.imageAlt}
                    fill
                    className="object-cover object-top"
                    sizes="176px"
                  />
                </div>
                <div className="flex flex-1 flex-col justify-center p-5">
                  <p className="text-[10px] font-medium uppercase tracking-widest text-zinc-500">
                    {card.industry}
                  </p>
                  <h3 className="mt-1 text-lg font-semibold text-white">{card.name}</h3>
                  <p className="mt-1.5 text-sm text-zinc-400">{card.solves}</p>
                  <div className="mt-3 flex flex-wrap gap-3">
                    {card.href ? (
                      <a
                        href={card.href}
                        {...(card.external
                          ? { target: "_blank", rel: "noopener noreferrer" }
                          : {})}
                        className="inline-flex items-center gap-1 text-sm text-white underline underline-offset-4 hover:text-zinc-300"
                      >
                        {card.hrefLabel ?? "Open live app"}
                        <ArrowRight className="h-3.5 w-3.5" />
                      </a>
                    ) : null}
                    {"caseStudyHref" in card && card.caseStudyHref ? (
                      <Link
                        href={card.caseStudyHref}
                        className="inline-flex items-center gap-1 text-sm text-zinc-500 underline underline-offset-4 hover:text-white"
                      >
                        Case study
                      </Link>
                    ) : null}
                  </div>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* Conversion — right after proof so ads traffic can act immediately */}
      <section id="enquire" className="relative scroll-mt-24 border-b border-white/5 px-4 py-20">
        <div className="pointer-events-none absolute inset-0 bg-grid-white/[0.02]" />
        <div className="container relative z-10 mx-auto max-w-6xl">
          <h2 className="text-3xl font-bold tracking-tight text-white md:text-5xl">
            Choose how you want to start
          </h2>
          <p className="mt-3 max-w-2xl text-zinc-400">
            Best suited for SaaS products, custom web applications and AI-enabled platforms. Not
            intended for basic template or brochure websites. Typical projects start from ₹75,000.
          </p>

          <div className="mt-10 grid gap-4 md:grid-cols-3">
            <div className="rounded-xl border border-white/10 bg-zinc-950/40 p-6">
              <h3 className="text-lg font-semibold text-white">Book a free 20-minute call</h3>
              <p className="mt-2 text-sm text-zinc-400">
                Best when you want to scope the product live and get a clear next step.
              </p>
              <div className="mt-5">
                <TrackedBookCallButton
                  location="mvp_conversion_book"
                  className="h-11 min-w-0 w-full text-sm"
                  label="Book a free call"
                />
              </div>
            </div>
            <div className="rounded-xl border border-white/10 bg-zinc-950/40 p-6">
              <h3 className="text-lg font-semibold text-white">Discuss on WhatsApp</h3>
              <p className="mt-2 text-sm text-zinc-400">
                Useful for quick questions, India-timezone chats and early fit checks.
              </p>
              <div className="mt-5">
                <TrackedWhatsAppButton
                  location="mvp_conversion_whatsapp"
                  className="h-11 min-w-0 w-full text-sm"
                />
              </div>
            </div>
            <div className="rounded-xl border border-white/10 bg-zinc-950/40 p-6">
              <h3 className="text-lg font-semibold text-white">Send project requirements</h3>
              <p className="mt-2 text-sm text-zinc-400">
                Prefer async? Use the form below — I reply within one business day.
              </p>
              <a
                href="#project-form"
                className="mt-5 inline-flex h-11 w-full items-center justify-center rounded-md border border-white/10 text-sm font-medium text-white transition-colors hover:bg-white/5"
              >
                Jump to form
                <ArrowRight className="ml-2 h-4 w-4" />
              </a>
            </div>
          </div>

          <div
            id="project-form"
            className="mt-12 scroll-mt-28 rounded-xl border border-white/10 bg-black/40 p-6 md:p-8"
          >
            <h3 className="text-xl font-semibold text-white">Send project requirements</h3>
            <p className="mt-2 text-sm text-zinc-400">
              Name, contact, what you&apos;re building, stage, budget and launch timing.
            </p>
            <div className="mt-6">
              <MvpEnquiryForm />
            </div>
          </div>
        </div>
      </section>

      <MvpTestimonials />

      <MvpWhoItsForJourney />

      {/* Custom SaaS / MVP services — natural SEO copy */}
      <section className="border-b border-white/5 px-4 py-20">
        <div className="container mx-auto max-w-6xl">
          <div className="max-w-3xl">
            <h2 className="text-3xl font-bold tracking-tight text-white md:text-5xl">
              Custom SaaS and MVP development services
            </h2>
            <p className="mt-6 text-lg leading-relaxed text-zinc-400">
              Work directly with a senior SaaS developer to scope, design, build and launch
              your startup MVP. I support custom SaaS product development, SaaS app
              development and MVP software development from architecture through production
              deployment.
            </p>
          </div>
        </div>
      </section>

      {/* Problems — three cards */}
      <section
        id="improve-product"
        className="scroll-mt-24 border-b border-white/5 px-4 py-20"
      >
        <div className="container mx-auto max-w-6xl">
          <h2 className="text-3xl font-bold tracking-tight text-white md:text-5xl">
            The problems I solve
          </h2>
          <div className="mt-10 grid gap-4 md:grid-cols-3">
            {problemCards.map((card, i) => (
              <ServiceSectionCard key={card.title} delay={i * 0.05} className="bg-black/40 p-6">
                <card.icon className="h-5 w-5 text-zinc-400" />
                <h3 className="mt-4 text-xl font-semibold text-white">{card.title}</h3>
                <p className="mt-3 text-sm text-zinc-400">{card.body}</p>
              </ServiceSectionCard>
            ))}
          </div>
        </div>
      </section>

      {/* 5. Delivery timeline */}
      <section className="relative border-b border-white/5 px-4 py-20">
        <div className="pointer-events-none absolute inset-0 bg-grid-white/[0.02]" />
        <div className="container relative z-10 mx-auto max-w-6xl">
          <h2 className="text-3xl font-bold tracking-tight text-white md:text-5xl">What you get</h2>
          <p className="mt-3 max-w-xl text-zinc-400">
            A clear path from idea to production — not an open-ended coding engagement.
          </p>
          <div className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {deliverySteps.map((step, i) => (
              <ServiceSectionCard key={step.step} delay={i * 0.05} className="min-h-[160px] p-6">
                <p className="font-mono text-xs tracking-widest text-zinc-500">{step.step}</p>
                <h3 className="mt-3 text-xl font-semibold text-white">{step.title}</h3>
                <p className="mt-3 text-sm text-zinc-400">{step.body}</p>
              </ServiceSectionCard>
            ))}
          </div>
        </div>
      </section>

      {/* 6. Founder trust */}
      <section className="border-b border-white/5 px-4 py-20">
        <div className="container mx-auto max-w-6xl">
          <div className="grid items-center gap-10 lg:grid-cols-[220px_1fr] lg:gap-14">
            <div className="relative mx-auto h-52 w-52 overflow-hidden rounded-2xl border border-white/10 lg:mx-0 lg:h-56 lg:w-56">
              <Image
                src="/images/somnath-about.jpg"
                alt="Somanath Khadanga — full-stack SaaS engineer"
                fill
                className="object-cover object-top"
                sizes="224px"
              />
            </div>
            <div>
              <p className="text-sm font-medium uppercase tracking-widest text-zinc-500">
                Work directly with
              </p>
              <h2 className="mt-2 text-3xl font-bold tracking-tight text-white md:text-4xl">
                Somanath Khadanga
              </h2>
              <p className="mt-3 max-w-2xl text-zinc-400">
                Full-stack SaaS engineer with 4+ years building React, Next.js, Node.js and
                production web applications. Somanath Studio is not an anonymous agency — I
                personally handle your project.
              </p>
              <div className="mt-6 grid grid-cols-2 gap-3 sm:grid-cols-3">
                {trustPoints.map((item) => (
                  <div key={item.label} className="flex items-center gap-2 text-sm text-zinc-400">
                    <item.icon className="h-4 w-4 shrink-0 text-zinc-500" />
                    {item.label}
                  </div>
                ))}
              </div>
              <div className="mt-6 flex flex-wrap gap-3">
                <a
                  href={LINKEDIN_URL}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 rounded-lg border border-white/10 bg-white/5 px-3 py-2 text-sm text-zinc-400 hover:text-sky-400"
                >
                  <Linkedin className="h-4 w-4" />
                  LinkedIn
                </a>
                <a
                  href={GITHUB_URL}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 rounded-lg border border-white/10 bg-white/5 px-3 py-2 text-sm text-zinc-400 hover:text-white"
                >
                  <Github className="h-4 w-4" />
                  GitHub
                </a>
                <a
                  href={`mailto:${CONTACT_EMAIL}`}
                  className="inline-flex items-center gap-2 rounded-lg border border-white/10 bg-white/5 px-3 py-2 text-sm text-zinc-400 hover:text-white"
                >
                  <Mail className="h-4 w-4" />
                  Email
                </a>
                <span className="inline-flex items-center gap-2 px-3 py-2 text-sm text-zinc-500">
                  <MapPin className="h-4 w-4" />
                  {WORKING_TIMEZONE}
                </span>
              </div>
            </div>
          </div>

          <div className="mt-10 border-t border-white/5 pt-8">
            <div className="mb-4 flex flex-wrap items-end justify-between gap-3">
              <div>
                <p className="font-mono text-[10px] uppercase tracking-[0.2em] text-zinc-600">
                  Achievements
                </p>
                <p className="mt-1 text-sm text-zinc-400">
                  Results from production work across SaaS, AI and commerce products.
                </p>
              </div>
              <Link
                href="/about"
                className="inline-flex items-center gap-1.5 text-sm text-zinc-500 underline underline-offset-4 hover:text-white"
              >
                Full about page
                <ArrowRight className="h-3.5 w-3.5" />
              </Link>
            </div>
            <div className="grid grid-cols-2 gap-3 sm:grid-cols-4">
              {profileAchievements.map((item) => (
                <div
                  key={item.label}
                  className="rounded-xl border border-white/10 bg-zinc-950/40 px-4 py-3"
                >
                  <p className="text-xl font-bold tabular-nums text-white md:text-2xl">
                    {item.value}
                  </p>
                  <p className="mt-1 text-[11px] leading-snug text-zinc-500">{item.label}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* FAQ */}
      <DeferredSection minHeightClassName="h-[420px]">
        <section className="border-b border-white/5 px-4 py-20">
          <div className="container mx-auto max-w-6xl">
            <h2 className="text-3xl font-bold tracking-tight text-white md:text-5xl">FAQ</h2>
            <div className="mt-8 grid gap-4 md:grid-cols-2">
              {faqItems.map((item, i) => (
                <ServiceSectionCard key={item.q} delay={i * 0.03} className="p-5">
                  <h3 className="text-base font-semibold text-white">{item.q}</h3>
                  <p className="mt-2 text-sm text-zinc-400">{item.a}</p>
                </ServiceSectionCard>
              ))}
            </div>
          </div>
        </section>
      </DeferredSection>

      <DeferredSection minHeightClassName="h-[420px]">
        <DeliveryModelSection contextLine="Every SaaS MVP engagement remains senior-led. Additional specialists support delivery when the scope requires more capacity." />
      </DeferredSection>

      {/* Final CTA */}
      <DeferredSection minHeightClassName="h-[480px]">
        <section className="relative flex w-full flex-col items-center justify-center overflow-hidden border-t border-white/10 bg-black px-4 py-28 text-center">
          <div className="pointer-events-none absolute inset-0 bg-gradient-to-b from-zinc-900/50 to-black" />
          <DeferredParticles
            className="pointer-events-none absolute inset-0"
            quantity={160}
            staticity={30}
            ease={50}
            color="#ffffff"
            refresh
          />
          <div className="relative z-10 mx-auto flex max-w-3xl flex-col items-center gap-6">
            <h2 className="bg-gradient-to-b from-white via-white/90 to-white/50 bg-clip-text text-4xl font-bold tracking-tighter text-transparent md:text-5xl">
              Ready to ship a SaaS MVP worth launching?
            </h2>
            <p className="text-zinc-400">
              Every engagement remains senior-led. Additional specialists support delivery when the
              scope requires more capacity.
            </p>
            <div className="flex flex-col items-center gap-3 sm:flex-row">
              <TrackedBookCallButton location="mvp_final_cta" label="Discuss Your Requirements With an Engineer" />
              <TrackedWhatsAppButton location="mvp_final_cta_whatsapp" />
            </div>
            <p className="max-w-md text-xs text-zinc-500">
              Best suited for SaaS products, custom web applications and AI-enabled platforms. Not
              for brochure websites. Typical projects start from ₹75,000.
            </p>
          </div>
        </section>
      </DeferredSection>

      {/* No site footer on this ads landing page — avoids leaking clicks to other routes. */}
      <div className="border-t border-white/5 bg-black px-4 py-8 text-center">
        <p className="font-mono text-xs text-zinc-600">
          &copy; {new Date().getFullYear()} Somanath Studio
        </p>
      </div>
      <MvpMobileStickyCtas />
    </main>
  );
}
