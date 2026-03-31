"use client";

import { useRef } from "react";
import { motion, useInView } from "motion/react";
import { BorderBeam } from "@/components/magicui/border-beam";
import { cn } from "@/lib/utils";
import type { LucideIcon } from "lucide-react";

// ─── Types ────────────────────────────────────────────────────────────────────

export interface WhoItsForPersona {
  Icon: LucideIcon;
  label: string;
  title: string;
  score: number;
  copy: string;
  signals: string[];
}

type AccentKey = "emerald" | "violet" | "blue";

// ─── Accent config (static strings for Tailwind JIT) ─────────────────────────

const ACCENT: Record<
  AccentKey,
  {
    text: string;
    bg: string;
    border: string;
    bar: string;
    scanVia: string;
    cardVia: string;
    dot: string;
    beamFrom: string;
  }
> = {
  emerald: {
    text: "text-emerald-400",
    bg: "bg-emerald-500/10",
    border: "border-emerald-500/20",
    bar: "bg-emerald-400",
    scanVia: "via-emerald-400/20",
    cardVia: "via-emerald-500/40",
    dot: "bg-emerald-400",
    beamFrom: "#34d399",
  },
  violet: {
    text: "text-violet-400",
    bg: "bg-violet-500/10",
    border: "border-violet-500/20",
    bar: "bg-violet-400",
    scanVia: "via-violet-400/20",
    cardVia: "via-violet-500/40",
    dot: "bg-violet-400",
    beamFrom: "#a78bfa",
  },
  blue: {
    text: "text-blue-400",
    bg: "bg-blue-500/10",
    border: "border-blue-500/20",
    bar: "bg-blue-400",
    scanVia: "via-blue-400/20",
    cardVia: "via-blue-500/40",
    dot: "bg-blue-400",
    beamFrom: "#60a5fa",
  },
};

// ─── Fit score bar ────────────────────────────────────────────────────────────

function FitScoreBar({
  score,
  bar,
  text,
  animate,
}: {
  score: number;
  bar: string;
  text: string;
  animate: boolean;
}) {
  return (
    <div className="flex items-center gap-3">
      <div className="flex-1 h-1 bg-white/[0.06] rounded-full overflow-hidden">
        <div
          className={cn("h-full rounded-full transition-all duration-[1400ms] ease-out", bar)}
          style={{ width: animate ? `${score}%` : "0%" }}
        />
      </div>
      <span className={cn("font-mono text-[10px] tabular-nums", text)}>{score}%</span>
    </div>
  );
}

// ─── Props ────────────────────────────────────────────────────────────────────

interface SectionWhoItsForProps {
  personas: WhoItsForPersona[];
  accent?: AccentKey;
  subLabel?: string;
  notFitText?: string;
}

// ─── Component ────────────────────────────────────────────────────────────────

