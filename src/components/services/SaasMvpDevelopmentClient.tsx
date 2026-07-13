import Image from "next/image";
import Link from "next/link";
import {
  ArrowRight,
  Check,
  Code2,
  Compass,
  Github,
  Lightbulb,
  Linkedin,
  Mail,
  MapPin,
  MessageSquare,
  Rocket,
  ShieldCheck,
  Target,
  Users,
  Wrench,
} from "lucide-react";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { DeferredParticles } from "@/components/DeferredParticles";
import { DeferredSection } from "@/components/DeferredSection";
import { ClientMobileNav } from "@/components/ClientMobileNav";
import { ServiceSectionCard } from "@/components/services/ServiceSectionCard";
import { AnimatedSectionHeading } from "@/components/services/AnimatedSectionHeading";
import { MvpEnquiryForm } from "@/components/services/MvpEnquiryForm";
import { TrackedBookCallButton, TrackedWhatsAppButton } from "@/components/services/MvpTrackedCtas";
import {
  CONTACT_EMAIL,
  GITHUB_URL,
  LINKEDIN_URL,
  WORKING_TIMEZONE,
} from "@/lib/contact";

const proofMetrics = [
  { value: "4+ years", label: "Building products" },
  { value: "4 live apps", label: "In production" },
  { value: "21 days", label: "MVP delivery example" },
  { value: "Direct", label: "Founder ↔ engineer" },
];

const caseStudyCards = [
  {
    name: "PaperChai",
    badge: "Founder-built SaaS",
    description: "AI website and booking platform for small businesses",
    points: ["Next.js · PostgreSQL · AI APIs", "Google profile → live site", "Booking, WhatsApp, custom domains"],
    image: "/images/blog/paperchai-booking-ready-website.png",
    imageAlt: "PaperChai product interface — Google profile to booking-ready website",
    href: "/projects/paperchai",
    hrefLabel: "View case study",
    liveHref: "https://paperchaiapp.com",
  },
  {
    name: "LocalBoyNani",
    badge: "Live commerce",
    description: "Production seafood delivery platform with real orders",
    points: ["Next.js · payments · admin", "Multi-city live operations", "120-min delivery UX"],
    image: "/images/project-7.png",
    imageAlt: "LocalBoyNani Seafoods storefront",
    href: "/case-studies",
    hrefLabel: "View case study",
    liveHref: "https://localboynaniseafoods.com",
  },
];

const moreProofCards = [
  {
    name: "PaperChai Invoice",
    badge: "AI invoicing",
    description: "Invoice generator with AI Slack/WhatsApp reminders, Notion import and payment tracking.",
    image: "/images/project-8.png",
    imageAlt: "PaperChai Invoice app",
    href: "https://app.paperchaiapp.com/",
    external: true,
  },
  {
    name: "Outspokn",
    badge: "AI education",
    description: "Mobile English learning app with course modules and an AI teacher.",
    image: "/images/project-9.webp",
    imageAlt: "Outspokn AI English learning app",
    href: "https://play.google.com/store/apps/details?id=com.outspokn&hl=en_IN",
    external: true,
    hrefLabel: "Get on Google Play",
  },
];

const fitCards = [
  {
    icon: Lightbulb,
    title: "Validated startup idea",
    body: "Need a technical partner to scope and build the first release.",
  },
  {
    icon: Users,
    title: "Existing startup team",
    body: "Need experienced full-stack execution without hiring a full team.",
  },
  {
    icon: Compass,
    title: "Non-technical founder",
    body: "Need clear technical guidance and transparent delivery.",
  },
  {
    icon: Wrench,
    title: "Existing MVP",
    body: "Need architecture, performance or production improvements.",
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
    q: "Can you work with a non-technical founder?",
    a: "Yes. A large part of the work is translating product goals into scope, architecture and weekly progress you can understand without writing code.",
  },
  {
    q: "Will I own the source code?",
    a: "Yes. You own the codebase, accounts and infrastructure. Handover includes repositories, deployment access and enough documentation to continue without me if needed.",
  },
  {
    q: "Can you improve an existing MVP?",
    a: "Yes. I can harden fragile MVPs, improve performance, clean architecture, add features, or prepare an existing product for real users and growth.",
  },
  {
    q: "What happens after launch?",
    a: "You get handover and documentation. I can continue with fixes, performance work, production-readiness upgrades and feature development as needed.",
  },
];

