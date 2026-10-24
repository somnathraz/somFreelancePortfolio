"use client";

import { useEffect, useRef, useState } from "react";
import { motion, AnimatePresence, useReducedMotion } from "framer-motion";
import dynamic from "next/dynamic";
import { UnfoldingLogo, PercentCounter } from "./UnfoldingMark";

const LabsScene = dynamic(
    () => import("./LabsScene").then((mod) => mod.LabsScene),
    { ssr: false }
);

const EASE = [0.16, 1, 0.3, 1] as [number, number, number, number];

type Phase = "loading" | "unfolding" | "zooming" | "ready";

function AnimatedLine({
    text,
    delay = 0,
    className = "",
}: {
    text: string;
    delay?: number;
    className?: string;
}) {
    const words = text.split(" ");
    return (
        <span className={className}>
            {words.map((word, i) => (
                <span key={i} className="inline-block overflow-hidden">
                    <motion.span
                        className="inline-block"
                        initial={{ y: "110%" }}
                        animate={{ y: "0%" }}
                        transition={{
                            delay: delay + i * 0.07,
                            duration: 0.85,
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

/**
 * Brand-led entry for Somanath Studio Labs:
 * 1. Progress bar + rolling digits
 * 2. The original ribbon mark assembles from layered planes
 * 3. The finished logo zooms through → website appears underneath
 * Scene is NEVER scaled/clipped — stays correctly placed.
 */
export function LabsHero() {
    const [phase, setPhase] = useState<Phase>("loading");
    const [progress, setProgress] = useState(0);
    const [unfold, setUnfold] = useState(0);
    const [zoom, setZoom] = useState(1);
    const containerRef = useRef<HTMLDivElement>(null);
    const reduceMotion = useReducedMotion();

    // 1) Progress 0→100
    useEffect(() => {
        if (phase !== "loading") return;
        let raf = 0;
        let nextPhaseTimer = 0;
        const start = performance.now();
        const duration = reduceMotion ? 300 : 1700;

        const tick = (now: number) => {
            const t = Math.min(1, (now - start) / duration);
            setProgress((1 - Math.pow(1 - t, 1.8)) * 100);
            if (t < 1) {
                raf = requestAnimationFrame(tick);
            } else {
                setProgress(100);
                nextPhaseTimer = window.setTimeout(
                    () => setPhase("unfolding"),
                    reduceMotion ? 80 : 260
                );
            }
        };
        raf = requestAnimationFrame(tick);
        return () => {
            cancelAnimationFrame(raf);
            window.clearTimeout(nextPhaseTimer);
        };
    }, [phase, reduceMotion]);

    // 2) Ribbon planes assemble and lock into the source logo
    useEffect(() => {
        if (phase !== "unfolding") return;
        let raf = 0;
        let nextPhaseTimer = 0;
        const start = performance.now();
        const duration = reduceMotion ? 350 : 1250;

        const tick = (now: number) => {
            const t = Math.min(1, (now - start) / duration);
            setUnfold(1 - Math.pow(1 - t, 2.2));
            if (t < 1) {
                raf = requestAnimationFrame(tick);
            } else {
                setUnfold(1);
                nextPhaseTimer = window.setTimeout(
                    () => setPhase("zooming"),
                    reduceMotion ? 120 : 520
                );
            }
        };
        raf = requestAnimationFrame(tick);
        return () => {
            cancelAnimationFrame(raf);
            window.clearTimeout(nextPhaseTimer);
        };
    }, [phase, reduceMotion]);

    // 3) Finished mark becomes the portal into the Labs scene
    useEffect(() => {
        if (phase !== "zooming") return;
        let raf = 0;
        let nextPhaseTimer = 0;
        const start = performance.now();
        const duration = reduceMotion ? 320 : 1500;

        const tick = (now: number) => {
            const t = Math.min(1, (now - start) / duration);
            const eased = 1 - Math.pow(1 - t, 1.7);
            setZoom(1 + eased * 16);
            if (t < 1) {
                raf = requestAnimationFrame(tick);
            } else {
                nextPhaseTimer = window.setTimeout(
                    () => setPhase("ready"),
                    reduceMotion ? 0 : 120
                );
            }
        };
        raf = requestAnimationFrame(tick);
        return () => {
            cancelAnimationFrame(raf);
            window.clearTimeout(nextPhaseTimer);
        };
    }, [phase, reduceMotion]);

    const showOverlay = phase !== "ready";
    // Scene under the S during the hold + zoom so the site “appears from S”
    const showScene =
        phase === "unfolding" || phase === "zooming" || phase === "ready";
    const showContent = phase === "ready" || phase === "zooming";

    return (
        <section
            ref={containerRef}
            data-entry-phase={phase}
            data-entry-progress={Math.round(unfold * 100)}
            className="relative flex min-h-screen items-center justify-center overflow-hidden bg-black"
        >
            {/* 3D scene — fades in slowly under the S */}
            {showScene && (
                <motion.div
                    className="absolute inset-0"
                    initial={{ opacity: 0 }}
                    animate={{
                        opacity:
                            phase === "unfolding"
                                ? 0.35
                                : phase === "zooming"
                                  ? Math.min(1, 0.35 + (zoom - 1) / 10)
                                  : 1,
                    }}
                    transition={{ duration: 1.4, ease: "easeOut" }}
                >
                    <LabsScene />
                </motion.div>
            )}

            {/* Preloader / logo assembly / zoom overlay */}
            <AnimatePresence>
                {showOverlay && (
                    <motion.div
                        key="entry"
                        className="fixed inset-0 z-[200] flex items-center justify-center overflow-visible"
                        style={{
                            backgroundColor:
                                phase === "zooming"
                                    ? `rgba(0,0,0,${Math.max(0, 1 - (zoom - 1) / 10)})`
                                    : "#000",
                        }}
                        initial={false}
                        exit={{ opacity: 0 }}
                        transition={{ duration: 0.8, ease: EASE }}
                    >
                        {phase === "loading" && (
                            <>
                                <div className="absolute left-1/2 top-1/2 h-[2px] w-[min(180px,40vw)] -translate-x-1/2 -translate-y-1/2 overflow-hidden bg-zinc-800">
                                    <div
                                        className="h-full bg-gradient-to-r from-cyan-400 via-violet-400 to-rose-300"
                                        style={{ width: `${progress}%` }}
                                    />
                                </div>
                                <PercentCounter progress={progress} />
                            </>
                        )}

                        {(phase === "unfolding" || phase === "zooming") && (
                            <>
                                <div
                                    className="relative z-10"
                                    style={{
                                        opacity:
                                            phase === "zooming"
                                                ? Math.max(
                                                      0,
                                                      1 - (zoom - 1) / 12
                                                  )
                                                : 1,
                                    }}
                                >
                                    <UnfoldingLogo
                                        progress={
                                            phase === "zooming" ? 1 : unfold
                                        }
                                        zoom={zoom}
                                    />
                                </div>
                                {phase === "unfolding" && (
                                    <PercentCounter progress={100} />
                                )}
                            </>
                        )}
                    </motion.div>
                )}
            </AnimatePresence>

            {/* Site content — emerges as S zooms away */}
            {showContent && (
                <>
                    <div className="pointer-events-none absolute inset-0 z-[1] bg-gradient-to-b from-black/70 via-black/20 to-black" />
                    <div className="pointer-events-none absolute inset-0 z-[1] bg-[radial-gradient(ellipse_at_center,transparent_30%,black_100%)]" />

                    <motion.div
                        className="relative z-20 mx-auto max-w-6xl px-6 pb-28 pt-20 text-center"
                        initial={{ opacity: 0 }}
                        animate={{
                            opacity:
                                phase === "ready"
                                    ? 1
                                    : Math.min(1, Math.max(0, (zoom - 4) / 8)),
                        }}
                        transition={{ duration: 0.8, ease: EASE }}
                    >
                        <motion.div
                            initial={{ opacity: 0, y: 12 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{
                                delay: phase === "ready" ? 0.1 : 0.6,
                                duration: 0.9,
                                ease: EASE,
                            }}
                            className="mb-10 inline-flex items-center gap-2.5 rounded-full border border-white/[0.08] bg-white/[0.03] px-5 py-2 backdrop-blur-md"
                        >
                            <span className="relative flex h-1.5 w-1.5">
                                <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-indigo-400 opacity-75" />
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
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{
                                delay: 0.75,
                                duration: 0.8,
                                ease: EASE,
                            }}
                            className="mx-auto max-w-2xl text-lg leading-relaxed text-zinc-400 sm:text-xl"
                        >
                            Free, open-source Next.js experiences. Built with
                            WebGL, cinematic motion, and meticulous interaction
                            design.
                        </motion.p>

                        <motion.div
                            initial={{ opacity: 0, y: 14 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{
                                delay: 0.95,
                                duration: 0.7,
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
                                href="/templates"
                                className="inline-flex items-center gap-2 rounded-full border border-white/[0.08] px-8 py-4 text-sm font-medium text-zinc-400 backdrop-blur-sm transition-all duration-300 hover:border-white/20 hover:text-white"
                            >
                                Browse templates
                            </a>
                        </motion.div>
                    </motion.div>

                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: phase === "ready" ? 1 : 0 }}
                        transition={{ delay: 0.4, duration: 1.2 }}
                        className="pointer-events-none absolute bottom-0 left-0 right-0 z-[5] flex items-center justify-between px-8 pb-6"
                    >
                        <span className="text-lg text-zinc-600 select-none">
                            +
                        </span>
                        <motion.div
                            animate={{ y: [0, 6, 0] }}
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
