"use client";

import { useRef, useState, useEffect } from "react";
import { motion, useInView } from "motion/react";
import { RefreshCw } from "lucide-react";
import { FlickeringGrid } from "@/components/ui/flickering-grid";
import { cn } from "@/lib/utils";

// ─── Types ────────────────────────────────────────────────────────────────────

export interface ServiceTransformation {
  metric: string;
  label: string;
  before: { value: string; note: string };
  after: { value: string; note: string };
  delta: string;
  color: "emerald" | "blue" | "purple" | "amber" | "pink" | "violet";
}

// ─── Color map (all static strings for Tailwind JIT) ─────────────────────────

const transformColor: Record<string, { text: string; bg: string; border: string; glow: string }> = {
  emerald: {
    text: "text-emerald-400",
    bg: "bg-emerald-500/10",
    border: "border-emerald-500/25",
    glow: "shadow-[0_0_30px_-8px_rgba(52,211,153,0.3)]",
  },
  blue: {
    text: "text-blue-400",
    bg: "bg-blue-500/10",
    border: "border-blue-500/25",
    glow: "shadow-[0_0_30px_-8px_rgba(59,130,246,0.3)]",
  },
  purple: {
    text: "text-purple-400",
    bg: "bg-purple-500/10",
    border: "border-purple-500/25",
    glow: "shadow-[0_0_30px_-8px_rgba(168,85,247,0.3)]",
  },
  amber: {
    text: "text-amber-400",
    bg: "bg-amber-500/10",
    border: "border-amber-500/25",
    glow: "shadow-[0_0_30px_-8px_rgba(245,158,11,0.3)]",
  },
  pink: {
    text: "text-pink-400",
    bg: "bg-pink-500/10",
    border: "border-pink-500/25",
    glow: "shadow-[0_0_30px_-8px_rgba(236,72,153,0.3)]",
  },
  violet: {
    text: "text-violet-400",
    bg: "bg-violet-500/10",
    border: "border-violet-500/25",
    glow: "shadow-[0_0_30px_-8px_rgba(139,92,246,0.3)]",
  },
};

// ─── Props ────────────────────────────────────────────────────────────────────

interface SectionOutcomesBoardProps {
  transformations: ServiceTransformation[];
  subLabel?: string;
  description?: string;
  flickerColor?: string;
}

// ─── Component ────────────────────────────────────────────────────────────────

export function SectionOutcomesBoard({
  transformations,
  subLabel = "— transformation results",
  description = "These are the kinds of changes that actually happen — not vague promises, but specific before-and-after shifts that users feel and businesses measure.",
  flickerColor = "#34d399",
}: SectionOutcomesBoardProps) {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-60px" });
  const [flipped, setFlipped] = useState<boolean[]>(() => transformations.map(() => false));

  useEffect(() => {
    if (!inView) return;
    const timers: ReturnType<typeof setTimeout>[] = [];
    transformations.forEach((_, i) => {
      const t = setTimeout(() => {
        setFlipped((prev) => {
          const next = [...prev];
          next[i] = true;
          return next;
        });
      }, 800 + i * 200);
      timers.push(t);
    });
    return () => timers.forEach(clearTimeout);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [inView]);

  return (
    <section ref={ref} className="relative border-b border-white/5 px-4 py-24 overflow-hidden">
      {/* Flickering background */}
      <div className="pointer-events-none absolute inset-0">
        <FlickeringGrid
          className="absolute inset-0 z-0"
          squareSize={4}
          gridGap={8}
          color={flickerColor}
          maxOpacity={0.04}
          flickerChance={0.04}
        />
        <div className="absolute inset-0 bg-gradient-to-b from-black via-transparent to-black" />
      </div>

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
                Typical outcomes
              </h2>
              <p className="mt-4 max-w-xl text-zinc-400 leading-relaxed">{description}</p>
            </div>
            <div className="shrink-0 flex items-center gap-2 font-mono text-[11px]">
              <RefreshCw className="w-3 h-3 text-emerald-400" />
              <span className="text-zinc-500">Cards flip to show after state</span>
            </div>
          </div>
        </motion.div>

        {/* Transformation cards */}
        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {transformations.map((t, i) => {
            const c = transformColor[t.color] ?? transformColor.emerald;
            const isFlipped = flipped[i];

            return (
              <motion.div
                key={`${t.label}-${i}`}
                initial={{ opacity: 0, y: 24 }}
                animate={inView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.5, delay: i * 0.07, ease: [0.22, 1, 0.36, 1] }}
                style={{ perspective: "900px" }}
                className="cursor-default"
              >
                <motion.div
                  whileHover={{ rotateY: 3, rotateX: -1.5, scale: 1.02 }}
                  transition={{ type: "spring", stiffness: 400, damping: 30 }}
                  style={{ transformStyle: "preserve-3d" }}
                  className={cn(
                    "relative rounded-2xl border p-6 overflow-hidden transition-all duration-700",
                    isFlipped
                      ? cn("bg-zinc-950/70 backdrop-blur-sm", c.border, c.glow)
                      : "border-red-500/15 bg-zinc-950/60 backdrop-blur-sm",
                  )}
                >
                  {/* State indicator */}
                  <div className="flex items-center justify-between mb-5">
                    <motion.div
                      animate={
                        isFlipped
                          ? { backgroundColor: "rgba(52,211,153,0.1)", borderColor: "rgba(52,211,153,0.25)" }
                          : { backgroundColor: "rgba(239,68,68,0.1)", borderColor: "rgba(239,68,68,0.25)" }
                      }
                      transition={{ duration: 0.6 }}
                      className="inline-flex items-center gap-1.5 rounded-full border px-2.5 py-1"
                    >
                      <motion.span
                        animate={isFlipped ? { backgroundColor: "#34d399" } : { backgroundColor: "#f87171" }}
                        transition={{ duration: 0.6 }}
                        className="w-1.5 h-1.5 rounded-full"
                      />
                      <motion.span
                        animate={isFlipped ? { color: "#34d399" } : { color: "#f87171" }}
                        transition={{ duration: 0.4 }}
                        className="font-mono text-[10px] uppercase tracking-wider font-bold"
                      >
                        {isFlipped ? "RESOLVED" : "ACTIVE"}
                      </motion.span>
                    </motion.div>
                    <span className="font-mono text-[10px] text-zinc-600 uppercase tracking-widest">{t.label}</span>
                  </div>

                  {/* Main metric */}
                  <div className="mb-4">
                    <motion.p
                      animate={isFlipped ? { color: "#fff" } : { color: "#f87171" }}
                      transition={{ duration: 0.5 }}
                      className="text-4xl font-bold tabular-nums tracking-tight leading-none mb-1"
                    >
                      {isFlipped ? t.after.value : t.before.value}
                    </motion.p>
                    <motion.p
                      animate={
                        isFlipped ? { color: "rgba(161,161,170,0.8)" } : { color: "rgba(161,161,170,0.5)" }
                      }
                      transition={{ duration: 0.5 }}
                      className="text-xs leading-relaxed"
                    >
                      {isFlipped ? t.after.note : t.before.note}
                    </motion.p>
                  </div>

                  {/* Delta badge (after only) */}
                  {isFlipped && (
                    <motion.div
                      initial={{ opacity: 0, y: 6 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.2, duration: 0.35 }}
                      className={cn(
                        "inline-flex items-center gap-1 rounded-full px-2.5 py-0.5 font-mono text-[11px] font-bold border",
                        c.bg,
                        c.border,
                        c.text,
                      )}
                    >
                      {t.delta} improvement
                    </motion.div>
                  )}
                </motion.div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
