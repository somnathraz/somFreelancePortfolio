import Link from "next/link";
import { Logo } from "@/components/Logo";
import { ArrowRight } from "lucide-react";

export function Footer() {
    const year = new Date().getFullYear();

    return (
        <footer id="contact" className="bg-black pb-28 pt-12 relative z-10 w-full border-t border-white/5">
            <div className="container mx-auto px-4">
                <div className="w-full flex flex-col md:flex-row items-center justify-between gap-8 md:gap-12">

                    {/* Brand + tagline + socials */}
                    <div className="flex flex-col gap-3 text-center md:text-left items-center md:items-start">
                        <div className="flex items-center gap-2">
                            <Logo className="w-6 h-6 text-white" />
                            <div className="text-xl font-bold tracking-tight text-white italic">
                                Somanath Studio
                            </div>
                        </div>
                        <p className="text-sm text-zinc-500 font-medium max-w-xs">
                            High-Performance SaaS Engineering for Founders & Scaling Teams
                        </p>
                        {/* Social links */}
                        <div className="flex items-center gap-4 mt-1">
                            <a
                                href="https://www.linkedin.com/in/somnath-khadanga"
                                target="_blank"
                                rel="noopener noreferrer"
                                aria-label="LinkedIn"
                                className="text-zinc-500 hover:text-white transition-colors"
                            >
                                <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                                    <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 01-2.063-2.065 2.064 2.064 0 112.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
                                </svg>
                            </a>
                            <a
                                href="https://github.com/somnathraz"
                                target="_blank"
                                rel="noopener noreferrer"
                                aria-label="GitHub"
                                className="text-zinc-500 hover:text-white transition-colors"
                            >
                                <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                                    <path d="M12 0C5.374 0 0 5.373 0 12c0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23A11.509 11.509 0 0112 5.803c1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576C20.566 21.797 24 17.3 24 12c0-6.627-5.373-12-12-12z" />
                                </svg>
                            </a>
                            <a
                                href={`mailto:somnathkhadanga@gmail.com`}
                                aria-label="Email"
                                className="text-zinc-500 hover:text-white transition-colors"
                            >
                                <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                                    <path strokeLinecap="round" strokeLinejoin="round" d="M21.75 6.75v10.5a2.25 2.25 0 01-2.25 2.25h-15a2.25 2.25 0 01-2.25-2.25V6.75m19.5 0A2.25 2.25 0 0019.5 4.5h-15a2.25 2.25 0 00-2.25 2.25m19.5 0v.243a2.25 2.25 0 01-1.07 1.916l-7.5 4.615a2.25 2.25 0 01-2.36 0L3.32 8.91a2.25 2.25 0 01-1.07-1.916V6.75" />
                                </svg>
                            </a>
                        </div>
                    </div>

                    {/* Nav links + CTA */}
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
                        &copy; {year} Somanath Studio.
                    </p>
                    <p className="hidden md:block text-xs text-zinc-600 font-mono">
                        &copy; {year} Somanath Studio.
                    </p>
                </div>
            </div>
        </footer>
    );
}
