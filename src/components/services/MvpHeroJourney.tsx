"use client";

import { useRef } from "react";
import { motion, useInView } from "motion/react";
import {
  CreditCard,
  Lightbulb,
  Palette,
  Rocket,
  Server,
  Sparkles,
} from "lucide-react";
import { cn } from "@/lib/utils";

const stages = [
  {
    icon: Lightbulb,
    label: "Discovery",
    detail: "Scope the smallest useful product",
  },
  {
    icon: Palette,
    label: "UX / UI",
    detail: "Flows founders and users understand",
  },
  {
    icon: Server,
    label: "Full-stack",
    detail: "Auth, data, APIs, admin",
  },
  {
    icon: Sparkles,
    label: "AI & payments",
    detail: "Practical features that convert",
  },
  {
    icon: CreditCard,
    label: "Billing ready",
    detail: "Checkout, plans, ownership",
  },
  {
    icon: Rocket,
    label: "Production",
    detail: "Deploy, monitor, hand over",
  },
] as const;

const stack = ["Next.js", "Node.js", "PostgreSQL", "AI APIs", "Payments", "Deploy"];

export function MvpHeroJourney() {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-40px" });

  return (
    <div ref={ref} className="relative">
      <div className="pointer-events-none absolute -inset-4 rounded-3xl bg-emerald-500/5 blur-2xl" />

      <div className="relative overflow-hidden rounded-2xl border border-white/10 bg-zinc-950/80 shadow-[0_30px_80px_-24px_rgba(0,0,0,0.85)]">
        <div className="flex items-center justify-between border-b border-white/5 px-5 py-3.5">
          <div>
            <p className="font-mono text-[10px] uppercase tracking-[0.22em] text-zinc-500">
              Product path
            </p>
            <p className="mt-1 text-sm font-semibold tracking-tight text-white">
              From idea → production
            </p>
          </div>
          <p className="hidden text-right text-xs text-zinc-500 sm:block">
            Weeks, not months
          </p>
        </div>

        <div className="relative px-5 py-5 sm:px-6 sm:py-6">
          {/* Vertical rail */}
          <div className="absolute bottom-6 left-[2.15rem] top-6 w-px bg-white/[0.06] sm:left-[2.4rem]" />
          <motion.div
            className="absolute left-[2.15rem] top-6 w-px origin-top bg-gradient-to-b from-emerald-400/70 via-white/25 to-transparent sm:left-[2.4rem]"
            initial={{ scaleY: 0 }}
            animate={inView ? { scaleY: 1 } : { scaleY: 0 }}
            transition={{ duration: 1.1, ease: "easeOut", delay: 0.15 }}
            style={{ bottom: "1.5rem" }}
          />

          <ol className="relative space-y-3.5">
            {stages.map((stage, i) => (
              <motion.li
                key={stage.label}
                initial={{ opacity: 0, x: 12 }}
                animate={inView ? { opacity: 1, x: 0 } : {}}
                transition={{ duration: 0.4, delay: 0.2 + i * 0.08 }}
                className="flex items-start gap-3.5"
              >
                <div
                  className={cn(
                    "relative z-10 flex h-9 w-9 shrink-0 items-center justify-center rounded-full border bg-black",
                    i === stages.length - 1
                      ? "border-emerald-400/50 text-emerald-300 shadow-[0_0_24px_-6px_rgba(52,211,153,0.55)]"
                      : "border-white/15 text-zinc-300"
                  )}
                >
                  <stage.icon className="h-3.5 w-3.5" />
                  {i === stages.length - 1 ? (
                    <span className="absolute -right-0.5 -top-0.5 h-2 w-2 rounded-full bg-emerald-400">
                      <span className="absolute inset-0 animate-ping rounded-full bg-emerald-400 opacity-60" />
                    </span>
                  ) : null}
                </div>
                <div className="min-w-0 pt-0.5">
                  <div className="flex items-baseline gap-2">
                    <span className="font-mono text-[10px] text-zinc-600">
                      {String(i + 1).padStart(2, "0")}
                    </span>
                    <p className="text-sm font-medium text-white">{stage.label}</p>
                  </div>
                  <p className="mt-0.5 text-xs text-zinc-500">{stage.detail}</p>
                </div>
              </motion.li>
            ))}
          </ol>
        </div>

        <div className="border-t border-white/5 px-5 py-4 sm:px-6">
          <p className="mb-2.5 font-mono text-[10px] uppercase tracking-[0.18em] text-zinc-600">
            How products get built
          </p>
          <div className="flex flex-wrap gap-1.5">
            {stack.map((item, i) => (
              <motion.span
                key={item}
                initial={{ opacity: 0, y: 6 }}
                animate={inView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.3, delay: 0.7 + i * 0.05 }}
                className="rounded-md border border-white/10 bg-white/[0.03] px-2 py-1 font-mono text-[10px] text-zinc-400"
              >
                {item}
              </motion.span>
            ))}
          </div>
          <p className="mt-3 text-xs leading-relaxed text-zinc-500">
            I don&apos;t build brochure pages. I build production SaaS — auth, data,
            billing, AI and launch included.
          </p>
        </div>
      </div>
    </div>
  );
}
