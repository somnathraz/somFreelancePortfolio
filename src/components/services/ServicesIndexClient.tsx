"use client";

import Link from "next/link";
import { useState } from "react";
import { motion, useMotionTemplate, useMotionValue, useSpring } from "motion/react";
import { ArrowRight } from "lucide-react";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { MobileNav } from "@/components/MobileNav";
import { BorderBeam } from "@/components/magicui/border-beam";
import { Particles } from "@/components/ui/particles";

type ServiceItem = {
  title: string;
  href: string;
  description: string;
  accent: string;
};

const services: ServiceItem[] = [
  {
    title: "SaaS MVP Development",
    href: "/services/saas-mvp-development",
    description: "Build your first usable SaaS product fast with production-minded foundations.",
    accent: "from-blue-500/20 to-indigo-500/5",
  },
  {
    title: "Next.js Performance Optimization",
    href: "/services/nextjs-performance-optimization",
    description: "Fix slow pages, Core Web Vitals issues, and frontend/backend bottlenecks.",
    accent: "from-emerald-500/20 to-cyan-500/5",
  },
  {
    title: "Production Readiness Upgrade",
    href: "/services/production-readiness-upgrade",
    description: "Stabilize architecture, release flow, security, and maintainability after launch.",
    accent: "from-violet-500/20 to-fuchsia-500/5",
  },
  {
    title: "AI SaaS Development",
    href: "/services/ai-saas-development",
    description: "Add practical AI features that improve real product workflows and outcomes.",
    accent: "from-pink-500/20 to-purple-500/5",
  },
];

function TiltServiceCard({ service, index }: { service: ServiceItem; index: number }) {
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

export function ServicesIndexClient() {
  return (
    <main className="min-h-screen bg-black text-foreground selection:bg-white/20">
      <Navbar />

      <section className="relative overflow-hidden px-4 pb-20 pt-28 md:pt-32">
        <div className="absolute inset-0 z-0 bg-grid-white pointer-events-none [mask-image:radial-gradient(ellipse_at_center,transparent_20%,black)]" />
        <div className="pointer-events-none absolute inset-0 flex items-center justify-center bg-transparent [mask-image:radial-gradient(ellipse_at_center,transparent_20%,black)]">
          <div className="h-[24rem] w-[24rem] rounded-full bg-indigo-500/20 blur-[110px]" />
        </div>

        <div className="relative z-10 container mx-auto max-w-6xl">
          <p className="mb-4 text-xs font-mono uppercase tracking-widest text-zinc-500">Services</p>
          <h1 className="text-4xl font-bold tracking-tight text-white md:text-6xl">SaaS-focused engineering services</h1>
          <p className="mt-5 max-w-3xl text-lg text-zinc-400">
            Choose the service page that matches your stage and problem. Every page follows the same premium structure: clarity, proof, process, and next steps.
          </p>

          <div className="mt-12 grid gap-5 md:grid-cols-2">
            {services.map((service, index) => (
              <TiltServiceCard key={service.href} service={service} index={index} />
            ))}
          </div>
        </div>

        <div className="pointer-events-none absolute -bottom-8 left-0 right-0 z-20 h-32 bg-gradient-to-t from-black to-transparent" />
      </section>

      <section className="relative flex w-full flex-col items-center justify-center overflow-hidden border-t border-white/10 bg-black px-4 py-24 text-center">
        <div className="pointer-events-none absolute inset-0 bg-gradient-to-b from-zinc-900/50 to-black" />
        <Particles className="pointer-events-none absolute inset-0" quantity={120} staticity={35} ease={50} color="#ffffff" refresh />
        <div className="relative z-10 max-w-3xl">
          <p className="text-zinc-400">Need help choosing the right service page for your current stage?</p>
          <Link href="/book" className="mt-4 inline-flex items-center gap-2 text-white underline underline-offset-4">
            Book a strategy call <ArrowRight className="h-4 w-4" />
          </Link>
        </div>
      </section>

      <Footer />
      <MobileNav />
    </main>
  );
}
