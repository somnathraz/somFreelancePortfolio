import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { ClientMobileNav } from "@/components/ClientMobileNav";
import { DeliveryModelSection } from "@/components/DeliveryModelSection";
import { DeferredParticles } from "@/components/DeferredParticles";
import { siteLogoUrl } from "@/lib/site";
import { breadcrumbJsonLd, faqPageJsonLd } from "@/lib/seo";

export const metadata: Metadata = {
  title: "Custom Software Development Services | Somanath Studio",
  description:
    "Custom software development services for startups and businesses in the US, UK and India: SaaS products, internal tools, booking and logistics platforms, built by a senior-led team.",
  alternates: {
    canonical: "/services/custom-software-development",
  },
  openGraph: {
    title: "Custom Software Development Services | Somanath Studio",
    description:
      "Senior-led custom software development for startups and businesses in the US, UK and India.",
    url: "/services/custom-software-development",
    type: "website",
    images: [
      {
        url: "/og?title=Custom%20Software%20Development",
        width: 1200,
        height: 630,
        alt: "Custom Software Development Company",
      },
    ],
  },
};

const productTypes = [
  "SaaS products",
  "Internal tools and operations dashboards",
  "Booking and scheduling systems",
  "Logistics and delivery platforms",
  "E-commerce and order systems",
  "AI-enabled workflows",
  "Modernisation of existing systems",
] as const;

const faqs = [
  {
    question: "What custom software development services do you offer?",
    answer:
      "Custom web applications, SaaS products, internal tools and dashboards, booking and scheduling systems, logistics and payment platforms, and AI-enabled workflows, plus modernisation of existing systems.",
  },
  {
    question: "Are you a custom software development company or a freelancer?",
    answer:
      "A senior-led studio. You work directly with the engineer who builds your software, and frontend, backend, AI, design or QA specialists join only when the scope calls for them.",
  },
  {
    question: "Do you work with businesses in the UK and US?",
    answer:
      "Yes. Work is remote from India (IST), with overlap for UK working hours and US East Coast mornings. Scope, estimates and progress updates are written, so nothing depends on sharing a timezone.",
  },
  {
    question: "How do you price custom software?",
    answer:
      "By scope. After a discovery call you get a written scope with milestones and a fixed estimate, before any development starts.",
  },
  {
    question: "Who owns the software?",
    answer:
      "You do. Repositories, cloud accounts and documentation are handed over, and nothing is locked to our accounts.",
  },
];

const approach = [
  {
    heading: "Custom software vs off-the-shelf tools",
    body: "Off-the-shelf software is the right choice until your process stops fitting it. Custom software makes sense when spreadsheets, workarounds or per-seat licences start costing more than building the workflow properly, or when the software itself is your product.",
  },
  {
    heading: "How a custom software project runs",
    body: "Discovery and written scope, architecture and estimate, build in weekly demo cycles, then launch with monitoring, backups and handover documentation. You see working software every week rather than a big reveal at the end.",
  },
  {
    heading: "Technology",
    body: "Next.js and React for web interfaces, Node.js for APIs and background jobs, PostgreSQL for data, and practical AI integrations where they remove manual work. We choose boring, well-supported tools so the software is easy to maintain.",
  },
] as const;

