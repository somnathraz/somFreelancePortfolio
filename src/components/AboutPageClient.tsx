"use client";

import React, { useRef, useState, useCallback } from "react";
import Image from "next/image";
import Link from "next/link";
import { motion, useInView, useMotionValue, useSpring, useTransform } from "motion/react";
import { BorderBeam } from "@/components/ui/border-beam";
import { ArrowRight, MapPin, Calendar, ExternalLink, Pencil, Cpu, GraduationCap, ArrowUpRight, Zap, Bot, Globe, Code2 } from "lucide-react";
import { TechToolsSlider } from "@/components/TechToolsSlider";

// ─── Social icons ─────────────────────────────────────────────────────────────

function LinkedInIcon() {
    return (
        <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
            <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 01-2.063-2.065 2.064 2.064 0 112.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
        </svg>
    );
}

function InstagramIcon() {
    return (
        <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
            <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zM12 16a4 4 0 110-8 4 4 0 010 8zm6.406-11.845a1.44 1.44 0 100 2.881 1.44 1.44 0 000-2.881z" />
        </svg>
    );
}

function YouTubeIcon() {
    return (
        <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
            <path d="M23.498 6.186a3.016 3.016 0 00-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 00.502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 002.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 002.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z" />
        </svg>
    );
}

function GitHubIcon() {
    return (
        <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
            <path d="M12 0C5.374 0 0 5.373 0 12c0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23A11.509 11.509 0 0112 5.803c1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576C20.566 21.797 24 17.3 24 12c0-6.627-5.373-12-12-12z" />
        </svg>
    );
}

// ─── Data ─────────────────────────────────────────────────────────────────────

const SKILLS = [
    {
        category: "Frontend",
        color: "cyan",
        items: ["Next.js", "React.js", "TypeScript", "Tailwind CSS", "Redux", "Zustand", "Framer Motion", "ShadCN", "MUI", "React Native"],
    },
    {
        category: "Backend",
        color: "violet",
        items: ["Node.js", "Express.js", "REST APIs", "Redis"],
    },
    {
        category: "Database",
        color: "emerald",
        items: ["MongoDB", "SQL"],
    },
    {
        category: "Cloud & DevOps",
        color: "amber",
        items: [
            "AWS",
            "GCP",
            "Docker",
            "Kubernetes",
            "CI/CD pipelines",
            "GitHub Actions",
            "Nginx",
            "EC2",
        ],
    },
    {
        category: "AI & Integrations",
        color: "pink",
        items: ["OpenAI", "Azure", "GPT-4 APIs"],
    },
    {
        category: "Tools",
        color: "blue",
        items: ["Git", "GitHub", "Jest", "Postman", "Webpack"],
    },
];

const SKILL_COLOR_MAP: Record<string, string> = {
    cyan: "border-cyan-500/30 text-cyan-300 bg-cyan-500/10 hover:bg-cyan-500/20",
    violet: "border-violet-500/30 text-violet-300 bg-violet-500/10 hover:bg-violet-500/20",
    emerald: "border-emerald-500/30 text-emerald-300 bg-emerald-500/10 hover:bg-emerald-500/20",
    amber: "border-amber-500/30 text-amber-300 bg-amber-500/10 hover:bg-amber-500/20",
    pink: "border-pink-500/30 text-pink-300 bg-pink-500/10 hover:bg-pink-500/20",
    blue: "border-blue-500/30 text-blue-300 bg-blue-500/10 hover:bg-blue-500/20",
};

const EXPERIENCE = [
    {
        company: "IQVIA",
        role: "Software Development Engineer 4 (SDE4)",
        period: "May 2025 – Present",
        current: true,
        accent: "cyan",
        highlights: [
            { metric: "SDE4", label: "current role", detail: "Building analytics-heavy backends and product surfaces for healthcare / life-sciences workflows" },
            { metric: "AI + data", label: "product focus", detail: "Data visualisation, Chart.js-style dashboards, and AI-related application features in production systems" },
            { metric: "Scale", label: "enterprise apps", detail: "Performance, reliability and API work on operational platforms used by large healthcare clients" },
            { metric: "Full-stack", label: "delivery", detail: "React / Next.js frontends with Node.js services, caching and secure release practices" },
        ],
        extra: [
            "Joined after ABInBev",
            "Healthcare and life-sciences domain systems under production load",
            "Collaboration across product, analytics and engineering teams in Agile delivery",
        ],
    },
    {
        company: "ABInBev",
        role: "Full-Stack Software Developer",
        period: "June 2025 (prior to IQVIA)",
        current: false,
        accent: "amber",
        highlights: [
            { metric: "~35%", label: "fewer re-renders", detail: "Refactored 15+ React pages with Redux, useCallback, useMemo" },
            { metric: "~30%", label: "faster API responses", detail: "Reduced Node.js event loop blocking with async handlers and query caching" },
            { metric: "~40%", label: "faster SQL queries", detail: "Resolved deadlocks with restructured transactions and proper indexing" },
            { metric: "~25%", label: "fewer DB hits", detail: "Redis caching and rate limiting across critical endpoints" },
        ],
        extra: [
            "Brewery & commercial ops — analytics-heavy backends for production and distribution teams",
            "Containerized apps with Docker for consistent dev/staging/prod environments",
            "Applied CORS, cookie policies, and header-level security checks",
            "100% sprint delivery in Agile/Scrum, boosted team performance ~20%",
            "Moved to IQVIA as SDE4 after ABInBev",
        ],
    },
    {
        company: "Learnbay",
        role: "Full-Stack Software Developer",
        period: "Mar 2024 – Apr 2025",
        current: false,
        accent: "violet",
        highlights: [
            { metric: "+25%", label: "user engagement", detail: "Built AI-powered cross-platform language app (React Native, Next.js, MongoDB) on AWS EC2" },
            { metric: "~40%", label: "less downtime", detail: "Shipped 50+ Next.js pages with ISR, optimized build processes" },
            { metric: "~70%", label: "less manual work", detail: "Automated backend workflows with Node.js REST APIs" },
            { metric: "~30%", label: "faster page loads", detail: "Frontend caching with static props, ISR routing, and API caching" },
        ],
        extra: ["Integrated Stripe payments and Google Calendar API in 2–3 week sprints"],
    },
    {
        company: "Skillslash",
        role: "Full-Stack Developer",
        period: "Mar 2021 – Mar 2024",
        current: false,
        accent: "emerald",
        highlights: [
            { metric: "~35%", label: "SEO & load boost", detail: "Scalable E-Commerce and Job Portal with Next.js SSR/ISR, Redux, TypeScript" },
            { metric: "~40%", label: "dev productivity up", detail: "Migrated legacy React apps to Next.js 13+ with MongoDB + Node.js APIs" },
            { metric: "~90%", label: "billing accuracy", detail: "Invoice Generation SaaS with Stripe, automated PDF generation, email alerts" },
            { metric: "1000+", label: "concurrent users", detail: "Multi-tenant HR Dashboard with WebSockets and real-time AI-driven analytics" },
        ],
        extra: ["AI Resume Builder with GPT-4 APIs — improved job seeker engagement ~25%"],
    },
];

