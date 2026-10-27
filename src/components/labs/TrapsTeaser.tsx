import Link from "next/link";
import { ArrowRight } from "lucide-react";
import type { TrapBundle } from "@/types/traps";

/** Labs-page entry point into /labs/traps. Server component, no JS. */
export function TrapsTeaser({ traps }: { traps: TrapBundle[] }) {
    if (traps.length === 0) return null;
    const first = traps[0];
    const bug = first.variants.bug.outcome;
    return (
        <section className="bg-black px-4 py-20 sm:px-6">
            <Link
                href="/labs/traps"
                className="group mx-auto grid max-w-6xl gap-8 rounded-3xl border border-white/10 bg-gradient-to-br from-indigo-500/[0.08] via-transparent to-rose-500/[0.06] p-8 transition-colors hover:border-white/25 md:grid-cols-[1.2fr_1fr] md:items-center md:p-12"
            >
                <div>
                    <p className="mb-3 font-mono text-xs uppercase tracking-[0.2em] text-indigo-300">New · Interview traps</p>
                    <h2 className="font-[family-name:var(--font-labs-display)] text-3xl font-bold leading-tight text-white sm:text-5xl">
                        Replay backend bugs, one event at a time.
                    </h2>
                    <p className="mt-4 max-w-xl text-white/60">
                        Real recorded runs against a real database. See which line every request is on and the exact row that goes wrong.
                    </p>
                    <span className="mt-6 inline-flex items-center gap-2 text-sm font-semibold text-white">
                        {traps.length} trap{traps.length === 1 ? "" : "s"} so far <ArrowRight size={16} className="transition-transform group-hover:translate-x-1" />
                    </span>
                </div>
                <div className="rounded-2xl border border-white/10 bg-black/60 p-5 font-mono text-sm">
                    <p className="text-white/40">$ npm run 01:bug</p>
                    <p className="mt-2 text-white/70">{first.title}</p>
                    <p className="mt-3 text-rose-300">✗ {bug.headline}</p>
                    <p className="mt-4 text-white/40">$ npm run 01:fix</p>
                    <p className="mt-2 text-emerald-300">✓ {first.variants.fix.outcome.headline}</p>
                </div>
            </Link>
        </section>
    );
}
