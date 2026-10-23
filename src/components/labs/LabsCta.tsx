"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { LabsCtaScene } from "./LabsCtaScene";

export function LabsCta() {
    const sectionRef = useRef<HTMLElement>(null);
    const contentRef = useRef<HTMLDivElement>(null);
    const isInView = useInView(contentRef, { once: true, margin: "-10%" });

    return (
        <section
            ref={sectionRef}
            className="relative min-h-screen overflow-hidden bg-black"
        >
            {/* Interactive geometric shapes — mouse tracked on the section */}
            <LabsCtaScene containerRef={sectionRef} />

            {/* Soft vignette so text stays readable over the particle field */}
            <div className="pointer-events-none absolute inset-0 z-[1] bg-[radial-gradient(ellipse_at_center,rgba(0,0,0,0.55)_0%,transparent_60%)]" />

            {/* Content — pointer-events only on interactive elements */}
            <div className="pointer-events-none relative z-10 flex min-h-screen flex-col items-center justify-center px-6 py-32">
                {/* Crosshair markers */}
                <div className="absolute inset-8 z-0">
                    <span className="absolute left-0 top-1/3 text-lg font-light text-zinc-600 select-none">
                        +
                    </span>
                    <span className="absolute right-0 top-1/4 text-lg font-light text-zinc-600 select-none">
                        +
                    </span>
                    <span className="absolute bottom-1/3 left-1/4 text-lg font-light text-zinc-600 select-none">
                        +
                    </span>
                    <span className="absolute bottom-1/4 right-1/3 text-lg font-light text-zinc-600 select-none">
                        +
                    </span>
                    <span className="absolute left-1/3 top-[20%] text-lg font-light text-zinc-600 select-none">
                        +
                    </span>
                </div>

                <motion.div
                    ref={contentRef}
                    initial={{ opacity: 0, y: 50 }}
                    animate={isInView ? { opacity: 1, y: 0 } : undefined}
                    transition={{
                        duration: 1.2,
                        ease: [0.22, 1, 0.36, 1] as [
                            number,
                            number,
                            number,
                            number,
                        ],
                    }}
                    className="mx-auto max-w-4xl text-center"
                >
                    <motion.p
                        initial={{ opacity: 0 }}
                        animate={isInView ? { opacity: 1 } : undefined}
                        transition={{ delay: 0.2, duration: 0.8 }}
                        className="mb-6 font-mono text-[10px] uppercase tracking-[0.4em] text-zinc-500"
                    >
                        Is your big idea ready to go wild?
                    </motion.p>

                    <motion.h2
                        initial={{ opacity: 0, y: 30 }}
                        animate={
                            isInView ? { opacity: 1, y: 0 } : undefined
                        }
                        transition={{
                            delay: 0.4,
                            duration: 1,
                            ease: [0.22, 1, 0.36, 1] as [
                                number,
                                number,
                                number,
                                number,
                            ],
                        }}
                        className="mb-6 text-5xl font-bold tracking-tight text-white lg:text-8xl"
                    >
                        Let&apos;s work
                        <br />
                        together!
                    </motion.h2>

                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={
                            isInView ? { opacity: 1, y: 0 } : undefined
                        }
                        transition={{ delay: 0.8, duration: 0.8 }}
                        className="pointer-events-auto mt-12 flex flex-col items-center gap-5 sm:flex-row sm:justify-center"
                    >
                        <Link
                            href="/contact"
                            className="group relative inline-flex items-center gap-3 overflow-hidden rounded-full bg-white px-10 py-5 text-base font-semibold text-black transition-all duration-500 hover:-translate-y-1 hover:shadow-[0_24px_60px_-12px_rgba(129,140,248,0.45)]"
                        >
                            <span className="relative z-10">
                                Talk to an Engineer
                            </span>
                            <ArrowRight className="relative z-10 h-5 w-5 transition-transform duration-500 group-hover:translate-x-1" />
                            <div className="absolute inset-0 -translate-x-full bg-gradient-to-r from-transparent via-indigo-100/50 to-transparent transition-transform duration-700 group-hover:translate-x-full" />
                        </Link>
                        <Link
                            href="/services"
                            className="inline-flex items-center gap-2 rounded-full border border-white/15 px-10 py-5 text-base font-medium text-zinc-400 transition-all duration-300 hover:border-white/30 hover:text-white"
                        >
                            View all services
                        </Link>
                    </motion.div>
                </motion.div>

                <motion.div
                    initial={{ opacity: 0 }}
                    animate={isInView ? { opacity: 1 } : undefined}
                    transition={{ delay: 1.2, duration: 1 }}
                    className="absolute bottom-0 left-0 right-0 z-10 flex items-center justify-center gap-4 pb-8"
                >
                    <svg
                        className="h-4 w-4 text-zinc-600"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                        strokeWidth={1.5}
                    >
                        <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            d="M19 14l-7 7m0 0l-7-7m7 7V3"
                        />
                    </svg>
                    <span className="font-mono text-[9px] uppercase tracking-[0.4em] text-zinc-600">
                        Continue to scroll
                    </span>
                    <svg
                        className="h-4 w-4 text-zinc-600"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                        strokeWidth={1.5}
                    >
                        <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            d="M19 14l-7 7m0 0l-7-7m7 7V3"
                        />
                    </svg>
                </motion.div>
            </div>
        </section>
    );
}
