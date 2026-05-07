import Link from "next/link";
import { Logo } from "@/components/Logo";
import { ArrowRight } from "lucide-react";

export function Footer() {
    return (
        <footer id="contact" className="bg-black pb-28 pt-12 relative z-10 w-full border-t border-white/5">
            <div className="container mx-auto px-4">
                <div className="w-full flex flex-col md:flex-row items-center justify-between gap-8 md:gap-12">
                    <div className="flex flex-col gap-3 text-center md:text-left items-center md:items-start">
                        <div className="flex items-center gap-2">
                            <Logo className="w-6 h-6 text-white" />
                            <div className="text-xl font-bold tracking-tight text-white italic">
                                Somanath Studio
                            </div>
                        </div>
                        <p className="text-sm text-zinc-500 font-medium max-w-xs">
                            Senior SaaS engineering for founders who want to ship without regretting it later.
                        </p>
                    </div>

                    <div className="flex flex-col items-center gap-6 md:flex-row md:gap-8">
                        <div className="flex flex-wrap justify-center gap-x-6 gap-y-2 text-sm text-zinc-500 font-medium tracking-wide">
                            <Link href="/" className="hover:text-white transition-colors">Home</Link>
                            <Link href="/services" className="hover:text-white transition-colors">Services</Link>
                            <Link href="/case-studies" className="hover:text-white transition-colors">Case Studies</Link>
                            <Link href="/blog" className="hover:text-white transition-colors">Writing</Link>
                            <Link href="/services/saas-mvp-development" className="hover:text-white transition-colors">SaaS MVP Development</Link>
                            <Link href="/services/nextjs-performance-optimization" className="hover:text-white transition-colors">Next.js Performance</Link>
                            <Link href="/services/production-readiness-upgrade" className="hover:text-white transition-colors">Production Readiness</Link>
                            <Link href="/services/ai-saas-development" className="hover:text-white transition-colors">AI SaaS Development</Link>
                        </div>

                        <Link
                            href="/book"
                            className="group inline-flex items-center gap-2 rounded-full border border-white/15 bg-gradient-to-r from-white to-zinc-200 px-5 py-2.5 text-sm font-semibold text-black transition-all hover:-translate-y-0.5 hover:from-cyan-200 hover:to-white hover:shadow-[0_12px_35px_-12px_rgba(34,211,238,0.55)]"
                        >
                                Book a 20-minute strategy call
                                <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
                        </Link>
                    </div>

                    <p className="text-xs text-zinc-600 font-mono md:hidden mt-4">
                        &copy; 2026 Somanath Studio.
                    </p>
                    <p className="hidden md:block text-xs text-zinc-600 font-mono">
                        &copy; 2026 Somanath Studio.
                    </p>
                </div>
            </div>
        </footer>
    );
}
