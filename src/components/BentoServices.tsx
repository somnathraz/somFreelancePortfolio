"use client";

import React, { forwardRef, useRef, Suspense } from "react";
import dynamic from "next/dynamic";
import { BentoGrid, BentoCard } from "@/components/ui/bento-grid";
import { AnimatedBeam } from "@/components/ui/animated-beam";
import { BorderBeam } from "@/components/magicui/border-beam";
import Ripple from "@/components/magicui/ripple";
import { ShineBorder } from "@/components/ui/shine-border";
import { FlickeringGrid } from "@/components/ui/flickering-grid";
import { RetroGrid } from "@/components/ui/retro-grid";
import { Rocket, Cloud, Gauge, Code2, Terminal, User, Server, Database, Globe as GlobeIcon, ShieldCheck, Zap } from "lucide-react";
import { cn } from "@/lib/utils";
import { FollowerPointerCard } from "@/components/ui/following-pointer";

// Lazy load the heavy Globe component
const Globe = dynamic(() => import("./ui/globe").then(mod => ({ default: mod.Globe })), {
  loading: () => <div className="w-[400px] h-[400px] flex items-center justify-center"><div className="animate-pulse text-zinc-500">Loading globe...</div></div>,
});

// Circle component for AnimatedBeam nodes
const Circle = forwardRef<
    HTMLDivElement,
    { className?: string; children?: React.ReactNode }
>(({ className, children }, ref) => {
    return (
        <div
            ref={ref}
            className={cn(
                "z-10 flex h-12 w-12 items-center justify-center rounded-full border-2 border-border bg-white p-3 shadow-[0_0_20px_-12px_rgba(0,0,0,0.8)] dark:bg-black",
                className,
            )}
        >
            {children}
        </div>
    );
});
Circle.displayName = "Circle";

