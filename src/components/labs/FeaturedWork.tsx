"use client";

import { useRef } from "react";
import { motion, useInView, useScroll, useTransform } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import type { Template } from "@/lib/templates";
import { FlowingLine } from "./FlowingLine";
import { LabsCursor } from "./LabsCursor";

/* ── Color map per index ── */
const ACCENTS = [
    { gradient: "from-indigo-500/20 to-violet-500/10", dot: "bg-indigo-400" },
    { gradient: "from-emerald-500/20 to-cyan-500/10", dot: "bg-emerald-400" },
    { gradient: "from-rose-500/20 to-orange-500/10", dot: "bg-rose-400" },
    { gradient: "from-amber-500/20 to-yellow-500/10", dot: "bg-amber-400" },
];

/* ── Single featured project card ── */
function ProjectCard({
    template,
    index,
}: {
    template: Template;
    index: number;
}) {
    const cardRef = useRef<HTMLDivElement>(null);
    const isInView = useInView(cardRef, { once: true, margin: "-20%" });

    const { scrollYProgress } = useScroll({
        target: cardRef,
        offset: ["start end", "end start"],
    });

    // Parallax on the preview image area
    const imgY = useTransform(scrollYProgress, [0, 1], [40, -40]);
    // Subtle scale on the whole card
    const cardScale = useTransform(
        scrollYProgress,
        [0, 0.3, 0.7, 1],
        [0.92, 1, 1, 0.96]
    );

    const accent = ACCENTS[index % ACCENTS.length];
    const num = String(index + 1).padStart(2, "0");

    return (
        <motion.div
            ref={cardRef}
            style={{ scale: cardScale }}
            className="group"
        >
            <Link
                href={`/templates/${template.slug}`}
                className="relative block cursor-none overflow-hidden rounded-3xl border border-white/[0.05] bg-zinc-950 transition-all duration-700 hover:border-white/[0.12] hover:scale-[1.01]"
            >
                {/* Preview area — full width, tall aspect ratio */}
                <motion.div
                    style={{ y: imgY }}
                    className="relative aspect-[16/9] overflow-hidden bg-zinc-900"
                >
                    {template.frontmatter.shareImage ? (
                        <Image
                            src={template.frontmatter.shareImage}
                            alt={template.frontmatter.title}
                            fill
                            sizes="(max-width: 1024px) 100vw, 960px"
                            className="object-cover object-top transition-transform duration-1000 group-hover:scale-[1.03]"
                            priority={index === 0}
                        />
                    ) : (
                        <div
                            className={`absolute inset-0 bg-gradient-to-br ${accent.gradient} opacity-40`}
                        />
                    )}

                    <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-black/10" />

                    {/* Number watermark */}
                    <div className="absolute left-8 top-8">
                        <motion.span
                            initial={{ opacity: 0 }}
                            animate={isInView ? { opacity: 1 } : undefined}
                            transition={{ delay: 0.8 }}
                            className="font-mono text-6xl font-bold text-white/10 lg:text-8xl"
                        >
                            {num}
                        </motion.span>
                    </div>

                    {template.frontmatter.status === "live" && (
                        <div className="absolute right-6 top-6">
                            <span className="inline-flex items-center gap-1.5 rounded-full border border-emerald-500/25 bg-black/50 px-3 py-1 font-mono text-[10px] uppercase tracking-wider text-emerald-400 backdrop-blur-md">
                                <span className="h-1.5 w-1.5 rounded-full bg-emerald-400" />
                                Live demo
                            </span>
                        </div>
                    )}
                </motion.div>

                {/* Info bar */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={isInView ? { opacity: 1, y: 0 } : undefined}
                    transition={{
                        delay: 0.4,
                        duration: 0.8,
                        ease: [0.22, 1, 0.36, 1] as [number, number, number, number],
                    }}
                    className="flex items-start justify-between gap-6 p-8 lg:p-10"
                >
                    <div className="min-w-0 flex-1">
                        {/* Tags row */}
                        <div className="mb-3 flex flex-wrap items-center gap-2">
                            {template.frontmatter.stack
                                .slice(0, 4)
                                .map((tech, i) => (
                                    <span key={tech} className="flex items-center gap-1.5">
                                        {i > 0 && (
                                            <span className="text-zinc-700">
                                                •
                                            </span>
                                        )}
                                        <span className="font-mono text-[10px] uppercase tracking-wider text-zinc-600">
                                            {tech}
                                        </span>
                                    </span>
                                ))}
                        </div>

                        {/* Title */}
                        <h3 className="mb-2 text-2xl font-bold tracking-tight text-white transition-colors duration-300 group-hover:text-indigo-200 lg:text-3xl">
                            {template.frontmatter.title}
                        </h3>

                        {/* Description */}
                        <p className="max-w-xl text-sm leading-relaxed text-zinc-500 lg:text-base">
                            {template.frontmatter.description}
                        </p>
                    </div>

                    {/* Arrow */}
                    <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full border border-white/[0.06] transition-all duration-500 group-hover:border-white/15 group-hover:bg-white/5">
                        <svg
                            className="h-4 w-4 -rotate-45 text-zinc-500 transition-all duration-500 group-hover:rotate-0 group-hover:text-white"
                            fill="none"
                            viewBox="0 0 24 24"
                            stroke="currentColor"
                            strokeWidth={2}
                        >
                            <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                d="M13 7l5 5m0 0l-5 5m5-5H6"
                            />
                        </svg>
                    </div>
                </motion.div>
            </Link>
        </motion.div>
    );
}

/* ── Featured Work section ── */
export function FeaturedWork({
    templates,
}: {
    templates: Template[];
}) {
    const sectionRef = useRef<HTMLElement>(null);
    const headerRef = useRef<HTMLDivElement>(null);
    const cardRefs = useRef<(HTMLElement | null)[]>([]);
    const isInView = useInView(headerRef, { once: true, margin: "-100px" });

    return (
        <section
            ref={sectionRef}
            id="experiments"
            className="relative overflow-hidden bg-black py-32 lg:py-48 md:cursor-none"
        >
            {/* Lusion Labs–style invert cursor over this section */}
            <LabsCursor containerRef={sectionRef} />

            {/* Blue arc — weaves through every card, ends bottom-right */}
            <FlowingLine containerRef={sectionRef} cardRefs={cardRefs} />

            {/* Subtle background */}
            <div className="pointer-events-none absolute inset-0 z-0">
                <div className="absolute left-1/4 top-1/3 h-[50rem] w-[50rem] rounded-full bg-indigo-500/[0.015] blur-[180px]" />
                <div className="absolute bottom-1/4 right-1/3 h-[40rem] w-[40rem] rounded-full bg-purple-500/[0.015] blur-[180px]" />
            </div>

            <div className="relative z-10 mx-auto max-w-5xl px-6">
                {/* Section header */}
                <motion.div
                    ref={headerRef}
                    className="mb-20 lg:mb-28"
                >
                    <motion.p
                        initial={{ opacity: 0, x: -20 }}
                        animate={isInView ? { opacity: 1, x: 0 } : undefined}
                        transition={{ duration: 0.6 }}
                        className="mb-5 font-mono text-[10px] uppercase tracking-[0.35em] text-zinc-600"
                    >
                        Featured experiments
                    </motion.p>
                    <motion.h2
                        initial={{ opacity: 0, y: 30 }}
                        animate={isInView ? { opacity: 1, y: 0 } : undefined}
                        transition={{
                            delay: 0.15,
                            duration: 0.8,
                            ease: [0.22, 1, 0.36, 1] as [number, number, number, number],
                        }}
                        className="max-w-3xl text-4xl font-bold tracking-tight text-white lg:text-6xl"
                    >
                        Crafted with code,{" "}
                        <span className="text-zinc-700">
                            not compromises.
                        </span>
                    </motion.h2>
                </motion.div>

                {/* Project cards — stacked, single column, large */}
                <div className="space-y-8 lg:space-y-12">
                    {templates.map((template, i) => (
                        <div
                            key={template.slug}
                            ref={(el) => {
                                cardRefs.current[i] = el;
                            }}
                        >
                            <ProjectCard
                                template={template}
                                index={i}
                            />
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}
