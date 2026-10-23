import type { Metadata } from "next";
import {
    getTemplateBySlug,
    getTemplateSlugs,
    getAllTemplates,
} from "@/lib/templates";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { TemplateCard } from "@/components/labs/TemplateCard";
import { TemplateFeatures } from "@/components/labs/TemplateFeatures";
import { JsonLd } from "@/components/JsonLd";
import { mdxComponents } from "@/components/MdxContent";
import {
    breadcrumbJsonLd,
    softwareSourceCodeJsonLd,
    webPageJsonLd,
} from "@/lib/seo";
import { MDXRemote } from "next-mdx-remote/rsc";
import Image from "next/image";
import Link from "next/link";
import { ArrowRight, Github, ExternalLink, Play } from "lucide-react";

function isExternalUrl(url?: string) {
    return Boolean(url && /^https?:\/\//i.test(url));
}

export function generateStaticParams() {
    return getTemplateSlugs().map((slug) => ({
        slug: slug.replace(/\.mdx$/, ""),
    }));
}

export async function generateMetadata({
    params,
}: {
    params: Promise<{ slug: string }>;
}): Promise<Metadata> {
    const { slug } = await params;
    const template = getTemplateBySlug(slug);
    const title =
        template.frontmatter.metaTitle ??
        `${template.frontmatter.title} | Somanath Studio`;

    return {
        title,
        description: template.frontmatter.description,
        alternates: { canonical: `/templates/${template.slug}` },
        keywords: [
            ...template.frontmatter.tags,
            ...template.frontmatter.stack,
        ],
        openGraph: {
            title,
            description: template.frontmatter.description,
            url: `/templates/${template.slug}`,
            siteName: "Somanath Studio",
            type: "article",
            images: template.frontmatter.shareImage
                ? [
                      {
                          url: template.frontmatter.shareImage,
                          width: 1200,
                          height: 630,
                          alt: template.frontmatter.title,
                      },
                  ]
                : undefined,
        },
        twitter: {
            card: "summary_large_image",
            title,
            description: template.frontmatter.description,
            images: template.frontmatter.shareImage
                ? [template.frontmatter.shareImage]
                : undefined,
        },
    };
}

export default async function TemplatePage({
    params,
}: {
    params: Promise<{ slug: string }>;
}) {
    const { slug } = await params;
    const template = getTemplateBySlug(slug);
    const { frontmatter, content } = template;

    const allTemplates = getAllTemplates();
    const related = allTemplates
        .filter((t) => t.slug !== template.slug)
        .slice(0, 2);

    const isLive = frontmatter.status === "live";
    const demoIsExternal = isExternalUrl(frontmatter.demoUrl);
    const shortName = frontmatter.title.split("—")[0].trim();

    const schema = [
        webPageJsonLd({
            path: `/templates/${template.slug}`,
            name: frontmatter.title,
            description: frontmatter.description,
        }),
        breadcrumbJsonLd([
            { name: "Home", path: "/" },
            { name: "Labs", path: "/labs" },
            { name: "Templates", path: "/templates" },
            {
                name: shortName,
                path: `/templates/${template.slug}`,
            },
        ]),
        softwareSourceCodeJsonLd({
            path: `/templates/${template.slug}`,
            name: frontmatter.title,
            description: frontmatter.description,
            codeRepository: frontmatter.githubUrl,
            programmingLanguage: frontmatter.stack,
            keywords: frontmatter.tags,
        }),
    ];

    const DemoButton = frontmatter.demoUrl ? (
        demoIsExternal ? (
            <a
                href={frontmatter.demoUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="group inline-flex items-center gap-2 rounded-full bg-white px-6 py-3 text-sm font-semibold text-black transition-all hover:-translate-y-0.5 hover:shadow-[0_12px_30px_-8px_rgba(129,140,248,0.4)]"
            >
                <Play className="h-4 w-4" />
                Live Demo
                <ExternalLink className="h-3.5 w-3.5 opacity-60" />
            </a>
        ) : (
            <Link
                href={frontmatter.demoUrl}
                className="group inline-flex items-center gap-2 rounded-full bg-white px-6 py-3 text-sm font-semibold text-black transition-all hover:-translate-y-0.5 hover:shadow-[0_12px_30px_-8px_rgba(129,140,248,0.4)]"
            >
                <Play className="h-4 w-4" />
                Live Demo
            </Link>
        )
    ) : null;

    return (
        <>
            <JsonLd data={schema} />
            <main className="min-h-screen bg-black text-white selection:bg-indigo-500/20">
                <Navbar />

                <div className="border-b border-white/5 pt-24">
                    <div className="mx-auto flex max-w-6xl items-center gap-2 px-6 py-4">
                        <Link
                            href="/labs"
                            className="font-mono text-[11px] uppercase tracking-[0.15em] text-indigo-400 transition-colors hover:text-indigo-300"
                        >
                            Labs
                        </Link>
                        <span className="text-zinc-700">/</span>
                        <Link
                            href="/templates"
                            className="font-mono text-[11px] uppercase tracking-[0.15em] text-zinc-500 transition-colors hover:text-white"
                        >
                            Templates
                        </Link>
                        <span className="text-zinc-700">/</span>
                        <span className="font-mono text-[11px] uppercase tracking-[0.15em] text-zinc-400">
                            {shortName}
                        </span>
                    </div>
                </div>

                {/* Hero */}
                <section className="border-b border-white/5 py-16 lg:py-24">
                    <div className="mx-auto max-w-6xl px-6">
                        <div className="grid gap-12 lg:grid-cols-2 lg:gap-20">
                            <div className="relative aspect-[16/10] overflow-hidden rounded-2xl border border-white/[0.06] bg-zinc-950">
                                {frontmatter.shareImage ? (
                                    <Image
                                        src={frontmatter.shareImage}
                                        alt={frontmatter.title}
                                        fill
                                        sizes="(max-width: 1024px) 100vw, 560px"
                                        className="object-cover object-top"
                                        priority
                                    />
                                ) : (
                                    <div className="absolute inset-0 bg-gradient-to-br from-indigo-500/10 via-zinc-950 to-violet-500/10" />
                                )}

                                <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/10 to-transparent" />

                                <div className="absolute inset-x-0 bottom-0 flex flex-wrap items-end justify-between gap-3 p-5">
                                    <div className="flex flex-wrap gap-2">
                                        {frontmatter.stack.slice(0, 3).map((tech) => (
                                            <span
                                                key={tech}
                                                className="rounded-md border border-white/10 bg-black/50 px-2.5 py-1 font-mono text-[10px] uppercase tracking-wider text-zinc-300 backdrop-blur-sm"
                                            >
                                                {tech}
                                            </span>
                                        ))}
                                    </div>
                                    {demoIsExternal && frontmatter.demoUrl ? (
                                        <a
                                            href={frontmatter.demoUrl}
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            className="inline-flex items-center gap-2 rounded-full bg-white px-4 py-2 text-xs font-semibold text-black transition-transform hover:-translate-y-0.5"
                                        >
                                            <Play className="h-3.5 w-3.5" />
                                            Open demo
                                            <ExternalLink className="h-3 w-3 opacity-60" />
                                        </a>
                                    ) : null}
                                </div>

                                <div className="absolute right-4 top-4 z-10">
                                    <span
                                        className={`inline-flex items-center rounded-full border px-3 py-1 font-mono text-[10px] uppercase tracking-wider backdrop-blur-md ${
                                            isLive
                                                ? "border-emerald-500/20 bg-black/50 text-emerald-400"
                                                : "border-amber-500/20 bg-black/50 text-amber-400"
                                        }`}
                                    >
                                        {isLive ? "Live" : "Coming Soon"}
                                    </span>
                                </div>
                            </div>

                            <div className="flex flex-col justify-center">
                                <div className="mb-4 flex items-center gap-3">
                                    <span className="font-mono text-[10px] uppercase tracking-[0.15em] text-indigo-400">
                                        {frontmatter.category}
                                    </span>
                                    <span className="h-px w-8 bg-white/10" />
                                    <span className="font-mono text-[10px] uppercase tracking-wider text-zinc-600">
                                        {frontmatter.difficulty}
                                    </span>
                                </div>

                                <h1 className="mb-4 text-3xl font-bold tracking-tight text-white lg:text-5xl">
                                    {frontmatter.title}
                                </h1>

                                <p className="mb-8 text-lg leading-relaxed text-zinc-400">
                                    {frontmatter.description}
                                </p>

                                <div className="flex flex-wrap gap-3">
                                    {DemoButton}
                                    {frontmatter.githubUrl && (
                                        <a
                                            href={frontmatter.githubUrl}
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            className="inline-flex items-center gap-2 rounded-full border border-white/10 px-6 py-3 text-sm font-medium text-zinc-300 transition-all hover:border-white/25 hover:text-white"
                                        >
                                            <Github className="h-4 w-4" />
                                            Source Code
                                        </a>
                                    )}
                                    <Link
                                        href="/contact"
                                        className="inline-flex items-center gap-2 rounded-full border border-indigo-500/30 bg-indigo-500/10 px-6 py-3 text-sm font-medium text-indigo-300 transition-all hover:bg-indigo-500/20 hover:text-indigo-200"
                                    >
                                        Customize for my business
                                    </Link>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>

                {/* Tech stack */}
                <section className="border-b border-white/5 py-16 lg:py-20">
                    <div className="mx-auto max-w-6xl px-6">
                        <p className="mb-3 font-mono text-[10px] uppercase tracking-[0.3em] text-zinc-600">
                            Tech stack
                        </p>
                        <h2 className="mb-8 text-2xl font-bold tracking-tight text-white lg:text-3xl">
                            Built with
                        </h2>
                        <div className="flex flex-wrap gap-3">
                            {frontmatter.stack.map((tech) => (
                                <span
                                    key={tech}
                                    className="inline-flex items-center rounded-full border border-white/10 bg-white/[0.03] px-4 py-2 font-mono text-sm text-zinc-300"
                                >
                                    {tech}
                                </span>
                            ))}
                        </div>
                        {frontmatter.tags.length > 0 && (
                            <div className="mt-8 flex flex-wrap gap-2">
                                {frontmatter.tags.map((tag) => (
                                    <span
                                        key={tag}
                                        className="font-mono text-[11px] uppercase tracking-wider text-zinc-600"
                                    >
                                        #{tag}
                                    </span>
                                ))}
                            </div>
                        )}
                    </div>
                </section>

                <TemplateFeatures features={frontmatter.features} />

                {/* Full write-up from MDX */}
                {content.trim() && (
                    <section className="border-b border-white/5 py-16 lg:py-24">
                        <div className="mx-auto max-w-3xl px-6">
                            <p className="mb-3 font-mono text-[10px] uppercase tracking-[0.3em] text-zinc-600">
                                Details
                            </p>
                            <h2 className="mb-10 text-2xl font-bold tracking-tight text-white lg:text-3xl">
                                Stack, structure &amp; scope
                            </h2>
                            <div className="template-prose">
                                <MDXRemote
                                    source={content}
                                    components={mdxComponents}
                                />
                            </div>
                        </div>
                    </section>
                )}

                {related.length > 0 && (
                    <section className="border-t border-white/5 py-16 lg:py-24">
                        <div className="mx-auto max-w-6xl px-6">
                            <h2 className="mb-12 text-2xl font-bold tracking-tight text-white">
                                More templates
                            </h2>
                            <div className="grid gap-8 md:grid-cols-2">
                                {related.map((t, i) => (
                                    <TemplateCard
                                        key={t.slug}
                                        slug={t.slug}
                                        frontmatter={t.frontmatter}
                                        index={i}
                                    />
                                ))}
                            </div>
                        </div>
                    </section>
                )}

                <section className="border-t border-white/5 py-24 text-center">
                    <div className="mx-auto max-w-2xl px-6">
                        <h2 className="mb-4 text-3xl font-bold tracking-tight text-white">
                            Want this customized for your brand?
                        </h2>
                        <p className="mb-8 text-zinc-500">
                            We take these starting points and build fully custom
                            3D web experiences, SaaS products, and interactive
                            brand showcases.
                        </p>
                        <div className="flex flex-wrap items-center justify-center gap-3">
                            {DemoButton}
                            <Link
                                href="/contact"
                                className="group inline-flex items-center gap-2 rounded-full border border-white/15 px-8 py-3.5 text-sm font-semibold text-white transition-all hover:border-white/30"
                            >
                                Talk to an Engineer
                                <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
                            </Link>
                        </div>
                    </div>
                </section>

                <Footer />
            </main>
        </>
    );
}
