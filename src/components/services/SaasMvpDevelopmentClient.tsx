import Image from "next/image";
import Link from "next/link";
import { ArrowRight, Github, Linkedin, Mail, MapPin } from "lucide-react";
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
  "Backend APIs, database design, auth, and admin panels",
  "Payments, subscriptions, or billing flows",
  "Deployment, launch support, and post-launch handover",
];

const outcomeItems = [
  "Launch faster with fewer technical mistakes",
  "Validate your idea with a real product",
  "A foundation that supports your next 12 months of features",
];

const faqItems = [
  {
    q: "How much does an MVP cost?",
    a: "It depends on scope. Typical SaaS MVP engagements start from ₹75,000 for a focused first version. Auth, billing, admin tools, AI features, and multi-role workflows change the budget. We pin a clear scope before any build starts.",
  },
  {
    q: "How long does development take?",
    a: "Many focused MVPs ship in a few weeks. Timeline depends on the core workflow, integrations, and how decided the product already is. The goal is the smallest version that is useful and launchable — not overbuilding version one.",
  },
  {
    q: "Do you work with non-technical founders?",
    a: "Yes. A large part of the work is translating product goals into scope, architecture, and weekly progress you can understand without writing code.",
  },
  {
    q: "Will I own the source code?",
    a: "Yes. You own the codebase, accounts, and infrastructure used for the project. Handover includes repositories, deployment access, and enough documentation to continue without me if needed.",
  },
  {
    q: "Can you improve an existing product?",
    a: "Yes. I can harden fragile MVPs, improve performance, clean architecture, add features, or prepare an existing product for real users and growth.",
  },
  {
    q: "Do you handle deployment?",
    a: "Yes. Deployment, environment setup, and launch support are part of the engagement — not an afterthought left to the founder.",
  },
  {
    q: "How will project communication work?",
    a: "You work directly with me. Updates happen over WhatsApp or email plus short check-ins as needed. No account manager layer, no handoff to juniors mid-project.",
  },
  {
    q: "Do you provide post-launch support?",
    a: "Yes. After launch I can continue with bug fixes, performance work, production-readiness upgrades, feature development, and technical guidance.",
  },
];

const differentiators = [
  {
    title: "Speed without the rewrite later",
    body: "I move quickly, but your MVP is never treated like a throwaway prototype.",
  },
  {
    title: "A product, not a demo",
    body: "The goal is a usable product you can show customers, test in market, and keep improving.",
  },
  {
    title: "Built like it has to last",
    body: "Architecture, maintainability, performance, and future scale are considered early.",
  },
  {
    title: "You'll always know what's happening",
    body: "You get direct communication, practical tradeoff decisions, and clear progress.",
  },
];

const processSteps: [string, string][] = [
  ["1. Discovery and product scope", "Define the goal, users, core workflow, and what belongs in version one."],
  ["2. Architecture and delivery plan", "Choose the stack, shape milestones, and set a buildable plan."],
  ["3. Development in milestones", "Ship visible progress in focused iterations you can review along the way."],
  ["4. Testing and production launch", "Stabilize, deploy, and support the release so the product is actually usable."],
  ["5. Post-launch support", "Continue with fixes, performance, features, and production hardening as needed."],
];

const proofStrip = [
  {
    label: "Founder-built SaaS",
    value: "PaperChai",
    href: "/projects/paperchai",
  },
  {
    label: "Live commerce product",
    value: "LocalBoyNani",
    href: "/case-studies",
  },
  {
    label: "Building React and SaaS",
    value: "4+ years",
  },
  {
    label: "MVP shipped",
    value: "21 days",
  },
];

const proofProjects = [
  {
    name: "PaperChai",
    badge: "Founder-built SaaS",
    href: "/projects/paperchai",
    liveHref: "https://paperchaiapp.com",
    image: "/images/Project-1.png",
    imageAlt: "PaperChai — profile to booking-ready website",
    problem:
      "Small businesses are online across Google Maps, Instagram and WhatsApp, but website builders still start from a blank page.",
    responsibility:
      "Solo founder and full-stack engineer — product scope, architecture, AI content flows, booking, payments and launch.",
    technology: ["Next.js", "TypeScript", "PostgreSQL", "AI APIs", "Razorpay"],
    live: "Live at paperchaiapp.com — Google profile import, review-before-publish, WhatsApp and scheduling.",
    result:
      "Shipped a production SaaS MVP in 21 days: import existing business data, generate a booking-ready one-page site, and publish on a real subdomain.",
  },
  {
    name: "LocalBoyNani Seafoods",
    badge: "Live commerce product",
    href: "/case-studies",
    liveHref: "https://localboynaniseafoods.com",
    image: "/images/project-7.png",
    imageAlt: "LocalBoyNani Seafoods — seafood delivery storefront",
    problem:
      "A real seafood business needed a production storefront for live orders, inventory, payments and multi-city delivery — not a brochure site.",
    responsibility:
      "Built and maintained the full-stack platform solo: catalog, checkout, admin, payments, delivery UX and SEO.",
    technology: ["Next.js", "Node.js", "Tailwind CSS", "Cloudflare R2", "Secure payments"],
    live: "Live and taking orders across Bangalore, Hyderabad and Chennai.",
    result:
      "Production commerce with a 120-minute delivery promise UX, admin order visibility, B2B bulk enquiry flow, and multi-city coverage.",
  },
];

