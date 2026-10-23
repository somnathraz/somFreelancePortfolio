"use client";

import { motion } from "framer-motion";

/**
 * Forward-facing geometric "S" (Somanath Studio).
 * Extra viewBox padding so the thick stroke isn’t clipped top/bottom.
 */

const EASE = [0.16, 1, 0.3, 1] as [number, number, number, number];

interface UnfoldingSProps {
    progress: number;
    zoom?: number;
    className?: string;
}

export function UnfoldingS({
    progress,
    zoom = 1,
    className = "",
}: UnfoldingSProps) {
    const p = Math.min(1, Math.max(0, progress));
    const dash = 1400;
    const offset = dash * (1 - p);

    const rotY = (1 - p) * -22;
    const rotX = (1 - p) * 10;

    return (
        <div
            className={`relative flex items-center justify-center overflow-visible ${className}`}
            style={{
                // Slightly shorter than full viewport so top/bottom never clip
                width: "min(36vw, 240px)",
                height: "min(48vh, 320px)",
                perspective: "1000px",
                transform: `scale(${zoom})`,
                transformOrigin: "50% 50%",
                willChange: "transform",
            }}
        >
            <div
                className="h-full w-full overflow-visible"
                style={{
                    transform: `rotateY(${rotY}deg) rotateX(${rotX}deg)`,
                    transformStyle: "preserve-3d",
                }}
            >
                <svg
                    // Padded viewBox — strokeWidth 40 needs ~20px clearance
                    viewBox="0 0 240 340"
                    className="h-full w-full overflow-visible"
                    fill="none"
                    aria-label="S"
                    style={{ overflow: "visible" }}
                >
                    {/* Centered S with room for round caps */}
                    <path
                        d="M 178 70
                           C 178 42, 148 28, 120 28
                           C 72 28, 42 54, 42 92
                           C 42 126, 70 146, 120 162
                           C 170 178, 198 198, 198 240
                           C 198 286, 162 312, 120 312
                           C 70 312, 42 284, 42 256"
                        stroke="white"
                        strokeWidth="40"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        style={{
                            strokeDasharray: dash,
                            strokeDashoffset: offset,
                        }}
                    />
                </svg>
            </div>
        </div>
    );
}

export function RollingDigit({ value }: { value: number }) {
    const y = -value * 10;
    return (
        <span
            className="relative inline-block overflow-hidden"
            style={{ width: "0.62em", height: "0.75em" }}
        >
            <motion.span
                className="absolute left-0 top-0 flex flex-col items-center"
                initial={false}
                animate={{ y: `${y}%` }}
                transition={{ duration: 0.35, ease: EASE }}
            >
                {Array.from({ length: 10 }, (_, n) => (
                    <span
                        key={n}
                        className="flex h-[0.75em] items-center justify-center leading-none"
                    >
                        {n}
                    </span>
                ))}
            </motion.span>
        </span>
    );
}

export function PercentCounter({ progress }: { progress: number }) {
    const clamped = Math.min(100, Math.max(0, Math.round(progress)));
    const hundreds = Math.floor(clamped / 100);
    const tens = Math.floor((clamped % 100) / 10);
    const ones = clamped % 10;

    return (
        <div
            className="pointer-events-none absolute bottom-0 left-0 z-20 flex overflow-hidden pl-3 font-bold text-white sm:pl-5"
            style={{
                fontSize: "clamp(4.5rem, 10vw, 12rem)",
                height: "0.75em",
                lineHeight: 0.75,
                letterSpacing: "-0.04em",
            }}
        >
            {clamped >= 100 && <RollingDigit value={hundreds} />}
            <RollingDigit value={tens} />
            <RollingDigit value={ones} />
        </div>
    );
}
