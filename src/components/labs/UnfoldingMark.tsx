"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import { siteLogoColored } from "@/lib/site";

/**
 * The actual Somanath Studio ribbon mark assembles from three planes, then
 * crossfades to the untouched source artwork before the hero zoom.
 */

const EASE = [0.16, 1, 0.3, 1] as [number, number, number, number];

interface UnfoldingLogoProps {
    progress: number;
    zoom?: number;
    className?: string;
}

const clamp = (value: number) => Math.min(1, Math.max(0, value));

function range(start: number, end: number, value: number) {
    return clamp((value - start) / (end - start));
}

function LogoLayer({
    clipPath,
    opacity,
    transform,
}: {
    clipPath: string;
    opacity: number;
    transform: string;
}) {
    return (
        <div
            className="absolute inset-0"
            style={{
                clipPath,
                opacity,
                transform,
                willChange: "transform, opacity",
            }}
        >
            <Image
                src={siteLogoColored}
                alt=""
                fill
                sizes="320px"
                className="object-contain"
                priority
            />
        </div>
    );
}

export function UnfoldingLogo({
    progress,
    zoom = 1,
    className = "",
}: UnfoldingLogoProps) {
    const p = clamp(progress);
    const piecesIn = range(0.02, 0.2, p);
    const piecesOut = 1 - range(0.82, 1, p);
    const pieceOpacity = piecesIn * piecesOut;
    const finalOpacity = range(0.72, 0.98, p);
    const dotScale = 0.2 + p * 0.8;
    const tiltY = (1 - p) * -18;
    const tiltX = (1 - p) * 9;
    const labelOpacity =
        range(0.5, 0.72, p) * (1 - range(0.88, 1, p));

    return (
        <div
            className={`relative flex items-center justify-center overflow-visible ${className}`}
            style={{
                width: "clamp(190px, 30vw, 320px)",
                aspectRatio: "1",
                perspective: "1200px",
                transform: `scale(${zoom})`,
                transformOrigin: "50% 50%",
                willChange: "transform",
            }}
        >
            <div
                className="pointer-events-none absolute inset-[9%] rounded-full bg-cyan-400/15 blur-[55px]"
                style={{
                    opacity: range(0.15, 0.75, p),
                    transform: `scale(${0.72 + p * 0.28})`,
                }}
            />
            <div
                className="relative h-full w-full"
                style={{
                    transform: `rotateY(${tiltY}deg) rotateX(${tiltX}deg)`,
                    transformStyle: "preserve-3d",
                    willChange: "transform",
                }}
            >
                <LogoLayer
                    clipPath="polygon(6% 5%, 61% 5%, 61% 24%, 76% 24%, 76% 55%, 45% 55%, 6% 33%)"
                    opacity={pieceOpacity}
                    transform={`translate3d(${(1 - p) * -58}px, ${(1 - p) * -34}px, 28px) rotate(${(1 - p) * -11}deg)`}
                />
                <LogoLayer
                    clipPath="polygon(5% 39%, 50% 39%, 68% 48%, 68% 92%, 45% 92%, 45% 79%, 5% 64%)"
                    opacity={pieceOpacity}
                    transform={`translate3d(${(1 - p) * 46}px, ${(1 - p) * 42}px, -18px) rotate(${(1 - p) * 10}deg)`}
                />
                <LogoLayer
                    clipPath="circle(11% at 79% 56%)"
                    opacity={piecesIn * (1 - range(0.9, 1, p))}
                    transform={`translate3d(${(1 - p) * 58}px, ${(1 - p) * -8}px, 42px) scale(${dotScale})`}
                />

                {/* Exact source image guarantees a seamless final lock-up. */}
                <Image
                    src={siteLogoColored}
                    alt="Somanath Studio"
                    fill
                    sizes="320px"
                    className="object-contain"
                    style={{
                        opacity: finalOpacity,
                        filter:
                            p > 0.9
                                ? "drop-shadow(0 0 30px rgba(129,140,248,0.22))"
                                : "none",
                    }}
                    priority
                />

                <div
                    className="absolute inset-y-[12%] w-[28%] -skew-x-12 bg-gradient-to-r from-transparent via-white/30 to-transparent blur-sm"
                    style={{
                        left: `${-35 + range(0.58, 0.92, p) * 150}%`,
                        opacity:
                            range(0.58, 0.7, p) *
                            (1 - range(0.9, 1, p)),
                    }}
                />
            </div>

            <div
                className="absolute top-[94%] whitespace-nowrap text-center font-mono text-[9px] uppercase tracking-[0.38em] text-white/55"
                style={{
                    opacity: labelOpacity,
                    transform: `translateY(${(1 - p) * 10}px)`,
                }}
            >
                Somanath Studio / Labs
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
