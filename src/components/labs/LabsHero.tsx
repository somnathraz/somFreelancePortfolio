"use client";

import { useEffect, useRef, useState } from "react";
import { motion, useReducedMotion } from "framer-motion";
import dynamic from "next/dynamic";
import { LabsEntrance } from "./LabsEntrance";

const LabsScene = dynamic(
    () => import("./LabsScene").then((mod) => mod.LabsScene),
    { ssr: false }
);

const EASE = [0.16, 1, 0.3, 1] as [number, number, number, number];

type Phase = "entering" | "revealing" | "ready";

function AnimatedLine({
    text,
    delay = 0,
    className = "",
}: {
    text: string;
    delay?: number;
    className?: string;
}) {
    const reduceMotion = useReducedMotion();
    const words = text.split(" ");
    return (
        <span className={className}>
            {words.map((word, i) => (
                <span key={i} className="inline-block overflow-hidden">
                    <motion.span
                        className="inline-block"
                        initial={{ y: reduceMotion ? "0%" : "110%" }}
                        animate={{ y: "0%" }}
                        transition={{
                            delay: reduceMotion ? 0 : delay + i * 0.07,
                            duration: reduceMotion ? 0 : 0.85,
                            ease: EASE,
                        }}
                    >
                        {word}
                    </motion.span>
                    {i < words.length - 1 && "\u00A0"}
                </span>
            ))}
        </span>
    );
}

