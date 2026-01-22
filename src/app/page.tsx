import { Navbar } from "@/components/Navbar"
import { Logo } from "@/components/Logo"
import { Hero } from "@/components/Hero"
import { BentoServices } from "@/components/BentoServices"
import { SelectedWork } from "@/components/SelectedWork"
import { Button } from "@/components/ui/button"
import { ArrowRight, Code2, Database, LayoutTemplate, Server, Box, Github } from "lucide-react"
import Link from "next/link"
import Marquee from "@/components/magicui/marquee"
import { Testimonials } from "@/components/Testimonials"
import { Cta } from "@/components/Cta"
import { Process } from "@/components/Process"

import { ClientFit } from "@/components/ClientFit"
import { MobileNav } from "@/components/MobileNav"
import { Footer } from "@/components/Footer"

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
        <BentoServices />
      </section>

      {/* Client Fit Section */}
      <ClientFit />

      {/* Selected Work Section */}
      <section id="work" className="relative z-10 bg-black">
        <SelectedWork />
      </section>

      {/* Process Section */}
      <Process />

      {/* Testimonials Section */}
      <section className="relative z-10 bg-black">
        <Testimonials />
      </section>

      {/* CTA Section */}
      <Cta />

      {/* Footer */}
      <Footer />
      <MobileNav />
    </main>
  )
}
