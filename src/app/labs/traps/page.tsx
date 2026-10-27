import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight, Github } from "lucide-react";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { JsonLd } from "@/components/JsonLd";
import { TRAPS_REPO_URL, getAllTraps } from "@/lib/traps";
import { breadcrumbJsonLd, itemListJsonLd, webPageJsonLd } from "@/lib/seo";

const TITLE = "Interview Traps: Backend Bugs You Can Replay Step by Step | Somanath Studio Labs";
const DESCRIPTION =
    "Race conditions, cache stampedes, pagination and idempotency bugs, replayed from real recorded runs. See the code, the database state and the exact moment it breaks.";

export const metadata: Metadata = {
    title: TITLE,
    description: DESCRIPTION,
    alternates: { canonical: "/labs/traps" },
    openGraph: {
        title: "Interview Traps: replay the bug, then the fix",
        description: DESCRIPTION,
        url: "/labs/traps",
        siteName: "Somanath Studio",
        type: "website",
        images: [{ url: "/og?title=Interview%20Traps%3A%20replay%20the%20bug", width: 1200, height: 630, alt: "Interview Traps" }],
    },
};

const pad = (n: number) => String(n).padStart(2, "0");

export default function TrapsIndexPage() {
    const traps = getAllTraps();
    const schema = [
        webPageJsonLd({ path: "/labs/traps", name: "Interview Traps", description: DESCRIPTION, type: "CollectionPage" }),
        breadcrumbJsonLd([
            { name: "Home", path: "/" },
            { name: "Labs", path: "/labs" },
            { name: "Interview traps", path: "/labs/traps" },
        ]),
        itemListJsonLd({
            path: "/labs/traps",
            name: "Interview traps",
            description: DESCRIPTION,
            items: traps.map((t) => ({ name: t.title, path: `/labs/traps/${t.slug}`, description: t.question })),
        }),
    ];

    return (
        <>
            <JsonLd data={schema} />
            <main className="min-h-screen bg-black text-white selection:bg-indigo-500/30">
                <Navbar />
                <div className="mx-auto max-w-5xl px-4 pb-24 pt-28 sm:px-6 md:pt-40">
                    <p className="mb-4 font-mono text-xs uppercase tracking-[0.2em] text-indigo-300">Labs · Interview traps</p>
                    <h1 className="max-w-3xl font-[family-name:var(--font-labs-display)] text-4xl font-bold leading-[1.05] tracking-tight sm:text-6xl">
                        Watch the bug happen. Then watch the fix.
                    </h1>
                    <p className="mt-6 max-w-2xl text-lg leading-relaxed text-white/65">
                        Backend bugs that show up in senior interviews and in production. Each one is a real recorded run against
                        a real database: step through it, see which line every request is on, and see the exact row that goes wrong.
                    </p>
                    <a href={TRAPS_REPO_URL} target="_blank" rel="noopener" className="mt-8 inline-flex items-center gap-2 rounded-full border border-white/20 px-5 py-2.5 text-sm font-semibold hover:bg-white/10">
                        <Github size={16} /> All the code is on GitHub
                    </a>

                    <ol className="mt-16 flex flex-col gap-4">
                        {traps.map((trap) => {
                            const bug = trap.variants.bug.outcome;
                            return (
                                <li key={trap.slug}>
                                    <Link
                                        href={`/labs/traps/${trap.slug}`}
                                        className="group grid gap-4 rounded-2xl border border-white/10 bg-white/[0.02] p-6 transition-colors hover:border-white/25 hover:bg-white/[0.04] sm:grid-cols-[auto_1fr_auto] sm:items-center sm:p-8"
                                    >
                                        <span className="font-[family-name:var(--font-labs-display)] text-4xl font-bold text-white/20 transition-colors group-hover:text-indigo-300">
                                            {pad(trap.number)}
                                        </span>
                                        <span>
                                            <span className="block text-xl font-semibold sm:text-2xl">{trap.title}</span>
                                            <span className="mt-2 block text-white/60">{trap.question}</span>
                                            {!bug.ok && <span className="mt-3 block font-mono text-sm text-rose-300">✗ {bug.headline}</span>}
                                        </span>
                                        <span className="inline-flex items-center gap-2 text-sm font-semibold text-white/70 group-hover:text-white">
                                            Replay <ArrowRight size={16} className="transition-transform group-hover:translate-x-1" />
                                        </span>
                                    </Link>
                                </li>
                            );
                        })}
                    </ol>
                    <p className="mt-8 text-sm text-white/40">New traps land with each episode on Instagram and YouTube.</p>
                </div>
                <Footer />
            </main>
        </>
    );
}
