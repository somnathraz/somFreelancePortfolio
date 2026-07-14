import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { ClientMobileNav } from "@/components/ClientMobileNav";

export const metadata: Metadata = {
  title: "Case Study: Studio Booking Platform | Somanath Studio",
  description:
    "Case study outline for a studio booking and scheduling platform — problem, solution, stack and outcomes. Screenshots and full write-up expanding soon.",
  alternates: { canonical: "/case-studies/studio-booking-platform" },
};

export default function StudioBookingCaseStudyPage() {
  return (
    <main className="min-h-screen bg-black text-white">
      <Navbar />
      <section className="container mx-auto max-w-3xl px-4 pb-24 pt-28">
        <p className="font-mono text-[11px] uppercase tracking-[0.2em] text-zinc-500">
          Case study · draft
        </p>
        <h1 className="mt-3 text-4xl font-bold tracking-tight md:text-5xl">
          Studio booking platform
        </h1>
        <p className="mt-4 text-lg text-zinc-400">
          End-to-end booking and scheduling for studios — availability, payments and admin ops in
          one product surface.
        </p>

        <dl className="mt-10 space-y-6 border-t border-white/10 pt-8 text-sm">
          <div>
            <dt className="font-mono text-[10px] uppercase tracking-widest text-zinc-600">Problem</dt>
            <dd className="mt-1 text-zinc-300">
              Studios were juggling WhatsApp, calendars and manual payment tracking — bookings
              slipped and no single source of truth existed.
            </dd>
          </div>
          <div>
            <dt className="font-mono text-[10px] uppercase tracking-widest text-zinc-600">Solution</dt>
            <dd className="mt-1 text-zinc-300">
              Custom booking SaaS with slot availability, checkout, reminders and an admin dashboard
              for day-to-day operations.
            </dd>
          </div>
          <div>
            <dt className="font-mono text-[10px] uppercase tracking-widest text-zinc-600">
              Technology
            </dt>
            <dd className="mt-1 font-mono text-xs text-zinc-500">
              Next.js · Node.js · TypeScript · MongoDB · Stripe · calendar flows
            </dd>
          </div>
          <div>
            <dt className="font-mono text-[10px] uppercase tracking-widest text-zinc-600">Result</dt>
            <dd className="mt-1 text-zinc-300">
              Fewer scheduling errors, clearer payment tracking and a product owners could run
              without a spreadsheet.
            </dd>
          </div>
        </dl>

        <p className="mt-8 rounded-xl border border-amber-500/20 bg-amber-500/5 px-4 py-3 text-sm text-zinc-400">
          Screenshots and a longer narrative are being added. For a full published case study today,
          see{" "}
          <Link href="/projects/paperchai" className="text-white underline underline-offset-4">
            PaperChai
          </Link>
          .
        </p>

        <div className="mt-10 flex flex-wrap gap-4">
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
        </div>
      </section>
      <Footer />
      <ClientMobileNav />
    </main>
  );
}