const PROJECTS = [
    {
        title: "AI Language Learning App",
        stack: ["React Native", "Next.js", "MongoDB", "TypeScript"],
        description: "Cross-platform app with AI-driven speech recognition and real-time progress tracking. Deployed on AWS EC2 with Nginx.",
        metric: "+25% user retention",
        accent: "cyan",
    },
    {
        title: "Invoice Generator SaaS",
        stack: ["Next.js", "Node.js", "MongoDB", "Stripe"],
        description: "End-to-end billing platform with automated PDF invoice generation, email alerts, and Stripe payment processing.",
        metric: "~90% billing accuracy",
        accent: "violet",
    },
    {
        title: "Calendar Booking System",
        stack: ["Next.js", "Node.js", "TypeScript", "MongoDB"],
        description: "Real-time slot availability, Stripe checkout, and admin dashboard. Reduced scheduling errors and streamlined payment tracking.",
        metric: "~40% fewer errors",
        accent: "emerald",
    },
];

// ─── Personal projects data ───────────────────────────────────────────────────

const PERSONAL_PROJECTS = [
    {
        id: "paperchai",
        featured: true,
        status: "live",
        statusLabel: "Live",
        name: "PaperChai",
        tagline: "Profile-to-website builder for small businesses",
        description:
            "India-first SaaS that turns existing business information — Google Maps, visiting cards, documents, social profiles — into booking-ready one-page websites. AI content, review-before-publish, WhatsApp and scheduling. Built solo as a founder product.",
        stack: ["Next.js", "TypeScript", "PostgreSQL", "AI APIs", "Razorpay"],
        metrics: [
            { value: "1", unit: "", label: "founder product" },
            { value: "100%", unit: "", label: "solo build" },
        ],
        accent: "#f59e0b",
        accentClass: "amber",
        image: "/images/Project-1.png",
        href: "/projects/paperchai",
        icon: <Zap className="w-5 h-5" />,
    },
    {
        id: "adaptive-agent-ui",
        featured: false,
        status: "building",
        statusLabel: "Building now",
        name: "Adaptive Agent UI",
        tagline: "AI agent that reshapes UI around visitor intent",
        description:
            "Productising the dynamic site-agent pattern — intent detection, journey-based UI, session memory and guided CTAs so every visitor sees the path that matches their problem, not a static homepage.",
        stack: ["Next.js", "TypeScript", "LLM routing", "Session memory"],
        metrics: [
            { value: "Live", unit: "", label: "pattern on this site" },
        ],
        accent: "#a78bfa",
        accentClass: "violet",
        image: null,
        href: "/case-studies#adaptive-agent-ui",
        icon: <Bot className="w-5 h-5" />,
    },
    {
        id: "ai-booking-inventory",
        featured: false,
        status: "building",
        statusLabel: "Building now",
        name: "AI Booking & Inventory",
        tagline: "Automated booking that manages inventory with AI",
        description:
            "AI-enabled booking that checks availability, books or reschedules, and keeps inventory in sync — so calendars and stock stop fighting each other over WhatsApp and spreadsheets.",
        stack: ["Next.js", "Node.js", "AI agents", "Inventory sync"],
        metrics: [
            { value: "WIP", unit: "", label: "booking + stock loop" },
        ],
        accent: "#34d399",
        accentClass: "emerald",
        image: null,
        href: "/case-studies#ai-booking-inventory",
        icon: <Calendar className="w-5 h-5" />,
    },
    {
        id: "seafoods",
        featured: false,
        status: "live",
        statusLabel: "Live",
        name: "LocalBoyNani Seafoods",
        tagline: "Full-stack e-commerce, 3 cities",
        description:
            "Production e-commerce platform for a real seafood delivery business. Live orders, inventory, admin dashboard, and 120-min delivery SLA across Bangalore, Hyderabad & Chennai.",
        stack: ["Next.js", "Node.js", "Cloudflare R2"],
        metrics: [
            { value: "3", unit: " cities", label: "live coverage" },
            { value: "120", unit: "min", label: "delivery SLA" },
        ],
        accent: "#34d399",
        accentClass: "emerald",
        image: "/images/project-7.png",
        href: "https://localboynaniseafoods.com",
        icon: <Globe className="w-5 h-5" />,
    },
    {
        id: "ai-tools-dir",
        featured: false,
        status: "personal",
        statusLabel: "Personal",
        name: "AI Tools Directory",
        tagline: "Search UX for AI discovery",
        description:
            "Fast, searchable catalog for discovering AI tools. Explores Algolia-powered instant search, Framer Motion transitions, and high-performance frontend rendering for large datasets.",
        stack: ["React", "Algolia", "Framer Motion", "Vercel Edge"],
        metrics: [],
        accent: "#f59e0b",
        accentClass: "amber",
        image: "/images/project-2.png",
        href: null,
        icon: <Code2 className="w-5 h-5" />,
    },
    {
        id: "ai-code-review",
        featured: false,
        status: "personal",
        statusLabel: "Personal",
        name: "AI Code Review Assistant",
        tagline: "LLM-in-the-loop dev workflows",
        description:
            "GitHub-integrated AI tool that surfaces code review suggestions automatically via GitHub Actions. Explores LLM function calling and async webhook pipelines.",
        stack: ["Python", "OpenAI API", "GitHub Actions", "Redis"],
        metrics: [],
        accent: "#60a5fa",
        accentClass: "blue",
        image: "/images/project-3.png",
        href: null,
        icon: <Bot className="w-5 h-5" />,
    },
];

