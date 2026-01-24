import { Suspense } from "react"
import dynamic from "next/dynamic"
import { Navbar } from "@/components/Navbar"
import { Hero } from "@/components/Hero"
import { Button } from "@/components/ui/button"
import { ArrowRight, Code2, Database, LayoutTemplate, Server, Box } from "lucide-react"
import Marquee from "@/components/magicui/marquee"

// Lazy load below-the-fold components
const BentoServices = dynamic(() => import("@/components/BentoServices").then(mod => ({ default: mod.BentoServices })), {
  loading: () => <div className="h-96 flex items-center justify-center"><div className="animate-pulse text-zinc-500">Loading services...</div></div>,
})

const ClientFit = dynamic(() => import("@/components/ClientFit").then(mod => ({ default: mod.ClientFit })), {
  loading: () => <div className="h-64" />,
})

const SelectedWork = dynamic(() => import("@/components/SelectedWork").then(mod => ({ default: mod.SelectedWork })), {
  loading: () => <div className="h-96 flex items-center justify-center"><div className="animate-pulse text-zinc-500">Loading work...</div></div>,
})

const Process = dynamic(() => import("@/components/Process").then(mod => ({ default: mod.Process })), {
  loading: () => <div className="h-64" />,
})

const Testimonials = dynamic(() => import("@/components/Testimonials").then(mod => ({ default: mod.Testimonials })), {
  loading: () => <div className="h-96 flex items-center justify-center"><div className="animate-pulse text-zinc-500">Loading testimonials...</div></div>,
})

const Cta = dynamic(() => import("@/components/Cta").then(mod => ({ default: mod.Cta })), {
  loading: () => <div className="h-96" />,
})

const Footer = dynamic(() => import("@/components/Footer").then(mod => ({ default: mod.Footer })), {
  loading: () => <div className="h-32" />,
})

const MobileNav = dynamic(() => import("@/components/MobileNav").then(mod => ({ default: mod.MobileNav })), {})

export default function Home() {
  return (
    <main className="min-h-screen bg-black text-foreground selection:bg-white/20">
      <Navbar />
      <Hero />

      {/* Trusted By Marquee */}
      <section className="relative z-10 mt-32 border-b border-white/5 bg-black/50 py-12 backdrop-blur-sm">
        <div className="container mx-auto px-4 mb-8 text-center">
          <span className="text-sm font-medium uppercase tracking-widest text-muted-foreground/50">
            Powering next-gen applications with
          </span>
        </div>
        <Marquee pauseOnHover className="[--duration:20s]">
          <div className="mx-8 flex items-center gap-2 text-xl font-bold text-zinc-500 transition-colors hover:text-white"><Code2 className="h-8 w-8" /> React</div>
          <div className="mx-8 flex items-center gap-2 text-xl font-bold text-zinc-500 transition-colors hover:text-white"><Server className="h-8 w-8" /> Node.js</div>
          <div className="mx-8 flex items-center gap-2 text-xl font-bold text-zinc-500 transition-colors hover:text-white"><Database className="h-8 w-8" /> MongoDB</div>
          <div className="mx-8 flex items-center gap-2 text-xl font-bold text-zinc-500 transition-colors hover:text-white"><Box className="h-8 w-8" /> Docker</div>
          <div className="mx-8 flex items-center gap-2 text-xl font-bold text-zinc-500 transition-colors hover:text-white"><LayoutTemplate className="h-8 w-8" /> AWS</div>
          <div className="mx-8 flex items-center gap-2 text-xl font-bold text-zinc-500 transition-colors hover:text-white"><Code2 className="h-8 w-8" /> Next.js</div>
          <div className="mx-8 flex items-center gap-2 text-xl font-bold text-zinc-500 transition-colors hover:text-white"><Server className="h-8 w-8" /> TypeScript</div>
        </Marquee>
      </section>

      {/* Services Section (Bento Grid) */}
      <section id="services" className="relative z-10">
        <Suspense fallback={<div className="h-96 flex items-center justify-center"><div className="animate-pulse text-zinc-500">Loading services...</div></div>}>
          <BentoServices />
        </Suspense>
      </section>

      {/* Client Fit Section */}
      <Suspense fallback={<div className="h-64" />}>
        <ClientFit />
      </Suspense>

      {/* Selected Work Section */}
      <section id="work" className="relative z-10 bg-black">
        <Suspense fallback={<div className="h-96 flex items-center justify-center"><div className="animate-pulse text-zinc-500">Loading work...</div></div>}>
          <SelectedWork />
        </Suspense>
      </section>

      {/* Process Section */}
      <Suspense fallback={<div className="h-64" />}>
        <Process />
      </Suspense>

      {/* Testimonials Section */}
      <section className="relative z-10 bg-black">
        <Suspense fallback={<div className="h-96 flex items-center justify-center"><div className="animate-pulse text-zinc-500">Loading testimonials...</div></div>}>
          <Testimonials />
        </Suspense>
      </section>

      {/* CTA Section */}
      <Suspense fallback={<div className="h-96" />}>
        <Cta />
      </Suspense>

      {/* Footer */}
      <Suspense fallback={<div className="h-32" />}>
        <Footer />
      </Suspense>
      <MobileNav />
    </main>
  )
}
