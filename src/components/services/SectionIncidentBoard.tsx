"use client";

import { useRef, useState, useEffect } from "react";
import { motion, useInView } from "motion/react";
import { AlertOctagon, AlertTriangle, Zap } from "lucide-react";
import { cn } from "@/lib/utils";
import type { LucideIcon } from "lucide-react";

// ─── Types ────────────────────────────────────────────────────────────────────

export interface ServiceIncident {
  severity: "CRITICAL" | "HIGH" | "MEDIUM";
  Icon: LucideIcon;
  metric: string;
  target: string;
  title: string;
  impact: string;
  accent?: string; // optional, unused by the component — kept for caller convenience
}

// ─── Severity styling ─────────────────────────────────────────────────────────

const severityConfig = {
  CRITICAL: {
    label: "CRITICAL",
    text: "text-red-400",
    bg: "bg-red-500/10",
    border: "border-red-500/30",
    pulse: true,
  },
  HIGH: {
    label: "HIGH",
    text: "text-amber-400",
    bg: "bg-amber-500/10",
    border: "border-amber-500/20",
    pulse: false,
  },
  MEDIUM: {
    label: "MEDIUM",
    text: "text-zinc-400",
    bg: "bg-zinc-500/10",
    border: "border-zinc-500/20",
    pulse: false,
  },
};

// ─── Props ────────────────────────────────────────────────────────────────────

interface SectionIncidentBoardProps {
  incidents: ServiceIncident[];
  subLabel?: string;
  description?: string;
}

// ─── Component ────────────────────────────────────────────────────────────────

export function SectionIncidentBoard({
  incidents,
  subLabel = "— active issue detection",
  description = "These are the patterns that compound quietly until they are very expensive to fix. Recognising them early is what makes the difference between a manageable upgrade and a painful rebuild.",
}: SectionIncidentBoardProps) {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-60px" });
  const [scanDone, setScanDone] = useState(false);

  useEffect(() => {
    if (!inView) return;
    const t = setTimeout(() => setScanDone(true), 1400);
    return () => clearTimeout(t);
  }, [inView]);

  const criticalCount = incidents.filter((i) => i.severity === "CRITICAL").length;
  const highCount = incidents.filter((i) => i.severity === "HIGH").length;
  const mediumCount = incidents.filter((i) => i.severity === "MEDIUM").length;

  return (
    <section ref={ref} className="relative border-b border-white/5 px-4 py-24 overflow-hidden">
      <div className="container relative z-10 mx-auto max-w-6xl">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="mb-14"
        >
          <p className="font-mono text-[11px] uppercase tracking-[0.2em] text-zinc-500 mb-4">{subLabel}</p>
          <div className="flex flex-col lg:flex-row lg:items-end lg:justify-between gap-6">
            <div>
              <h2 className="text-4xl font-bold tracking-tight text-white md:text-5xl leading-[1.05]">
                The problems I solve
              </h2>
              <p className="mt-4 max-w-xl text-zinc-400 leading-relaxed">{description}</p>
            </div>

            {/* Issue count summary */}
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={inView ? { opacity: 1, scale: 1 } : {}}
              transition={{ delay: 0.4, duration: 0.5 }}
              className="shrink-0 rounded-xl border border-white/[0.08] bg-zinc-950/60 backdrop-blur-sm px-5 py-4 font-mono text-[11px] space-y-2"
            >
              <div className="flex items-center justify-between gap-8 pb-2 border-b border-white/[0.05]">
                <span className="text-zinc-600 uppercase tracking-wider">Issues found</span>
                <motion.span
                  className="text-white font-bold"
                  animate={scanDone ? { opacity: 1 } : { opacity: 0 }}
                  transition={{ duration: 0.3 }}
                >
                  {incidents.length} total
                </motion.span>
              </div>
              {criticalCount > 0 && (
                <div className="flex items-center gap-2 text-red-400">
                  <AlertOctagon className="w-3 h-3" />
                  <span>{criticalCount} CRITICAL</span>
                </div>
              )}
              {highCount > 0 && (
                <div className="flex items-center gap-2 text-amber-400">
                  <AlertTriangle className="w-3 h-3" />
                  <span>{highCount} HIGH</span>
                </div>
              )}
              {mediumCount > 0 && (
                <div className="flex items-center gap-2 text-zinc-500">
                  <Zap className="w-3 h-3" />
                  <span>{mediumCount} MEDIUM</span>
                </div>
              )}
            </motion.div>
          </div>
        </motion.div>

        {/* Incident cards */}
        <div className="grid gap-4 md:grid-cols-2">
          {incidents.map((inc, i) => {
            const sev = severityConfig[inc.severity];
            return (
              <motion.div
                key={`${inc.metric}-${i}`}
                initial={{ opacity: 0, x: i % 2 === 0 ? -16 : 16 }}
                animate={inView ? { opacity: 1, x: 0 } : {}}
                transition={{ duration: 0.5, delay: i * 0.08 + 0.2, ease: [0.22, 1, 0.36, 1] }}
                className={cn(
                  "group relative rounded-xl border p-5 overflow-hidden",
                  "bg-zinc-950/60 backdrop-blur-sm transition-all duration-300",
                  "hover:bg-zinc-900/60",
                  inc.severity === "CRITICAL"
                    ? "border-red-500/20 hover:border-red-500/40 hover:shadow-[0_0_30px_-8px_rgba(239,68,68,0.3)]"
                    : inc.severity === "HIGH"
                      ? "border-amber-500/15 hover:border-amber-500/30 hover:shadow-[0_0_30px_-8px_rgba(245,158,11,0.2)]"
                      : "border-white/[0.06] hover:border-white/[0.1]",
                )}
              >
                {/* Critical glow on hover */}
                {inc.severity === "CRITICAL" && (
                  <div className="pointer-events-none absolute inset-0 rounded-xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 bg-red-500/[0.03]" />
                )}

                {/* Top row */}
                <div className="flex items-start justify-between mb-3">
                  <div className="flex items-center gap-2">
                    <div className={cn("p-1.5 rounded-lg border", sev.bg, sev.border)}>
                      <inc.Icon className={cn("w-3.5 h-3.5", sev.text)} />
                    </div>
                    <div
                      className={cn(
                        "inline-flex items-center gap-1.5 rounded-full px-2.5 py-0.5 font-mono text-[10px] uppercase tracking-wider border",
                        sev.bg,
                        sev.border,
                        sev.text,
                      )}
                    >
                      {sev.pulse && (
                        <span className="relative flex h-1.5 w-1.5">
                          <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-red-400 opacity-75" />
                          <span className="relative inline-flex h-1.5 w-1.5 rounded-full bg-red-500" />
                        </span>
                      )}
                      {sev.label}
                    </div>
                  </div>
                  <div className="text-right">
                    <p className={cn("font-mono text-sm font-bold tabular-nums", sev.text)}>{inc.metric}</p>
                    <p className="font-mono text-[10px] text-zinc-600">{inc.target}</p>
                  </div>
                </div>

                <h3 className="text-sm font-semibold text-white mb-2 leading-snug">{inc.title}</h3>
                <p className="text-xs text-zinc-500 leading-relaxed">{inc.impact}</p>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
