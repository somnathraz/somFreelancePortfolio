"use client";

import Link from "next/link";
import { ArrowUpRight, ExternalLink } from "lucide-react";
import { motion } from "framer-motion";

const proofProjects = [
    {
        index: "01",
        label: "Live Production App",
        project: "LocalBoyNani Seafoods",
        tagline: "Premium seafood delivery — shore to door in 120 mins",
        description:
            "Full-stack e-commerce platform for a real business. Chemical-free seafood sourced directly from coastal fishermen, delivered across Bangalore, Hyderabad & Chennai. Built solo — storefront, admin dashboard, order lifecycle, secure payments, B2B bulk ordering.",
        stack: ["Next.js", "Tailwind CSS", "Cloudflare R2", "Node.js"],
        metric: "Live & taking orders",
        metricColor: "text-emerald-400",
        borderAccent: "before:bg-emerald-500",
        link: "https://localboynaniseafoods.com",
        linkLabel: "localboynaniseafoods.com",
        external: true,
    },
    {
        index: "02",
        label: "Personal SaaS — Full Case Study",
        project: "PaperChai",
        tagline: "Invoice & payment tracking for freelancers",
        description:
            "Invoicing SaaS built to solve a real pain: scattered invoices, no cash-flow visibility, manual follow-ups. Dashboard with financial metrics, client management, invoice creation, payment status (paid / pending / overdue). Built solo in 11 days with production-grade architecture.",
        stack: ["Next.js App Router", "TypeScript", "PostgreSQL"],
        metric: "Shipped in 11 days",
        metricColor: "text-blue-400",
        borderAccent: "before:bg-blue-500",
        link: "/blog/paperchai-from-idea-to-running-saas",
        linkLabel: "Read the full build story",
        external: false,
    },
];

const fadeUp = {
    hidden: { opacity: 0, y: 28 },
    show: (i: number) => ({
        opacity: 1,
        y: 0,
        transition: { delay: i * 0.12, duration: 0.55, ease: "easeOut" as const },
    }),
};

export function Testimonials() {
    return (
        <div className="relative w-full py-28 bg-black overflow-hidden">
            {/* Subtle dot grid */}
            <div
                className="pointer-events-none absolute inset-0 opacity-30"
                style={{
                    backgroundImage:
                        "radial-gradient(circle, #ffffff12 1px, transparent 1px)",
                    backgroundSize: "40px 40px",
                }}
            />
            {/* Vignette */}
            <div className="pointer-events-none absolute inset-0 [background:radial-gradient(ellipse_80%_60%_at_50%_50%,transparent_40%,black_100%)]" />

            <div className="relative z-10 max-w-6xl mx-auto px-4 sm:px-6">

                {/* ── Header ── */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
                    className="mb-20"
                >
                    <p className="font-mono text-[11px] uppercase tracking-[0.2em] text-zinc-500 mb-5">
                        — proof of work
                    </p>
                    <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-8">
                        <h2 className="text-5xl md:text-7xl font-bold text-white leading-[0.95] tracking-tight">
                            Real projects.<br />
                            <span className="text-zinc-600">Real URLs.</span>
                        </h2>
                        <p className="text-zinc-500 text-sm leading-relaxed max-w-xs md:text-right">
                            I don&apos;t have 50 reviews from placeholder avatars.
                            I have live products you can open in a new tab right now.
                        </p>
                    </div>
                </motion.div>

                {/* ── Project Proof Cards ── */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-5 mb-20">
                    {proofProjects.map((item, i) => (
                        <motion.div
                            key={item.project}
                            custom={i}
                            variants={fadeUp}
                            initial="hidden"
                            whileInView="show"
                            viewport={{ once: true }}
                            className="group relative flex flex-col rounded-2xl border border-white/[0.07] bg-white/[0.02] p-8 overflow-hidden transition-all duration-500 hover:border-white/[0.14] hover:bg-white/[0.04]"
                        >
                            {/* Top accent line */}
                            <div
                                className={`absolute top-0 left-8 right-8 h-px ${
                                    i === 0
                                        ? "bg-gradient-to-r from-transparent via-emerald-500/60 to-transparent"
                                        : "bg-gradient-to-r from-transparent via-blue-500/60 to-transparent"
                                }`}
                            />

                            {/* Index + Label row */}
                            <div className="flex items-center justify-between mb-8">
                                <span className="font-mono text-[11px] text-zinc-600 border border-white/[0.07] px-2.5 py-1 rounded-md">
                                    {item.label}
                                </span>
                                <span
                                    className={`font-mono text-[11px] font-bold uppercase tracking-widest ${item.metricColor}`}
                                >
                                    {item.metric}
                                </span>
                            </div>

                            {/* Project name */}
                            <p className="font-mono text-[11px] uppercase tracking-widest text-zinc-600 mb-2">
                                {item.index}
                            </p>
                            <h3 className="text-2xl font-bold text-white mb-1 tracking-tight">
                                {item.project}
                            </h3>
                            <p className="text-sm text-zinc-500 italic mb-5">{item.tagline}</p>

                            {/* Description */}
                            <p className="text-sm text-zinc-400 leading-relaxed mb-7 flex-1">
                                {item.description}
                            </p>

                            {/* Stack pills */}
                            <div className="flex flex-wrap gap-2 mb-8">
                                {item.stack.map((s) => (
                                    <span
                                        key={s}
                                        className="font-mono text-[10px] text-zinc-500 bg-white/[0.04] border border-white/[0.07] px-2.5 py-0.5 rounded-full"
                                    >
                                        {s}
                                    </span>
                                ))}
                            </div>

                            {/* Link */}
                            <Link
                                href={item.link}
                                target={item.external ? "_blank" : undefined}
                                rel={item.external ? "noopener noreferrer" : undefined}
                                className={`inline-flex items-center gap-2 text-sm font-semibold transition-colors group/link ${
                                    i === 0
                                        ? "text-emerald-400 hover:text-emerald-300"
                                        : "text-blue-400 hover:text-blue-300"
                                }`}
                            >
                                {item.linkLabel}
                                {item.external ? (
                                    <ExternalLink className="w-3.5 h-3.5 transition-transform group-hover/link:translate-x-0.5 group-hover/link:-translate-y-0.5" />
                                ) : (
                                    <ArrowUpRight className="w-3.5 h-3.5 transition-transform group-hover/link:translate-x-0.5 group-hover/link:-translate-y-0.5" />
                                )}
                            </Link>
                        </motion.div>
                    ))}
                </div>

                {/* ── Honesty strip ── */}
                <motion.div
                    initial={{ opacity: 0 }}
                    whileInView={{ opacity: 1 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.7, delay: 0.2 }}
                    className="border-t border-white/[0.06] pt-10 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6"
                >
                    <div className="flex items-start gap-4">
                        <div className="mt-1 w-0.5 h-10 rounded-full bg-zinc-700 shrink-0" />
                        <p className="text-zinc-500 text-sm leading-relaxed max-w-md">
                            I&apos;m early in my freelance journey and building my track record in public.
                            These two projects are what I&apos;ve shipped. No inflated numbers, no borrowed credibility — just the work.
                        </p>
                    </div>
                    <Link
                        href="/book"
                        className="shrink-0 inline-flex items-center gap-2 text-sm font-semibold text-white border border-white/20 px-5 py-2.5 rounded-xl hover:bg-white/5 transition-all duration-200"
                    >
                        Talk to me <ArrowUpRight className="w-4 h-4" />
                    </Link>
                </motion.div>
            </div>
        </div>
    );
}