// ─── Project card (tilt + spotlight) ─────────────────────────────────────────

function ProjectCard({ project, delay = 0 }: { project: typeof PERSONAL_PROJECTS[0]; delay?: number }) {
    const cardRef = useRef<HTMLDivElement>(null);
    const isInView = useInView(cardRef, { once: true, margin: "-60px" });

    const mouseX = useMotionValue(0);
    const mouseY = useMotionValue(0);
    const rotateX = useSpring(useTransform(mouseY, [-0.5, 0.5], [6, -6]), { stiffness: 200, damping: 20 });
    const rotateY = useSpring(useTransform(mouseX, [-0.5, 0.5], [-6, 6]), { stiffness: 200, damping: 20 });
    const glowX = useTransform(mouseX, [-0.5, 0.5], ["0%", "100%"]);
    const glowY = useTransform(mouseY, [-0.5, 0.5], ["0%", "100%"]);

    const handleMouseMove = useCallback((e: React.MouseEvent<HTMLDivElement>) => {
        const rect = cardRef.current?.getBoundingClientRect();
        if (!rect) return;
        mouseX.set((e.clientX - rect.left) / rect.width - 0.5);
        mouseY.set((e.clientY - rect.top) / rect.height - 0.5);
    }, [mouseX, mouseY]);

    const handleMouseLeave = useCallback(() => {
        mouseX.set(0);
        mouseY.set(0);
    }, [mouseX, mouseY]);

    const STATUS_STYLE: Record<string, string> = {
        live: "bg-emerald-500/15 text-emerald-400 border-emerald-500/30",
        building: "bg-violet-500/15 text-violet-400 border-violet-500/30",
        personal: "bg-zinc-800 text-zinc-400 border-zinc-700",
    };

    return (
        <motion.div
            ref={cardRef}
            initial={{ opacity: 0, y: 32, scale: 0.97 }}
            animate={isInView ? { opacity: 1, y: 0, scale: 1 } : {}}
            transition={{ duration: 0.6, delay, ease: [0.22, 1, 0.36, 1] }}
            style={{ perspective: 1000 }}
        >
            <motion.div
                style={{ rotateX, rotateY, transformStyle: "preserve-3d" }}
                onMouseMove={handleMouseMove}
                onMouseLeave={handleMouseLeave}
                className="relative h-full rounded-2xl border border-white/10 bg-zinc-950 overflow-hidden group cursor-default"
            >
                {/* Mouse-following glow */}
                <motion.div
                    className="pointer-events-none absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-2xl"
                    style={{
                        background: `radial-gradient(320px circle at ${glowX} ${glowY}, ${project.accent}18, transparent 70%)`,
                    }}
                />

                {/* Top accent bar */}
                <div
                    className="absolute top-0 left-0 right-0 h-px"
                    style={{ background: `linear-gradient(90deg, transparent, ${project.accent}80, transparent)` }}
                />

                {/* BorderBeam on building projects */}
                {project.status === "building" && <BorderBeam size={160} duration={8} />}

                <div className="relative p-6 flex flex-col h-full">
                    {/* Header row */}
                    <div className="flex items-start justify-between gap-3 mb-4">
                        <div
                            className="w-10 h-10 rounded-xl flex items-center justify-center border shrink-0"
                            style={{ background: `${project.accent}18`, borderColor: `${project.accent}40`, color: project.accent }}
                        >
                            {project.icon}
                        </div>
                        <div className="flex items-center gap-2">
                            <span className={`px-2 py-0.5 rounded-full border text-xs font-medium flex items-center gap-1.5 ${STATUS_STYLE[project.status]}`}>
                                {project.status === "live" && <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />}
                                {project.status === "building" && <span className="w-1.5 h-1.5 rounded-full bg-violet-400 animate-pulse" />}
                                {project.statusLabel}
                            </span>
                        </div>
                    </div>

                    {/* Title + tagline */}
                    <h3 className="text-xl font-bold text-white mb-1">{project.name}</h3>
                    <p className="text-sm font-medium mb-3" style={{ color: project.accent }}>{project.tagline}</p>
                    <p className="text-sm text-zinc-400 leading-relaxed flex-1 mb-4">{project.description}</p>

                    {/* Metrics */}
                    {project.metrics.length > 0 && (
                        <div className="flex gap-4 mb-4">
                            {project.metrics.map((m) => (
                                <div key={m.label}>
                                    <p className="text-xl font-bold text-white tabular-nums">{m.value}<span className="text-sm font-normal text-zinc-400">{m.unit}</span></p>
                                    <p className="text-[11px] text-zinc-500">{m.label}</p>
                                </div>
                            ))}
                        </div>
                    )}

                    {/* Stack chips */}
                    <div className="flex flex-wrap gap-1.5 mb-4">
                        {project.stack.map((tech) => (
                            <span key={tech} className="px-2 py-0.5 rounded text-[11px] bg-white/5 border border-white/8 text-zinc-400">
                                {tech}
                            </span>
                        ))}
                    </div>

                    {/* CTA */}
                    {project.href && (
                        <a
                            href={project.href}
                            target={project.href.startsWith("http") ? "_blank" : undefined}
                            rel={project.href.startsWith("http") ? "noopener noreferrer" : undefined}
                            className="mt-auto flex items-center gap-1.5 text-sm font-medium transition-colors"
                            style={{ color: project.accent }}
                        >
                            {project.href.startsWith("http") ? "Visit live →" : "Read case study →"}
                            <ArrowUpRight className="w-4 h-4" />
                        </a>
                    )}
                </div>
            </motion.div>
        </motion.div>
    );
}

