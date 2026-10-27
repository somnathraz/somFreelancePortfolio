import type { Metadata } from "next";
import Link from "next/link";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { ClientMobileNav } from "@/components/ClientMobileNav";
import { JsonLd } from "@/components/JsonLd";
import { MvpCostCalculator } from "@/components/tools/MvpCostCalculator";
import { breadcrumbJsonLd, faqPageJsonLd, webPageJsonLd } from "@/lib/seo";

const TITLE = "SaaS MVP Cost Calculator | Free Estimate Tool";
const DESCRIPTION =
  "Estimate your SaaS MVP cost and timeline in under a minute. Adjust scope, roles, billing, AI and launch quality to see a directional price range.";

export const metadata: Metadata = {
  title: TITLE,
  description: DESCRIPTION,
  alternates: { canonical: "/tools/saas-mvp-cost-calculator" },
  openGraph: {
    title: TITLE,
    description: DESCRIPTION,
    url: "/tools/saas-mvp-cost-calculator",
    type: "website",
    images: [
      { url: "/og?title=SaaS%20MVP%20Cost%20Calculator", width: 1200, height: 630 },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: TITLE,
    description: DESCRIPTION,
    images: ["/og?title=SaaS%20MVP%20Cost%20Calculator"],
  },
};

const FAQS = [
  {
    question: "How accurate is this SaaS MVP cost calculator?",
    answer:
      "It gives a directional range based on the scope decisions that actually move MVP budgets — workflow complexity, roles, billing, AI, integrations, design and launch quality. It is not a fixed quote; a real scope call narrows it down.",
  },
  {
    question: "What is included in the base price?",
    answer:
      "The base build covers authentication, one user dashboard, a responsive UI and deployment. Everything else — multiple roles, billing, AI, integrations, admin tools and launch quality — is added on top based on your selections.",
  },
  {
    question: "Does the estimate include ongoing costs?",
    answer:
      "No. This covers initial build cost and timeline only. Hosting, third-party API usage and post-launch support are scoped separately once requirements are clearer.",
  },
];

export default function MvpCostCalculatorPage() {
  const schema = [
    webPageJsonLd({
      path: "/tools/saas-mvp-cost-calculator",
      name: TITLE,
      description: DESCRIPTION,
    }),
    breadcrumbJsonLd([
      { name: "Home", path: "/" },
      { name: "Tools", path: "/tools" },
      { name: "SaaS MVP Cost Calculator", path: "/tools/saas-mvp-cost-calculator" },
    ]),
    faqPageJsonLd(FAQS),
  ];

  return (
    <>
      <JsonLd data={schema} />
      <main className="min-h-screen bg-black text-foreground selection:bg-white/20">
        <Navbar />

        <section className="relative overflow-hidden border-b border-white/5 px-4 pb-12 pt-28 md:pb-16 md:pt-32">
          <div className="absolute inset-0 z-0 bg-grid-white pointer-events-none [mask-image:radial-gradient(ellipse_at_center,transparent_20%,black)]" />
          <div className="container relative z-10 mx-auto max-w-4xl text-center">
            <p className="mb-4 font-mono text-xs uppercase tracking-widest text-zinc-500">
              Free tool
            </p>
            <h1 className="text-4xl font-bold tracking-tighter text-white sm:text-5xl">
              SaaS MVP Cost Calculator
            </h1>
            <p className="mx-auto mt-5 max-w-2xl text-lg text-zinc-400">
              Adjust the scope below to see a directional price and timeline range — the same
              factors that actually move an MVP budget.
            </p>
          </div>
        </section>

        <section className="px-4 py-12 md:py-16">
          <div className="container mx-auto max-w-6xl">
            <MvpCostCalculator />
          </div>
        </section>

        <section className="border-t border-white/5 px-4 py-16">
          <div className="container mx-auto max-w-3xl">
            <h2 className="text-2xl font-bold tracking-tight text-white">FAQ</h2>
            <div className="mt-6 space-y-6">
              {FAQS.map((faq) => (
                <div key={faq.question}>
                  <h3 className="text-base font-semibold text-white">{faq.question}</h3>
                  <p className="mt-2 text-sm text-zinc-400">{faq.answer}</p>
                </div>
              ))}
            </div>
            <p className="mt-10 text-sm text-zinc-500">
              Want the full breakdown of what drives these numbers? Read{" "}
              <Link
                href="/blog/saas-mvp-cost-2026"
                className="text-white underline underline-offset-4"
              >
                How Much Should a SaaS MVP Cost in 2026?
              </Link>
              {" "}or{" "}
              <Link href="/contact" className="text-white underline underline-offset-4">
                talk to an engineer
              </Link>
              {" "}about your specific scope.
            </p>
          </div>
        </section>

        <Footer />
        <ClientMobileNav />
      </main>
    </>
  );
}
