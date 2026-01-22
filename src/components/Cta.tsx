import Link from "next/link";
import ShimmerButton from "@/components/ui/shimmer-button";
import { Particles } from "@/components/ui/particles";
import { Github } from "lucide-react";
import { ContactSheet } from "@/components/ContactSheet";

export function Cta() {
    return (
        <section className="relative w-full py-32 overflow-hidden bg-black flex flex-col items-center justify-center text-center border-t border-white/10">
            {/* Ambient background glow */}
            <div className="absolute inset-0 bg-gradient-to-b from-zinc-900/50 to-black pointer-events-none" />

            {/* Particles effect */}
            <Particles
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
                        Ready to bring your<br /> idea to life?
                    </h2>
                    <p className="text-zinc-400 max-w-xl text-lg md:text-xl leading-relaxed">
                        From concept to code, I help ambitious brands build premium digital experiences that stand out.
                    </p>
                </div>

                <div className="flex flex-col items-center gap-6 mt-2 animate-in fade-in slide-in-from-bottom-8 duration-700 delay-150">
                    <ContactSheet>
                        <ShimmerButton className="shadow-[0_0_40px_-10px_rgba(255,255,255,0.3)] hover:scale-105 transition-transform duration-300">
                            <span className="whitespace-pre-wrap text-center text-base font-semibold leading-none tracking-tight text-white lg:text-lg px-4">
                                Start a Project
                            </span>
                        </ShimmerButton>
                    </ContactSheet>

                    <div className="flex flex-col items-center gap-2">
                        <p className="text-sm font-medium text-emerald-400 animate-pulse">
                            ● Currently accepting 1-2 new projects for Q2
                        </p>
                        <p className="text-xs text-zinc-500">
                            Replies within 24 hours
                        </p>
                    </div>
                </div>
            </div>
        </section>
    );
}
