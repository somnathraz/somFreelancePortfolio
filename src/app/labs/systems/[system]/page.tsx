import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft, ArrowRight, BookOpen, Github, Hammer, Play, Zap } from "lucide-react";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { JsonLd } from "@/components/JsonLd";
import { TrapLibraryNav } from "@/components/labs/traps/TrapLibraryNav";
import { getStandaloneLinks } from "@/lib/library-nav";
import { DIFFICULTY_COLORS, getAllTracks, getTrack, liveStepCount, type StepKind } from "@/lib/systems";
import { TRAPS_REPO_URL } from "@/lib/traps";
import { breadcrumbJsonLd, itemListJsonLd, webPageJsonLd } from "@/lib/seo";

export function generateStaticParams() {
    return getAllTracks().map((track) => ({ system: track.id }));
}

export const dynamicParams = false;

export async function generateMetadata({ params }: { params: Promise<{ system: string }> }): Promise<Metadata> {
    const track = getTrack((await params).system);
    if (!track) return {};
    const path = `/labs/systems/${track.id}`;
    const og = `/og?title=${encodeURIComponent(track.title)}`;
    return {
        title: `${track.title}: learn it, break it, build it | Somanath Studio Labs`,
        description: `${track.tagline} A step-by-step system design track with interactive bugs.`,
        alternates: { canonical: path },
        openGraph: { title: track.title, description: track.tagline, url: path, siteName: "Somanath Studio", type: "website", images: [{ url: og, width: 1200, height: 630, alt: track.title }] },
        twitter: { card: "summary_large_image", title: track.title, description: track.tagline, images: [og] },
    };
}

const KIND: Record<StepKind, { label: string; color: string; Icon: typeof BookOpen }> = {
    learn: { label: "Learn", color: "#a5b4fc", Icon: BookOpen },
    trap: { label: "Trap", color: "#fb7185", Icon: Zap },
    build: { label: "Build", color: "#34d399", Icon: Hammer },
};

