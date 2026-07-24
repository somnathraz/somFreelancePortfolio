import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { DeferredParticles } from "@/components/DeferredParticles";
import { ClientMobileNav } from "@/components/ClientMobileNav";
import { TiltServiceCard } from "@/components/services/TiltServiceCard";
import { DeliveryModelSection } from "@/components/DeliveryModelSection";
import { FlexibleTeamSection } from "@/components/FlexibleTeamSection";

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
    title: "Custom Software Development",
    href: "/services/custom-software-development",
    description: "Internal tools, booking systems, logistics platforms, and business software.",
    accent: "from-cyan-500/20 to-sky-500/5",
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
    description: "Audit and harden fragile MVPs before they crack under growth.",
    accent: "from-violet-500/20 to-fuchsia-500/5",
  },
  {
    title: "AI SaaS Development",
    href: "/services/ai-saas-development",
    description: "Add practical AI features that improve real product workflows and outcomes.",
    accent: "from-pink-500/20 to-purple-500/5",
  },
];

const stageMap = [
  { stage: "Idea or validated concept", service: "SaaS MVP Development" },
  { stage: "Existing slow product", service: "Next.js Performance" },
  { stage: "Fragile or rushed MVP", service: "Production Readiness" },
  { stage: "AI feature or AI-first product", service: "AI SaaS Development" },
  { stage: "Broader business software", service: "Custom Software Development" },
] as const;

const faqs = [
  {
    q: "Do I work with one engineer or a team?",
    a: "Every engagement is senior-led. Focused work stays with one engineer. MVPs and larger platforms add specialists only when the scope needs them.",
  },
  {
    q: "Is this an agency with account managers?",
    a: "No. You work directly with the engineers building the product. No sales-to-development handoff.",
  },
  {
    q: "Can agencies white-label the work?",
    a: "Yes. See the agency development partner page for white-label delivery, NDAs, and no-poaching terms.",
  },
] as const;

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
          <h1 className="text-4xl font-bold tracking-tight text-white md:text-6xl">
            Senior-Led SaaS Engineering Services
          </h1>
          <p className="mt-5 max-w-3xl text-lg text-zinc-400">
            Direct access like working with a senior engineer. Delivery capacity like working with a
            complete product team. Choose the engagement that matches your product stage.
          </p>

          <div className="mt-12 grid gap-5 md:grid-cols-2">
            {services.map((service, index) => (
              <TiltServiceCard key={service.href} service={service} index={index} />
            ))}
          </div>
        </div>

        <div className="pointer-events-none absolute -bottom-8 left-0 right-0 z-20 h-32 bg-gradient-to-t from-black to-transparent" />
      </section>

      <section className="border-t border-white/5 px-4 py-20">
        <div className="container mx-auto max-w-6xl">
          <h2 className="text-3xl font-bold tracking-tight text-white md:text-4xl">
            Which service fits your stage?
          </h2>
          <div className="mt-10 overflow-x-auto">
            <table className="w-full min-w-[480px] border-collapse text-left">
              <thead>
                <tr className="border-b border-white/10">
                  <th className="pb-4 pr-6 text-xs font-medium uppercase tracking-widest text-zinc-500">
                    Product stage
                  </th>
                  <th className="pb-4 text-xs font-medium uppercase tracking-widest text-zinc-500">
                    Relevant service
                  </th>
                </tr>
              </thead>
              <tbody>
                {stageMap.map((row) => (
                  <tr key={row.stage} className="border-b border-white/5">
                    <td className="py-4 pr-6 text-sm text-zinc-300">{row.stage}</td>
                    <td className="py-4 text-sm font-medium text-white">{row.service}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </section>

      <FlexibleTeamSection />
      <DeliveryModelSection />

      <section className="border-t border-white/5 px-4 py-20">
        <div className="container mx-auto max-w-6xl">
          <h2 className="text-3xl font-bold tracking-tight text-white md:text-4xl">FAQ</h2>
          <div className="mt-8 grid gap-6 md:grid-cols-3">
            {faqs.map((item) => (
              <div key={item.q} className="border-t border-white/15 pt-5">
                <h3 className="text-base font-semibold text-white">{item.q}</h3>
                <p className="mt-3 text-sm text-zinc-400">{item.a}</p>
              </div>
            ))}
          </div>
          <div className="mt-10">
            <Link href="/case-studies" className="text-sm text-zinc-300 underline underline-offset-4 hover:text-white">
              See case study proof
            </Link>
          </div>
        </div>
      </section>

      <section className="relative flex w-full flex-col items-center justify-center overflow-hidden border-t border-white/10 bg-black px-4 py-24 text-center">
        <div className="pointer-events-none absolute inset-0 bg-gradient-to-b from-zinc-900/50 to-black" />
        <DeferredParticles className="pointer-events-none absolute inset-0" quantity={120} staticity={35} ease={50} color="#ffffff" refresh />
        <div className="relative z-10 max-w-3xl">
          <p className="text-zinc-400">
            Not sure which service fits? Tell an engineer what you&apos;re building.
          </p>
          <Link href="/contact" className="mt-4 inline-flex items-center gap-2 text-white underline underline-offset-4">
            Talk to an Engineer <ArrowRight className="h-4 w-4" />
          </Link>
        </div>
      </section>

      <Footer />
      <ClientMobileNav />
    </main>
  );
}