/** A brief intact-logo reveal with one coordinated transition into the hero. */
export function LabsHero() {
    const [phase, setPhase] = useState<Phase>("entering");
    const containerRef = useRef<HTMLDivElement>(null);
    const reduceMotion = useReducedMotion();

    useEffect(() => {
        const preference = window.matchMedia("(prefers-reduced-motion: reduce)");
        const skip = () => setPhase("ready");
        const onKey = (event: KeyboardEvent) => { if (event.key === "Escape") skip(); };
        const onPreference = () => { if (preference.matches) skip(); };
        const reveal = window.setTimeout(() => setPhase(current => current === "ready" ? current : "revealing"), preference.matches ? 0 : 1350);
        const finish = window.setTimeout(skip, preference.matches ? 0 : 2200);
        window.addEventListener("keydown", onKey);
        preference.addEventListener("change", onPreference);
        return () => {
            window.clearTimeout(reveal);
            window.clearTimeout(finish);
            window.removeEventListener("keydown", onKey);
            preference.removeEventListener("change", onPreference);
        };
    }, []);

    const showContent = phase !== "entering" || reduceMotion;

    return (
        <section
            ref={containerRef}
            data-entry-phase={phase}
            className="relative flex min-h-screen items-center justify-center overflow-hidden bg-black"
        >
            {/* Load the scene immediately, behind the short brand reveal. */}
            <div className="absolute inset-0">
                <LabsScene />
            </div>
            {phase !== "ready" && !reduceMotion && (
                <LabsEntrance onSkip={() => setPhase("ready")} />
            )}

            {/* Content rises into view as the cover lifts. */}
            {showContent && (
                <>
                    <div className="pointer-events-none absolute inset-0 z-[1] bg-gradient-to-b from-black/70 via-black/20 to-black" />
                    <div className="pointer-events-none absolute inset-0 z-[1] bg-[radial-gradient(ellipse_at_center,transparent_30%,black_100%)]" />

                    <motion.div
                        className="relative z-20 mx-auto max-w-6xl px-6 pb-28 pt-20 text-center"
                        initial={{ opacity: reduceMotion ? 1 : 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ duration: reduceMotion ? 0 : 0.65, ease: EASE }}
                    >
                        <motion.div
                            initial={{ opacity: reduceMotion ? 1 : 0, y: reduceMotion ? 0 : 12 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{
                                delay: reduceMotion ? 0 : 0.05,
                                duration: reduceMotion ? 0 : 0.9,
                                ease: EASE,
                            }}
                            className="mb-10 inline-flex items-center gap-2.5 rounded-full border border-white/[0.08] bg-white/[0.03] px-5 py-2 backdrop-blur-md"
                        >
                            <span className="relative flex h-1.5 w-1.5">
                                <span className="absolute inline-flex h-full w-full motion-safe:animate-ping rounded-full bg-indigo-400 opacity-75" />
                                <span className="relative inline-flex h-1.5 w-1.5 rounded-full bg-indigo-400" />
                            </span>
                            <span className="font-mono text-[10px] uppercase tracking-[0.25em] text-zinc-400">
                                Labs — a creative initiative by Somanath Studio
                            </span>
                        </motion.div>

                        <h1 className="mb-8">
                            <AnimatedLine
                                text="The web should"
                                delay={0.2}
                                className="block text-5xl font-bold tracking-tight text-white sm:text-7xl lg:text-[5.5rem] leading-[1.05]"
                            />
                            <span className="block text-5xl font-bold tracking-tight sm:text-7xl lg:text-[5.5rem] leading-[1.05]">
                                <AnimatedLine
                                    text="feel"
                                    delay={0.4}
                                    className="bg-gradient-to-r from-indigo-300 via-purple-300 to-emerald-300 bg-clip-text text-transparent"
                                />{" "}
                                <AnimatedLine
                                    text="extraordinary."
                                    delay={0.5}
                                    className="bg-gradient-to-r from-purple-300 via-emerald-300 to-cyan-300 bg-clip-text text-transparent"
                                />
                            </span>
                        </h1>

                        <motion.p
                            initial={{ opacity: reduceMotion ? 1 : 0, y: reduceMotion ? 0 : 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{
                                delay: reduceMotion ? 0 : 0.75,
                                duration: reduceMotion ? 0 : 0.8,
                                ease: EASE,
                            }}
                            className="mx-auto max-w-2xl text-lg leading-relaxed text-zinc-400 sm:text-xl"
                        >
                            Free, open-source Next.js experiences. Built with
                            WebGL, cinematic motion, and meticulous interaction
                            design.
                        </motion.p>

                        <motion.div
                            initial={{ opacity: reduceMotion ? 1 : 0, y: reduceMotion ? 0 : 14 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{
                                delay: reduceMotion ? 0 : 0.95,
                                duration: reduceMotion ? 0 : 0.7,
                                ease: EASE,
                            }}
                            className="mt-14 flex flex-col items-center gap-4 sm:flex-row sm:justify-center"
                        >
                            <a
                                href="#experiments"
                                className="group relative inline-flex items-center gap-3 overflow-hidden rounded-full bg-white px-8 py-4 text-sm font-semibold text-black transition-all duration-500 hover:-translate-y-1 hover:shadow-[0_20px_50px_-12px_rgba(129,140,248,0.5)]"
                            >
                                <span className="relative z-10">
                                    Explore the collection
                                </span>
                                <svg
                                    className="relative z-10 h-4 w-4 transition-transform duration-500 group-hover:translate-y-1"
                                    fill="none"
                                    viewBox="0 0 24 24"
                                    stroke="currentColor"
                                    strokeWidth={2}
                                >
                                    <path
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        d="M19 14l-7 7m0 0l-7-7m7 7V3"
                                    />
                                </svg>
                                <div className="absolute inset-0 -translate-x-full bg-gradient-to-r from-transparent via-indigo-100/50 to-transparent transition-transform duration-700 group-hover:translate-x-full" />
                            </a>
                            <a
                                href="https://demo.somanathkhadanga.com"
                                target="_blank"
                                rel="noopener noreferrer"
                                className="inline-flex items-center gap-2 rounded-full border border-white/[0.08] px-8 py-4 text-sm font-medium text-zinc-400 backdrop-blur-sm transition-all duration-300 hover:border-white/20 hover:text-white"
                            >
                                Open live gallery
                            </a>
                        </motion.div>
                    </motion.div>

                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: phase === "ready" ? 1 : 0 }}
                        transition={{ delay: reduceMotion ? 0 : 0.4, duration: reduceMotion ? 0 : 1.2 }}
                        className="pointer-events-none absolute bottom-0 left-0 right-0 z-[5] flex items-center justify-between px-8 pb-6"
                    >
                        <span className="text-lg text-zinc-600 select-none">
                            +
                        </span>
                        <motion.div
                            animate={{ y: reduceMotion ? 0 : [0, 6, 0] }}
                            transition={{
                                repeat: Infinity,
                                duration: 2.5,
                                ease: "easeInOut" as const,
                            }}
                            className="flex flex-col items-center gap-2"
                        >
                            <span className="font-mono text-[9px] uppercase tracking-[0.4em] text-zinc-500">
                                Scroll to explore
                            </span>
                            <div className="h-8 w-[1px] bg-gradient-to-b from-zinc-500 to-transparent" />
                        </motion.div>
                        <span className="text-lg text-zinc-600 select-none">
                            +
                        </span>
                    </motion.div>
                </>
            )}
        </section>
    );
}
