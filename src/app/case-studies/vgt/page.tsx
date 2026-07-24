import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { ClientMobileNav } from "@/components/ClientMobileNav";
import { PhoneFrameGallery } from "@/components/projects/PhoneFrameGallery";
import { WideShotGallery } from "@/components/projects/WideShotGallery";
import { CaseStudyDeliverySummary } from "@/components/CaseStudyDeliverySummary";

export const metadata: Metadata = {
  title: "Case Study: VGT — Truck Logistics & Payment Platform | Somanath Studio",
  description:
    "VGT manages ticketing, challans, driver payments, truck tracking and money inflow/outflow for delivery and logistics operations.",
  alternates: { canonical: "/case-studies/vgt" },
  openGraph: {
    title: "Case Study: VGT — Truck Logistics & Payment Platform",
    description:
      "Ticketing, challans, payment management, truck tracking and cash-flow control for delivery logistics.",
    url: "/case-studies/vgt",
    images: [{ url: "/images/project-10.png", width: 3024, height: 1662 }],
  },
};

const TECH = [
  "Ticketing",
  "Challan management",
  "Payments",
  "Truck tracking",
  "Driver money flow",
  "Fleet ops dashboard",
];

const DESKTOP_SHOTS = [
  {
    src: "/images/project-10.png",
    alt: "VGT Transport Management System — login and ops dashboard",
  },
];

const MOBILE_SHOTS = [
  {
    src: "/images/vgt-1.png",
    alt: "VGT — logistics ticketing and operations screen",
  },
  {
    src: "/images/vgt-2.png",
    alt: "VGT — payment, challan and tracking views",
  },
];

export default function VgtCaseStudyPage() {
  return (
    <main className="min-h-screen bg-black text-white">
      <Navbar />

      <article className="container mx-auto max-w-3xl px-4 pb-16 pt-28 md:pb-24 md:pt-32">
        <p className="font-mono text-[11px] uppercase tracking-[0.2em] text-zinc-500">
          Case study · Logistics ops · Live demo
        </p>
        <h1 className="mt-3 text-4xl font-bold tracking-tight md:text-5xl">VGT</h1>
        <p className="mt-4 text-lg text-zinc-400">
          Ticketing, challans and payment management for delivery fleets — truck tracking and money
          flow in one operations surface.
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
          specialists="Frontend, backend, mobile, QA"
        />
      </article>

      <section className="border-y border-white/5 bg-zinc-950/40 px-4 py-14">
        <div className="container mx-auto max-w-5xl">
          <h2 className="text-center text-sm font-mono uppercase tracking-widest text-zinc-500">
            Desktop product
          </h2>
          <div className="mt-8">
            <WideShotGallery
              images={DESKTOP_SHOTS}
              caption="VGT Transport Management System — web ops surface"
            />
          </div>

          <h2 className="mt-16 text-center text-sm font-mono uppercase tracking-widest text-zinc-500">
            Mobile screens
          </h2>
          <div className="mt-8">
            <PhoneFrameGallery
              images={MOBILE_SHOTS}
              caption="Field ops screens — swipe to browse"
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
              Delivery and truck logistics teams were running ticketing, challans, driver payouts and
              truck status across WhatsApp, notebooks and disconnected tools. Payment inflow/outflow
              was hard to audit, and nobody had a single view of what each truck and driver owed or
              was owed.
            </dd>
          </div>

          <div>
            <dt className="font-mono text-[10px] uppercase tracking-widest text-zinc-600">
              Solution
            </dt>
            <dd className="mt-2 text-base leading-relaxed text-zinc-300">
              VGT is an operations platform for logistics fleets: ticketing and challan workflows,
              payment management for deliveries and trucks, truck tracking, driver accounts, and
              clear money inflow/outflow so finance and field teams share the same truth.
            </dd>
          </div>

          <div>
            <dt className="font-mono text-[10px] uppercase tracking-widest text-zinc-600">
              Technology &amp; scope
            </dt>
            <dd className="mt-2 text-base leading-relaxed text-zinc-300">
              End-to-end logistics product covering fleet management, shipment tracking, ticketing,
              challans, payment tracking, truck tracking, driver money management and cash-flow
              visibility.
            </dd>
          </div>

          <div>
            <dt className="font-mono text-[10px] uppercase tracking-widest text-zinc-600">
              Challenges
            </dt>
            <dd className="mt-2 text-base leading-relaxed text-zinc-300">
              Modelling real-world money movement (advances, recoveries, challans, trip settlements)
              without losing auditability; designing mobile flows field staff can use while tracking
              trucks and closing tickets the same day.
            </dd>
          </div>

          <div>
            <dt className="font-mono text-[10px] uppercase tracking-widest text-zinc-600">
              Result
            </dt>
            <dd className="mt-2 text-base leading-relaxed text-zinc-300">
              One place to run tickets, challans, payments and truck/driver status — with inflow and
              outflow visible enough that operations and accounts stop reconciling from chat threads.
            </dd>
          </div>
        </dl>

        <div className="mt-14 flex flex-wrap gap-4 border-t border-white/10 pt-10">
          <a
            href="https://vgt-silk.vercel.app/login"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex h-11 items-center rounded-md bg-white px-5 text-sm font-medium text-black"
          >
            Open live demo
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
