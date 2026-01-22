"use client";

import Link from "next/link";
import { Button } from "@/components/ui/button";
import { ContactSheet } from "@/components/ContactSheet";
import { Logo } from "@/components/Logo";

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
                            High-Performance SaaS Engineering for Founders & Scaling Teams
                        </p>
                    </div>

                    <div className="flex flex-col items-center gap-6 md:flex-row md:gap-8">
                        <div className="flex flex-wrap justify-center gap-x-6 gap-y-2 text-sm text-zinc-500 font-medium tracking-wide">
                            <Link href="/" className="hover:text-white transition-colors">Home</Link>
                            <Link href="/#services" className="hover:text-white transition-colors">Services</Link>
                            <Link href="/#work" className="hover:text-white transition-colors">Work</Link>
                            <Link href="/blog" className="hover:text-white transition-colors">Writing</Link>
                        </div>

                        <ContactSheet>
                            <button className="text-sm font-medium text-black bg-white px-5 py-2.5 rounded-full hover:bg-zinc-200 transition-colors shadow-[0_0_20px_-5px_rgba(255,255,255,0.3)]">
                                Hire Me
                            </button>
                        </ContactSheet>
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
