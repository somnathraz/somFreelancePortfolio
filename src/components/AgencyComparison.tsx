"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { Check, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";

const agencyPoints = [
  "Junior developers on your project",
  "Multiple handoffs and slow communication",
  "Account managers between you and the code",
  "Scope drift with unclear ownership",
];

const studioPoints = [
  "Direct engineer — founder communication",
  "Weekly delivery with visible demos",
  "Production-ready architecture from day one",
  "You own the IP, repo and infrastructure",
];

export function AgencyComparison() {
  return (
    <section id="comparison" className="relative z-10 border-t border-white/5 bg-black px-4 py-20 md:py-28">
      <div className="mx-auto max-w-5xl">
        <div className="mb-12 text-center md:mb-16">
          <p className="mb-3 font-mono text-[11px] uppercase tracking-[0.2em] text-zinc-500">
            — The honest comparison
          </p>
          <h2 className="text-3xl font-bold tracking-tight text-white md:text-5xl">
            Agency vs Somanath Studio
          </h2>
          <p className="mx-auto mt-4 max-w-xl text-zinc-400">
            Same budget. Very different risk profile.
          </p>
        </div>

        <div className="grid gap-4 md:grid-cols-2">
          <motion.div
            initial={{ opacity: 0, y: 14 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.45 }}
            className="rounded-2xl border border-white/10 bg-white/[0.02] p-6 md:p-8"
          >
            <p className="font-mono text-[11px] uppercase tracking-widest text-zinc-500">
              Typical agency
            </p>
            <ul className="mt-6 space-y-4">
              {agencyPoints.map((point) => (
                <li key={point} className="flex items-start gap-3 text-sm text-zinc-400">
                  <X className="mt-0.5 h-4 w-4 shrink-0 text-zinc-600" />
                  {point}
                </li>
              ))}
            </ul>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 14 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.45, delay: 0.08 }}
            className="rounded-2xl border border-emerald-500/25 bg-emerald-500/[0.05] p-6 md:p-8"
          >
            <p className="font-mono text-[11px] uppercase tracking-widest text-emerald-400">
              Somanath Studio
            </p>
            <ul className="mt-6 space-y-4">
              {studioPoints.map((point) => (
                <li key={point} className="flex items-start gap-3 text-sm text-zinc-200">
                  <Check className="mt-0.5 h-4 w-4 shrink-0 text-emerald-400" />
                  {point}
                </li>
              ))}
            </ul>
          </motion.div>
        </div>

        <div className="mt-10 flex justify-center">
          <Button asChild size="lg" className="h-12 bg-white text-base text-black hover:bg-zinc-200">
            <Link href="/contact">
              Talk to an Engineer
              <ArrowRight className="ml-2 h-4 w-4" />
            </Link>
          </Button>
        </div>
      </div>
    </section>
  );
}
