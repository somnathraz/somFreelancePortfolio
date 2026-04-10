import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { DeferredParticles } from "@/components/DeferredParticles";

export function Cta() {
    return (
        <section id="contact" className="relative w-full py-32 overflow-hidden bg-black flex flex-col items-center justify-center text-center border-t border-white/10">
            {/* Ambient background glow */}
            <div className="absolute inset-0 bg-gradient-to-b from-zinc-900/50 to-black pointer-events-none" />

            {/* Particles effect */}
            <DeferredParticles
                className="absolute inset-0 pointer-events-none"
                quantity={200}
                staticity={30}
                ease={50}
                color="#ffffff"
                refresh
            />

            <div className="z-10 relative flex flex-col items-center gap-8 px-4 max-w-4xl mx-auto">
                <div className="flex flex-col gap-4 items-center animate-in fade-in slide-in-from-bottom-8 duration-700">
                    <h2 className="text-5xl md:text-7xl font-bold bg-clip-text text-transparent bg-gradient-to-b from-white via-white/90 to-white/50 tracking-tighter leading-tight">
                        Building a SaaS product or fixing a slow one?
                    </h2>
                    <p className="text-zinc-400 max-w-2xl text-lg md:text-xl leading-relaxed">
                        I help founders launch faster, improve performance, and build with production in mind from day one.
                    </p>
                </div>

                <div className="flex flex-col items-center gap-4 mt-2 animate-in fade-in slide-in-from-bottom-8 duration-700 delay-150">
                    <Link
                        href="/book"
                        className="inline-flex items-center justify-center rounded-full border border-white/15 bg-white px-6 py-3 text-base font-semibold text-black shadow-[0_0_40px_-10px_rgba(255,255,255,0.3)] transition-transform duration-300 hover:scale-[1.02] hover:bg-zinc-200"
                    >
                        Book a 20-minute call
                    </Link>

                    <Link
                        href="/#work"
                        className="inline-flex items-center gap-2 text-zinc-300 hover:text-white underline underline-offset-4"
                    >
                        View relevant case studies
                        <ArrowRight className="h-4 w-4" />
                    </Link>

                    <div className="flex flex-col items-center gap-2">
                        <p className="text-sm font-medium text-emerald-400 animate-pulse">
                            ● Currently available for 1–2 new SaaS projects
                        </p>
                        <p className="text-xs text-zinc-500 max-w-xl">
                            Best for founders and teams who need real product engineering, not just another generic freelancer.
                        </p>
                    </div>
                </div>
            </div>
        </section>
    );
}
