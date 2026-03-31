"use client";

import { useRef } from "react";
import { motion, useInView } from "motion/react";
import { ChevronRight } from "lucide-react";
import { cn } from "@/lib/utils";
import type { LucideIcon } from "lucide-react";

// ─── Types ────────────────────────────────────────────────────────────────────

export interface ServicePhase {
  id: string;
  label: string;
  Icon: LucideIcon;
  accent: string; // e.g. "text-blue-400"
  border: string; // e.g. "border-blue-500/30"
  bg: string;     // e.g. "bg-blue-500/5"
  glow: string;   // e.g. "shadow-[0_0_40px_-10px_rgba(59,130,246,0.3)]"
  items: string[];
}

// ─── Props ────────────────────────────────────────────────────────────────────

interface SectionPhasedPipelineProps {
  phases: ServicePhase[];
  subLabel?: string;
  description?: string;
}

// ─── Component ────────────────────────────────────────────────────────────────

export function SectionPhasedPipeline({
  phases,
  subLabel = "— work plan generated",
  description = "The goal is not just a deliverables list — it is a product that is meaningfully easier to maintain, faster to ship, and more resilient under real-world conditions.",
}: SectionPhasedPipelineProps) {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-60px" });

  const phasesSummary = `${phases.length} phases · ${phases.reduce((acc, p) => acc + p.items.length, 0)} deliverables`;
  const phasesFlow = phases.map((p) => p.label).join(" → ");

  return (
    <section ref={ref} className="relative border-b border-white/5 px-4 py-24 overflow-hidden">
      <div className="pointer-events-none absolute inset-0 bg-grid-white/[0.02]" />
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
            <div>
              <h2 className="text-4xl font-bold tracking-tight text-white md:text-5xl leading-[1.05]">
                What you get
              </h2>
              <p className="mt-4 max-w-xl text-zinc-400 leading-relaxed">{description}</p>
            </div>
            <div className="shrink-0 font-mono text-[11px] text-zinc-600 space-y-1">
              <p className="text-zinc-400 font-semibold">{phasesSummary}</p>
              <p>{phasesFlow}</p>
            </div>
          </div>
        </motion.div>

        {/* Phase connector line (desktop only) */}
        <div className="relative hidden lg:block mb-8">
          <div className="absolute top-5 left-[12.5%] right-[12.5%] h-px bg-white/[0.06]" />
          <motion.div
            className="absolute top-5 left-[12.5%] h-px bg-gradient-to-r from-blue-500/60 via-amber-500/60 via-purple-500/60 to-emerald-500/60"
            initial={{ width: "0%" }}
            animate={inView ? { width: "75%" } : { width: "0%" }}
            transition={{ duration: 1.4, delay: 0.3, ease: "easeOut" }}
          />
          <div className="grid grid-cols-4 gap-4">
            {phases.map((phase, i) => (
              <motion.div
                key={phase.id}
                initial={{ opacity: 0, y: 8 }}
                animate={inView ? { opacity: 1, y: 0 } : {}}
                transition={{ delay: 0.3 + i * 0.12, duration: 0.4 }}
                className="flex flex-col items-center gap-2"
              >
                <div
                  className={cn(
                    "w-10 h-10 rounded-full border-2 flex items-center justify-center z-10 bg-black",
                    phase.border,
                  )}
                >
                  <phase.Icon className={cn("w-4 h-4", phase.accent)} />
                </div>
                <span className={cn("font-mono text-[10px] uppercase tracking-widest font-bold", phase.accent)}>
                  {phase.label}
                </span>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Phase cards */}
        <div className="grid gap-5 lg:grid-cols-4">
          {phases.map((phase, i) => (
            <motion.div
              key={phase.id}
              initial={{ opacity: 0, y: 28 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.55, delay: 0.5 + i * 0.1, ease: [0.22, 1, 0.36, 1] }}
              style={{ perspective: "900px" }}
            >
              <motion.div
                whileHover={{ rotateY: 2, rotateX: -1, scale: 1.01 }}
                transition={{ type: "spring", stiffness: 400, damping: 30 }}
                style={{ transformStyle: "preserve-3d" }}
                className={cn(
                  "relative h-full rounded-2xl border p-5 overflow-hidden",
                  "bg-zinc-950/60 backdrop-blur-sm",
                  phase.border,
                  phase.glow,
                  "transition-shadow duration-300",
                )}
              >
                {/* Phase label */}
                <div className="flex items-center justify-between mb-5">
                  <div
                    className={cn(
                      "flex items-center gap-2 rounded-lg border px-2.5 py-1.5",
                      phase.bg,
                      phase.border,
                    )}
                  >
                    <phase.Icon className={cn("w-3.5 h-3.5", phase.accent)} />
                    <span className={cn("font-mono text-[10px] uppercase tracking-wider font-bold", phase.accent)}>
                      {phase.label}
                    </span>
                  </div>
                  <span className="font-mono text-[10px] text-zinc-700">{phase.id}</span>
                </div>

                {/* Items */}
                <ul className="space-y-3">
                  {phase.items.map((item, j) => (
                    <motion.li
                      key={item}
                      initial={{ opacity: 0, x: -8 }}
                      animate={inView ? { opacity: 1, x: 0 } : {}}
                      transition={{ delay: 0.7 + i * 0.1 + j * 0.06, duration: 0.35 }}
                      className="flex items-start gap-2.5 text-xs text-zinc-400 leading-relaxed"
                    >
                      <ChevronRight className={cn("w-3 h-3 mt-0.5 shrink-0", phase.accent)} />
                      <span>{item}</span>
                    </motion.li>
                  ))}
                </ul>
              </motion.div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
