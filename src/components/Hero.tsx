"use client"

import { Button } from "@/components/ui/button"
import { ArrowRight, Terminal } from "lucide-react"
import Link from "next/link"
import { BorderBeam } from "./ui/border-beam"
import { ContactSheet } from "./ContactSheet"

export function Hero() {
    return (
        <section className="relative flex min-h-screen flex-col items-center justify-center overflow-hidden bg-background pt-24 text-center md:pt-32">
            {/* Grid Background */}
            <div className="absolute inset-0 z-0 bg-grid-white pointer-events-none [mask-image:radial-gradient(ellipse_at_center,transparent_20%,black)]"></div>

            {/* Spotlight / Radial Gradient */}
            <div className="absolute pointer-events-none inset-0 flex items-center justify-center bg-transparent [mask-image:radial-gradient(ellipse_at_center,transparent_20%,black)]">
                <div className="h-[20rem] w-[20rem] bg-indigo-500/20 blur-[100px] rounded-full"></div>
            </div>

            <div className="relative z-10 mx-auto max-w-5xl space-y-8 px-4">
                <header className="space-y-4">
                    <div className="inline-flex items-center rounded-full border border-zinc-800 bg-zinc-900/50 px-3 py-1 text-sm text-zinc-400 backdrop-blur-sm">
                        <span className="flex h-2 w-2 rounded-full bg-green-500 mr-2 animate-pulse"></span>
                        Accepting New Projects for Q2
                    </div>

                    <h1 className="text-6xl font-bold tracking-tighter text-white sm:text-7xl xl:text-8xl">
                        Your Vision. <br className="hidden md:block" />
                        <span className="text-transparent bg-clip-text bg-gradient-to-b from-white to-white/40">
                            Engineered for Scale.
                        </span>
                    </h1>

                    <p className="mx-auto max-w-2xl text-lg text-zinc-400 sm:text-xl">
                        4+ years building and scaling production SaaS systems.
                        <br />
                        Somanath Studio is the technical partner for founders building the next generation of SaaS.
                    </p>
                </header>

                <div className="flex flex-col items-center justify-center gap-4 sm:flex-row">
                    <ContactSheet>
                        <Button size="lg" className="h-12 min-w-[200px] text-base bg-white text-black hover:bg-zinc-200">
                            Hire Me
                            <ArrowRight className="ml-2 h-4 w-4" />
                        </Button>
                    </ContactSheet>
                    <Link href="#process">
                        <Button variant="outline" size="lg" className="h-12 min-w-[200px] text-base border-white/10 hover:bg-white/5 hover:text-white">
                            View Methodology
                        </Button>
                    </Link>
                </div>
            </div>

            {/* Floating Code Window Visual */}
            <div className="relative z-10 mt-20 w-full max-w-4xl px-4 perspective-[2000px]">
                <div className="group relative  rounded-xl border border-white/10 bg-black/50 shadow-2xl backdrop-blur-sm transition-transform duration-700 hover:rotate-x-2">
                    <div className="flex h-10 items-center gap-2 border-b border-white/5 bg-zinc-900/50 px-4">
                        <div className="h-3 w-3 rounded-full bg-red-500/20"></div>
                        <div className="h-3 w-3 rounded-full bg-yellow-500/20"></div>
                        <div className="h-3 w-3 rounded-full bg-green-500/20"></div>
                        <div className="ml-4 flex items-center gap-2 text-xs text-zinc-500 font-mono">
                            <Terminal className="h-3 w-3" />
                            deploy-production.sh
                        </div>
                    </div>
                    <div className="p-4 md:p-6 font-mono text-[10px] sm:text-sm md:text-base overflow-x-auto [scrollbar-width:none]">
                        <div className="flex flex-col gap-2 min-w-[320px] md:min-w-0">
                            <div className="flex gap-3 md:gap-4">
                                <span className="text-zinc-600 w-4 shrink-0">1</span>
                                <span className="text-purple-400">const</span> <span className="text-blue-400">studio</span> = <span className="text-yellow-300">new</span> <span className="text-green-400">SomanathStudio</span>({"{ change: 'world' }"});
                            </div>
                            <div className="flex gap-3 md:gap-4">
                                <span className="text-zinc-600 w-4 shrink-0">2</span>
                                <span className="text-blue-400">await</span> <span className="text-blue-400">studio</span>.<span className="text-yellow-300">architect</span>({"{ scalability: 'infinite' }"});
                            </div>
                            <div className="flex gap-3 md:gap-4">
                                <span className="text-zinc-600 w-4 shrink-0">3</span>
                                <span className="text-blue-400">await</span> <span className="text-blue-400">studio</span>.<span className="text-yellow-300">launch</span>();
                            </div>
                            <div className="flex gap-3 md:gap-4 mt-2">
                                <span className="text-zinc-600 w-4 shrink-0">4</span>
                                <span className="text-zinc-400 truncate">{">"} Deployment successful in 34ms</span>
                                <span className="animate-pulse text-green-500">_</span>
                            </div>
                        </div>
                    </div>

                    {/* Shiny border effect */}
                    <div className="absolute inset-0 rounded-xl bg-gradient-to-br from-white/10 to-transparent opacity-0 transition-opacity duration-500 group-hover:opacity-100 pointer-events-none"></div>

                    <BorderBeam size={250} duration={12} delay={9} />
                </div>
            </div>

            {/* Bottom Fade */}
            <div className="absolute -bottom-8 left-0 right-0 h-32 bg-gradient-to-t from-black to-transparent z-20 pointer-events-none"></div>
        </section>
    )
}