// ─── Featured project card (large, cinematic) ────────────────────────────────

function FeaturedProjectCard({ project }: { project: typeof PERSONAL_PROJECTS[0] }) {
    const ref = useRef<HTMLDivElement>(null);
    const isInView = useInView(ref, { once: true, margin: "-60px" });
    const mouseX = useMotionValue(0);
    const mouseY = useMotionValue(0);
    const rotateX = useSpring(useTransform(mouseY, [-0.5, 0.5], [4, -4]), { stiffness: 180, damping: 22 });
    const rotateY = useSpring(useTransform(mouseX, [-0.5, 0.5], [-4, 4]), { stiffness: 180, damping: 22 });
    const glowX = useTransform(mouseX, [-0.5, 0.5], ["0%", "100%"]);
    const glowY = useTransform(mouseY, [-0.5, 0.5], ["0%", "100%"]);

    const handleMouseMove = useCallback((e: React.MouseEvent<HTMLDivElement>) => {
        const rect = ref.current?.getBoundingClientRect();
        if (!rect) return;
        mouseX.set((e.clientX - rect.left) / rect.width - 0.5);
        mouseY.set((e.clientY - rect.top) / rect.height - 0.5);
    }, [mouseX, mouseY]);

    return (
        <motion.div
            ref={ref}
            initial={{ opacity: 0, y: 40 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.75, ease: [0.22, 1, 0.36, 1] }}
            style={{ perspective: 1200 }}
            className="col-span-full"
        >
            <motion.div
                style={{ rotateX, rotateY, transformStyle: "preserve-3d" }}
                onMouseMove={handleMouseMove}
                onMouseLeave={() => { mouseX.set(0); mouseY.set(0); }}
                className="relative rounded-2xl border border-white/10 bg-zinc-950 overflow-hidden group"
            >
                {/* Cinematic glow layer */}
                <motion.div
                    className="pointer-events-none absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500"
                    style={{
                        background: `radial-gradient(500px circle at ${glowX} ${glowY}, ${project.accent}12, transparent 60%)`,
                    }}
                />

                {/* Top gradient bar */}
                <div className="absolute top-0 left-0 right-0 h-[2px]"
                    style={{ background: `linear-gradient(90deg, transparent 0%, ${project.accent}90 30%, ${project.accent} 50%, ${project.accent}90 70%, transparent 100%)` }}
                />

                <BorderBeam size={280} duration={12} />

                <div className="grid md:grid-cols-2 gap-0">
                    {/* Left: content */}
                    <div className="p-8 md:p-10 flex flex-col justify-between">
                        <div>
                            <div className="flex items-center gap-3 mb-6">
                                <div
                                    className="w-12 h-12 rounded-xl flex items-center justify-center border"
                                    style={{ background: `${project.accent}18`, borderColor: `${project.accent}40`, color: project.accent }}
                                >
                                    {project.icon}
                                </div>
                                <span className="px-2.5 py-1 rounded-full border bg-emerald-500/15 text-emerald-400 border-emerald-500/30 text-xs font-medium flex items-center gap-1.5">
                                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                                    Live
                                </span>
                            </div>

                            <h3 className="text-3xl md:text-4xl font-bold text-white mb-2 tracking-tight">{project.name}</h3>
                            <p className="text-lg font-medium mb-4" style={{ color: project.accent }}>{project.tagline}</p>
                            <p className="text-zinc-300 leading-relaxed mb-6">{project.description}</p>

                            <div className="flex gap-6 mb-6">
                                {project.metrics.map((m) => (
                                    <div key={m.label}>
                                        <p className="text-3xl font-bold text-white tabular-nums">{m.value}<span className="text-base text-zinc-400 font-normal">{m.unit}</span></p>
                                        <p className="text-xs text-zinc-500 mt-0.5">{m.label}</p>
                                    </div>
                                ))}
                            </div>

                            <div className="flex flex-wrap gap-2 mb-8">
                                {project.stack.map((tech) => (
                                    <span key={tech} className="px-3 py-1 rounded-full border border-white/10 bg-white/5 text-xs font-medium text-zinc-300">
                                        {tech}
                                    </span>
                                ))}
                            </div>
                        </div>

                        {project.href && (
                            <Link
                                href={project.href}
                                className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl font-semibold text-sm text-black transition-all hover:brightness-110 w-fit"
                                style={{ background: project.accent }}
                            >
                                Read the full case study
                                <ArrowRight className="w-4 h-4" />
                            </Link>
                        )}
                    </div>

                    {/* Right: screenshot */}
                    {project.image && (
                        <div className="relative min-h-[240px] md:min-h-0 overflow-hidden border-t md:border-t-0 md:border-l border-white/5">
                            <Image
                                src={project.image}
                                alt={project.name}
                                fill
                                className="object-cover object-top group-hover:scale-[1.03] transition-transform duration-700"
                                sizes="(max-width: 768px) 100vw, 50vw"
                            />
                            <div className="absolute inset-0 bg-gradient-to-r from-zinc-950/60 via-transparent to-transparent md:bg-gradient-to-l" />
                        </div>
                    )}
                </div>
            </motion.div>
        </motion.div>
    );
}

