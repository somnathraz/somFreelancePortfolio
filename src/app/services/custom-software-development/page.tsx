import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { ClientMobileNav } from "@/components/ClientMobileNav";
import { DeliveryModelSection } from "@/components/DeliveryModelSection";
import { DeferredParticles } from "@/components/DeferredParticles";
import { siteLogoUrl } from "@/lib/site";

export const metadata: Metadata = {
  title: "Custom Software Development Company for Startups and Businesses",
  description:
    "Custom software built by a senior-led flexible team — SaaS products, internal tools, booking systems, logistics platforms, and AI-enabled workflows.",
  alternates: {
    canonical: "/services/custom-software-development",
  },
  openGraph: {
    title: "Custom Software Development Company | Somanath Studio",
    description:
      "Senior-led custom software for startups and businesses. Specialists added according to project requirements.",
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

export default function CustomSoftwareDevelopmentPage() {
  const serviceJsonLd = {
    "@context": "https://schema.org",
    "@type": "Service",
    name: "Custom Software Development",
    serviceType: "Custom Software Development",
    provider: {
      "@type": "Organization",
      name: "Somanath Studio",
      url: "https://somanathkhadanga.com",
      logo: siteLogoUrl,
    },
    url: "https://somanathkhadanga.com/services/custom-software-development",
    description:
      "Custom software built by a senior-led flexible team for startups and businesses.",
  };

  return (
    <main className="min-h-screen bg-black text-foreground selection:bg-white/20">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(serviceJsonLd) }}
      />
      <Navbar />

      <section className="relative overflow-hidden border-b border-white/5 px-4 pb-20 pt-28 text-center md:pt-32">
        <div className="absolute inset-0 z-0 bg-grid-white pointer-events-none [mask-image:radial-gradient(ellipse_at_center,transparent_20%,black)]" />
        <div className="relative z-10 mx-auto max-w-4xl space-y-6">
          <p className="font-mono text-xs uppercase tracking-widest text-zinc-500">
            Custom Software Development
          </p>
          <h1 className="text-4xl font-bold tracking-tight text-white md:text-6xl">
            Custom Software Built by a Senior-Led Flexible Team
          </h1>
          <p className="mx-auto max-w-2xl text-lg text-zinc-400">
            Senior-led SaaS engineering without unnecessary agency layers. Work directly with
            experienced engineers, with additional specialists added according to your project
            requirements.
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

      <DeliveryModelSection />

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
