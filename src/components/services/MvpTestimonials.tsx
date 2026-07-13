"use client";

import { useRef } from "react";
import { motion, useInView } from "motion/react";

const reviews = [
  {
    quote:
      "I needed someone who could own the product end-to-end — not hand me tickets. We went from a messy idea to a live storefront taking real orders.",
    role: "Founder",
    context: "Seafood commerce platform",
    result: "Live multi-city orders",
  },
  {
    quote:
      "Clear scope, weekly demos, and no agency fluff. I always knew what was shipping next and why it mattered for customers.",
    role: "Non-technical founder",
    context: "SaaS MVP engagement",
    result: "Shipped first release",
  },
  {
    quote:
      "Our ops team needed a real dashboard — fleet, shipments, roles — not a prototype. He built something we actually run the business on.",
    role: "Operations lead",
    context: "Transport / logistics SaaS",
    result: "Production ops system",
  },
  {
    quote:
      "He bridged product and engineering for us. Fast decisions, solid architecture, and code we could keep building on after handover.",
    role: "Startup founder",
    context: "AI-enabled product build",
    result: "Owned codebase + launch",
  },
];

export function MvpTestimonials() {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-60px" });

  return (
    <section ref={ref} className="relative overflow-hidden border-b border-white/5 px-4 py-20">
      <div className="pointer-events-none absolute inset-0 bg-grid-white/[0.02]" />
      <div className="container relative z-10 mx-auto max-w-6xl">
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.45 }}
        >
          <p className="font-mono text-[11px] uppercase tracking-[0.2em] text-zinc-500">
            — founder feedback
          </p>
          <h2 className="mt-3 text-3xl font-bold tracking-tight text-white md:text-5xl">
            What working together feels like
          </h2>
          <p className="mt-3 max-w-2xl text-zinc-400">
            Direct engineer. Clear milestones. Products that leave the building — not endless
            status updates.
          </p>
        </motion.div>

        <div className="mt-10 grid gap-4 md:grid-cols-2">
          {reviews.map((item, i) => (
            <motion.blockquote
              key={item.context}
              initial={{ opacity: 0, y: 18 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.45, delay: 0.08 + i * 0.08 }}
              className="relative overflow-hidden rounded-2xl border border-white/10 bg-zinc-950/50 p-6"
            >
              <span className="pointer-events-none absolute right-4 top-2 font-serif text-6xl leading-none text-white/[0.06]">
                &ldquo;
              </span>
              <p className="relative text-[15px] leading-relaxed text-zinc-300">
                {item.quote}
              </p>
              <footer className="mt-5 flex items-end justify-between gap-3 border-t border-white/5 pt-4">
                <div>
                  <p className="text-sm font-medium text-white">{item.role}</p>
                  <p className="mt-0.5 text-xs text-zinc-500">{item.context}</p>
                </div>
                <p className="shrink-0 rounded-full border border-emerald-400/20 bg-emerald-400/10 px-2.5 py-1 font-mono text-[10px] text-emerald-300">
                  {item.result}
                </p>
              </footer>
            </motion.blockquote>
          ))}
        </div>
      </div>
    </section>
  );
}
