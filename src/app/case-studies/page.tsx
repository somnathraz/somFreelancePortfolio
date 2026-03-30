import Link from "next/link";
import { SelectedWork } from "@/components/SelectedWork";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { MobileNav } from "@/components/MobileNav";
import { Button } from "@/components/ui/button";
import { Metadata } from "next";

export const metadata: Metadata = {
    title: "Case Studies — SaaS MVP, Performance & Production Readiness | Somanath Studio",
    description:
        "Examples of SaaS MVP builds, performance optimization, and production-grade improvements. Most client work is under NDA; book a call for the most relevant examples.",
};

export default function CaseStudiesPage() {
    return (
        <main className="min-h-screen bg-black text-foreground selection:bg-white/20">
            <Navbar />

            <section className="relative z-10 border-b border-white/5 bg-black pt-28 pb-12 md:pt-32 md:pb-16">
                <div className="container mx-auto max-w-3xl px-4 text-center">
                    <p className="text-xs font-mono uppercase tracking-widest text-zinc-500 mb-4">
                        Case studies
                    </p>
                    <h1 className="text-3xl font-bold tracking-tight text-white sm:text-4xl md:text-5xl mb-6">
                        Selected client work
                    </h1>
                    <p className="text-zinc-400 text-lg leading-relaxed mb-8">
                        A few examples of the work I do most: SaaS MVP builds, performance fixes, and
                        production-grade product improvements. Most client work is under NDA, so I share
                        deeper details during calls.
                    </p>
                    <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
                        <Button asChild className="bg-white text-black hover:bg-zinc-200">
                            <Link href="/book">Book a 20-minute strategy call</Link>
                        </Button>
                        <Button asChild variant="outline" className="border-white/10 hover:bg-white/5 hover:text-white">
                            <Link href="/blog">Read buyer-intent articles</Link>
                        </Button>
                    </div>
                </div>
            </section>

            <SelectedWork hideIntro />

            <Footer />
            <MobileNav />
        </main>
    );
}