export function SectionWhoItsFor({
  personas,
  accent = "emerald",
  subLabel = "— client fit analysis",
  notFitText = "Brochure websites, cosmetic-only redesigns, or projects where business outcomes don't depend on how the product actually performs.",
}: SectionWhoItsForProps) {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-60px" });
  const a = ACCENT[accent];

  return (
    <section ref={ref} className="relative border-b border-white/5 px-4 py-24 overflow-hidden">
      <div className="pointer-events-none absolute inset-0 bg-grid-white/[0.02]" />

      {/* Scan line */}
      <motion.div
        className={cn(
          "pointer-events-none absolute left-0 right-0 h-px bg-gradient-to-r from-transparent to-transparent",
          a.scanVia,
        )}
        animate={{ y: ["0%", "100%", "0%"] }}
        transition={{ duration: 8, repeat: Infinity, ease: "linear" }}
      />

      <div className="container relative z-10 mx-auto max-w-6xl">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="mb-14"
        >
          <p className="font-mono text-[11px] uppercase tracking-[0.2em] text-zinc-500 mb-4">{subLabel}</p>
          <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-6">
            <h2 className="text-4xl font-bold tracking-tight text-white md:text-5xl leading-[1.05]">
              Who this is for
            </h2>
            <p className="text-zinc-500 text-sm max-w-xs md:text-right leading-relaxed">
              Not for brochure-site tweaks or cosmetic fixes. This is for teams where product quality directly affects growth.
            </p>
          </div>
        </motion.div>

        {/* Persona cards */}
        <div className="grid gap-5 md:grid-cols-2">
          {personas.map((p, i) => (
            <motion.div
              key={p.label}
              initial={{ opacity: 0, y: 24 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.55, delay: i * 0.1, ease: [0.22, 1, 0.36, 1] }}
              style={{ perspective: "900px" }}
            >
              <motion.div
                whileHover={{ rotateY: 3, rotateX: -1.5, scale: 1.01 }}
                transition={{ type: "spring", stiffness: 400, damping: 30 }}
                style={{ transformStyle: "preserve-3d" }}
                className="group relative rounded-2xl border border-white/[0.08] bg-zinc-950/50 p-6 h-full overflow-hidden cursor-default"
              >
                {/* Top accent line */}
                <div
                  className={cn(
                    "absolute top-0 left-6 right-6 h-px bg-gradient-to-r from-transparent to-transparent",
                    a.cardVia,
                  )}
                />
                <BorderBeam size={150} duration={16} colorFrom={a.beamFrom} colorTo="transparent" borderWidth={0.5} />

                {/* Top row */}
                <div className="flex items-start justify-between mb-4">
                  <div className="flex items-center gap-3">
                    <div className={cn("p-2.5 rounded-xl border", a.bg, a.border)}>
                      <p.Icon className={cn("w-4 h-4", a.text)} />
                    </div>
                    <span className="font-mono text-[10px] text-zinc-600 uppercase tracking-widest">{p.label}</span>
                  </div>
                  <div className={cn("flex items-center gap-1.5 rounded-full border px-2.5 py-1", a.bg, a.border)}>
                    <span className={cn("w-1.5 h-1.5 rounded-full", a.dot)} />
                    <span className={cn("font-mono text-[10px] uppercase tracking-wider", a.text)}>Strong fit</span>
                  </div>
                </div>

                <h3 className="text-lg font-semibold text-white mb-3 leading-snug">{p.title}</h3>
                <p className="text-sm text-zinc-400 leading-relaxed mb-5">{p.copy}</p>

                {/* Fit score */}
                <div className="mb-4">
                  <div className="flex items-center justify-between mb-1.5">
                    <span className="font-mono text-[10px] text-zinc-600 uppercase tracking-widest">Fit score</span>
                  </div>
                  <FitScoreBar score={p.score} bar={a.bar} text={a.text} animate={inView} />
                </div>

                {/* Signals */}
                <div className="flex flex-wrap gap-2 pt-4 border-t border-white/[0.05]">
                  {p.signals.map((s) => (
                    <span
                      key={s}
                      className="font-mono text-[10px] text-zinc-500 bg-white/[0.04] border border-white/[0.06] px-2.5 py-0.5 rounded-full"
                    >
                      {s}
                    </span>
                  ))}
                </div>
              </motion.div>
            </motion.div>
          ))}
        </div>

        {/* Not a fit */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={inView ? { opacity: 1 } : {}}
          transition={{ delay: 0.6, duration: 0.5 }}
          className="mt-8 flex items-start gap-3 rounded-xl border border-white/[0.05] bg-white/[0.01] px-5 py-4"
        >
          <span className="mt-0.5 font-mono text-[10px] text-zinc-600 uppercase tracking-widest whitespace-nowrap">
            NOT A FIT
          </span>
          <p className="text-sm text-zinc-600">{notFitText}</p>
        </motion.div>
      </div>
    </section>
  );
}
