import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { DeferredParticles } from "@/components/DeferredParticles";
import { ClientMobileNav } from "@/components/ClientMobileNav";
import { TiltServiceCard } from "@/components/services/TiltServiceCard";

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
        <DeferredParticles className="pointer-events-none absolute inset-0" quantity={120} staticity={35} ease={50} color="#ffffff" refresh />
        <div className="relative z-10 max-w-3xl">
          <p className="text-zinc-400">Need help choosing the right service page for your current stage?</p>
          <Link href="/book" className="mt-4 inline-flex items-center gap-2 text-white underline underline-offset-4">
            Book a strategy call <ArrowRight className="h-4 w-4" />
          </Link>
        </div>
      </section>

      <Footer />
      <ClientMobileNav />
    </main>
  );
}
