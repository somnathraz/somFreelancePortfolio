import type { Metadata } from "next";
import Link from "next/link";
import { ArrowLeft, ArrowRight } from "lucide-react";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { JsonLd } from "@/components/JsonLd";
import { LEVELS } from "@/lib/trap-game/levels";
import { breadcrumbJsonLd, webPageJsonLd } from "@/lib/seo";

const TITLE = "Break the Backend: a game where you cause the race condition | Somanath Studio Labs";
const DESCRIPTION = "You are the scheduler. Step two concurrent requests in any order and break a real backend: a double-booked seat, a lost update, a duplicate payment. Then patch it and watch the fix hold.";

export const metadata: Metadata = {
    title: TITLE,
    description: DESCRIPTION,
    alternates: { canonical: "/labs/traps/play" },
    openGraph: {
        title: "Break the Backend",
        description: DESCRIPTION,
        url: "/labs/traps/play",
        siteName: "Somanath Studio",
        type: "website",
        images: [{ url: "/og?title=Break%20the%20Backend", width: 1200, height: 630, alt: "Break the Backend" }],
    },
    twitter: { card: "summary_large_image", title: "Break the Backend", description: DESCRIPTION, images: ["/og?title=Break%20the%20Backend"] },
};

export default function PlayIndexPage() {
    const schema = [
        webPageJsonLd({ path: "/labs/traps/play", name: "Break the Backend", description: DESCRIPTION, type: "CollectionPage" }),
        breadcrumbJsonLd([
            { name: "Home", path: "/" },
            { name: "Labs", path: "/labs" },
            { name: "Interview traps", path: "/labs/traps" },
            { name: "Break the Backend", path: "/labs/traps/play" },
        ]),
    ];
    return (
        <>
            <JsonLd data={schema} />
            <main className="min-h-screen bg-black text-white selection:bg-indigo-500/30">
                <Navbar />
                <div className="mx-auto max-w-5xl px-4 pb-24 pt-28 sm:px-6 lg:px-8">
                    <Link href="/labs/traps" className="mb-8 inline-flex items-center gap-1.5 text-sm text-white/45 transition-colors hover:text-white"><ArrowLeft size={14} /> Interview traps</Link>
                    <header className="max-w-3xl border-b border-white/10 pb-10">
                        <p className="mb-4 font-mono text-xs uppercase tracking-[0.2em] text-indigo-300">Labs / Play</p>
                        <h1 className="font-[family-name:var(--font-labs-display)] text-5xl font-bold tracking-tight sm:text-6xl">Break the Backend</h1>
                        <p className="mt-5 text-lg leading-relaxed text-white/70">You are the chaos scheduler. Each level runs real backend code as two concurrent requests. You decide who moves next. Break the invariant, then pick the fix that makes it hold.</p>
                        <ol className="mt-6 flex flex-wrap gap-x-6 gap-y-2 text-sm text-white/55">
                            <li><span className="text-white">1.</span> Step requests in any order</li>
                            <li><span className="text-white">2.</span> Double-book the seat</li>
                            <li><span className="text-white">3.</span> Patch it and watch it hold</li>
                        </ol>
                    </header>
                    <ul className="mt-10 grid gap-4 sm:grid-cols-2">
                        {LEVELS.map((level) => (
                            <li key={level.id}>
                                <Link href={`/labs/traps/play/${level.id}`} className="group flex h-full flex-col justify-between gap-6 rounded-2xl border border-white/10 bg-white/[0.02] p-6 transition-colors hover:border-white/25">
                                    <div>
                                        <p className="font-mono text-xs uppercase tracking-[0.18em] text-white/40">Level {level.number}</p>
                                        <h2 className="mt-2 font-[family-name:var(--font-labs-display)] text-2xl font-semibold">{level.title}</h2>
                                        <p className="mt-2 text-sm leading-relaxed text-white/60">{level.invariants[0].label}. Can you make that false?</p>
                                    </div>
                                    <span className="inline-flex items-center gap-2 text-sm font-semibold text-indigo-300">Play <ArrowRight size={15} className="transition-transform group-hover:translate-x-1" aria-hidden="true" /></span>
                                </Link>
                            </li>
                        ))}
                    </ul>
                </div>
                <Footer />
            </main>
        </>
    );
}
