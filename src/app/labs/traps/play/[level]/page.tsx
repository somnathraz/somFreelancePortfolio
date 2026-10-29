import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft, ArrowRight } from "lucide-react";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { JsonLd } from "@/components/JsonLd";
import { BreakTheBackend } from "@/components/labs/traps/game/BreakTheBackend";
import { LEVELS, getLevel } from "@/lib/trap-game/levels";
import { getAllTraps } from "@/lib/traps";
import { findTrackStep, nextLiveStep } from "@/lib/systems";
import { breadcrumbJsonLd, webPageJsonLd } from "@/lib/seo";

export function generateStaticParams() {
    return LEVELS.map((level) => ({ level: level.id }));
}

export const dynamicParams = false;

export async function generateMetadata({ params }: { params: Promise<{ level: string }> }): Promise<Metadata> {
    const level = getLevel((await params).level);
    if (!level) return {};
    const path = `/labs/traps/play/${level.id}`;
    const description = `${level.story} Step the requests in any order and break it, then patch it.`.slice(0, 158);
    const og = `/og?title=${encodeURIComponent(`Break the Backend: ${level.title}`)}`;
    return {
        title: `${level.title}: Break the Backend (Level ${level.number}) | Somanath Studio Labs`,
        description,
        alternates: { canonical: path },
        openGraph: { title: `Break the Backend: ${level.title}`, description, url: path, siteName: "Somanath Studio", type: "website", images: [{ url: og, width: 1200, height: 630, alt: level.title }] },
        twitter: { card: "summary_large_image", title: `Break the Backend: ${level.title}`, description, images: [og] },
    };
}

export default async function PlayLevelPage({ params }: { params: Promise<{ level: string }> }) {
    const level = getLevel((await params).level);
    if (!level) notFound();
    const path = `/labs/traps/play/${level.id}`;
    // Levels that are a step in a track lead back into it.
    const inTrack = findTrackStep(path);
    const nextStep = inTrack ? nextLiveStep(inTrack.track, inTrack.index) : undefined;
    const schema = [
        webPageJsonLd({ path, name: `Break the Backend: ${level.title}`, description: level.story }),
        breadcrumbJsonLd([
            { name: "Home", path: "/" },
            { name: "Labs", path: "/labs" },
            { name: "Interview traps", path: "/labs/traps" },
            { name: "Break the Backend", path: "/labs/traps/play" },
            { name: level.title, path },
        ]),
    ];
    return (
        <>
            <JsonLd data={schema} />
            <main className="min-h-screen bg-black text-white selection:bg-indigo-500/30">
                <Navbar />
                <div className="mx-auto max-w-[1280px] px-4 pb-24 pt-28 sm:px-6 lg:px-8">
                    {inTrack ? (
                        <Link href={`/labs/systems/${inTrack.track.id}`} className="mb-8 inline-flex items-center gap-1.5 text-sm text-white/45 transition-colors hover:text-white"><ArrowLeft size={14} /> {inTrack.track.name} track · step {inTrack.index + 1} of {inTrack.track.steps.length}</Link>
                    ) : (
                        <Link href="/labs/traps/play" className="mb-8 inline-flex items-center gap-1.5 text-sm text-white/45 transition-colors hover:text-white"><ArrowLeft size={14} /> All levels</Link>
                    )}
                    <BreakTheBackend levelId={level.id} trapPublished={getAllTraps().some((trap) => trap.slug === level.trap)} />
                    {inTrack && (
                        <Link href={nextStep?.href ?? `/labs/systems/${inTrack.track.id}`} className="group mt-10 flex items-center justify-between gap-4 rounded-2xl border border-white/10 p-6 transition-colors hover:border-white/25">
                            <span>
                                <span className="block text-xs uppercase tracking-[0.14em] text-white/40">{nextStep ? "Next in the track" : "Back to the track"}</span>
                                <span className="mt-1 block text-lg font-medium">{nextStep?.title ?? inTrack.track.title}</span>
                            </span>
                            <ArrowRight className="shrink-0 transition-transform group-hover:translate-x-1" aria-hidden="true" />
                        </Link>
                    )}
                </div>
                <Footer />
            </main>
        </>
    );
}