export default async function TrackPage({ params }: { params: Promise<{ system: string }> }) {
    const track = getTrack((await params).system);
    if (!track) notFound();
    const path = `/labs/systems/${track.id}`;
    const live = liveStepCount(track);
    const first = track.steps.find((step) => step.href);
    const schema = [
        webPageJsonLd({ path, name: track.title, description: track.tagline }),
        breadcrumbJsonLd([
            { name: "Home", path: "/" },
            { name: "Labs", path: "/labs" },
            { name: "Interview traps", path: "/labs/traps" },
            { name: track.name, path },
        ]),
        itemListJsonLd({
            path,
            name: track.title,
            description: track.tagline,
            items: track.steps.filter((step) => step.href && !step.href.includes("#")).map((step) => ({ name: step.title, path: step.href!, description: step.summary })),
        }),
    ];

    return (
        <>
            <JsonLd data={schema} />
            <main className="min-h-screen bg-black text-white selection:bg-indigo-500/30">
                <Navbar />
                <div className="mx-auto grid max-w-[1536px] gap-8 px-4 pb-24 pt-24 sm:px-6 lg:grid-cols-[250px_minmax(0,1fr)] lg:gap-12 lg:px-8">
                    <TrapLibraryNav currentHref={path} standalone={getStandaloneLinks()} />
                    <article className="min-w-0 lg:py-6">
                        <Link href="/labs/traps" className="mb-8 inline-flex items-center gap-1.5 text-sm text-white/45 transition-colors hover:text-white"><ArrowLeft size={14} /> Interview traps</Link>

                        <header className="max-w-3xl">
                            <p className="mb-4 font-mono text-xs uppercase tracking-[0.2em] text-indigo-300">World {track.world} <span className="mx-2 text-white/25">/</span><span style={{ color: DIFFICULTY_COLORS[track.difficulty] }}>{track.difficulty}</span> <span className="mx-2 text-white/25">/</span>System design</p>
                            <h1 className="font-[family-name:var(--font-labs-display)] text-4xl font-bold leading-[1.05] tracking-tight sm:text-6xl">{track.title}</h1>
                            <p className="mt-5 text-lg leading-relaxed text-white/70 sm:text-xl">{track.tagline}</p>
                            <div className="mt-7 flex flex-wrap items-center gap-x-6 gap-y-3">
                                {first && <Link href={first.href!} className="inline-flex items-center gap-2 rounded-full bg-white px-5 py-2.5 text-sm font-semibold text-black hover:bg-white/90">Start world {track.world} <ArrowRight size={15} aria-hidden="true" /></Link>}
                                <span className="text-sm text-white/50"><span className="text-white">{track.steps.length}</span> steps <span className="mx-2 text-white/25">/</span> <span className="text-white">{live}</span> ready now</span>
                            </div>
                        </header>

                        <section aria-labelledby="path-title" className="mt-14">
                            <h2 id="path-title" className="mb-2 font-[family-name:var(--font-labs-display)] text-2xl font-semibold">The path</h2>
                            <p className="mb-6 text-white/55">Learn the design first. Then each trap breaks one part of it. Last, you build the whole thing yourself.</p>
                            <ol className="relative space-y-3 before:absolute before:bottom-6 before:left-[19px] before:top-6 before:w-px before:bg-white/10">
                                {track.steps.map((step, i) => {
                                    const kind = KIND[step.kind];
                                    const body = (
                                        <>
                                            <span className="relative z-10 grid h-10 w-10 shrink-0 place-items-center rounded-full border font-mono text-sm font-semibold" style={step.href ? { borderColor: kind.color, color: kind.color, background: "#000" } : { borderColor: "rgba(255,255,255,0.12)", color: "rgba(255,255,255,0.35)", background: "#000" }}>{i + 1}</span>
                                            <span className="min-w-0 flex-1">
                                                <span className="inline-flex items-center gap-1.5 text-[11px] font-semibold uppercase tracking-[0.14em]" style={{ color: step.href ? kind.color : "rgba(255,255,255,0.35)" }}><kind.Icon size={12} aria-hidden="true" /> {kind.label}</span>
                                                <span className={`mt-1 block text-lg font-semibold ${step.href ? "text-white group-hover:text-indigo-200" : "text-white/50"}`}>{step.title}</span>
                                                <span className={`mt-1 block text-sm leading-relaxed ${step.href ? "text-white/60" : "text-white/35"}`}>{step.summary}</span>
                                            </span>
                                            <span className="hidden shrink-0 items-center gap-2 self-center text-sm sm:flex">
                                                {step.href ? (
                                                    <span className="inline-flex items-center gap-1.5 font-semibold text-indigo-300">{step.format === "play" ? <><Play size={14} aria-hidden="true" /> Play</> : "Read"} <ArrowRight size={15} aria-hidden="true" className="transition-transform group-hover:translate-x-1 motion-reduce:transition-none" /></span>
                                                ) : <span className="text-white/35">In progress</span>}
                                            </span>
                                        </>
                                    );
                                    return (
                                        <li key={step.id}>
                                            {step.href ? (
                                                <Link href={step.href} className="group flex gap-4 rounded-2xl border border-white/10 bg-white/[0.02] p-4 transition-colors hover:border-white/25 sm:p-5">{body}</Link>
                                            ) : (
                                                <div className="flex gap-4 rounded-2xl border border-dashed border-white/10 p-4 sm:p-5">{body}</div>
                                            )}
                                        </li>
                                    );
                                })}
                            </ol>
                        </section>

                        <section id="requirements" aria-labelledby="requirements-title" className="mt-14 scroll-mt-24 rounded-2xl border border-white/10 bg-white/[0.02] p-6 sm:p-8">
                            <p className="mb-2 font-mono text-xs uppercase tracking-[0.2em] text-indigo-300">Step 1</p>
                            <h2 id="requirements-title" className="font-[family-name:var(--font-labs-display)] text-2xl font-semibold">What we are building</h2>
                            <p className="mt-2 text-white/60">Every decision later in the track comes back to these. Say them out loud first in an interview.</p>
                            <div className="mt-6 grid gap-8 lg:grid-cols-2">
                                <div>
                                    <h3 className="mb-3 text-sm font-semibold uppercase tracking-[0.14em] text-white/45">It must</h3>
                                    <ul className="space-y-2.5">
                                        {track.requirements.functional.map((item) => <li key={item} className="flex gap-3 text-white/80"><span aria-hidden="true" className="mt-2.5 h-1.5 w-1.5 shrink-0 rounded-full bg-indigo-300" />{item}</li>)}
                                    </ul>
                                </div>
                                <div>
                                    <h3 className="mb-3 text-sm font-semibold uppercase tracking-[0.14em] text-white/45">At this scale</h3>
                                    <dl className="grid grid-cols-2 gap-3">
                                        {track.requirements.scale.map((item) => (
                                            <div key={item.label} className="rounded-xl border border-white/10 p-4">
                                                <dt className="text-xs text-white/45">{item.label}</dt>
                                                <dd className="mt-1 font-mono text-lg font-semibold text-white">{item.value}</dd>
                                                <dd className="mt-1 text-xs text-white/45">{item.note}</dd>
                                            </div>
                                        ))}
                                    </dl>
                                </div>
                            </div>
                            <p className="mt-6 rounded-xl border border-amber-300/20 bg-amber-300/[0.04] p-4 text-sm text-white/75"><span className="font-semibold text-amber-200">The number that shapes everything:</span> 100 reads for every write. Optimise the redirect first.</p>
                            {track.steps[1]?.href && <Link href={track.steps[1].href} className="mt-6 inline-flex items-center gap-2 text-sm font-semibold text-indigo-300 hover:text-indigo-200">Next: {track.steps[1].title} <ArrowRight size={15} aria-hidden="true" /></Link>}
                        </section>

                        <div className="mt-6 flex flex-col gap-5 rounded-2xl border border-white/10 bg-gradient-to-br from-indigo-500/10 to-transparent p-6 sm:flex-row sm:items-center sm:justify-between sm:p-8">
                            <div>
                                <h2 className="font-[family-name:var(--font-labs-display)] text-2xl font-semibold">Run every bug yourself</h2>
                                <p className="mt-1 text-white/60">Each trap is runnable code against a real Postgres in the repo.</p>
                            </div>
                            <div className="flex shrink-0 flex-wrap gap-3">
                                <a href={`${TRAPS_REPO_URL}/tree/main/${track.repoPath}`} target="_blank" rel="noopener" className="inline-flex items-center gap-2 rounded-full bg-white px-5 py-2.5 text-sm font-semibold text-black hover:bg-white/90"><Github size={16} /> Track source</a>
                                <a href={TRAPS_REPO_URL} target="_blank" rel="noopener" className="inline-flex items-center gap-2 rounded-full border border-white/20 px-5 py-2.5 text-sm font-semibold text-white hover:bg-white/10">⭐ Star the repo</a>
                            </div>
                        </div>
                    </article>
                </div>
                <Footer />
            </main>
        </>
    );
}