export default function CustomSoftwareDevelopmentPage() {
  const serviceJsonLd = {
    "@context": "https://schema.org",
    "@type": "Service",
    name: "Custom Software Development",
    serviceType: "Custom Software Development",
    provider: {
      "@type": "Organization",
      "@id": "https://somanathkhadanga.com/#organization",
      name: "Somanath Studio",
      url: "https://somanathkhadanga.com",
      logo: siteLogoUrl,
    },
    areaServed: [
      { "@type": "Country", name: "United States" },
      { "@type": "Country", name: "United Kingdom" },
      { "@type": "Country", name: "India" },
    ],
    url: "https://somanathkhadanga.com/services/custom-software-development",
    description:
      "Custom software built by a senior-led flexible team for startups and businesses.",
  };

  const crumbs = breadcrumbJsonLd([
    { name: "Home", path: "/" },
    { name: "Services", path: "/services" },
    { name: "Custom Software Development", path: "/services/custom-software-development" },
  ]);

  return (
    <main className="min-h-screen bg-black text-foreground selection:bg-white/20">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(serviceJsonLd) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(crumbs) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqPageJsonLd(faqs)) }}
      />
      <Navbar />

      <section className="relative overflow-hidden border-b border-white/5 px-4 pb-20 pt-28 text-center md:pt-32">
        <div className="absolute inset-0 z-0 bg-grid-white pointer-events-none [mask-image:radial-gradient(ellipse_at_center,transparent_20%,black)]" />
        <div className="relative z-10 mx-auto max-w-4xl space-y-6">
          <p className="font-mono text-xs uppercase tracking-widest text-zinc-500">
            Custom Software Development
          </p>
          <h1 className="text-4xl font-bold tracking-tight text-white md:text-6xl">
            Custom Software Development Services for Startups and Businesses
          </h1>
          <p className="mx-auto max-w-2xl text-lg text-zinc-400">
            Software built around how your business actually works, by a senior-led team with no
            unnecessary agency layers. Serving companies in the US, UK and India, with specialists
            added according to your project requirements.
          </p>
          <div className="flex flex-col items-center justify-center gap-3 sm:flex-row">
            <Link
              href="/contact"
              className="inline-flex h-12 min-w-[240px] items-center justify-center rounded-md bg-white px-6 text-base font-medium text-black hover:bg-zinc-200"
            >
              Discuss Your Requirements With an Engineer
              <ArrowRight className="ml-2 h-4 w-4" />
            </Link>
            <Link
              href="/case-studies"
              className="inline-flex h-12 min-w-[200px] items-center justify-center rounded-md border border-white/10 px-6 text-base font-medium text-white hover:bg-white/5"
            >
              See Our Work
            </Link>
          </div>
        </div>
      </section>

      <section className="border-b border-white/5 px-4 py-20">
        <div className="container mx-auto max-w-5xl">
          <h2 className="text-3xl font-bold tracking-tight text-white md:text-4xl">
            What we build
          </h2>
          <p className="mt-4 max-w-2xl text-zinc-400">
            Broader product and business software — not limited to a single SaaS MVP template.
          </p>
          <ul className="mt-10 grid gap-3 sm:grid-cols-2">
            {productTypes.map((item) => (
              <li
                key={item}
                className="border-t border-white/10 pt-4 text-sm text-zinc-300"
              >
                {item}
              </li>
            ))}
          </ul>
        </div>
      </section>

      <section className="border-b border-white/5 px-4 py-20">
        <div className="container mx-auto max-w-3xl space-y-12">
          {approach.map((item) => (
            <div key={item.heading}>
              <h2 className="text-2xl font-bold tracking-tight text-white md:text-3xl">{item.heading}</h2>
              <p className="mt-4 leading-relaxed text-zinc-400">{item.body}</p>
            </div>
          ))}
        </div>
      </section>

      <DeliveryModelSection />

      <section className="border-b border-white/5 px-4 py-20">
        <div className="container mx-auto max-w-3xl">
          <h2 className="text-2xl font-bold tracking-tight text-white md:text-3xl">
            Frequently asked questions
          </h2>
          <dl className="mt-8 space-y-6">
            {faqs.map((faq) => (
              <div key={faq.question}>
                <dt className="font-semibold text-white">{faq.question}</dt>
                <dd className="mt-2 leading-relaxed text-zinc-400">{faq.answer}</dd>
              </div>
            ))}
          </dl>
          <p className="mt-10 text-sm text-zinc-500">
            Related:{" "}
            <Link href="/services/react-development" className="text-blue-400 hover:text-blue-300">
              React development
            </Link>
            ,{" "}
            <Link href="/services/mvp-development" className="text-blue-400 hover:text-blue-300">
              MVP development
            </Link>
            ,{" "}
            <Link href="/white-label-web-development" className="text-blue-400 hover:text-blue-300">
              white label web development
            </Link>{" "}
            and{" "}
            <Link href="/case-studies/vgt" className="text-blue-400 hover:text-blue-300">
              the VGT logistics platform case study
            </Link>
            .
          </p>
        </div>
      </section>

      <section className="relative flex w-full flex-col items-center justify-center overflow-hidden border-t border-white/10 bg-black px-4 py-28 text-center">
        <div className="pointer-events-none absolute inset-0 bg-gradient-to-b from-zinc-900/50 to-black" />
        <DeferredParticles
          className="pointer-events-none absolute inset-0"
          quantity={140}
          staticity={30}
          ease={50}
          color="#ffffff"
          refresh
        />
        <div className="relative z-10 max-w-3xl">
          <h2 className="text-3xl font-bold tracking-tight text-white md:text-5xl">
            Tell an engineer what you need built
          </h2>
          <p className="mt-4 text-zinc-400">
            We&apos;ll recommend focused support, a compact delivery team, or an extended setup —
            based on scope, timeline, and budget.
          </p>
          <Link
            href="/contact"
            className="mt-8 inline-flex items-center justify-center rounded-full bg-white px-6 py-3 text-base font-semibold text-black hover:bg-zinc-200"
          >
            Talk to an Engineer
          </Link>
        </div>
      </section>

      <Footer />
      <ClientMobileNav />
    </main>
  );
}
