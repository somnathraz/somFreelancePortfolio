"use client";

import Link from "next/link";
import { useState } from "react";
import { motion, useMotionTemplate, useMotionValue, useSpring } from "motion/react";
import { ArrowRight } from "lucide-react";
import { BorderBeam } from "@/components/magicui/border-beam";

type ServiceItem = {
  title: string;
  href: string;
  description: string;
  accent: string;
};

export function TiltServiceCard({ service, index }: { service: ServiceItem; index: number }) {
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const rotateX = useSpring(y, { stiffness: 180, damping: 18 });
  const rotateY = useSpring(x, { stiffness: 180, damping: 18 });
  const [hovered, setHovered] = useState(false);

  const glowX = useMotionValue(50);
  const glowY = useMotionValue(50);
  const glow = useMotionTemplate`radial-gradient(280px circle at ${glowX}% ${glowY}%, rgba(255,255,255,0.13), transparent 45%)`;

  const onMove = (e: React.MouseEvent<HTMLAnchorElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const px = (e.clientX - rect.left) / rect.width;
    const py = (e.clientY - rect.top) / rect.height;
    x.set((px - 0.5) * 12);
    y.set((0.5 - py) * 12);
    glowX.set(px * 100);
    glowY.set(py * 100);
  };

  const reset = () => {
    x.set(0);
    y.set(0);
    setHovered(false);
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-64px" }}
      transition={{ duration: 0.45, delay: index * 0.07 }}
      style={{ perspective: 1200 }}
    >
      <motion.div style={{ rotateX, rotateY, transformStyle: "preserve-3d" }}>
        <Link
          href={service.href}
          onMouseMove={onMove}
          onMouseEnter={() => setHovered(true)}
          onMouseLeave={reset}
          className="group relative block overflow-hidden rounded-2xl border border-white/10 bg-zinc-950/50 p-6 backdrop-blur-sm transition-colors hover:border-white/20"
        >
          <div className={`pointer-events-none absolute inset-0 bg-gradient-to-br ${service.accent} opacity-80`} />
          <motion.div className="pointer-events-none absolute inset-0" style={{ background: glow, opacity: hovered ? 1 : 0 }} />
          <div className="pointer-events-none absolute inset-0 bg-grid-white/[0.03]" />

          <div className="relative z-10">
            <h2 className="text-2xl font-semibold text-white">{service.title}</h2>
            <p className="mt-3 text-zinc-300">{service.description}</p>
            <span className="mt-6 inline-flex items-center gap-2 text-sm text-zinc-200 underline underline-offset-4">
              Open service page
              <ArrowRight className="h-4 w-4" />
            </span>
          </div>

          <BorderBeam size={220} duration={11} delay={index * 1.2} />
        </Link>
      </motion.div>
    </motion.div>
  );
}