// ─── Section: Personal Projects ───────────────────────────────────────────────

function PersonalProjectsSection() {
    const sectionRef = useRef<HTMLDivElement>(null);
    const isInView = useInView(sectionRef, { once: true, margin: "-100px" });

    const featured = PERSONAL_PROJECTS.find((p) => p.featured)!;
    const rest = PERSONAL_PROJECTS.filter((p) => !p.featured);

    return (
        <section ref={sectionRef} className="py-20">
            {/* Heading with cinematic reveal */}
            <motion.div
                initial={{ opacity: 0 }}
                animate={isInView ? { opacity: 1 } : {}}
                transition={{ duration: 0.6 }}
                className="mb-12"
            >
                <div className="flex items-center gap-3 mb-3">
                    <motion.span
                        initial={{ scaleX: 0 }}
                        animate={isInView ? { scaleX: 1 } : {}}
                        transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
                        style={{ originX: 0 }}
                        className="block w-8 h-px bg-gradient-to-r from-cyan-400 to-transparent"
                    />
                    <motion.h2
                        initial={{ opacity: 0, x: -12 }}
                        animate={isInView ? { opacity: 1, x: 0 } : {}}
                        transition={{ duration: 0.55, delay: 0.1, ease: [0.22, 1, 0.36, 1] }}
                        className="text-2xl md:text-3xl font-bold text-white"
                    >
                        What I'm Building
                    </motion.h2>
                </div>
                <motion.p
                    initial={{ opacity: 0, y: 8 }}
                    animate={isInView ? { opacity: 1, y: 0 } : {}}
                    transition={{ duration: 0.5, delay: 0.18 }}
                    className="text-zinc-400 text-base max-w-xl"
                >
                    Personal projects, live SaaS products, and things actively in progress —
                    built to solve real problems and explore new patterns.
                </motion.p>
            </motion.div>

            {/* Featured project */}
            <div className="grid grid-cols-1 gap-5 mb-5">
                <FeaturedProjectCard project={featured} />
            </div>

            {/* Rest of projects */}
            <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5">
                {rest.map((project, i) => (
                    <ProjectCard key={project.id} project={project} delay={i * 0.08} />
                ))}
            </div>

            {/* Bottom strip: "building in public" note */}
            <motion.div
                initial={{ opacity: 0, y: 12 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: 0.3 }}
                className="mt-8 flex items-center justify-between gap-4 rounded-xl border border-white/5 bg-white/[0.02] px-5 py-4 flex-wrap"
            >
                <div className="flex items-center gap-3">
                    <span className="w-2 h-2 rounded-full bg-violet-400 animate-pulse" />
                    <span className="text-sm text-zinc-400">
                        <span className="text-white font-medium">Building in public.</span> Follow progress on{" "}
                        <a href="https://www.youtube.com/@progammingtech4141" target="_blank" rel="noopener noreferrer" className="text-zinc-300 hover:text-white underline underline-offset-2">
                            YouTube
                        </a>
                        {" "}&amp;{" "}
                        <a href="https://www.instagram.com/codewithsom" target="_blank" rel="noopener noreferrer" className="text-zinc-300 hover:text-white underline underline-offset-2">
                            Instagram
                        </a>
                    </span>
                </div>
                <Link href="/case-studies" className="text-sm text-zinc-400 hover:text-white flex items-center gap-1.5 transition-colors">
                    All case studies <ArrowUpRight className="w-3.5 h-3.5" />
                </Link>
            </motion.div>
        </section>
    );
}

// ─── Fade-in wrapper ──────────────────────────────────────────────────────────

function FadeIn({ children, delay = 0, className = "" }: { children: React.ReactNode; delay?: number; className?: string }) {
    const ref = useRef(null);
    const inView = useInView(ref, { once: true, margin: "-80px" });
    return (
        <motion.div
            ref={ref}
            initial={{ opacity: 0, y: 24 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.55, delay, ease: [0.22, 1, 0.36, 1] }}
            className={className}
        >
            {children}
        </motion.div>
    );
}

