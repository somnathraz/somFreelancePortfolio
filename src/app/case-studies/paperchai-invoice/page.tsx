import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import { ArrowRight } from "lucide-react";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { ClientMobileNav } from "@/components/ClientMobileNav";
import { CaseStudyDeliverySummary } from "@/components/CaseStudyDeliverySummary";

export const metadata: Metadata = {
  title: "Case Study: PaperChai Invoice — Chat-to-Invoice Ops | Somanath Studio",
  description:
    "Create invoices from WhatsApp, Slack or a normal message. Queue them, track payments, send reminders and keep projects organised — PaperChai Invoice / Money Autopilot.",
  alternates: { canonical: "/case-studies/paperchai-invoice" },
  openGraph: {
    title: "Case Study: PaperChai Invoice — Chat-to-Invoice Ops",
    description:
      "Message a bot on WhatsApp, Slack or chat → invoice created, queued, payment tracked, reminders sent, projects kept in view.",
    url: "/case-studies/paperchai-invoice",
    images: [{ url: "/images/project-8.png", width: 686, height: 1470 }],
  },
};

const TECH = [
  "WhatsApp",
  "Slack",
  "Chat bot intake",
  "Invoice queue",
  "Payment tracking",
  "Smart reminders",
];

export default function PaperchaiInvoiceCaseStudyPage() {
  return (
    <main className="min-h-screen bg-black text-white">
      <Navbar />

      <article className="container mx-auto max-w-3xl px-4 pb-12 pt-28 md:pb-16 md:pt-32">
        <p className="font-mono text-[11px] uppercase tracking-[0.2em] text-zinc-500">
          Case study · Billing ops · Live at app.paperchaiapp.com
        </p>
        <h1 className="mt-3 text-4xl font-bold tracking-tight md:text-5xl">
          PaperChai Invoice
        </h1>
        <p className="mt-4 text-lg text-zinc-400">
          Message the bot — WhatsApp, Slack or a normal chat — and it creates the invoice, queues
          it, tracks payment, reminds clients and keeps your projects organised.
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

        <CaseStudyDeliverySummary
          deliverySetup="Senior-led compact team"
          specialists="Frontend, backend, integrations"
        />
      </article>

      <section className="border-y border-white/5 bg-zinc-950/40 px-4 py-14">
        <div className="container mx-auto flex max-w-lg justify-center">
          <div className="relative w-full max-w-[280px] overflow-hidden rounded-[1.75rem] border border-white/15 bg-zinc-950 shadow-2xl ring-1 ring-white/5 aspect-[9/16]">
            <div className="pointer-events-none absolute inset-x-0 top-0 z-10 flex justify-center pt-2">
              <span className="h-1.5 w-16 rounded-full bg-black/40" />
            </div>
            <Image
              src="/images/project-8.png"
              alt="PaperChai Invoice — Money Autopilot product screen"
              fill
              sizes="280px"
              className="object-cover object-top"
              priority
            />
          </div>
        </div>
        <p className="mt-6 text-center text-xs text-zinc-500">
          PaperChai Money Autopilot — invoice and payment tracking product
        </p>
      </section>

      <article className="container mx-auto max-w-3xl px-4 py-16 md:py-20">
        <dl className="space-y-10 text-sm">
          <div>
            <dt className="font-mono text-[10px] uppercase tracking-widest text-zinc-600">
              Problem
            </dt>
            <dd className="mt-2 text-base leading-relaxed text-zinc-300">
              Freelancers and small teams create invoices late, chase payments in chat threads, and
              lose track of which project is paid, queued or overdue — especially when work starts
              from a WhatsApp or Slack message instead of a billing tool.
            </dd>
          </div>

          <div>
            <dt className="font-mono text-[10px] uppercase tracking-widest text-zinc-600">
              Solution
            </dt>
            <dd className="mt-2 text-base leading-relaxed text-zinc-300">
              PaperChai Invoice turns everyday messages into billing ops. Send a request via
              WhatsApp, Slack or a normal message to the bot — it creates the invoice, queues it,
              tracks payment status, sends reminders in your tone, and keeps project billing
              visible so chasing clients stops being a spreadsheet job.
            </dd>
          </div>

          <div>
            <dt className="font-mono text-[10px] uppercase tracking-widest text-zinc-600">
              What it does
            </dt>
            <dd className="mt-2">
              <ul className="list-disc space-y-2 pl-5 text-base text-zinc-300">
                <li>Create invoices from WhatsApp, Slack or chat messages</li>
                <li>Queue invoices and keep project billing status clear</li>
                <li>Track who paid, who delayed and what&apos;s outstanding</li>
                <li>Smart email + WhatsApp reminders</li>
                <li>Dashboard for outstanding, paid and reliability signals</li>
              </ul>
            </dd>
          </div>

          <div>
            <dt className="font-mono text-[10px] uppercase tracking-widest text-zinc-600">
              Challenges
            </dt>
            <dd className="mt-2 text-base leading-relaxed text-zinc-300">
              Parsing messy natural-language billing asks into clean invoice data, syncing across
              chat channels without duplicate invoices, and making reminders feel personal — not
              spam — while payment status stays reliable.
            </dd>
          </div>

          <div>
            <dt className="font-mono text-[10px] uppercase tracking-widest text-zinc-600">
              Result
            </dt>
            <dd className="mt-2 text-base leading-relaxed text-zinc-300">
              A money-autopilot surface where invoice creation starts in the tools people already
              use, and payment tracking / reminders run without a second admin job.
            </dd>
          </div>
        </dl>

        <div className="mt-14 flex flex-wrap gap-4 border-t border-white/10 pt-10">
          <a
            href="https://app.paperchaiapp.com/"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex h-11 items-center rounded-md bg-white px-5 text-sm font-medium text-black"
          >
            Open live invoice app
            <ArrowRight className="ml-2 h-4 w-4" />
          </a>
          <Link
            href="/contact"
            className="inline-flex h-11 items-center rounded-md border border-white/10 px-5 text-sm text-white"
          >
            Talk to an Engineer
          </Link>
          <Link
            href="/services/saas-mvp-development"
            className="inline-flex h-11 items-center rounded-md border border-white/10 px-5 text-sm text-zinc-400"
          >
            Related: SaaS MVP
          </Link>
        </div>
      </article>

      <Footer />
      <ClientMobileNav />
    </main>
  );
}
