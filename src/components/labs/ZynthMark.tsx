"use client";

import { motion } from "framer-motion";

/**
 * "S" brand mark for Somanath Studio — Lusion-style letter rise.
 * Single oversized letter in an overflow:hidden mask (like Lusion’s L).
 */

interface ZynthMarkProps {
    className?: string;
    delay?: number;
    size?: "sm" | "md" | "lg" | "hero" | "preloader";
    tone?: "white" | "gradient";
}

const SIZES = {
    sm: "text-[2rem] leading-none tracking-[-0.04em]",
    md: "text-[3.5rem] leading-none tracking-[-0.04em]",
    lg: "text-[5.5rem] leading-none tracking-[-0.05em]",
    hero: "text-[clamp(5rem,12vw,8.5rem)] leading-[0.85] tracking-[-0.06em]",
    preloader:
        "text-[clamp(7rem,14vw,18rem)] leading-[0.75] tracking-[-0.06em]",
};

const EASE = [0.16, 1, 0.3, 1] as [number, number, number, number];

export function ZynthMark({
    className = "",
    delay = 0,
    size = "md",
    tone = "gradient",
}: ZynthMarkProps) {
    return (
        <div
            className={`relative inline-flex items-end font-bold ${SIZES[size]} ${className}`}
            aria-label="Somanath Studio"
        >
            <span
                className="relative inline-block overflow-hidden align-bottom"
                style={{ height: "0.85em" }}
            >
                <motion.span
                    className={`inline-block ${
                        tone === "gradient"
                            ? "bg-gradient-to-br from-indigo-200 via-violet-200 to-emerald-200 bg-clip-text text-transparent"
                            : "text-white"
                    }`}
                    initial={{ y: "115%" }}
                    animate={{ y: "0%" }}
                    transition={{
                        delay,
                        duration: 0.95,
                        ease: EASE,
                    }}
                >
                    S
                </motion.span>
            </span>
        </div>
    );
}

export function ZynthHeroMark({ delay = 0 }: { delay?: number }) {
    return (
        <div className="mb-8 flex items-center justify-center">
            <ZynthMark size="hero" delay={delay} tone="gradient" />
        </div>
    );
}
