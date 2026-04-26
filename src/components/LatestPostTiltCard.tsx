"use client";

import Link from "next/link";
import { useState } from "react";
import { motion, useMotionTemplate, useMotionValue, useSpring } from "motion/react";
import { ArrowUpRight, Calendar, Clock } from "lucide-react";
import { BorderBeam } from "@/components/magicui/border-beam";

export type LatestPostTiltCardData = {
  slug: string;
  title: string;
  description: string;
  date: string;
  readTime?: string;
  category?: string;
};

// Gradient accents cycle so a row of cards visually alternates without
// requiring per-post manual styling. Indices align with the staggered reveal.
const accents = [
  "from-blue-500/15 via-indigo-500/10 to-transparent",
  "from-emerald-500/15 via-cyan-500/10 to-transparent",
  "from-violet-500/15 via-fuchsia-500/10 to-transparent",
  "from-amber-500/15 via-rose-500/10 to-transparent",
  "from-pink-500/15 via-purple-500/10 to-transparent",
  "from-cyan-500/15 via-blue-500/10 to-transparent",
];

const beamColors = [
  { from: "#60a5fa", to: "#818cf8" },
  { from: "#34d399", to: "#22d3ee" },
  { from: "#a78bfa", to: "#e879f9" },
  { from: "#fbbf24", to: "#fb7185" },
  { from: "#f472b6", to: "#c084fc" },
  { from: "#22d3ee", to: "#60a5fa" },
];

type Props = {
  post: LatestPostTiltCardData;
  index: number;
  /** When true, the card spans 2 columns on lg viewports (used for the featured first post). */
  featured?: boolean;
};

export function LatestPostTiltCard({ post, index, featured = false }: Props) {
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const rotateX = useSpring(y, { stiffness: 180, damping: 18 });
  const rotateY = useSpring(x, { stiffness: 180, damping: 18 });
  const [hovered, setHovered] = useState(false);

  const glowX = useMotionValue(50);
  const glowY = useMotionValue(50);
  const glow = useMotionTemplate`radial-gradient(320px circle at ${glowX}% ${glowY}%, rgba(255,255,255,0.10), transparent 50%)`;

  const onMove = (e: React.MouseEvent<HTMLAnchorElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const px = (e.clientX - rect.left) / rect.width;
    const py = (e.clientY - rect.top) / rect.height;
    // Slightly less tilt than service cards — blog cards are denser so
    // aggressive tilt makes the text uncomfortable to read on hover.
    x.set((px - 0.5) * 8);
    y.set((0.5 - py) * 8);
    glowX.set(px * 100);
    glowY.set(py * 100);
  };

  const reset = () => {
    x.set(0);
    y.set(0);
    setHovered(false);
  };

  const accent = accents[index % accents.length];
  const beam = beamColors[index % beamColors.length];

  return (
    <motion.div
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-64px" }}
      transition={{ duration: 0.5, delay: index * 0.07, ease: [0.21, 0.47, 0.32, 0.98] }}
      style={{ perspective: 1200 }}
      className={featured ? "lg:col-span-2 lg:row-span-1" : ""}
    >
      <motion.div style={{ rotateX, rotateY, transformStyle: "preserve-3d" }} className="h-full">
        <Link
          href={`/blog/${post.slug}`}
          onMouseMove={onMove}
          onMouseEnter={() => setHovered(true)}
          onMouseLeave={reset}
          className="group relative flex h-full flex-col overflow-hidden rounded-2xl border border-white/10 bg-zinc-950/60 p-6 backdrop-blur-sm transition-colors duration-300 hover:border-white/25 md:p-7"
        >
          {/* Layered backgrounds: gradient accent, hover glow, subtle grid */}
          <div className={`pointer-events-none absolute inset-0 bg-gradient-to-br ${accent} opacity-70`} />
          <motion.div
            className="pointer-events-none absolute inset-0"
            style={{ background: glow, opacity: hovered ? 1 : 0 }}
          />
          <div className="pointer-events-none absolute inset-0 bg-grid-white/[0.03]" />

          {/* Top fade — gives the title some breathing room against the gradient */}
          <div className="pointer-events-none absolute inset-x-0 top-0 h-24 bg-gradient-to-b from-black/40 to-transparent" />

          <article className="relative z-10 flex h-full flex-col">
            <div className="flex items-center justify-between">
              {post.category ? (
                <span className="inline-flex w-fit items-center rounded-full border border-white/15 bg-white/5 px-2.5 py-1 text-[10px] font-medium uppercase tracking-widest text-zinc-300">
                  {post.category}
                </span>
              ) : (
                <span />
              )}

              <span
                className="inline-flex h-8 w-8 items-center justify-center rounded-full border border-white/10 bg-white/5 text-zinc-300 transition-all duration-300 group-hover:border-white/30 group-hover:bg-white/10 group-hover:text-white"
                aria-hidden
              >
                <ArrowUpRight className="h-4 w-4 transition-transform duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
              </span>
            </div>

            <h3
              className={
                featured
                  ? "mt-6 text-2xl font-semibold leading-snug text-white md:text-3xl"
                  : "mt-6 text-lg font-semibold leading-snug text-white md:text-xl"
              }
            >
              {post.title}
            </h3>

            <p
              className={
                featured
                  ? "mt-3 line-clamp-3 text-sm leading-relaxed text-zinc-400 md:text-base"
                  : "mt-3 line-clamp-3 text-sm leading-relaxed text-zinc-400"
              }
            >
              {post.description}
            </p>

            <div className="mt-auto flex items-center gap-4 pt-6 text-[11px] font-mono text-zinc-500">
              <span className="inline-flex items-center gap-1.5">
                <Calendar className="h-3 w-3" aria-hidden />
                <time dateTime={post.date}>{post.date}</time>
              </span>
              {post.readTime && (
                <span className="inline-flex items-center gap-1.5">
                  <Clock className="h-3 w-3" aria-hidden />
                  {post.readTime}
                </span>
              )}
            </div>
          </article>

          <BorderBeam
            size={featured ? 280 : 220}
            duration={12}
            delay={index * 1.4}
            colorFrom={beam.from}
            colorTo={beam.to}
          />
        </Link>
      </motion.div>
    </motion.div>
  );
}
