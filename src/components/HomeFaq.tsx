"use client";

import Link from "next/link";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronDown } from "lucide-react";
import { cn } from "@/lib/utils";

const faqItems = [
  {
    q: "How much does an MVP cost?",
    a: "It depends on scope. Focused SaaS MVPs typically start from ₹75,000. Auth, billing, admin tools and AI features change the budget. We pin scope before any build starts — no surprise invoices.",
  },
  {
    q: "How long does it take?",
    a: "Many focused first versions ship in a few weeks. A clear product decision and one primary user workflow keep timelines honest. Bloated scope is what stretches projects.",
  },
  {
    q: "Is it fixed price?",
    a: "Yes for a defined MVP scope. You get a clear feature list, timeline and price before work starts. Out-of-scope requests are discussed as separate changes — not absorbed silently.",
  },
  {
    q: "Who owns the IP and source code?",
    a: "You do. Repositories, accounts, infrastructure and documentation are yours. Handover is designed so you can continue without me if needed.",
  },
  {
    q: "Do you sign NDAs?",
    a: "Yes. NDA-friendly engagement is standard for founder and agency work, including white-label arrangements.",
  },
  {
    q: "What happens after launch?",
    a: "You get handover and docs. I can continue with fixes, performance work, production upgrades and feature development — or you take it forward with your team.",
  },
];

export function HomeFaq() {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  return (
    <section id="faq" className="relative z-10 border-t border-white/5 bg-black px-4 py-20 md:py-28">
      <div className="mx-auto max-w-3xl">
        <div className="mb-12 text-center md:mb-16">
          <p className="mb-3 font-mono text-[11px] uppercase tracking-[0.2em] text-zinc-500">
            — FAQ
          </p>
          <h2 className="text-3xl font-bold tracking-tight text-white md:text-5xl">
            Questions founders ask before they buy
          </h2>
          <p className="mx-auto mt-4 max-w-xl text-zinc-400">
            Cost, timeline, ownership and support — answered plainly.
          </p>
        </div>

        <div className="divide-y divide-white/10 border-y border-white/10">
          {faqItems.map((item, i) => {
            const open = openIndex === i;
            return (
              <div key={item.q}>
                <button
                  type="button"
                  onClick={() => setOpenIndex(open ? null : i)}
                  className="flex w-full items-center justify-between gap-4 py-5 text-left"
                  aria-expanded={open}
                >
                  <span className="text-base font-medium text-white md:text-lg">{item.q}</span>
                  <ChevronDown
                    className={cn(
                      "h-5 w-5 shrink-0 text-zinc-500 transition-transform duration-200",
                      open && "rotate-180 text-zinc-300"
                    )}
                  />
                </button>
                <AnimatePresence initial={false}>
                  {open && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.25 }}
                      className="overflow-hidden"
                    >
                      <p className="pb-5 pr-8 text-sm leading-relaxed text-zinc-400 md:text-base">
                        {item.a}
                      </p>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            );
          })}
        </div>

        <p className="mt-8 text-center text-sm text-zinc-500">
          Still unsure?{" "}
          <Link href="/contact" className="text-white underline underline-offset-4 hover:text-zinc-300">
            Talk to an Engineer
          </Link>{" "}
          — or read{" "}
          <Link href="/blog/saas-mvp-cost-2026" className="text-white underline underline-offset-4 hover:text-zinc-300">
            how much a SaaS MVP costs
          </Link>
          .
        </p>
      </div>
    </section>
  );
}
