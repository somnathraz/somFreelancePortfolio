import Link from "next/link";
import { ArrowLeft, ArrowRight, Github } from "lucide-react";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { JsonLd } from "@/components/JsonLd";
import { TrapLibraryNav } from "./TrapLibraryNav";
import { LiteYouTube } from "./LiteYouTube";
import { getTrapExtras } from "@/lib/trap-extras";
import type { CatalogueTopic } from "@/lib/trap-catalogue";
import type { DesignPageContent } from "@/lib/trap-designs";
import { TRAPS_REPO_URL } from "@/lib/traps";
import { breadcrumbJsonLd, webPageJsonLd } from "@/lib/seo";

/** A system-design day: the decision, the trade-offs, and the week it sets up. No replay. */
export function DesignPage({ design, topics }: { design: DesignPageContent; topics: CatalogueTopic[] }) {
    const path = `/labs/traps/${design.slug}`;
    const topic = topics.find((item) => item.entries.some((entry) => entry.slug === design.slug));
    const entries = topic?.entries ?? [];
    const next = entries[entries.findIndex((entry) => entry.slug === design.slug) + 1];
    const extras = getTrapExtras(design.slug);
    const youtubeReel = extras.reels?.find((reel) => reel.platform === "youtube" && reel.youtubeId);
    const instagramReel = extras.reels?.find((reel) => reel.platform === "instagram");
    const schema = [
        webPageJsonLd({ path, name: design.title, description: design.question }),
        breadcrumbJsonLd([
            { name: "Home", path: "/" },
            { name: "Labs", path: "/labs" },
            { name: "Interview traps", path: "/labs/traps" },
            { name: design.title, path },
        ]),
    ];

    return (
        <>
            <JsonLd data={schema} />
            <main className="min-h-screen bg-black text-white selection:bg-indigo-500/30">
                <Navbar />
                <div className="mx-auto grid max-w-[1536px] gap-8 px-4 pb-24 pt-24 sm:px-6 lg:grid-cols-[250px_minmax(0,1fr)] lg:gap-12 lg:px-8">
                    <TrapLibraryNav topics={topics} currentSlug={design.slug} />
                    <article id="trap-content" className="min-w-0 lg:py-6">
                        <nav aria-label="Breadcrumb" className="mb-8">
                            <Link href="/labs/traps" className="inline-flex items-center gap-1.5 text-sm text-white/45 transition-colors hover:text-white">
                                <ArrowLeft size={14} /> Interview traps
                            </Link>
                        </nav>

                        <header className="mb-10 max-w-3xl">
                            <p className="mb-4 font-mono text-xs uppercase tracking-[0.2em] text-indigo-300">
                                System design <span className="mx-2 text-white/25">/</span> {design.system}
                            </p>
                            <h1 className="font-[family-name:var(--font-labs-display)] text-4xl font-bold leading-[1.05] tracking-tight sm:text-6xl">{design.title}</h1>
                            <p className="mt-5 text-lg leading-relaxed text-white/70 sm:text-xl">{design.question}</p>
                            <p className="mt-4 text-sm text-white/45">This one is a design decision, not a bug, so there is no replay. The bugs come next.</p>
                        </header>

                        {youtubeReel?.youtubeId && (
                            <section id="watch" aria-labelledby="watch-title" className="mb-6 grid gap-6 rounded-2xl border border-white/10 bg-white/[0.02] p-6 sm:grid-cols-[minmax(0,1fr)_260px] sm:items-center sm:p-8">
                                <div>
                                    <h2 id="watch-title" className="font-[family-name:var(--font-labs-display)] text-2xl font-semibold">The short version</h2>
                                    <p className="mt-2 text-white/60">The two options and the answer, in a short reel.</p>
                                    <div className="mt-4 flex flex-wrap gap-3">
                                        <a href={youtubeReel.url} target="_blank" rel="noopener" className="inline-flex items-center rounded-full border border-white/20 px-4 py-2 text-sm font-semibold text-white hover:bg-white/10">Open on YouTube</a>
                                        {instagramReel && <a href={instagramReel.url} target="_blank" rel="noopener" className="inline-flex items-center rounded-full border border-white/20 px-4 py-2 text-sm font-semibold text-white hover:bg-white/10">Open on Instagram</a>}
                                    </div>
                                </div>
                                <div className="mx-auto aspect-[9/16] w-full max-w-[260px] overflow-hidden rounded-xl border border-white/10 bg-black">
                                    <LiteYouTube id={youtubeReel.youtubeId} title={`${design.title}: reel`} />
                                </div>
                            </section>
                        )}

                        <section aria-label="The two options" className="grid gap-4 md:grid-cols-2">
                            {design.options.map((option) => (
                                <div key={option.label} className="rounded-2xl border border-white/10 bg-white/[0.02] p-6">
                                    <h2 className="text-sm font-semibold uppercase tracking-[0.14em] text-indigo-300">{option.label}</h2>
                                    <pre className="mt-4 overflow-x-auto rounded-xl border border-white/10 bg-black/60 p-4 font-mono text-[13px] text-white/85 [scrollbar-color:#333_transparent] [scrollbar-width:thin]"><code>{option.code.join("\n")}</code></pre>
                                    <p className="mt-4 text-sm leading-relaxed text-emerald-300/90"><span className="font-semibold">Good: </span>{option.good}</p>
                                    <p className="mt-2 text-sm leading-relaxed text-rose-300/90"><span className="font-semibold">Cost: </span>{option.cost}</p>
                                </div>
                            ))}
                        </section>

                        <section className="mt-6 rounded-2xl border border-white/10 bg-white/[0.02] p-6">
                            <h2 className="mb-2 text-sm font-semibold uppercase tracking-[0.14em] text-amber-300">{design.secondSignal.title}</h2>
                            <p className="leading-relaxed text-white/75">{design.secondSignal.body}</p>
                        </section>

                        <section className="mt-6 rounded-2xl border border-emerald-400/25 bg-emerald-400/[0.04] p-6">
                            <h2 className="mb-2 text-sm font-semibold uppercase tracking-[0.14em] text-emerald-300">The interview answer</h2>
                            <p className="leading-relaxed text-white/85">{design.rule}</p>
                        </section>

                        <section aria-labelledby="week-title" className="mt-6 rounded-2xl border border-white/10 bg-white/[0.02] p-6 sm:p-8">
                            <h2 id="week-title" className="mb-1 font-[family-name:var(--font-labs-display)] text-2xl font-semibold">The series</h2>
                            <p className="mb-5 text-white/55">This sets the design. The traps after it break it.</p>
                            <ol className="divide-y divide-white/10">
                                {design.week.map((item) => (
                                    <li key={item.day} className={`grid gap-1 py-3 sm:grid-cols-[64px_minmax(0,2fr)_minmax(0,3fr)] sm:gap-6 ${item.day === design.day ? "text-white" : "text-white/60"}`}>
                                        <span className="font-mono text-sm text-indigo-200">{String(item.day).padStart(2, "0")}</span>
                                        <span className="font-medium">{item.title}</span>
                                        <span className="text-sm">{item.summary}</span>
                                    </li>
                                ))}
                            </ol>
                        </section>

                        <div className="mt-6 flex flex-col gap-5 rounded-2xl border border-white/10 bg-gradient-to-br from-indigo-500/10 to-transparent p-6 sm:flex-row sm:items-center sm:justify-between sm:p-8">
                            <div>
                                <h2 className="font-[family-name:var(--font-labs-display)] text-2xl font-semibold">Follow the series</h2>
                                <p className="mt-1 text-white/60">Each bug lands as a runnable trap with a replay here.</p>
                            </div>
                            <div className="flex shrink-0 flex-wrap gap-3">
                                <a href={`${TRAPS_REPO_URL}/tree/main/${design.sourcePath}`} target="_blank" rel="noopener" className="inline-flex items-center gap-2 rounded-full bg-white px-5 py-2.5 text-sm font-semibold text-black hover:bg-white/90">
                                    <Github size={16} /> Design notes
                                </a>
                                <a href={TRAPS_REPO_URL} target="_blank" rel="noopener" className="inline-flex items-center gap-2 rounded-full border border-white/20 px-5 py-2.5 text-sm font-semibold text-white hover:bg-white/10">
                                    ⭐ Star the repo
                                </a>
                            </div>
                        </div>

                        {next && (
                            <div className="mt-6 flex items-center justify-between gap-4 rounded-2xl border border-dashed border-white/10 p-6 text-white/55">
                                <span>
                                    <span className="block text-xs uppercase tracking-[0.14em]">Next · coming soon</span>
                                    <span className="mt-1 block text-lg font-medium text-white/80">{next.title}</span>
                                    <span className="mt-1 block text-sm">{next.question}</span>
                                </span>
                                <ArrowRight className="shrink-0" aria-hidden="true" />
                            </div>
                        )}
                    </article>
                </div>
                <Footer />
            </main>
        </>
    );
}
