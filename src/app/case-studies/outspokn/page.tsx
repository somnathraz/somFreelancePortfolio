import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { ClientMobileNav } from "@/components/ClientMobileNav";
import { PhoneFrameGallery } from "@/components/projects/PhoneFrameGallery";
import { CaseStudyDeliverySummary } from "@/components/CaseStudyDeliverySummary";

export const metadata: Metadata = {
  title: "Case Study: Outspokn — AI English Learning App | Somanath Studio",
  description:
    "Outspokn is an AI English learning app built with React Native and Django. Open LLM models, tuned RAG retrieval and courses tailored to each student’s learning tracks.",
  alternates: { canonical: "/case-studies/outspokn" },
  openGraph: {
    title: "Case Study: Outspokn — AI English Learning App",
    description:
      "React Native + Django AI English learning app with open LLMs, RAG retrieval and adaptive learning tracks.",
    url: "/case-studies/outspokn",
    images: [{ url: "/images/outspokn-1.webp", width: 1420, height: 2438 }],
  },
};

const TECH = [
  "React Native",
  "Python",
  "Django",
  "Open LLM models",
  "RAG / retrieval",
  "Adaptive learning tracks",
];

const SCREENSHOTS = [
  {
    src: "/images/outspokn-1.webp",
    alt: "Outspokn — AI English learning home and lesson flow",
  },
  {
    src: "/images/outspokn2.webp",
    alt: "Outspokn — practice and speaking experience",
  },
  {
    src: "/images/outspokn3.webp",
    alt: "Outspokn — tailored course and learning track screens",
  },
];

export default function OutspoknCaseStudyPage() {
  return (
    <main className="min-h-screen bg-black text-white">
      <Navbar />

      <article className="container mx-auto max-w-3xl px-4 pb-16 pt-28 md:pb-24 md:pt-32">
        <p className="font-mono text-[11px] uppercase tracking-[0.2em] text-zinc-500">
          Case study · AI product · Live on Google Play
        </p>
        <h1 className="mt-3 text-4xl font-bold tracking-tight md:text-5xl">Outspokn</h1>
        <p className="mt-4 text-lg text-zinc-400">
          AI English learning app — practice that adapts to how each student actually learns.
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
          specialists="Mobile, backend, AI / RAG"
        />
      </article>

      <section className="border-y border-white/5 bg-zinc-950/40 px-4 py-14">
        <div className="container mx-auto max-w-5xl">
          <h2 className="text-center text-sm font-mono uppercase tracking-widest text-zinc-500">
            App screens
          </h2>
          <div className="mt-8">
            <PhoneFrameGallery
              images={SCREENSHOTS}
              caption="All app screens — swipe horizontally to browse"
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
              Generic English courses treat every learner the same. Students lose motivation when
              lessons ignore their level, weak spots and practice history — and most apps still ship
              static content catalogs instead of adaptive paths.
            </dd>
          </div>

          <div>
            <dt className="font-mono text-[10px] uppercase tracking-widest text-zinc-600">
              Solution
            </dt>
            <dd className="mt-2 text-base leading-relaxed text-zinc-300">
              Outspokn is a React Native English learning app backed by Django. Open LLM models power
              conversation and feedback. A tuned RAG layer retrieves the right lesson and practice
              material from the course corpus, then builds and adjusts courses against each
              student’s learning tracks — so practice stays relevant as they improve.
            </dd>
          </div>

          <div>
            <dt className="font-mono text-[10px] uppercase tracking-widest text-zinc-600">
              Technology
            </dt>
            <dd className="mt-2 font-mono text-xs leading-relaxed text-zinc-500">
              React Native · Python · Django · Open LLM models · RAG / retrieval for course data ·
              Learning-track driven personalization
            </dd>
          </div>

          <div>
            <dt className="font-mono text-[10px] uppercase tracking-widest text-zinc-600">
              Challenges
            </dt>
            <dd className="mt-2 text-base leading-relaxed text-zinc-300">
              Keeping RAG answers grounded in course content (not generic chat), shaping retrieval
              so practice matches learning tracks, and delivering a mobile UX that feels like a
              teaching product — not an LLM demo wrapped in screens.
            </dd>
          </div>

          <div>
            <dt className="font-mono text-[10px] uppercase tracking-widest text-zinc-600">
              Result
            </dt>
            <dd className="mt-2 text-base leading-relaxed text-zinc-300">
              Live on{" "}
              <a
                href="https://play.google.com/store/apps/details?id=com.outspokn&hl=en_IN"
                target="_blank"
                rel="noopener noreferrer"
                className="text-white underline underline-offset-4"
              >
                Google Play
              </a>{" "}
              as Outspokn: English Speaking App — AI conversation practice, learning tracks and
              personalised courses for real spoken-English fluency.
            </dd>
          </div>
        </dl>

        <div className="mt-14 flex flex-wrap gap-4 border-t border-white/10 pt-10">
          <a
            href="https://play.google.com/store/apps/details?id=com.outspokn&hl=en_IN"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex h-11 items-center rounded-md bg-white px-5 text-sm font-medium text-black"
          >
            Get on Google Play
            <ArrowRight className="ml-2 h-4 w-4" />
          </a>
          <Link
            href="/contact"
            className="inline-flex h-11 items-center rounded-md border border-white/10 px-5 text-sm text-white"
          >
            Talk to an Engineer
          </Link>
          <Link
            href="/services/ai-saas-development"
            className="inline-flex h-11 items-center rounded-md border border-white/10 px-5 text-sm text-zinc-400"
          >
            Related: AI SaaS development
          </Link>
        </div>
      </article>

      <Footer />
      <ClientMobileNav />
    </main>
  );
}
