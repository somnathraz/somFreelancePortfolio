import Link from "next/link";
import { ArrowRight, Bot, CalendarCheck } from "lucide-react";

const PRODUCTS = [
  {
    id: "adaptive-agent-ui",
    status: "In progress",
    name: "Adaptive Agent UI",
    tagline: "AI agent that reshapes the interface around visitor intent",
    icon: Bot,
    problem:
      "Most product sites show the same homepage to every visitor. Founders bounce, agencies miss the partner pitch, and buyers never find the case study that matches their problem — all because the UI stays static.",
    building:
      "A productised AI agent layer (the same pattern as this site’s helper) that detects journey intent, adapts sections and recommendations in real time, and guides people to the right service, proof or booking CTA without a hard-coded funnel.",
    details: [
      "Intent detection → dynamic journeys",
      "UI that reorders proof, services and CTAs",
      "Memory across sessions",
      "Inactivity / scroll / exit triggers",
    ],
    relatedHref: "/services/ai-saas-development",
    relatedLabel: "AI SaaS development",
  },
  {
    id: "ai-booking-inventory",
    status: "In progress",
    name: "AI Booking & Inventory Ops",
    tagline: "Automated booking that books slots and manages inventory with AI",
    icon: CalendarCheck,
    problem:
      "Studios, clinics and product businesses lose money when bookings, stock and calendar staff don’t talk to each other — double bookings, oversold inventory, manual WhatsApp confirmations and no clean source of truth.",
    building:
      "An AI-enabled booking system that takes requests, checks availability, books or reschedules, and updates inventory in the same flow — so the calendar and stock stay consistent without someone babysitting both.",
    details: [
      "Natural-language or form booking intake",
      "Availability + conflict checks",
      "Inventory decrement / restock on book & cancel",
      "Reminders and exception handling for staff",
    ],
    relatedHref: "/services/saas-mvp-development",
    relatedLabel: "SaaS MVP development",
  },
] as const;

export function CurrentlyWorkingOn() {
  return (
    <section className="border-b border-white/5 bg-black px-4 py-16 md:py-20">
      <div className="container mx-auto max-w-6xl">
        <div className="mb-10 max-w-2xl">
          <p className="font-mono text-[11px] uppercase tracking-[0.2em] text-zinc-500">
            Currently working on
          </p>
          <h2 className="mt-3 text-3xl font-bold tracking-tight text-white md:text-4xl">
            Two products in build — not demos
          </h2>
          <p className="mt-3 text-zinc-400">
            Shipped case studies above. These are what I&apos;m actively designing and building next —
            each starting from a real operational problem.
          </p>
        </div>

        <div className="grid gap-6 lg:grid-cols-2">
          {PRODUCTS.map((product) => (
            <article
              key={product.id}
              id={product.id}
              className="relative scroll-mt-28 overflow-hidden rounded-2xl border border-white/10 bg-zinc-950/60 p-6 md:p-8"
            >
              <div className="pointer-events-none absolute -right-16 -top-16 h-48 w-48 rounded-full bg-violet-500/10 blur-3xl" />

              <div className="relative">
                <div className="flex items-start justify-between gap-4">
                  <div className="flex h-11 w-11 items-center justify-center rounded-xl border border-white/10 bg-white/[0.04] text-zinc-300">
                    <product.icon className="h-5 w-5" />
                  </div>
                  <span className="inline-flex items-center gap-1.5 rounded-full border border-violet-500/30 bg-violet-500/10 px-2.5 py-1 text-[11px] font-medium text-violet-300">
                    <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-violet-400" />
                    {product.status}
                  </span>
                </div>

                <h3 className="mt-5 text-2xl font-semibold tracking-tight text-white">
                  {product.name}
                </h3>
                <p className="mt-2 text-sm text-zinc-400">{product.tagline}</p>

                <div className="mt-8 space-y-6 text-sm">
                  <div>
                    <p className="font-mono text-[10px] uppercase tracking-widest text-zinc-600">
                      Problem
                    </p>
                    <p className="mt-2 leading-relaxed text-zinc-300">{product.problem}</p>
                  </div>
                  <div>
                    <p className="font-mono text-[10px] uppercase tracking-widest text-zinc-600">
                      What I&apos;m building
                    </p>
                    <p className="mt-2 leading-relaxed text-zinc-300">{product.building}</p>
                  </div>
                </div>

                <ul className="mt-6 space-y-2 border-t border-white/5 pt-6">
                  {product.details.map((item) => (
                    <li key={item} className="flex items-start gap-2 text-sm text-zinc-400">
                      <span className="mt-1.5 h-1 w-1 shrink-0 rounded-full bg-zinc-500" />
                      {item}
                    </li>
                  ))}
                </ul>

                <div className="mt-8 flex flex-wrap gap-3">
                  <Link
                    href="/book"
                    className="inline-flex h-10 items-center rounded-md bg-white px-4 text-sm font-medium text-black transition-colors hover:bg-zinc-200"
                  >
                    Talk about this build
                    <ArrowRight className="ml-2 h-3.5 w-3.5" />
                  </Link>
                  <Link
                    href={product.relatedHref}
                    className="inline-flex h-10 items-center rounded-md border border-white/10 px-4 text-sm text-zinc-300 transition-colors hover:bg-white/5 hover:text-white"
                  >
                    Related: {product.relatedLabel}
                  </Link>
                </div>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
