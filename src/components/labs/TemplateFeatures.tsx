"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";

const ACCENTS = [
    {
        bar: "from-cyan-400 to-teal-300",
        glow: "bg-cyan-400/15",
        num: "text-cyan-300",
        border: "hover:border-cyan-400/35",
        ring: "group-hover:shadow-[0_0_40px_-12px_rgba(34,211,238,0.45)]",
    },
    {
        bar: "from-amber-300 to-orange-300",
        glow: "bg-amber-400/15",
        num: "text-amber-300",
        border: "hover:border-amber-400/35",
        ring: "group-hover:shadow-[0_0_40px_-12px_rgba(251,191,36,0.4)]",
    },
    {
        bar: "from-emerald-300 to-lime-300",
        glow: "bg-emerald-400/15",
        num: "text-emerald-300",
        border: "hover:border-emerald-400/35",
        ring: "group-hover:shadow-[0_0_40px_-12px_rgba(52,211,153,0.4)]",
    },
    {
        bar: "from-rose-300 to-pink-300",
        glow: "bg-rose-400/15",
        num: "text-rose-300",
        border: "hover:border-rose-400/35",
        ring: "group-hover:shadow-[0_0_40px_-12px_rgba(251,113,133,0.4)]",
    },
    {
        bar: "from-sky-300 to-blue-300",
        glow: "bg-sky-400/15",
        num: "text-sky-300",
        border: "hover:border-sky-400/35",
        ring: "group-hover:shadow-[0_0_40px_-12px_rgba(56,189,248,0.4)]",
    },
    {
        bar: "from-violet-300 to-fuchsia-300",
        glow: "bg-violet-400/15",
        num: "text-violet-300",
        border: "hover:border-violet-400/35",
        ring: "group-hover:shadow-[0_0_40px_-12px_rgba(167,139,250,0.4)]",
    },
] as const;

function FeatureCard({
    feature,
    index,
}: {
    feature: string;
    index: number;
}) {
    const ref = useRef<HTMLDivElement>(null);
    const inView = useInView(ref, { once: true, margin: "-10%" });
    const accent = ACCENTS[index % ACCENTS.length];

    return (
        <motion.div
            ref={ref}
            initial={{ opacity: 0, y: 28, scale: 0.97 }}
            animate={inView ? { opacity: 1, y: 0, scale: 1 } : undefined}
            transition={{
                duration: 0.55,
                delay: (index % 6) * 0.07,
                ease: [0.22, 1, 0.36, 1],
            }}
            className={`group relative overflow-hidden rounded-2xl border border-white/10 bg-zinc-950/80 p-6 transition-all duration-500 ${accent.border} ${accent.ring}`}
        >
            <div
                className={`pointer-events-none absolute -right-8 -top-8 h-28 w-28 rounded-full ${accent.glow} blur-2xl transition-opacity duration-500 opacity-70 group-hover:opacity-100`}
            />
            <div
                className={`mb-5 h-1 w-10 rounded-full bg-gradient-to-r ${accent.bar} transition-all duration-500 group-hover:w-16`}
            />
            <div
                className={`mb-3 font-mono text-xs font-semibold tracking-[0.2em] ${accent.num}`}
            >
                {String(index + 1).padStart(2, "0")}
            </div>
            <p className="relative text-[15px] leading-relaxed text-zinc-100">
                {feature}
            </p>
        </motion.div>
    );
}

export function TemplateFeatures({ features }: { features: string[] }) {
    const headerRef = useRef<HTMLDivElement>(null);
    const inView = useInView(headerRef, { once: true, margin: "-80px" });

    return (
        <section className="relative overflow-hidden border-b border-white/5 py-16 lg:py-24">
            <div className="pointer-events-none absolute inset-0">
                <div className="absolute left-1/4 top-0 h-64 w-64 rounded-full bg-cyan-500/[0.06] blur-[100px]" />
                <div className="absolute bottom-0 right-1/4 h-64 w-64 rounded-full bg-amber-500/[0.05] blur-[100px]" />
            </div>

            <div className="relative mx-auto max-w-6xl px-6">
                <motion.div
                    ref={headerRef}
                    initial={{ opacity: 0, y: 16 }}
                    animate={inView ? { opacity: 1, y: 0 } : undefined}
                    transition={{ duration: 0.5 }}
                    className="mb-12"
                >
                    <p className="mb-3 font-mono text-[10px] uppercase tracking-[0.3em] text-cyan-400/80">
                        Features
                    </p>
                    <h2 className="text-2xl font-bold tracking-tight text-white lg:text-3xl">
                        What&apos;s included
                    </h2>
                    <p className="mt-3 max-w-xl text-sm text-zinc-400">
                        Everything shipped in this template — interaction,
                        motion, and production-minded details.
                    </p>
                </motion.div>

                <div className="grid gap-4 sm:gap-5 md:grid-cols-2 lg:grid-cols-3">
                    {features.map((feature, i) => (
                        <FeatureCard key={i} feature={feature} index={i} />
                    ))}
                </div>
            </div>
        </section>
    );
}