function BrowserMockup({
  src,
  alt,
  url = "paperchaiapp.com",
  className = "",
}: {
  src: string;
  alt: string;
  url?: string;
  className?: string;
}) {
  return (
    <div
      className={`overflow-hidden rounded-xl border border-white/10 bg-zinc-950 shadow-[0_30px_80px_-20px_rgba(0,0,0,0.8)] ${className}`}
    >
      <div className="flex items-center gap-2 border-b border-white/5 bg-zinc-900/80 px-4 py-3">
        <span className="h-2.5 w-2.5 rounded-full bg-zinc-600" />
        <span className="h-2.5 w-2.5 rounded-full bg-zinc-600" />
        <span className="h-2.5 w-2.5 rounded-full bg-zinc-600" />
        <span className="ml-2 truncate rounded-md bg-black/40 px-3 py-1 font-mono text-[10px] text-zinc-500">
          {url}
        </span>
      </div>
      <div className="relative aspect-[16/10]">
        <Image src={src} alt={alt} fill className="object-cover object-top" sizes="(max-width: 1024px) 100vw, 50vw" priority />
      </div>
    </div>
  );
}

export function SaasMvpDevelopmentClient() {
  return (
    <main className="min-h-screen bg-black text-foreground selection:bg-white/20">
      <Navbar />

      {/* 1. Hero — offer + product visual */}
      <section className="relative overflow-hidden border-b border-white/5 px-4 pb-16 pt-28 md:pb-24 md:pt-32">
        <div className="absolute inset-0 z-0 bg-grid-white pointer-events-none [mask-image:radial-gradient(ellipse_at_center,transparent_20%,black)]" />
        <div className="pointer-events-none absolute right-0 top-20 h-[28rem] w-[28rem] rounded-full bg-indigo-500/15 blur-[100px]" />

        <div className="relative z-10 container mx-auto grid max-w-6xl items-center gap-12 lg:grid-cols-2 lg:gap-14">
          <div className="text-center lg:text-left">
            <div className="inline-flex items-center rounded-full border border-zinc-800 bg-zinc-900/50 px-3 py-1 text-sm text-zinc-400 backdrop-blur-sm">
              <span className="mr-2 flex h-2 w-2 animate-pulse rounded-full bg-green-500" />
              SaaS MVP Development
            </div>
            <h1 className="mt-5 text-4xl font-bold tracking-tighter text-white sm:text-5xl xl:text-[3.25rem] xl:leading-[1.05]">
              Ship the version of your SaaS that&apos;s worth shipping.
            </h1>
            <p className="mt-5 max-w-xl text-lg text-zinc-400 lg:mx-0 mx-auto">
              Build and launch a production-ready SaaS MVP with an experienced full-stack engineer —
              Next.js, Node.js, PostgreSQL and practical AI.
            </p>
            <p className="mt-3 text-sm text-zinc-500">
              Work directly with Somanath — from product scope to deployment and launch.
            </p>

            <div className="mt-8 flex flex-col items-center gap-3 sm:flex-row lg:justify-start">
              <TrackedBookCallButton location="mvp_hero" label="Book a free 20-minute call" />
              <Link
                href="#proof"
                className="inline-flex h-12 min-w-[200px] items-center justify-center rounded-md border border-white/10 px-6 text-base font-medium text-white transition-colors hover:bg-white/5"
              >
                See live products
              </Link>
            </div>

            <p className="mt-5 text-xs text-zinc-600">
              Best suited for SaaS, custom web apps and AI platforms · Not for brochure websites ·
              From ₹75,000
            </p>
          </div>

          <div className="relative">
            <div className="pointer-events-none absolute -inset-4 rounded-3xl bg-indigo-500/10 blur-2xl" />
            <BrowserMockup
              src="/images/blog/paperchai-booking-ready-website.png"
              alt="PaperChai SaaS — Google profile to booking-ready website"
              url="paperchaiapp.com"
            />
            <p className="mt-3 text-center text-xs text-zinc-500 lg:text-left">
              Real product: PaperChai — founder-built SaaS MVP
            </p>
          </div>
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

      {/* 2. Visual case studies */}
      <section id="proof" className="scroll-mt-24 border-b border-white/5 px-4 py-20">
        <div className="container mx-auto max-w-6xl">
          <AnimatedSectionHeading className="text-3xl font-bold tracking-tight text-white md:text-5xl">
            Live products, not slide decks
          </AnimatedSectionHeading>
          <p className="mt-3 max-w-2xl text-zinc-400">
            Paid visitors should see real interfaces first. These are production apps with real
            users and workflows.
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
                </div>
                <div className="p-6">
                  <p className="text-xs font-medium uppercase tracking-widest text-zinc-500">
                    {card.badge}
                  </p>
                  <h3 className="mt-2 text-2xl font-bold text-white">{card.name}</h3>
                  <p className="mt-2 text-zinc-400">{card.description}</p>
                  <ul className="mt-4 space-y-1.5">
                    {card.points.map((point) => (
                      <li key={point} className="flex items-start gap-2 text-sm text-zinc-400">
                        <Check className="mt-0.5 h-3.5 w-3.5 shrink-0 text-emerald-500" />
                        {point}
                      </li>
                    ))}
                  </ul>
                  <div className="mt-5 flex flex-wrap gap-4">
                    <Link
                      href={card.href}
                      className="inline-flex items-center gap-1.5 text-sm font-medium text-white underline underline-offset-4 hover:text-zinc-300"
                    >
                      {card.hrefLabel}
                      <ArrowRight className="h-3.5 w-3.5" />
                    </Link>
                    <a
                      href={card.liveHref}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-1.5 text-sm text-zinc-500 underline underline-offset-4 hover:text-white"
                    >
                      Visit live
                    </a>
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
                    {card.badge}
                  </p>
                  <h3 className="mt-1 text-lg font-semibold text-white">{card.name}</h3>
                  <p className="mt-1.5 text-sm text-zinc-400">{card.description}</p>
                  {card.href ? (
                    <a
                      href={card.href}
                      {...(card.external
                        ? { target: "_blank", rel: "noopener noreferrer" }
                        : {})}
                      className="mt-3 inline-flex items-center gap-1 text-sm text-white underline underline-offset-4 hover:text-zinc-300"
                    >
                      {card.hrefLabel ?? "Open live app"}
                      <ArrowRight className="h-3.5 w-3.5" />
                    </a>
                  ) : null}
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* 3. Who this is for — icon cards */}
      <section className="relative border-b border-white/5 px-4 py-20">
        <div className="pointer-events-none absolute inset-0 bg-grid-white/[0.02]" />
        <div className="container relative z-10 mx-auto max-w-6xl">
          <h2 className="text-3xl font-bold tracking-tight text-white md:text-5xl">Who this is for</h2>
          <div className="mt-10 grid gap-4 sm:grid-cols-2">
            {fitCards.map((card, i) => (
              <ServiceSectionCard key={card.title} delay={i * 0.05} className="p-6">
                <card.icon className="h-5 w-5 text-zinc-400" />
                <h3 className="mt-4 text-lg font-semibold text-white">{card.title}</h3>
                <p className="mt-2 text-sm text-zinc-400">{card.body}</p>
              </ServiceSectionCard>
            ))}
          </div>
          <p className="mt-6 text-sm text-zinc-500">
            Not intended for basic template or brochure websites.
          </p>
        </div>
      </section>

      {/* 4. Problems — three cards */}
      <section className="border-b border-white/5 px-4 py-20">
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
        </div>
      </section>

      {/* 7. Conversion options */}
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

      {/* 8. FAQ */}
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
              Book a call, message on WhatsApp, or send requirements — I personally handle the work.
            </p>
            <div className="flex flex-col items-center gap-3 sm:flex-row">
              <TrackedBookCallButton location="mvp_final_cta" />
              <TrackedWhatsAppButton location="mvp_final_cta_whatsapp" />
            </div>
            <p className="max-w-md text-xs text-zinc-500">
              Best suited for SaaS products, custom web applications and AI-enabled platforms. Not
              for brochure websites. Typical projects start from ₹75,000.
            </p>
          </div>
        </section>
      </DeferredSection>

      <Footer />
      <ClientMobileNav />
    </main>
  );
}
