import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft, ArrowRight, Github } from "lucide-react";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { JsonLd } from "@/components/JsonLd";
import { TrapLibraryNav } from "@/components/labs/traps/TrapLibraryNav";
import { buildTrapCatalogue } from "@/lib/trap-catalogue";
import { TrapExperience } from "@/components/labs/traps/TrapExperience";
import { LiteYouTube } from "@/components/labs/traps/LiteYouTube";
import { TRAPS_REPO_URL, getAllTraps, getTrapBySlug } from "@/lib/traps";
import { getTrapExtras } from "@/lib/trap-extras";
import { DesignPage } from "@/components/labs/traps/DesignPage";
import { getStandaloneLinks } from "@/lib/library-nav";
import { getAllDesigns, getDesignBySlug } from "@/lib/trap-designs";
import { breadcrumbJsonLd, softwareSourceCodeJsonLd, webPageJsonLd } from "@/lib/seo";

export function generateStaticParams() {
    return [...getAllTraps().map((trap) => trap.slug), ...getAllDesigns().map((design) => design.slug)].map((slug) => ({ slug }));
}

export const dynamicParams = false;

const pad = (n: number) => String(n).padStart(2, "0");

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
    const { slug } = await params;
    const design = getDesignBySlug(slug);
    if (design) {
        const description = `${design.question} ${design.rule}`.slice(0, 158);
        const path = `/labs/traps/${design.slug}`;
        const og = `/og?title=${encodeURIComponent(design.title)}`;
        const title = `${design.title}: ${design.system} | Somanath Studio Labs`;
        return {
            title,
            description,
            alternates: { canonical: path },
            openGraph: { title: design.title, description, url: path, siteName: "Somanath Studio", type: "article", images: [{ url: og, width: 1200, height: 630, alt: design.title }] },
            twitter: { card: "summary_large_image", title: design.title, description, images: [og] },
        };
    }
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
    const design = getDesignBySlug(slug);
    if (design) return <DesignPage design={design} />;
    const trap = getTrapBySlug(slug);
    if (!trap) notFound();

    const all = getAllTraps();
    const topics = buildTrapCatalogue(all);
    const topic = topics.find((item) => item.entries.some((entry) => entry.slug === slug));
    const extras = getTrapExtras(slug);
    const youtubeReel = extras.reels?.find((reel) => reel.platform === "youtube" && reel.youtubeId);
    const instagramReel = extras.reels?.find((reel) => reel.platform === "instagram");
    const reelUrl = trap.links.reel ?? youtubeReel?.url ?? instagramReel?.url;
    // Previous and next follow the topic order but skip traps that are not published yet.
    const topicEntries = (topic?.entries ?? []).filter((entry) => entry.published);
    const at = topicEntries.findIndex((entry) => entry.slug === slug);
    const prevEntry = at > 0 ? topicEntries[at - 1] : undefined;
    const nextEntry = at >= 0 ? topicEntries[at + 1] : undefined;
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
                <div className="mx-auto grid max-w-[1536px] gap-8 px-4 pb-24 pt-24 sm:px-6 lg:grid-cols-[250px_minmax(0,1fr)] lg:gap-12 lg:px-8">
                    <TrapLibraryNav currentHref={`/labs/traps/${slug}`} standalone={getStandaloneLinks()} />
                    <article id="trap-content" className="min-w-0 lg:py-6">
                    <nav aria-label="Breadcrumb" className="mb-8">
                        <Link href="/labs/traps" className="inline-flex items-center gap-1.5 text-sm text-white/45 transition-colors hover:text-white">
                            <ArrowLeft size={14} /> Interview traps
                        </Link>
                    </nav>

                    <header className="mb-10 max-w-3xl">
                        <p className="mb-4 font-mono text-xs uppercase tracking-[0.2em] text-indigo-300">{topic?.title} <span className="mx-2 text-white/25">/</span> Trap {pad(trap.number)}{extras.series && <><span className="mx-2 text-white/25">·</span>{extras.series} series</>}</p>
                        <h1 className="font-[family-name:var(--font-labs-display)] text-4xl font-bold leading-[1.05] tracking-tight sm:text-6xl">
                            {trap.title}
                        </h1>
                        <p className="mt-5 text-lg leading-relaxed text-white/70 sm:text-xl">{trap.question}</p>
                    </header>

                    <nav aria-label="On this page" className="mb-8 flex flex-wrap gap-x-6 gap-y-3 border-y border-white/10 py-4 text-sm text-white/60">
                        <a href="#replay" className="hover:text-indigo-300">Replay</a>
                        <a href="#why-it-breaks" className="hover:text-indigo-300">Why it breaks</a>
                        <a href="#interview-answer" className="hover:text-indigo-300">The interview answer</a>
                        {extras.otherFixes && <a href="#other-fixes" className="hover:text-indigo-300">Other fixes</a>}
                        {youtubeReel && <a href="#watch" className="hover:text-indigo-300">Watch the reel</a>}
                        <a href="#source-code" className="hover:text-indigo-300">Source code</a>
                    </nav>
                    <section id="replay" aria-label="Interactive replay" className="scroll-mt-24">
                        <TrapExperience trap={trap} />
                    </section>

                    <div className="mt-14 grid gap-4 md:grid-cols-2">
                        <div id="why-it-breaks" className="scroll-mt-24 rounded-2xl border border-white/10 bg-white/[0.02] p-6">
                            <h2 className="mb-2 text-sm font-semibold uppercase tracking-[0.14em] text-rose-300">Why it breaks</h2>
                            <p className="leading-relaxed text-white/75">{trap.why}</p>
                        </div>
                        <div id="interview-answer" className="scroll-mt-24 rounded-2xl border border-emerald-400/25 bg-emerald-400/[0.04] p-6">
                            <h2 className="mb-2 text-sm font-semibold uppercase tracking-[0.14em] text-emerald-300">The interview answer</h2>
                            <p className="leading-relaxed text-white/85">{trap.rule}</p>
                        </div>
                    </div>

                    {extras.otherFixes && (
                        <section id="other-fixes" aria-labelledby="other-fixes-title" className="scroll-mt-24 mt-6 rounded-2xl border border-white/10 bg-white/[0.02] p-6 sm:p-8">
                            <h2 id="other-fixes-title" className="mb-1 font-[family-name:var(--font-labs-display)] text-2xl font-semibold">Other fixes interviewers accept</h2>
                            <p className="mb-5 text-white/55">Same problem, different trade-offs. Pick by situation.</p>
                            <dl className="divide-y divide-white/10">
                                {extras.otherFixes.map((fix) => (
                                    <div key={fix.approach} className="grid gap-1 py-3 sm:grid-cols-[minmax(0,2fr)_minmax(0,3fr)] sm:gap-6">
                                        <dt className="font-mono text-sm text-indigo-200">{fix.approach}</dt>
                                        <dd className="text-white/70">{fix.when}</dd>
                                    </div>
                                ))}
                            </dl>
                        </section>
                    )}

                    {youtubeReel?.youtubeId && (
                        <section id="watch" aria-labelledby="watch-title" className="scroll-mt-24 mt-6 grid gap-6 rounded-2xl border border-white/10 bg-white/[0.02] p-6 sm:grid-cols-[minmax(0,1fr)_260px] sm:items-center sm:p-8">
                            <div>
                                <h2 id="watch-title" className="font-[family-name:var(--font-labs-display)] text-2xl font-semibold">The 70-second version</h2>
                                <p className="mt-2 text-white/60">The same trap as a short reel: the broken code, the fix, and the interview rule.</p>
                                <div className="mt-4 flex flex-wrap gap-3">
                                    <a href={youtubeReel.url} target="_blank" rel="noopener" className="inline-flex items-center rounded-full border border-white/20 px-4 py-2 text-sm font-semibold text-white hover:bg-white/10">Open on YouTube</a>
                                    {instagramReel && <a href={instagramReel.url} target="_blank" rel="noopener" className="inline-flex items-center rounded-full border border-white/20 px-4 py-2 text-sm font-semibold text-white hover:bg-white/10">Open on Instagram</a>}
                                </div>
                            </div>
                            <div className="mx-auto aspect-[9/16] w-full max-w-[260px] overflow-hidden rounded-xl border border-white/10 bg-black">
                                <LiteYouTube id={youtubeReel.youtubeId} title={`${trap.title}: reel`} />
                            </div>
                        </section>
                    )}

                    <div id="source-code" className="scroll-mt-24 mt-6 flex flex-col gap-5 rounded-2xl border border-white/10 bg-gradient-to-br from-indigo-500/10 to-transparent p-6 sm:flex-row sm:items-center sm:justify-between sm:p-8">
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
                            {reelUrl && (
                                <a href={reelUrl} target="_blank" rel="noopener" className="inline-flex items-center gap-2 rounded-full border border-white/20 px-5 py-2.5 text-sm font-semibold text-white hover:bg-white/10">
                                    Watch the reel
                                </a>
                            )}
                        </div>
                    </div>

                    {(prevEntry || nextEntry) && (
                        <nav aria-label="More traps in this topic" className="mt-6 grid gap-4 sm:grid-cols-2">
                            {prevEntry ? (
                                prevEntry.published ? (
                                    <Link href={`/labs/traps/${prevEntry.slug}`} className="group flex items-center gap-4 rounded-2xl border border-white/10 p-6 transition-colors hover:border-white/25">
                                        <ArrowLeft className="shrink-0 transition-transform group-hover:-translate-x-1" />
                                        <span>
                                            <span className="block text-xs uppercase tracking-[0.14em] text-white/40">Previous trap</span>
                                            <span className="mt-1 block text-lg font-medium">{prevEntry.title}</span>
                                        </span>
                                    </Link>
                                ) : (
                                    <div className="rounded-2xl border border-dashed border-white/10 p-6 text-white/45">
                                        <span className="block text-xs uppercase tracking-[0.14em]">Previous trap · coming soon</span>
                                        <span className="mt-1 block text-lg font-medium">{prevEntry.title}</span>
                                    </div>
                                )
                            ) : <span aria-hidden="true" />}
                            {nextEntry && (
                                nextEntry.published ? (
                                    <Link href={`/labs/traps/${nextEntry.slug}`} className="group flex items-center justify-between gap-4 rounded-2xl border border-white/10 p-6 transition-colors hover:border-white/25">
                                        <span>
                                            <span className="block text-xs uppercase tracking-[0.14em] text-white/40">Next trap</span>
                                            <span className="mt-1 block text-lg font-medium">{nextEntry.title}</span>
                                        </span>
                                        <ArrowRight className="shrink-0 transition-transform group-hover:translate-x-1" />
                                    </Link>
                                ) : (
                                    <div className="rounded-2xl border border-dashed border-white/10 p-6 text-white/45">
                                        <span className="block text-xs uppercase tracking-[0.14em]">Next trap · coming soon</span>
                                        <span className="mt-1 block text-lg font-medium">{nextEntry.title}</span>
                                        <span className="mt-1 block text-sm">{nextEntry.question}</span>
                                    </div>
                                )
                            )}
                        </nav>
                    )}
                    </article>
                </div>
                <Footer />
            </main>
        </>
    );
}
