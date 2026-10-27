import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { ClientMobileNav } from "@/components/ClientMobileNav";
import { JsonLd } from "@/components/JsonLd";
import { breadcrumbJsonLd, webPageJsonLd } from "@/lib/seo";

const TITLE = "Free SaaS Tools | Somanath Studio";
const DESCRIPTION =
  "Free tools for founders scoping a SaaS MVP — starting with a cost and timeline calculator.";

export const metadata: Metadata = {
  title: TITLE,
  description: DESCRIPTION,
  alternates: { canonical: "/tools" },
  openGraph: {
    title: TITLE,
    description: DESCRIPTION,
    url: "/tools",
    type: "website",
    images: [{ url: "/og?title=Free%20SaaS%20Tools", width: 1200, height: 630 }],
  },
};

const TOOLS = [
  {
    href: "/tools/saas-mvp-cost-calculator",
    title: "SaaS MVP Cost Calculator",
    description:
      "Adjust scope, roles, billing, AI and launch quality to see a directional price and timeline range.",
    status: "Live" as const,
  },
];

export default function ToolsPage() {
  const schema = [
    webPageJsonLd({
      path: "/tools",
      name: TITLE,
      description: DESCRIPTION,
      type: "CollectionPage",
    }),
    breadcrumbJsonLd([
      { name: "Home", path: "/" },
      { name: "Tools", path: "/tools" },
    ]),
  ];

  return (
    <>
      <JsonLd data={schema} />
      <main className="min-h-screen bg-black text-foreground selection:bg-white/20">
        <Navbar />

        <section className="relative overflow-hidden border-b border-white/5 px-4 pb-16 pt-28 md:pb-20 md:pt-32">
          <div className="absolute inset-0 z-0 bg-grid-white pointer-events-none [mask-image:radial-gradient(ellipse_at_center,transparent_20%,black)]" />
          <div className="container relative z-10 mx-auto max-w-4xl text-center">
            <h1 className="text-4xl font-bold tracking-tighter text-white sm:text-5xl">
              Free Tools
            </h1>
            <p className="mx-auto mt-5 max-w-2xl text-lg text-zinc-400">
              Practical tools for scoping a SaaS MVP before you commit a budget.
            </p>
          </div>
        </section>

        <section className="px-4 py-16">
          <div className="container mx-auto max-w-5xl">
            <div className="grid gap-4 sm:grid-cols-2">
              {TOOLS.map((tool) => (
                <Link
                  key={tool.href}
                  href={tool.href}
                  className="group rounded-xl border border-white/10 bg-zinc-950/40 p-6 transition-colors hover:border-white/30"
                >
                  <span className="inline-flex items-center rounded-full border border-zinc-800 bg-zinc-900/50 px-2.5 py-0.5 text-xs text-zinc-400">
                    {tool.status}
                  </span>
                  <h2 className="mt-3 text-lg font-semibold text-white">{tool.title}</h2>
                  <p className="mt-2 text-sm text-zinc-400">{tool.description}</p>
                  <span className="mt-4 inline-flex items-center gap-1 text-sm font-medium text-white">
                    Open tool
                    <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
                  </span>
                </Link>
              ))}
            </div>
          </div>
        </section>

        <Footer />
        <ClientMobileNav />
      </main>
    </>
  );
}
