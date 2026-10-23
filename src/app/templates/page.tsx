import type { Metadata } from "next";
import { getAllTemplates } from "@/lib/templates";
import { TemplateCard } from "@/components/labs/TemplateCard";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { JsonLd } from "@/components/JsonLd";
import {
    TEMPLATES_KEYWORDS,
    breadcrumbJsonLd,
    itemListJsonLd,
    webPageJsonLd,
} from "@/lib/seo";
import Link from "next/link";
import { ArrowRight } from "lucide-react";

const TITLE =
    "Free Website Templates — 3D Product Showcases & Animated Landing Pages | Somanath Studio";
const DESCRIPTION =
    "Free website templates for startups and brands — 3D product showcases, animated agency portfolios, and interactive landing pages. Built with Next.js and WebGL; open-source and ready to customize.";

export const metadata: Metadata = {
    title: TITLE,
    description: DESCRIPTION,
    alternates: { canonical: "/templates" },
    keywords: [...TEMPLATES_KEYWORDS],
    openGraph: {
        title: "Free Website Templates — 3D Showcases & Animated Landing Pages",
        description: DESCRIPTION,
        url: "/templates",
        siteName: "Somanath Studio",
        type: "website",
        images: [
            {
                url: "/og?title=Free%20Next.js%20WebGL%20Templates",
                width: 1200,
                height: 630,
                alt: "Free Next.js WebGL templates from Somanath Studio",
            },
        ],
    },
    twitter: {
        card: "summary_large_image",
        title: "Free Website Templates — 3D Showcases & Animated Landing Pages",
        description: DESCRIPTION,
    },
    robots: { index: true, follow: true },
};

export default function TemplatesPage() {
    const templates = getAllTemplates();

    const schema = [
        webPageJsonLd({
            path: "/templates",
            name: "Free Next.js Templates",
            description: DESCRIPTION,
            type: "CollectionPage",
        }),
        breadcrumbJsonLd([
            { name: "Home", path: "/" },
            { name: "Labs", path: "/labs" },
            { name: "Templates", path: "/templates" },
        ]),
        itemListJsonLd({
            path: "/templates",
            name: "Free Next.js WebGL templates",
            description: DESCRIPTION,
            items: templates.map((t) => ({
                name: t.frontmatter.title,
                path: `/templates/${t.slug}`,
                description: t.frontmatter.description,
            })),
        }),
    ];

    const categories = [
        ...new Set(templates.map((t) => t.frontmatter.category)),
    ];

    return (
        <>
            <JsonLd data={schema} />
            <main className="min-h-screen bg-black text-white selection:bg-indigo-500/20">
            <Navbar />

            {/* Hero */}
            <section className="relative border-b border-white/5 pb-16 pt-32 lg:pt-40">
                <div className="pointer-events-none absolute inset-0">
                    <div className="absolute left-1/3 top-1/3 h-[30rem] w-[30rem] rounded-full bg-indigo-500/[0.03] blur-[120px]" />
                </div>

                <div className="relative z-10 mx-auto max-w-6xl px-6">
                    <div className="mb-4 flex items-center gap-3">
                        <Link
                            href="/labs"
                            className="font-mono text-[11px] uppercase tracking-[0.2em] text-indigo-400 transition-colors hover:text-indigo-300"
                        >
                            Labs
                        </Link>
                        <span className="text-zinc-700">/</span>
                        <span className="font-mono text-[11px] uppercase tracking-[0.2em] text-zinc-500">
                            Templates
                        </span>
                    </div>

                    <h1 className="mb-4 text-4xl font-bold tracking-tight text-white lg:text-6xl">
                        Free templates
                    </h1>
                    <p className="max-w-2xl text-lg leading-relaxed text-zinc-500">
                        Production-ready Next.js templates with WebGL, Three.js,
                        and cinematic scroll animations. Open-source, free to
                        use, built to customize.
                    </p>

                    {/* Category filters */}
                    <div className="mt-8 flex flex-wrap gap-2">
                        <span className="inline-flex rounded-full border border-white/15 bg-white/5 px-4 py-1.5 font-mono text-[10px] uppercase tracking-wider text-white">
                            All ({templates.length})
                        </span>
                        {categories.map((cat) => (
                            <span
                                key={cat}
                                className="inline-flex rounded-full border border-white/5 px-4 py-1.5 font-mono text-[10px] uppercase tracking-wider text-zinc-500 transition-colors hover:border-white/15 hover:text-white cursor-pointer"
                            >
                                {cat} (
                                {
                                    templates.filter(
                                        (t) => t.frontmatter.category === cat
                                    ).length
                                }
                                )
                            </span>
                        ))}
                    </div>
                </div>
            </section>

            {/* Grid */}
            <section className="py-16 lg:py-24">
                <div className="mx-auto max-w-6xl px-6">
                    <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
                        {templates.map((template, i) => (
                            <TemplateCard
                                key={template.slug}
                                slug={template.slug}
                                frontmatter={template.frontmatter}
                                index={i}
                            />
                        ))}
                    </div>

                    {templates.length === 0 && (
                        <div className="py-32 text-center">
                            <p className="text-zinc-600">
                                No templates yet. Check back soon.
                            </p>
                        </div>
                    )}
                </div>
            </section>

            {/* CTA */}
            <section className="border-t border-white/5 py-24 text-center">
                <div className="mx-auto max-w-2xl px-6">
                    <h2 className="mb-4 text-3xl font-bold tracking-tight text-white">
                        Need something bespoke?
                    </h2>
                    <p className="mb-8 text-zinc-500">
                        We design and build custom 3D web experiences, SaaS
                        products, and interactive brand showcases.
                    </p>
                    <Link
                        href="/contact"
                        className="group inline-flex items-center gap-2 rounded-full bg-white px-8 py-3.5 text-sm font-semibold text-black transition-all hover:-translate-y-0.5 hover:shadow-[0_16px_40px_-8px_rgba(129,140,248,0.4)]"
                    >
                        Talk to an Engineer
                        <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
                    </Link>
                </div>
            </section>

            <Footer />
        </main>
        </>
    );
}
