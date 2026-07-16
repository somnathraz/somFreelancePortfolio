"use client";

import { motion } from "framer-motion";
import {
  CalendarCheck,
  Code2,
  MessageSquare,
  Rocket,
  ShieldCheck,
  User,
} from "lucide-react";

const reasons = [
  {
    icon: User,
    title: "Directly work with the engineer",
    body: "No account manager, no junior handoff. You talk to the person writing the code.",
  },
  {
    icon: CalendarCheck,
    title: "Weekly milestone delivery",
    body: "You see progress every week — demos, decisions, and a clear next ship date.",
  },
  {
    icon: ShieldCheck,
    title: "Production-ready architecture",
    body: "Auth, data, payments and deploy paths are designed so you don’t rebuild after launch.",
  },
  {
    icon: Rocket,
    title: "AI + SaaS expertise",
    body: "MVPs, AI features and operational systems — not brochure sites or theme installs.",
  },
  {
    icon: Code2,
    title: "No junior developers",
    body: "Senior engineering judgment on scope, stack and tradeoffs from day one.",
  },
  {
    icon: MessageSquare,
    title: "Scalable from day one",
    body: "Clean foundation that supports the next 12 months of features without a rewrite.",
  },
];

export function WhyFoundersHire() {
  return (
    <section id="why-hire" className="relative z-10 border-t border-white/5 bg-black px-4 py-20 md:py-28">
      <div className="mx-auto max-w-6xl">
        <div className="mb-12 max-w-2xl md:mb-16">
          <p className="mb-3 font-mono text-[11px] uppercase tracking-[0.2em] text-zinc-500">
            — Why founders hire me
          </p>
          <h2 className="text-3xl font-bold tracking-tight text-white md:text-5xl">
            Why you&apos;re safer hiring me than an agency
          </h2>
          <p className="mt-4 text-lg text-zinc-400">
            Founders buying a $5k–20k build need one answer: who actually owns delivery,
            quality and communication.
          </p>
        </div>

        <div className="grid gap-x-10 gap-y-8 sm:grid-cols-2 lg:grid-cols-3">
          {reasons.map((item, i) => {
            const Icon = item.icon;
            return (
              <motion.div
                key={item.title}
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-40px" }}
                transition={{ delay: i * 0.05, duration: 0.4 }}
                className="flex gap-4"
              >
                <div className="mt-0.5 flex h-9 w-9 shrink-0 items-center justify-center rounded-lg border border-emerald-500/20 bg-emerald-500/10">
                  <Icon className="h-4 w-4 text-emerald-400" />
                </div>
                <div>
                  <h3 className="text-base font-semibold text-white">{item.title}</h3>
                  <p className="mt-1.5 text-sm leading-relaxed text-zinc-400">{item.body}</p>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