export function BentoServices() {
    const containerRef = useRef<HTMLDivElement>(null);
    const div1Ref = useRef<HTMLDivElement>(null);
    const div2Ref = useRef<HTMLDivElement>(null);
    const div3Ref = useRef<HTMLDivElement>(null);
    const div4Ref = useRef<HTMLDivElement>(null);

    // Define features as simple components or data if possible, but JSX is fine.

    const PointerTitle = ({ title, className, dotColor }: { title: string; className?: string; dotColor?: string }) => (
        <div className={cn("flex space-x-2 items-center bg-black/50 backdrop-blur-md px-2 py-1 rounded-full border border-white/10", className)}>
            <div className={cn("h-4 w-4 rounded-full bg-gradient-to-r from-blue-500 to-purple-500", dotColor)} />
            <p className="text-white text-xs font-medium">{title}</p>
        </div>
    );

    const mvpBackground = (
        <FollowerPointerCard title={<PointerTitle title="SaaS MVP Build" />} className="h-full w-full">
            <div className="relative flex h-full w-full items-start justify-center overflow-hidden rounded-xl bg-zinc-950 border-none p-4 pt-8">
                {/* Central Network Hub with Ripple */}
                <div className="relative z-10 flex flex-col items-center gap-3">
                    {/* Network nodes arranged in a circle */}
                    <div className="relative w-32 h-32">
                        {/* Center hub with Ripple effect */}
                        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2">
                            <Ripple mainCircleSize={60} mainCircleOpacity={0.1} numCircles={3} />
                            <div className="relative h-12 w-12 rounded-full bg-white/5 border border-white/10">
                                <div className="h-full w-full rounded-full bg-zinc-950 flex items-center justify-center">
                                    <Zap className="h-5 w-5 text-white/70" />
                                </div>
                            </div>
                        </div>

                        {/* Network nodes - Top */}
                        <div className="absolute top-0 left-1/2 -translate-x-1/2 h-8 w-8 rounded-full bg-white/5 border border-white/10 flex items-center justify-center backdrop-blur-sm">
                            <User className="h-4 w-4 text-white/50" />
                        </div>

                        {/* Network nodes - Right */}
                        <div className="absolute top-1/2 right-0 -translate-y-1/2 h-8 w-8 rounded-full bg-white/5 border border-white/10 flex items-center justify-center backdrop-blur-sm">
                            <Database className="h-4 w-4 text-white/50" />
                        </div>

                        {/* Network nodes - Bottom */}
                        <div className="absolute bottom-0 left-1/2 -translate-x-1/2 h-8 w-8 rounded-full bg-white/5 border border-white/10 flex items-center justify-center backdrop-blur-sm">
                            <Cloud className="h-4 w-4 text-white/50" />
                        </div>

                        {/* Network nodes - Left */}
                        <div className="absolute top-1/2 left-0 -translate-y-1/2 h-8 w-8 rounded-full bg-white/5 border border-white/10 flex items-center justify-center backdrop-blur-sm">
                            <Code2 className="h-4 w-4 text-white/50" />
                        </div>

                        {/* Connection lines */}
                        <svg className="absolute inset-0 w-full h-full" style={{ zIndex: -1 }}>
                            <line x1="50%" y1="50%" x2="50%" y2="15%" stroke="rgba(255, 255, 255, 0.1)" strokeWidth="1" strokeDasharray="4 4" />
                            <line x1="50%" y1="50%" x2="85%" y2="50%" stroke="rgba(255, 255, 255, 0.1)" strokeWidth="1" strokeDasharray="4 4" />
                            <line x1="50%" y1="50%" x2="50%" y2="85%" stroke="rgba(255, 255, 255, 0.1)" strokeWidth="1" strokeDasharray="4 4" />
                            <line x1="50%" y1="50%" x2="15%" y2="50%" stroke="rgba(255, 255, 255, 0.1)" strokeWidth="1" strokeDasharray="4 4" />
                        </svg>
                    </div>

                    {/* Network badge */}

                </div>

                {/* Corner tech icons */}
                <div className="absolute top-4 left-4 p-2 rounded-lg bg-blue-500/10 border border-blue-500/20">
                    <Code2 className="h-4 w-4 text-blue-400" />
                </div>
                <div className="absolute top-4 right-4 p-2 rounded-lg bg-green-500/10 border border-green-500/20">
                    <Database className="h-4 w-4 text-green-400" />
                </div>
                <div className="absolute bottom-20 left-4 p-2 rounded-lg bg-purple-500/10 border border-purple-500/20">
                    <Cloud className="h-4 w-4 text-purple-400" />
                </div>
                <div className="absolute bottom-20 right-4 p-2 rounded-lg bg-orange-500/10 border border-orange-500/20">
                    <GlobeIcon className="h-4 w-4 text-orange-400" />
                </div>

                {/* RetroGrid background */}
                <RetroGrid
                    className="absolute inset-0 z-0"
                    angle={65}
                    cellSize={60}
                    opacity={0.2}
                    darkLineColor="rgb(168, 85, 247)"
                />

                <div className="absolute inset-0 bg-gradient-to-t from-black via-black/30 to-transparent pointer-events-none"></div>
                <div className="absolute inset-0 bg-grid-white opacity-[0.05] pointer-events-none"></div>
            </div>
        </FollowerPointerCard>
    );

    const performanceBackground = (
        <FollowerPointerCard title={<PointerTitle title="Performance Optimization" />} className="h-full w-full">
            <div className="flex flex-1 w-full h-full rounded-xl bg-zinc-950 border-none items-center justify-center overflow-hidden relative group">
                <div className="relative w-full h-full flex items-center justify-center">
                    <Suspense fallback={<div className="w-[400px] h-[400px] flex items-center justify-center"><div className="animate-pulse text-zinc-500">Loading globe...</div></div>}>
                        <Globe className="!relative !w-[400px] !h-[400px]" />
                    </Suspense>
                </div>
                <div className="absolute inset-0 bg-gradient-to-t from-black via-black/30 to-transparent pointer-events-none"></div>
            </div>
        </FollowerPointerCard>
    );

    const scalabilityBackground = (
        <FollowerPointerCard title={<PointerTitle title="Production Readiness" />} className="h-full w-full">
            <div className="relative flex h-full w-full items-start justify-center overflow-hidden rounded-xl bg-background border-none p-4 pt-8 shadow-xl" ref={containerRef}>
                <div className="flex h-48 w-full flex-col items-stretch justify-between gap-10">
                    <div className="flex flex-row justify-between">
                        <Circle ref={div1Ref}>
                            <User className="h-4 w-4 text-black dark:text-white" />
                        </Circle>
                        <Circle ref={div2Ref}>
                            <GlobeIcon className="h-4 w-4 text-black dark:text-white" />
                        </Circle>
                    </div>
                    <div className="flex flex-row justify-between">
                        <Circle ref={div3Ref}>
                            <Database className="h-4 w-4 text-black dark:text-white" />
                        </Circle>
                        <Circle ref={div4Ref}>
                            <Server className="h-4 w-4 text-black dark:text-white" />
                        </Circle>
                    </div>
                </div>

                <AnimatedBeam
                    containerRef={containerRef}
                    fromRef={div1Ref}
                    toRef={div2Ref}
                    curvature={-20}
                    endYOffset={0}
                    pathWidth={3}
                    pathOpacity={0.3}
                    gradientStartColor="#3b82f6"
                    gradientStopColor="#8b5cf6"
                />
                <AnimatedBeam
                    containerRef={containerRef}
                    fromRef={div2Ref}
                    toRef={div3Ref}
                    curvature={20}
                    startYOffset={-10}
                    pathWidth={3}
                    pathOpacity={0.3}
                    gradientStartColor="#3b82f6"
                    gradientStopColor="#8b5cf6"
                />
                <AnimatedBeam
                    containerRef={containerRef}
                    fromRef={div2Ref}
                    toRef={div4Ref}
                    curvature={-20}
                    startYOffset={-10}
                    reverse
                    pathWidth={3}
                    pathOpacity={0.3}
                    gradientStartColor="#8b5cf6"
                    gradientStopColor="#3b82f6"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black via-black/80 to-transparent pointer-events-none"></div>
            </div>
        </FollowerPointerCard>
    );

    const securityBackground = (
        <FollowerPointerCard title={<PointerTitle title="Architecture & Security" className="bg-green-500/10 border-green-500/30 text-green-100" dotColor="bg-green-500" />} className="h-full w-full">
            <div className="flex flex-1 w-full h-full rounded-xl bg-zinc-950 border-none items-center justify-center relative overflow-hidden group">
                <BorderBeam size={250} duration={12} delay={9} borderWidth={2} colorFrom="#10b981" colorTo="#059669" />

                {/* FlickeringGrid background */}
                <FlickeringGrid
                    className="absolute inset-0 z-0"
                    squareSize={4}
                    gridGap={6}
                    color="#10b981"
                    maxOpacity={0.3}
                    flickerChance={0.1}
                />

                {/* Central shield */}
                <div className="z-10 relative flex flex-col items-center gap-4">
                    <div className="relative">
                        {/* Outer glow ring */}
                        <div className="absolute -inset-4 rounded-full bg-green-500/20 blur-xl"></div>

                        {/* Shield container */}
                        <div className="relative h-20 w-20 rounded-2xl bg-gradient-to-br from-green-500/20 to-emerald-500/20 border border-green-500/30 flex items-center justify-center backdrop-blur-sm">
                            <ShieldCheck className="h-10 w-10 text-green-400 drop-shadow-[0_0_20px_rgba(16,185,129,0.6)]" />
                        </div>
                    </div>

                    {/* Status badge */}
                    <div className="px-4 py-1.5 rounded-full bg-green-500/10 border border-green-500/30 backdrop-blur-sm flex items-center gap-2">
                        <span className="relative flex h-2 w-2">
                            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
                            <span className="relative inline-flex rounded-full h-2 w-2 bg-green-500"></span>
                        </span>
                        <span className="text-xs font-semibold text-green-400 uppercase tracking-wider">Protected</span>
                    </div>
                </div>

                {/* Faint grid background for texture */}
                <div className="absolute inset-0 bg-gradient-to-t from-black via-black/30 to-transparent pointer-events-none"></div>
                <div className="absolute inset-0 bg-grid-white opacity-[0.05] pointer-events-none"></div>
            </div>
        </FollowerPointerCard>
    );

    const supportBackground = (
        <FollowerPointerCard title={<PointerTitle title="Ongoing Technical Partner" className="bg-cyan-500/10 border-cyan-500/30 text-cyan-100" dotColor="bg-cyan-500" />} className="h-full w-full">
            <div className="flex flex-1 w-full h-full rounded-xl bg-zinc-950 border-none items-start justify-center relative overflow-hidden group p-4 pt-12">
                {/* Meteors effect */}
                <div className="absolute inset-0">
                    {[...Array(20)].map((_, i) => (
                        <div
                            key={i}
                            className="absolute h-0.5 w-0.5 rounded-full bg-cyan-400 shadow-[0_0_10px_2px_rgba(34,211,238,0.3)]"
                            style={{
                                top: `${Math.random() * 100}%`,
                                left: `${Math.random() * 100}%`,
                                animation: `meteor ${3 + Math.random() * 3}s linear infinite`,
                                animationDelay: `${Math.random() * 5}s`,
                            }}
                        />
                    ))}
                </div>

                {/* Central support icon */}
                <div className="z-10 relative flex flex-col items-center gap-4">
                    <div className="relative">
                        {/* Outer glow ring */}
                        <div className="absolute -inset-4 rounded-full bg-cyan-500/20 blur-xl"></div>

                        {/* Icon container */}
                        <div className="relative h-20 w-20 rounded-2xl bg-gradient-to-br from-cyan-500/20 to-blue-500/20 border border-cyan-500/30 flex items-center justify-center backdrop-blur-sm">
                            <Zap className="h-10 w-10 text-cyan-400 drop-shadow-[0_0_20px_rgba(34,211,238,0.6)]" />
                        </div>
                    </div>

                    {/* Status badge */}
                    <div className="px-4 py-1.5 rounded-full bg-cyan-500/10 border border-cyan-500/30 backdrop-blur-sm flex items-center gap-2">
                        <span className="relative flex h-2 w-2">
                            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-cyan-400 opacity-75"></span>
                            <span className="relative inline-flex rounded-full h-2 w-2 bg-cyan-500"></span>
                        </span>
                        <span className="text-xs font-semibold text-cyan-400 uppercase tracking-wider">Always On</span>
                    </div>
                </div>

                {/* Gradient overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-black via-black/30 to-transparent pointer-events-none"></div>
                <div className="absolute inset-0 bg-grid-white opacity-[0.05] pointer-events-none"></div>
            </div>
        </FollowerPointerCard>
    );

    const features = [
        {
            Icon: Rocket,
            name: "SaaS MVP Build",
            description:
                "Launch your first usable product fast with solid architecture, clean UX, and the right technical foundation from day one.",
            href: "#",
            cta: "Get MVP scope",
            background: mvpBackground,
            className: "col-span-3 lg:col-span-1",
        },
        {
            Icon: Gauge,
            name: "Performance Optimization",
            description:
                "Fix slow pages, poor Core Web Vitals, long API times, and frontend bottlenecks before they start hurting growth.",
            href: "#",
            cta: "Learn more",
            background: performanceBackground,
            className: "col-span-3 lg:col-span-1",
        },
        {
            Icon: Cloud,
            name: "Production Readiness Upgrade",
            description:
                "Turn an early MVP into a stable, maintainable product with better architecture, deployment flow, monitoring, and security practices.",
            href: "#",
            cta: "Learn more",
            background: scalabilityBackground,
            className: "col-span-3 lg:col-span-1",
        },
        {
            Icon: ShieldCheck,
            name: "Architecture & Security Hardening",
            description:
                "Reduce technical risk with stronger system design, secure defaults, observability, and launch confidence.",
            href: "#",
            cta: "Learn more",
            background: securityBackground,
            className: "col-span-3 lg:col-span-2",
        },
        {
            Icon: Zap,
            name: "Ongoing Technical Partner",
            description:
                "Get senior engineering support for shipping features faster, solving bottlenecks, and making smarter product decisions over time.",
            href: "#",
            cta: "Book intro call",
            background: supportBackground,
            className: "col-span-3 lg:col-span-1",
        },
    ];

    return (
        <div className="w-full">
            <div className="mx-auto max-w-3xl px-4 pt-24 pb-10 text-center">
                <p className="text-lg leading-relaxed text-zinc-400 md:text-xl">
                    Services built for SaaS founders who need speed now and clean scale later.
                </p>
            </div>
            <BentoGrid className="max-w-6xl mx-auto px-4 pb-24 pt-0">
                {features.map((feature) => (
                    <BentoCard key={feature.name} {...feature} />
                ))}
            </BentoGrid>
        </div>
    );
}
