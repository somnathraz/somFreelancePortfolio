import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { ClientMobileNav } from "@/components/ClientMobileNav";
import { WideShotGallery } from "@/components/projects/WideShotGallery";

export const metadata: Metadata = {
  title: "Case Study: Calendar Booking System | Somanath Studio",
  description:
    "Studio and calendar booking platform with real-time availability, payments and admin ops — fewer scheduling errors, clearer payment tracking.",
  alternates: { canonical: "/case-studies/studio-booking-platform" },
  openGraph: {
    title: "Case Study: Calendar Booking System",
    description:
      "End-to-end booking and scheduling — availability, checkout and admin in one product surface.",
    url: "/case-studies/studio-booking-platform",
    images: [{ url: "/images/project-11.png", width: 2942, height: 1704 }],
  },
};

const TECH = [
  "Next.js",
  "Node.js",
  "TypeScript",
  "MongoDB",
  "Stripe",
  "Calendar flows",
];

const SCREENSHOTS = [
  {
    src: "/images/project-11.png",
    alt: "Calendar booking system — scheduling and availability dashboard",
  },
  {
    src: "/images/project-11-part-1.png",
    alt: "Calendar booking system — booking and admin views",
  },
];

export default function StudioBookingCaseStudyPage() {
  return (
    <main className="min-h-screen bg-black text-white">
      <Navbar />

      <article className="container mx-auto max-w-3xl px-4 pb-16 pt-28 md:pb-20 md:pt-32">
        <p className="font-mono text-[11px] uppercase tracking-[0.2em] text-zinc-500">
          Case study · Booking SaaS
        </p>
        <h1 className="mt-3 text-4xl font-bold tracking-tight md:text-5xl">
          Calendar booking system
        </h1>
        <p className="mt-4 text-lg text-zinc-400">
          End-to-end booking and scheduling for studios — availability, payments and admin ops in
          one product surface.
        </p>

        <div className="mt-6 flex flex-wrap gap-2">
          {TECH.map((item) => (
            <span
              key={item}
              className="rounded-full border border-white/10 bg-white/[0.03] px-3 py-1 text-xs text-zinc-400"
            >
              {item}
            </span>
          ))}
        </div>
      </article>

      <section className="border-y border-white/5 bg-zinc-950/40 px-4 py-14">
        <div className="container mx-auto max-w-5xl">
          <h2 className="text-center text-sm font-mono uppercase tracking-widest text-zinc-500">
            Product screens
          </h2>
          <div className="mt-8">
            <WideShotGallery
              images={SCREENSHOTS}
              caption="Desktop booking and admin surfaces"
            />
          </div>
        </div>
      </section>

      <article className="container mx-auto max-w-3xl px-4 py-16 md:py-20">
        <dl className="space-y-10 text-sm">
          <div>
            <dt className="font-mono text-[10px] uppercase tracking-widest text-zinc-600">
              Problem
            </dt>
            <dd className="mt-2 text-base leading-relaxed text-zinc-300">
              Studios were juggling WhatsApp, calendars and manual payment tracking — bookings
              slipped and no single source of truth existed.
            </dd>
          </div>
          <div>
            <dt className="font-mono text-[10px] uppercase tracking-widest text-zinc-600">
              Solution
            </dt>
            <dd className="mt-2 text-base leading-relaxed text-zinc-300">
              Custom booking SaaS with real-time slot availability, Stripe checkout, reminders and
              an admin dashboard for day-to-day operations.
            </dd>
          </div>
          <div>
            <dt className="font-mono text-[10px] uppercase tracking-widest text-zinc-600">
              Technology
            </dt>
            <dd className="mt-2 font-mono text-xs leading-relaxed text-zinc-500">
              Next.js · Node.js · TypeScript · MongoDB · Stripe · calendar flows
            </dd>
          </div>
          <div>
            <dt className="font-mono text-[10px] uppercase tracking-widest text-zinc-600">
              Challenges
            </dt>
            <dd className="mt-2 text-base leading-relaxed text-zinc-300">
              Keeping availability conflict-free under concurrent bookings, tying payment state to
              the calendar cleanly, and giving staff an admin view that replaces spreadsheet
              reconciliation.
            </dd>
          </div>
          <div>
            <dt className="font-mono text-[10px] uppercase tracking-widest text-zinc-600">
              Result
            </dt>
            <dd className="mt-2 text-base leading-relaxed text-zinc-300">
              Fewer scheduling errors (~40% in the engagement metrics), clearer payment tracking and
              a product owners could run without a spreadsheet.
            </dd>
          </div>
        </dl>

        <div className="mt-14 flex flex-wrap gap-4 border-t border-white/10 pt-10">
          <Link
            href="/book"
            className="inline-flex h-11 items-center rounded-md bg-white px-5 text-sm font-medium text-black"
          >
            Book a call
            <ArrowRight className="ml-2 h-4 w-4" />
          </Link>
          <Link
            href="/services/saas-mvp-development"
            className="inline-flex h-11 items-center rounded-md border border-white/10 px-5 text-sm text-white"
          >
            Related: SaaS MVP development
          </Link>
          <Link
            href="/case-studies"
            className="inline-flex h-11 items-center rounded-md border border-white/10 px-5 text-sm text-zinc-400"
          >
            All case studies
          </Link>
        </div>
      </article>

      <Footer />
      <ClientMobileNav />
    </main>
  );
}