// ─── Section heading ──────────────────────────────────────────────────────────

function SectionHeading({ children }: { children: React.ReactNode }) {
    return (
        <FadeIn>
            <h2 className="text-2xl md:text-3xl font-bold text-white mb-10 flex items-center gap-3">
                <span className="block w-8 h-px bg-gradient-to-r from-cyan-400 to-transparent" />
                {children}
            </h2>
        </FadeIn>
    );
}

// ─── Main component ───────────────────────────────────────────────────────────

export function AboutPageClient() {
    return (
        <div className="pt-24 pb-0">

            {/* ── Hero ── */}
            <section className="relative max-w-6xl mx-auto px-4 py-20 flex flex-col md:flex-row items-center gap-12 md:gap-16">
                {/* Background glow */}
                <div className="absolute inset-0 pointer-events-none">
                    <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[400px] bg-cyan-500/5 blur-[120px] rounded-full" />
                </div>

                {/* Photo */}
                <motion.div
                    initial={{ opacity: 0, scale: 0.92 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
                    className="relative flex-shrink-0"
                >
                    <div className="relative w-56 h-56 md:w-72 md:h-72 rounded-2xl overflow-hidden border border-white/10">
                        <Image
                            src="/images/somnath-about.jpg"
                            alt="Somnath Khadanga — Full-Stack SaaS Engineer"
                            fill
                            className="object-cover object-top"
                            priority
                            sizes="(max-width: 768px) 224px, 288px"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent" />
                        <BorderBeam size={180} duration={10} />
                    </div>
                    {/* Available badge */}
                    <div className="absolute -bottom-3 left-1/2 -translate-x-1/2 flex items-center gap-1.5 bg-zinc-900 border border-white/10 rounded-full px-3 py-1.5 whitespace-nowrap">
                        <span className="w-2 h-2 rounded-full bg-green-400 animate-pulse" />
                        <span className="text-xs font-medium text-zinc-300">Available for projects</span>
                    </div>
                </motion.div>

                {/* Bio */}
                <div className="flex-1 text-center md:text-left">
                    <motion.p
                        initial={{ opacity: 0, y: 12 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.5, delay: 0.1 }}
                        className="text-sm font-mono text-cyan-400 tracking-widest uppercase mb-3"
                    >
                        Full-Stack SaaS Engineer
                    </motion.p>
                    <motion.h1
                        initial={{ opacity: 0, y: 16 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6, delay: 0.15 }}
                        className="text-4xl md:text-5xl lg:text-6xl font-bold tracking-tighter text-white mb-4 leading-tight"
                    >
                        Somnath{" "}
                        <span className="text-transparent bg-clip-text bg-gradient-to-b from-white to-white/40">
                            Khadanga
                        </span>
                    </motion.h1>
                    <motion.div
                        initial={{ opacity: 0, y: 12 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.5, delay: 0.22 }}
                        className="flex items-center gap-2 justify-center md:justify-start text-zinc-400 text-sm mb-5"
                    >
                        <MapPin className="w-4 h-4 text-zinc-500" />
                        Bangalore, India
                    </motion.div>
                    <motion.p
                        initial={{ opacity: 0, y: 12 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.55, delay: 0.28 }}
                        className="text-zinc-300 text-lg leading-relaxed max-w-xl mb-8"
                    >
                        I build high-performance SaaS products — from early architecture to production scale.
                        Currently SDE4 at <span className="text-white font-semibold">IQVIA</span>
                        {" "}(after ABInBev), and freelancing for founders who need real product engineering, not just code.
                    </motion.p>

                    {/* Social links */}
                    <motion.div
                        initial={{ opacity: 0, y: 12 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.5, delay: 0.35 }}
                        className="flex items-center gap-3 justify-center md:justify-start flex-wrap"
                    >
                        {[
                            { href: "https://www.linkedin.com/in/somnath-khadanga/", icon: <LinkedInIcon />, label: "LinkedIn", color: "hover:text-sky-400 hover:border-sky-400/30" },
                            { href: "https://github.com/somnathraz", icon: <GitHubIcon />, label: "GitHub", color: "hover:text-white hover:border-white/30" },
                            { href: "https://www.instagram.com/codewithsom", icon: <InstagramIcon />, label: "Instagram", color: "hover:text-pink-400 hover:border-pink-400/30" },
                            { href: "https://www.youtube.com/@progammingtech4141", icon: <YouTubeIcon />, label: "YouTube", color: "hover:text-red-400 hover:border-red-400/30" },
                        ].map(({ href, icon, label, color }) => (
                            <a
                                key={label}
                                href={href}
                                target="_blank"
                                rel="noopener noreferrer"
                                aria-label={label}
                                className={`flex items-center gap-2 px-3 py-2 rounded-lg border border-white/10 bg-white/5 text-zinc-400 transition-all duration-200 text-sm ${color}`}
                            >
                                {icon}
                                <span className="hidden sm:inline">{label}</span>
                            </a>
                        ))}

                        <Link
                            href="/book"
                            className="flex items-center gap-2 px-4 py-2 rounded-lg bg-white text-black font-semibold text-sm hover:bg-zinc-200 transition-colors"
                        >
                            Book a call
                            <ArrowRight className="w-4 h-4" />
                        </Link>
                    </motion.div>
                </div>
            </section>

            {/* ── Stats bar ── */}
            <section className="border-y border-white/5 bg-white/[0.02]">
                <div className="max-w-6xl mx-auto px-4 py-8">
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-6 md:gap-0">
                        {[
                            { value: "4+", label: "Years experience" },
                            { value: "4", label: "Companies shipped at" },
                            { value: "1000+", label: "Concurrent users supported" },
                            { value: "50+", label: "Production pages built" },
                        ].map((stat, i) => (
                            <FadeIn key={stat.label} delay={i * 0.08}>
                                <div className={`text-center ${i < 3 ? "md:border-r md:border-white/10" : ""} px-4`}>
                                    <p className="text-3xl font-bold text-white tabular-nums">{stat.value}</p>
                                    <p className="text-xs font-medium text-zinc-500 uppercase tracking-wider mt-1">{stat.label}</p>
                                </div>
                            </FadeIn>
                        ))}
                    </div>
                </div>
            </section>

            <div className="max-w-6xl mx-auto px-4">

                {/* ── Skills ── */}
                <section className="py-20">
                    <SectionHeading>Tech Stack</SectionHeading>
                    <div className="space-y-8">
                        {SKILLS.map((group, gi) => (
                            <FadeIn key={group.category} delay={gi * 0.06}>
                                <div className="flex flex-col sm:flex-row sm:items-start gap-3 sm:gap-6">
                                    <span className="text-xs font-mono text-zinc-500 uppercase tracking-widest pt-1 w-28 shrink-0">
                                        {group.category}
                                    </span>
                                    <div className="flex flex-wrap gap-2">
                                        {group.items.map((skill, si) => (
                                            <motion.span
                                                key={skill}
                                                initial={{ opacity: 0, scale: 0.85 }}
                                                whileInView={{ opacity: 1, scale: 1 }}
                                                viewport={{ once: true }}
                                                transition={{ duration: 0.3, delay: si * 0.04 }}
                                                className={`px-3 py-1 rounded-full border text-xs font-medium transition-colors cursor-default ${SKILL_COLOR_MAP[group.color]}`}
                                            >
                                                {skill}
                                            </motion.span>
                                        ))}
                                    </div>
                                </div>
                            </FadeIn>
                        ))}
                    </div>
                </section>

                <section className="pb-20">
                    <TechToolsSlider />
                </section>

                <div className="border-t border-white/5" />

                {/* ── Experience ── */}
                <section className="py-20">
                    <SectionHeading>Experience</SectionHeading>
                    <div className="space-y-12">
                        {EXPERIENCE.map((job, ji) => (
                            <FadeIn key={job.company} delay={ji * 0.1}>
                                <div className="relative rounded-2xl border border-white/10 bg-white/[0.02] p-6 md:p-8 overflow-hidden group hover:border-white/20 transition-colors">
                                    {/* Subtle glow on hover */}
                                    <div className={`absolute top-0 left-0 w-48 h-1 rounded-t-2xl bg-gradient-to-r ${
                                        job.accent === "cyan" ? "from-cyan-500/60 to-transparent" :
                                        job.accent === "violet" ? "from-violet-500/60 to-transparent" :
                                        job.accent === "amber" ? "from-amber-500/60 to-transparent" :
                                        "from-emerald-500/60 to-transparent"
                                    }`} />

                                    {/* Header */}
                                    <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-2 mb-6">
                                        <div>
                                            <div className="flex items-center gap-2 mb-1">
                                                <h3 className="text-xl font-bold text-white">{job.company}</h3>
                                                {job.current && (
                                                    <span className="px-2 py-0.5 rounded-full bg-green-500/15 border border-green-500/30 text-green-400 text-xs font-medium">
                                                        Current
                                                    </span>
                                                )}
                                            </div>
                                            <p className="text-zinc-400 font-medium">{job.role}</p>
                                        </div>
                                        <div className="flex items-center gap-1.5 text-sm text-zinc-500 shrink-0">
                                            <Calendar className="w-4 h-4" />
                                            {job.period}
                                        </div>
                                    </div>

                                    {/* Metric highlights */}
                                    <div className="grid grid-cols-2 md:grid-cols-4 gap-3 mb-6">
                                        {job.highlights.map((h) => (
                                            <div key={h.label} className="rounded-xl bg-white/5 border border-white/5 p-3">
                                                <p className={`text-2xl font-bold tabular-nums mb-0.5 ${
                                                    job.accent === "cyan" ? "text-cyan-400" :
                                                    job.accent === "violet" ? "text-violet-400" :
                                                    job.accent === "amber" ? "text-amber-400" :
                                                    "text-emerald-400"
                                                }`}>
                                                    {h.metric}
                                                </p>
                                                <p className="text-xs text-zinc-400 font-medium leading-tight">{h.label}</p>
                                                <p className="text-[11px] text-zinc-600 mt-1 leading-tight hidden md:block">{h.detail}</p>
                                            </div>
                                        ))}
                                    </div>

                                    {/* Extra bullets */}
                                    <ul className="space-y-2">
                                        {job.extra.map((item) => (
                                            <li key={item} className="flex items-start gap-2 text-sm text-zinc-400">
                                                <span className={`mt-1.5 w-1.5 h-1.5 rounded-full shrink-0 ${
                                                    job.accent === "cyan" ? "bg-cyan-500" :
                                                    job.accent === "violet" ? "bg-violet-500" :
                                                    job.accent === "amber" ? "bg-amber-500" :
                                                    "bg-emerald-500"
                                                }`} />
                                                {item}
                                            </li>
                                        ))}
                                    </ul>
                                </div>
                            </FadeIn>
                        ))}
                    </div>
                </section>

                <div className="border-t border-white/5" />

                {/* ── Projects ── */}
                <section className="py-20">
                    <SectionHeading>Key Projects</SectionHeading>
                    <div className="grid md:grid-cols-3 gap-5">
                        {PROJECTS.map((project, pi) => (
                            <FadeIn key={project.title} delay={pi * 0.1}>
                                <div className="rounded-2xl border border-white/10 bg-white/[0.02] p-6 h-full flex flex-col hover:border-white/20 transition-colors group">
                                    <div className="flex-1">
                                        <p className={`text-xs font-bold uppercase tracking-wider mb-3 ${
                                            project.accent === "cyan" ? "text-cyan-400" :
                                            project.accent === "violet" ? "text-violet-400" :
                                            "text-emerald-400"
                                        }`}>
                                            {project.metric}
                                        </p>
                                        <h3 className="text-lg font-bold text-white mb-2">{project.title}</h3>
                                        <p className="text-sm text-zinc-400 leading-relaxed mb-4">{project.description}</p>
                                    </div>
                                    <div className="flex flex-wrap gap-1.5 pt-4 border-t border-white/5">
                                        {project.stack.map((tech) => (
                                            <span key={tech} className="px-2 py-0.5 rounded text-[11px] font-medium bg-white/5 text-zinc-400 border border-white/5">
                                                {tech}
                                            </span>
                                        ))}
                                    </div>
                                </div>
                            </FadeIn>
                        ))}
                    </div>
                </section>

                <div className="border-t border-white/5" />

                {/* ── Personal Projects ── */}
                <PersonalProjectsSection />

                <div className="border-t border-white/5" />

                {/* ── Education ── */}
                <section className="py-16">
                    <SectionHeading>Education</SectionHeading>
                    <FadeIn>
                        <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4 rounded-2xl border border-white/10 bg-white/[0.02] p-6">
                            <div className="w-12 h-12 rounded-xl bg-blue-500/10 border border-blue-500/20 flex items-center justify-center shrink-0">
                                <GraduationCap className="w-6 h-6 text-blue-400" />
                            </div>
                            <div className="flex-1">
                                <h3 className="text-white font-bold">Bachelor of Technology — Computer Science</h3>
                                <p className="text-zinc-400 text-sm mt-0.5">BPUT, Odisha · 2016 – 2020</p>
                            </div>
                            <div className="rounded-lg border border-white/10 bg-white/5 px-3 py-2 text-xs text-zinc-400">
                                Android Development Certification<br />
                                <span className="text-zinc-500">Trident Academy of Technology</span>
                            </div>
                        </div>
                    </FadeIn>
                </section>

                <div className="border-t border-white/5" />

                {/* ── Beyond Code ── */}
                <section className="py-16">
                    <SectionHeading>Beyond Code</SectionHeading>
                    <div className="grid sm:grid-cols-2 gap-4">
                        <FadeIn delay={0.05}>
                            <div className="flex items-start gap-4 rounded-2xl border border-white/10 bg-white/[0.02] p-5 hover:border-white/20 transition-colors">
                                <div className="w-10 h-10 rounded-xl bg-amber-500/10 border border-amber-500/20 flex items-center justify-center shrink-0">
                                    <Pencil className="w-5 h-5 text-amber-400" />
                                </div>
                                <div>
                                    <h3 className="text-white font-semibold mb-1">Pencil Art</h3>
                                    <p className="text-zinc-400 text-sm leading-relaxed">Passion for sketching and creative expression — the same attention to detail that goes into my code.</p>
                                </div>
                            </div>
                        </FadeIn>
                        <FadeIn delay={0.1}>
                            <div className="flex items-start gap-4 rounded-2xl border border-white/10 bg-white/[0.02] p-5 hover:border-white/20 transition-colors">
                                <div className="w-10 h-10 rounded-xl bg-violet-500/10 border border-violet-500/20 flex items-center justify-center shrink-0">
                                    <Cpu className="w-5 h-5 text-violet-400" />
                                </div>
                                <div>
                                    <h3 className="text-white font-semibold mb-1">Exploring Cutting-Edge Tech</h3>
                                    <p className="text-zinc-400 text-sm leading-relaxed">Enthusiastic about AI, microservices, and whatever ships next. Writing about it on YouTube at <span className="text-zinc-300">@progammingtech4141</span>.</p>
                                </div>
                            </div>
                        </FadeIn>
                    </div>
                </section>

                <div className="border-t border-white/5" />

                {/* ── CTA ── */}
                <section className="py-20 text-center">
                    <FadeIn>
                        <h2 className="text-3xl md:text-4xl font-bold text-white mb-4 tracking-tight">
                            Want to work together?
                        </h2>
                        <p className="text-zinc-400 text-lg mb-8 max-w-xl mx-auto">
                            I'm available for freelance SaaS projects. A 20-minute call is usually enough to figure out if there's a fit.
                        </p>
                        <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
                            <Link
                                href="/book"
                                className="inline-flex items-center gap-2 rounded-full bg-white px-6 py-3 text-base font-semibold text-black hover:bg-zinc-200 transition-colors"
                            >
                                Book a 20-minute call
                                <ArrowRight className="w-4 h-4" />
                            </Link>
                            <Link
                                href="/case-studies"
                                className="inline-flex items-center gap-2 text-zinc-400 hover:text-white underline underline-offset-4 text-sm transition-colors"
                            >
                                View case studies
                                <ExternalLink className="w-4 h-4" />
                            </Link>
                        </div>
                    </FadeIn>
                </section>

            </div>
        </div>
    );
}
