"use client";

import type { ReactNode } from "react";
import { motion } from "motion/react";
import { cn } from "@/lib/utils";

type ServiceSectionCardProps = {
  children: ReactNode;
  className?: string;
  delay?: number;
};

export function ServiceSectionCard({ children, className, delay = 0 }: ServiceSectionCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 18 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-48px" }}
      transition={{ duration: 0.45, delay, ease: [0.21, 0.47, 0.32, 0.98] }}
      className={cn(
        "group relative overflow-hidden rounded-xl border border-white/10 bg-zinc-950/40 p-5 text-zinc-300 backdrop-blur-sm",
        "shadow-[0_-20px_80px_-20px_rgba(255,255,255,0.06)_inset]",
        "transition-[transform,box-shadow,border-color] duration-300 hover:-translate-y-1 hover:border-white/20 hover:shadow-[0_-24px_90px_-18px_rgba(255,255,255,0.12)_inset]",
        className,
      )}
    >
      <div className="pointer-events-none absolute inset-0 bg-gradient-to-br from-white/[0.04] to-transparent opacity-0 transition-opacity duration-500 group-hover:opacity-100" />
      <div className="relative z-10">{children}</div>
    </motion.div>
  );
}
