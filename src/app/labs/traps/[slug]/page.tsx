import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft, ArrowRight, Github } from "lucide-react";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { JsonLd } from "@/components/JsonLd";
import { TrapReplay } from "@/components/labs/traps/TrapReplay";
import { TRAPS_REPO_URL, getAllTraps, getTrapBySlug } from "@/lib/traps";
import { breadcrumbJsonLd, softwareSourceCodeJsonLd, webPageJsonLd } from "@/lib/seo";

export function generateStaticParams() {
    return getAllTraps().map((trap) => ({ slug: trap.slug }));
}

export const dynamicParams = false;

const pad = (n: number) => String(n).padStart(2, "0");

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
    const { slug } = await params;
    const trap = getTrapBySlug(slug);
    if (!trap) return {};
    const title = `${trap.title}: Interview Trap ${pad(trap.number)} (Interactive Replay) | Somanath Studio Labs`;
    const description = `${trap.question} Replay a real recorded run step by step: the code, the database state, and why it breaks. ${trap.rule}`.slice(0, 158);
    const path = `/labs/traps/${trap.slug}`;
    const og = `/og?title=${encodeURIComponent(`Interview Trap ${pad(trap.number)}: ${trap.title}`)}`;
    return {
        title,
        description,
        alternates: { canonical: path },
        openGraph: { title: `${trap.title}: interactive replay`, description, url: path, siteName: "Somanath Studio", type: "article", images: [{ url: og, width: 1200, height: 630, alt: trap.title }] },
        twitter: { card: "summary_large_image", title: `${trap.title}: interactive replay`, description, images: [og] },
    };
}

export default async function TrapPage({ params }: { params: Promise<{ slug: string }> }) {
    const { slug } = await params;
    const trap = getTrapBySlug(slug);
    if (!trap) notFound();

    const all = getAllTraps();
    const next = all.find((t) => t.number > trap.number);
    const path = `/labs/traps/${trap.slug}`;
    const schema = [
        webPageJsonLd({ path, name: `${trap.title}: interactive replay`, description: trap.question }),
        breadcrumbJsonLd([
            { name: "Home", path: "/" },
            { name: "Labs", path: "/labs" },
            { name: "Interview traps", path: "/labs/traps" },
            { name: trap.title, path },
        ]),
        softwareSourceCodeJsonLd({
            path,
            name: `Interview trap ${pad(trap.number)}: ${trap.title}`,
            description: trap.why,
            codeRepository: trap.links.repo,
            programmingLanguage: ["TypeScript", "SQL"],
        }),
    ];

    return (
        <>
            <JsonLd data={schema} />
            <main className="min-h-screen bg-black text-white selection:bg-indigo-500/30">
                <Navbar />
                <div className="mx-auto max-w-6xl px-4 pb-24 pt-28 sm:px-6 md:pt-36">
                    <nav aria-label="Breadcrumb" className="mb-8">
                        <Link href="/labs/traps" className="inline-flex items-center gap-1.5 text-sm text-white/45 transition-colors hover:text-white">
                            <ArrowLeft size={14} /> Interview traps
                        </Link>
                    </nav>

                    <header className="mb-10 max-w-3xl">
                        <p className="mb-4 font-mono text-xs uppercase tracking-[0.2em] text-indigo-300">Interview trap {pad(trap.number)}</p>
                        <h1 className="font-[family-name:var(--font-labs-display)] text-4xl font-bold leading-[1.05] tracking-tight sm:text-6xl">
                            {trap.title}
                        </h1>
                        <p className="mt-5 text-lg leading-relaxed text-white/70 sm:text-xl">{trap.question}</p>
                    </header>

                    <TrapReplay trap={trap} />

                    <div className="mt-14 grid gap-4 md:grid-cols-2">
                        <div className="rounded-2xl border border-white/10 bg-white/[0.02] p-6">
                            <h2 className="mb-2 text-sm font-semibold uppercase tracking-[0.14em] text-rose-300">Why it breaks</h2>
                            <p className="leading-relaxed text-white/75">{trap.why}</p>
                        </div>
                        <div className="rounded-2xl border border-emerald-400/25 bg-emerald-400/[0.04] p-6">
                            <h2 className="mb-2 text-sm font-semibold uppercase tracking-[0.14em] text-emerald-300">The interview answer</h2>
                            <p className="leading-relaxed text-white/85">{trap.rule}</p>
                        </div>
                    </div>

                    <div className="mt-6 flex flex-col gap-5 rounded-2xl border border-white/10 bg-gradient-to-br from-indigo-500/10 to-transparent p-6 sm:flex-row sm:items-center sm:justify-between sm:p-8">
                        <div>
                            <h2 className="font-[family-name:var(--font-labs-display)] text-2xl font-semibold">Make it fail on your machine</h2>
                            <p className="mt-1 text-white/60">The proof fires 50 concurrent requests at a real Postgres. One command.</p>
                            <code className="mt-3 inline-block rounded-lg bg-black/60 px-3 py-1.5 font-mono text-sm text-white/80">npm run {pad(trap.number)}:bug</code>
                        </div>
                        <div className="flex shrink-0 flex-wrap gap-3">
                            <a href={trap.links.repo} target="_blank" rel="noopener" className="inline-flex items-center gap-2 rounded-full bg-white px-5 py-2.5 text-sm font-semibold text-black hover:bg-white/90">
                                <Github size={16} /> Get the code
                            </a>
                            <a href={TRAPS_REPO_URL} target="_blank" rel="noopener" className="inline-flex items-center gap-2 rounded-full border border-white/20 px-5 py-2.5 text-sm font-semibold text-white hover:bg-white/10">
                                ⭐ Star the repo
                            </a>
                            {trap.links.reel && (
                                <a href={trap.links.reel} target="_blank" rel="noopener" className="inline-flex items-center gap-2 rounded-full border border-white/20 px-5 py-2.5 text-sm font-semibold text-white hover:bg-white/10">
                                    Watch the reel
                                </a>
                            )}
                        </div>
                    </div>

                    {next && (
                        <Link href={`/labs/traps/${next.slug}`} className="group mt-6 flex items-center justify-between rounded-2xl border border-white/10 p-6 transition-colors hover:border-white/25">
                            <span>
                                <span className="block text-xs uppercase tracking-[0.14em] text-white/40">Next trap</span>
                                <span className="mt-1 block text-lg font-medium">{pad(next.number)} · {next.title}</span>
                            </span>
                            <ArrowRight className="transition-transform group-hover:translate-x-1" />
                        </Link>
                    )}
                </div>
                <Footer />
            </main>
        </>
    );
}