export function SaasMvpDevelopmentClient() {
  return (
    <main className="min-h-screen bg-black text-foreground selection:bg-white/20">
      <Navbar />

      {/* Hero */}
      <section className="relative flex min-h-[min(100svh,920px)] flex-col items-center justify-center overflow-hidden bg-background px-4 pb-16 pt-28 text-center md:pt-32">
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
              Build and launch your SaaS MVP with an experienced full-stack engineer
            </h1>
            <p className="mx-auto max-w-3xl text-lg text-zinc-400 sm:text-xl">
              I help startup founders turn validated ideas into production-ready SaaS products using
              Next.js, Node.js, PostgreSQL and practical AI integrations.
            </p>
            <p className="mx-auto max-w-2xl text-base text-zinc-500">
              Work directly with one engineer from product scoping and architecture through
              development, deployment and launch.
            </p>
          </header>

          <div className="flex flex-col items-center justify-center gap-4 sm:flex-row">
            <TrackedBookCallButton location="mvp_hero" />
            <Link
              href="/projects/paperchai"
              className="inline-flex h-12 min-w-[220px] items-center justify-center rounded-md border border-white/10 px-6 text-base font-medium text-white transition-colors hover:bg-white/5"
            >
              View the PaperChai case study
            </Link>
          </div>

          <p className="text-sm text-zinc-500">
            Best suited for SaaS MVPs, web applications and AI products. Not intended for basic
            brochure websites. Typical MVP engagements start from ₹75,000.
          </p>
        </div>

        <div className="pointer-events-none absolute -bottom-8 left-0 right-0 z-20 h-32 bg-gradient-to-t from-black to-transparent" />
      </section>

      {/* Proof strip */}
      <section className="relative z-10 border-y border-white/10 bg-white/[0.02] px-4 py-8 backdrop-blur-sm">
        <div className="container mx-auto max-w-5xl">
          <div className="grid grid-cols-2 gap-6 md:grid-cols-4 md:gap-4">
            {proofStrip.map((item, i) => {
              const content = (
                <>
                  <p className="text-xl font-bold text-white md:text-2xl">{item.value}</p>
                  <p className="mt-1 text-xs font-medium uppercase tracking-widest text-zinc-500">
                    {item.label}
                  </p>
                </>
              );
              const cellClass = `text-center ${i < proofStrip.length - 1 ? "md:border-r md:border-white/10 md:pr-4" : ""} ${i > 0 ? "md:pl-4" : ""}`;

              if (item.href) {
                return (
                  <div key={item.value} className={cellClass}>
                    <Link href={item.href} className="block transition-colors hover:text-white">
                      {content}
                    </Link>
                  </div>
                );
              }

              return (
                <div key={item.value} className={cellClass}>
                  {content}
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Project proof */}
      <section className="relative border-b border-white/5 px-4 py-20">
        <div className="pointer-events-none absolute inset-0 bg-grid-white/[0.02]" />
        <div className="container relative z-10 mx-auto max-w-5xl">
          <AnimatedSectionHeading className="text-3xl font-bold tracking-tight text-white md:text-5xl">
            Proof that ships
          </AnimatedSectionHeading>
          <p className="mt-4 max-w-2xl text-zinc-400">
            Two live products with real users — not fictional case studies. Here is what I owned and
            what is actually running.
          </p>

          <div className="mt-12 space-y-16">
            {proofProjects.map((project) => (
              <article key={project.name} className="grid gap-8 lg:grid-cols-2 lg:gap-12">
                <div className="relative aspect-[16/10] overflow-hidden rounded-xl border border-white/10 bg-zinc-950">
                  <Image
                    src={project.image}
                    alt={project.imageAlt}
                    fill
                    className="object-cover object-top"
                    sizes="(max-width: 1024px) 100vw, 50vw"
                  />
                </div>
                <div className="flex flex-col justify-center">
                  <p className="text-xs font-medium uppercase tracking-widest text-zinc-500">
                    {project.badge}
                  </p>
                  <h3 className="mt-2 text-2xl font-bold text-white md:text-3xl">{project.name}</h3>

                  <dl className="mt-6 space-y-4 text-sm">
                    <div>
                      <dt className="font-medium text-zinc-300">Problem</dt>
                      <dd className="mt-1 text-zinc-400">{project.problem}</dd>
                    </div>
                    <div>
                      <dt className="font-medium text-zinc-300">My responsibility</dt>
                      <dd className="mt-1 text-zinc-400">{project.responsibility}</dd>
                    </div>
                    <div>
                      <dt className="font-medium text-zinc-300">Technology</dt>
                      <dd className="mt-2 flex flex-wrap gap-2">
                        {project.technology.map((tech) => (
                          <span
                            key={tech}
                            className="rounded-full border border-white/10 px-2.5 py-0.5 text-xs text-zinc-400"
                          >
                            {tech}
                          </span>
                        ))}
                      </dd>
                    </div>
                    <div>
                      <dt className="font-medium text-zinc-300">What is live</dt>
                      <dd className="mt-1 text-zinc-400">{project.live}</dd>
                    </div>
                    <div>
                      <dt className="font-medium text-zinc-300">Result</dt>
                      <dd className="mt-1 text-zinc-400">{project.result}</dd>
                    </div>
                  </dl>

                  <div className="mt-6 flex flex-wrap gap-4">
                    <Link
                      href={project.href}
                      className="inline-flex items-center gap-1.5 text-sm text-white underline underline-offset-4 hover:text-zinc-300"
                    >
                      {project.name === "LocalBoyNani Seafoods"
                        ? "See case studies"
                        : "Read full case study"}
                      <ArrowRight className="h-3.5 w-3.5" />
                    </Link>
                    {project.liveHref ? (
                      <a
                        href={project.liveHref}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-1.5 text-sm text-zinc-400 underline underline-offset-4 hover:text-white"
                      >
                        Visit live
                      </a>
                    ) : null}
                  </div>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* Identity */}
      <section className="relative border-b border-white/5 px-4 py-20">
        <div className="container mx-auto max-w-5xl">
          <div className="flex flex-col items-center gap-10 md:flex-row md:items-start md:gap-14">
            <div className="relative h-44 w-44 flex-shrink-0 overflow-hidden rounded-2xl border border-white/10 md:h-56 md:w-56">
              <Image
                src="/images/somnath-about.jpg"
                alt="Somanath Khadanga — senior full-stack and SaaS engineer"
                fill
                className="object-cover object-top"
                sizes="(max-width: 768px) 176px, 224px"
              />
            </div>
            <div className="flex-1 text-center md:text-left">
              <p className="text-sm font-medium uppercase tracking-widest text-zinc-500">
                Work directly with
              </p>
              <h2 className="mt-2 text-3xl font-bold tracking-tight text-white md:text-4xl">
                Somanath Khadanga
              </h2>
              <p className="mt-2 text-lg text-zinc-300">Senior full-stack and SaaS engineer</p>
              <p className="mt-3 flex items-center justify-center gap-2 text-sm text-zinc-500 md:justify-start">
                <MapPin className="h-4 w-4" />
                Based in India · Available for remote projects · {WORKING_TIMEZONE}
              </p>
              <p className="mt-5 max-w-xl text-zinc-400">
                Somanath Studio is not an anonymous agency. I personally handle scoping,
                architecture, development, deployment and communication for your project.
              </p>
              <div className="mt-6 flex flex-wrap items-center justify-center gap-3 md:justify-start">
                <a
                  href={LINKEDIN_URL}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 rounded-lg border border-white/10 bg-white/5 px-3 py-2 text-sm text-zinc-400 transition-colors hover:border-sky-400/30 hover:text-sky-400"
                >
                  <Linkedin className="h-4 w-4" />
                  LinkedIn
                </a>
                <a
                  href={GITHUB_URL}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 rounded-lg border border-white/10 bg-white/5 px-3 py-2 text-sm text-zinc-400 transition-colors hover:border-white/30 hover:text-white"
                >
                  <Github className="h-4 w-4" />
                  GitHub
                </a>
                <a
                  href={`mailto:${CONTACT_EMAIL}`}
                  className="inline-flex items-center gap-2 rounded-lg border border-white/10 bg-white/5 px-3 py-2 text-sm text-zinc-400 transition-colors hover:border-white/30 hover:text-white"
                >
                  <Mail className="h-4 w-4" />
                  Email
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="relative border-b border-white/5 px-4 py-20">
        <div className="pointer-events-none absolute inset-0 bg-grid-white/[0.02]" />
        <div className="container relative z-10 mx-auto max-w-5xl">
          <AnimatedSectionHeading className="text-3xl font-bold tracking-tight text-white md:text-5xl">
            Who this is for
          </AnimatedSectionHeading>
          <ul className="mt-8 grid gap-4 md:grid-cols-2">
            {fitItems.map((item, i) => (
              <ServiceSectionCard key={item} delay={i * 0.05}>
                {item}
              </ServiceSectionCard>
            ))}
          </ul>
          <div className="mt-8 border-l-2 border-white/15 pl-5">
            <p className="text-zinc-300">
              Best suited for SaaS MVPs, web applications and AI products.
            </p>
            <p className="mt-2 text-zinc-500">
              Not intended for basic brochure websites, cheap template-only work, or projects without
              a clear product goal. Typical MVP engagements start from ₹75,000.
            </p>
          </div>
        </div>
      </section>

      <section className="relative border-b border-white/5 px-4 py-20">
        <div className="container mx-auto max-w-5xl">
          <h2 className="text-3xl font-bold tracking-tight text-white md:text-5xl">The problems I solve</h2>
          <p className="mt-6 max-w-3xl text-zinc-400">
            Most MVPs do not fail because they launched too slowly. They fail because they launched
            fast in the wrong way.
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
            Ship the smallest version that is useful, credible, and ready to grow — including
            architecture, auth, payments, AI features and deployment when needed.
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

      <DeferredSection minHeightClassName="h-[520px]">
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
            <h2 className="text-3xl font-bold tracking-tight text-white md:text-5xl">
              Typical MVP outcomes
            </h2>
            <ul className="mt-8 grid gap-4 md:grid-cols-2">
              {outcomeItems.map((item, i) => (
                <ServiceSectionCard key={item} delay={i * 0.04} className="bg-black/40">
                  {item}
                </ServiceSectionCard>
              ))}
            </ul>
          </div>
        </section>
      </DeferredSection>

      <DeferredSection minHeightClassName="h-[440px]">
        <section className="border-b border-white/5 px-4 py-20">
          <div className="container mx-auto max-w-5xl">
            <h2 className="text-3xl font-bold tracking-tight text-white md:text-5xl">My process</h2>
            <p className="mt-4 max-w-2xl text-zinc-400">
              Here is what happens after you book a call or send project details.
            </p>
            <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-5">
              {processSteps.map(([title, body], i) => (
                <ServiceSectionCard
                  key={title}
                  delay={i * 0.05}
                  className="h-full min-h-[140px] lg:min-h-[180px]"
                >
                  <h3 className="text-xs font-semibold uppercase tracking-widest text-white">
                    {title}
                  </h3>
                  <p className="mt-3 text-sm text-zinc-400">{body}</p>
                </ServiceSectionCard>
              ))}
            </div>
          </div>
        </section>
      </DeferredSection>

      {/* Conversion paths */}
      <section id="enquire" className="relative scroll-mt-24 border-b border-white/5 px-4 py-20">
        <div className="pointer-events-none absolute inset-0 bg-grid-white/[0.02]" />
        <div className="container relative z-10 mx-auto max-w-5xl">
          <h2 className="text-3xl font-bold tracking-tight text-white md:text-5xl">
            Choose how you want to start
          </h2>
          <p className="mt-4 max-w-2xl text-zinc-400">
            Not ready to book a call yet? Send details or message on WhatsApp. Same person replies
            either way.
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
                Useful for quick questions, India-timezone chats, and early fit checks.
              </p>
              <div className="mt-5">
                <TrackedWhatsAppButton
                  location="mvp_conversion_whatsapp"
                  className="h-11 min-w-0 w-full text-sm"
                />
              </div>
            </div>
            <div className="rounded-xl border border-white/10 bg-zinc-950/40 p-6">
              <h3 className="text-lg font-semibold text-white">Send project details</h3>
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

          <div id="project-form" className="mt-12 scroll-mt-28 rounded-xl border border-white/10 bg-black/40 p-6 md:p-8">
            <h3 className="text-xl font-semibold text-white">Send project details</h3>
            <p className="mt-2 text-sm text-zinc-400">
              Name, contact, what you&apos;re building, stage, budget and launch timing.
            </p>
            <div className="mt-6">
              <MvpEnquiryForm />
            </div>
          </div>
        </div>
      </section>

      <DeferredSection minHeightClassName="h-[520px]">
        <section className="border-b border-white/5 px-4 py-20">
          <div className="container mx-auto max-w-5xl">
            <h2 className="text-3xl font-bold tracking-tight text-white md:text-5xl">FAQ</h2>
            <div className="mt-8 space-y-4">
              {faqItems.map((item, i) => (
                <ServiceSectionCard key={item.q} delay={i * 0.04}>
                  <h3 className="text-lg font-semibold text-white">{item.q}</h3>
                  <p className="mt-3 text-zinc-400">{item.a}</p>
                </ServiceSectionCard>
              ))}
            </div>
          </div>
        </section>
      </DeferredSection>

      <DeferredSection minHeightClassName="h-[220px]">
        <section className="border-b border-white/5 px-4 py-16">
          <div className="container mx-auto max-w-5xl">
            <h2 className="text-2xl font-bold tracking-tight text-white md:text-3xl">
              Related resources
            </h2>
            <div className="mt-6 flex flex-wrap gap-3">
              <Link
                href="/services"
                className="rounded-full border border-white/15 px-4 py-2 text-sm text-zinc-300 hover:bg-white/5 hover:text-white"
              >
                All Services
              </Link>
              <Link
                href="/services/ai-saas-development"
                className="rounded-full border border-white/15 px-4 py-2 text-sm text-zinc-300 hover:bg-white/5 hover:text-white"
              >
                AI SaaS Development
              </Link>
              <Link
                href="/services/nextjs-performance-optimization"
                className="rounded-full border border-white/15 px-4 py-2 text-sm text-zinc-300 hover:bg-white/5 hover:text-white"
              >
                Next.js Performance Optimization
              </Link>
              <Link
                href="/services/production-readiness-upgrade"
                className="rounded-full border border-white/15 px-4 py-2 text-sm text-zinc-300 hover:bg-white/5 hover:text-white"
              >
                Production Readiness Upgrade
              </Link>
              <Link
                href="/case-studies"
                className="rounded-full border border-white/15 px-4 py-2 text-sm text-zinc-300 hover:bg-white/5 hover:text-white"
              >
                Case Studies
              </Link>
              <Link
                href="/projects/paperchai"
                className="rounded-full border border-white/15 px-4 py-2 text-sm text-zinc-300 hover:bg-white/5 hover:text-white"
              >
                PaperChai Case Study
              </Link>
              <Link
                href="/blog/saas-mvp-cost-2026"
                className="rounded-full border border-white/15 px-4 py-2 text-sm text-zinc-300 hover:bg-white/5 hover:text-white"
              >
                SaaS MVP Cost Guide
              </Link>
            </div>
          </div>
        </section>
      </DeferredSection>

      <DeferredSection minHeightClassName="h-[520px]">
        <section className="relative flex w-full flex-col items-center justify-center overflow-hidden border-t border-white/10 bg-black px-4 py-32 text-center">
          <div className="pointer-events-none absolute inset-0 bg-gradient-to-b from-zinc-900/50 to-black" />
          <DeferredParticles
            className="pointer-events-none absolute inset-0"
            quantity={200}
            staticity={30}
            ease={50}
            color="#ffffff"
            refresh
          />
          <div className="relative z-10 mx-auto flex max-w-4xl flex-col items-center gap-8">
            <div className="animate-in fade-in slide-in-from-bottom-8 flex flex-col items-center gap-4 duration-700">
              <h2 className="bg-gradient-to-b from-white via-white/90 to-white/50 bg-clip-text text-4xl font-bold tracking-tighter text-transparent md:text-6xl">
                Ready to build a SaaS MVP worth launching?
              </h2>
              <p className="max-w-3xl text-lg text-zinc-400 md:text-xl">
                Book a call, message on WhatsApp, or send project details — I personally handle the
                work from scope to launch.
              </p>
            </div>
            <div className="animate-in fade-in slide-in-from-bottom-8 flex flex-col items-center gap-4 delay-150 duration-700 sm:flex-row">
              <TrackedBookCallButton location="mvp_final_cta" />
              <TrackedWhatsAppButton location="mvp_final_cta_whatsapp" />
            </div>
            <p className="max-w-xl text-xs text-zinc-500">
              Best fit for founders who want a senior engineer, not a team of juniors. Typical MVP
              engagements start from ₹75,000.
            </p>
          </div>
        </section>
      </DeferredSection>

      <Footer />
      <ClientMobileNav />
    </main>
  );
}
