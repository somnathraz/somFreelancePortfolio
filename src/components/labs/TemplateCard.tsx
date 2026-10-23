"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import type { TemplateFrontmatter } from "@/lib/templates";

interface TemplateCardProps {
    slug: string;
    frontmatter: TemplateFrontmatter;
    index: number;
}

const STATUS_STYLES = {
    live: "bg-emerald-500/10 text-emerald-400 border-emerald-500/20",
    "coming-soon": "bg-amber-500/10 text-amber-400 border-amber-500/20",
    beta: "bg-indigo-500/10 text-indigo-400 border-indigo-500/20",
} as const;

const STATUS_LABELS = {
    live: "Live",
    "coming-soon": "Coming Soon",
    beta: "Beta",
} as const;

const DIFFICULTY_COLORS = {
    Beginner: "text-emerald-400",
    Intermediate: "text-amber-400",
    Advanced: "text-rose-400",
} as const;

export function TemplateCard({ slug, frontmatter, index }: TemplateCardProps) {
    const ref = useRef<HTMLDivElement>(null);
    const isInView = useInView(ref, { once: true, margin: "-100px" });

    return (
        <motion.div
            ref={ref}
            initial={{ opacity: 0, y: 60 }}
            animate={isInView ? { opacity: 1, y: 0 } : undefined}
            transition={{
                duration: 0.8,
                delay: index * 0.15,
                ease: [0.25, 0.46, 0.45, 0.94],
            }}
        >
            <Link
                href={`/templates/${slug}`}
                className="group relative block overflow-hidden rounded-2xl border border-white/[0.06] bg-white/[0.02] transition-all duration-500 hover:border-white/15 hover:bg-white/[0.04]"
            >
                {/* Preview area */}
                <div className="relative aspect-[16/10] overflow-hidden bg-zinc-900">
                    {frontmatter.shareImage ? (
                        <Image
                            src={frontmatter.shareImage}
                            alt={frontmatter.title}
                            fill
                            sizes="(max-width: 768px) 100vw, 50vw"
                            className="object-cover object-top transition-transform duration-700 group-hover:scale-[1.03]"
                        />
                    ) : (
                        <div className="absolute inset-0 bg-gradient-to-br from-indigo-500/5 to-purple-500/5" />
                    )}

                    {/* Status badge */}
                    <div className="absolute right-4 top-4 z-10">
                        <span
                            className={`inline-flex items-center rounded-full border px-2.5 py-0.5 font-mono text-[10px] uppercase tracking-wider backdrop-blur-md ${STATUS_STYLES[frontmatter.status]}`}
                        >
                            {STATUS_LABELS[frontmatter.status]}
                        </span>
                    </div>

                    {/* Hover overlay */}
                    <div className="absolute inset-0 flex items-center justify-center bg-black/0 transition-all duration-500 group-hover:bg-black/40">
                        <motion.span
                            initial={false}
                            className="rounded-full border border-white/20 bg-white/10 px-6 py-2.5 font-mono text-xs tracking-wider text-white opacity-0 backdrop-blur-md transition-all duration-500 group-hover:opacity-100"
                        >
                            View details
                        </motion.span>
                    </div>
                </div>

                {/* Info */}
                <div className="p-6">
                    <div className="mb-3 flex items-center gap-3">
                        <span className="font-mono text-[10px] uppercase tracking-[0.15em] text-zinc-500">
                            {frontmatter.category}
                        </span>
                        <span className="h-px flex-1 bg-white/5" />
                        <span
                            className={`font-mono text-[10px] uppercase tracking-wider ${DIFFICULTY_COLORS[frontmatter.difficulty]}`}
                        >
                            {frontmatter.difficulty}
                        </span>
                    </div>

                    <h3 className="mb-2 text-xl font-bold tracking-tight text-white transition-colors group-hover:text-indigo-300">
                        {frontmatter.title}
                    </h3>

                    <p className="mb-4 text-sm leading-relaxed text-zinc-500">
                        {frontmatter.description}
                    </p>

                    {/* Stack pills */}
                    <div className="flex flex-wrap gap-1.5">
                        {frontmatter.stack.map((tech) => (
                            <span
                                key={tech}
                                className="inline-flex rounded-md border border-white/5 bg-white/[0.03] px-2 py-0.5 font-mono text-[10px] text-zinc-500"
                            >
                                {tech}
                            </span>
                        ))}
                    </div>
                </div>
            </Link>
        </motion.div>
    );
}
