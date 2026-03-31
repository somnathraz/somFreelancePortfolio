"use client";

import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { MobileNav } from "@/components/MobileNav";
import { ContactSheet } from "@/components/ContactSheet";
import { Button } from "@/components/ui/button";
import {
    ArrowRight, Zap, CheckCircle2, Clock, Terminal,
    Users, Rocket, Activity, TrendingDown, Package,
    MousePointerClick, Server, GitBranch, Layers,
    Shield, Wrench, Search, AlertOctagon, AlertTriangle,
    BarChart2,
} from "lucide-react";
import { Particles } from "@/components/ui/particles";
import ShimmerButton from "@/components/ui/shimmer-button";
import { ServiceSectionCard } from "@/components/services/ServiceSectionCard";
import { motion, useInView } from "motion/react";
import { FlickeringGrid } from "@/components/ui/flickering-grid";
import { BorderBeam } from "@/components/magicui/border-beam";
import { cn } from "@/lib/utils";
import { SectionWhoItsFor } from "@/components/services/SectionWhoItsFor";
import { SectionIncidentBoard } from "@/components/services/SectionIncidentBoard";
import { SectionPhasedPipeline } from "@/components/services/SectionPhasedPipeline";
import { SectionOutcomesBoard } from "@/components/services/SectionOutcomesBoard";
import type { WhoItsForPersona } from "@/components/services/SectionWhoItsFor";
import type { ServiceIncident } from "@/components/services/SectionIncidentBoard";
import type { ServicePhase } from "@/components/services/SectionPhasedPipeline";
import type { ServiceTransformation } from "@/components/services/SectionOutcomesBoard";

// ─── Data ─────────────────────────────────────────────────────────────────────

const processSteps: [string, string][] = [
    ["1. Audit", "Review key pages, user flows, and technical bottlenecks to find what is actually slowing things down."],
    ["2. Prioritize", "Identify the highest-impact performance issues first — by user pain, business importance, and implementation effort."],
    ["3. Optimize", "Fix bottlenecks across rendering, assets, data flow, backend response time, and frontend interaction."],
    ["4. Validate", "Re-check using real flows, key metrics, and performance tools to confirm the gains are real."],
    ["5. Stabilize", "Put guardrails in place so the product stays fast as new features keep shipping."],
];

const faqItems = [
    {
        q: "Do you only optimize Next.js apps?",
        a: "Mostly, yes. This page is built for Next.js products, but the same performance mindset applies to React-based SaaS products too.",
    },
    {
        q: "Can you help if the app is already live?",
        a: "Yes — this is especially useful for live products that have grown messy, slow, or harder to scale.",
    },
    {
        q: "Will this require a full rewrite?",
        a: "Usually not. In many cases the biggest wins come from focused improvements, not starting over from scratch.",
    },
    {
        q: "Do you look at backend issues too?",
        a: "Yes. If slow APIs, inefficient queries, or bad data-fetching patterns are contributing to the experience, I look at those too.",
    },
    {
        q: "Is this mainly for Lighthouse scores?",
        a: "No. Better scores can be useful, but the main goal is a faster, smoother experience for real users. The score is a byproduct.",
    },
];

// "Who this is for" personas
const personas: WhoItsForPersona[] = [
    {
        Icon: Activity,
        label: "PROFILE_01",
        title: "Your SaaS is live but feels slower than it should",
        score: 96,
        copy: "You've built and launched. Users are coming in. But the dashboard takes 4 seconds to load, filters stall on every interaction, and something feels off. You're not sure where the problem lives — you just know it's costing you churn you can't fully explain.",
        signals: ["Live product", "Unexplained churn", "Slow page complaints"],
    },
    {
        Icon: BarChart2,
        label: "PROFILE_02",
        title: "Core Web Vitals are in the red",
        score: 91,
        copy: "LCP is over 4 seconds. INP makes buttons feel broken. Your Lighthouse score is something you'd rather not show anyone. You need someone who actually understands what these metrics mean and has already fixed them before — not someone who will just run a report and email you a PDF.",
        signals: ["LCP > 2.5s", "INP > 200ms", "Poor Lighthouse score"],
    },
    {
        Icon: Rocket,
        label: "PROFILE_03",
        title: "You're preparing for a growth push or fundraise",
        score: 88,
        copy: "Marketing spend is ramping. A fundraise deck needs a demo that doesn't embarrass you. Onboarding is about to go live. You know the product isn't ready for 10x the traffic — and now is the right time to fix the foundations before the load arrives.",
        signals: ["Pre-launch scale", "Traffic growth planned", "Investor demos upcoming"],
    },
    {
        Icon: Users,
        label: "PROFILE_04",
        title: "Performance has been on the roadmap for months",
        score: 85,
        copy: "Your team is smart and working hard — but they're heads-down shipping features. 'Fix performance' has been backlogged for six months. You need someone to come in, own the work completely, and hand back a product that is noticeably faster without pulling your team off their sprint.",
        signals: ["Feature-focused team", "Perf backlogged", "Engineering bandwidth exhausted"],
    },
];

// Incident board data
const incidents: ServiceIncident[] = [
    {
        severity: "CRITICAL",
        Icon: AlertOctagon,
        metric: "LCP: 4.8s",
        target: "target < 2.5s",
        title: "Dashboard loads after users have already doubted you",
        impact: "Users form their first impression in the first 3 seconds. At 4.8s, they've already questioned whether the product works before they've seen anything useful.",
    },
    {
        severity: "CRITICAL",
        Icon: Package,
        metric: "Bundle: 1.4MB JS",
        target: "target < 250KB",
        title: "Every user downloads code they will never run on that page",
        impact: "On a 4G connection, 1.4MB of JavaScript adds 2–3 seconds of parse time on top of download time — on every single page load, for every user.",
    },
    {
        severity: "HIGH",
        Icon: MousePointerClick,
        metric: "INP: 380ms",
        target: "target < 200ms",
        title: "Clicks feel broken. Users think something is wrong.",
        impact: "When a button takes 380ms to respond, users tap again. Then again. Then they wonder if their action registered — and that doubt makes your product feel unreliable.",
    },
    {
        severity: "HIGH",
        Icon: Server,
        metric: "API wait: 2.3s avg",
        target: "target < 500ms",
        title: "The loading spinner is the most memorable part of the experience",
        impact: "Every cold API hit adds seconds. Strategic caching alone can cut this by 60–80%. The work is not glamorous but the user impact is immediate.",
    },
    {
        severity: "HIGH",
        Icon: TrendingDown,
        metric: "CLS: 0.28",
        target: "target < 0.10",
        title: "The UI jumps while loading. Trust erodes with every shift.",
        impact: "Layout instability makes a product look hastily built. Even if every feature works correctly, the physical jumping of elements signals a lack of polish.",
    },
    {
        severity: "MEDIUM",
        Icon: GitBranch,
        metric: "CI build: 15 min",
        target: "target < 4 min",
        title: "Slow builds slow down your whole team, not just deploys",
        impact: "A 15-minute build means every hotfix, every performance fix, every iteration takes 20 minutes to verify. Across a team, that compounds into hours of lost velocity every week.",
    },
];

// Phased deliverables
const phases: ServicePhase[] = [
    {
        id: "01",
        label: "UNDERSTAND",
        Icon: Search,
        accent: "text-blue-400",
        border: "border-blue-500/30",
        bg: "bg-blue-500/5",
        glow: "shadow-[0_0_40px_-10px_rgba(59,130,246,0.3)]",
        items: [
            "Performance audit of all key pages and user flows",
            "Core Web Vitals review — LCP, INP, CLS with real data",
            "Bundle-size analysis: what ships vs what actually needs to",
            "Rendering strategy review — what is server vs client vs cached",
        ],
    },
    {
        id: "02",
        label: "FIX",
        Icon: Wrench,
        accent: "text-amber-400",
        border: "border-amber-500/30",
        bg: "bg-amber-500/5",
        glow: "shadow-[0_0_40px_-10px_rgba(245,158,11,0.3)]",
        items: [
            "Client/server rendering strategy improvements",
            "Image, font, and asset loading optimization",
            "API and database bottleneck analysis",
            "Caching and stale-while-revalidate implementation",
            "Expensive component and state-flow cleanup",
        ],
    },
    {
        id: "03",
        label: "POLISH",
        Icon: Layers,
        accent: "text-purple-400",
        border: "border-purple-500/30",
        bg: "bg-purple-500/5",
        glow: "shadow-[0_0_40px_-10px_rgba(168,85,247,0.3)]",
        items: [
            "Dashboard, table, and search performance fixes",
            "Build-time and deployment pipeline optimization",
            "Interaction and transition performance tuning",
        ],
    },
    {
        id: "04",
        label: "PROTECT",
        Icon: Shield,
        accent: "text-emerald-400",
        border: "border-emerald-500/30",
        bg: "bg-emerald-500/5",
        glow: "shadow-[0_0_40px_-10px_rgba(52,211,153,0.3)]",
        items: [
            "Monitoring setup to catch future regressions",
            "Performance budgets and CI/CD guardrails",
            "Team handoff with documentation on what was fixed and why",
        ],
    },
];

// Before/After outcome transformations
const transformations: ServiceTransformation[] = [
    {
        metric: "1.2s",
        label: "LCP",
        before: { value: "4.8s", note: "Users wait. Page feels broken." },
        after: { value: "1.2s", note: "Page loads before users register a delay." },
        delta: "−75%",
        color: "emerald",
    },
    {
        metric: "60%",
        label: "Latency reduced",
        before: { value: "2.3s avg", note: "Every API call hits the database cold." },
        after: { value: "0.4s avg", note: "Cached. Fast. Invisible to the user." },
        delta: "−83%",
        color: "blue",
    },
    {
        metric: "3 min",
        label: "Build time",
        before: { value: "15 min", note: "Every fix takes 20 minutes to verify." },
        after: { value: "3 min", note: "Iterate and ship 5× faster." },
        delta: "−80%",
        color: "purple",
    },
    {
        metric: "80ms",
        label: "INP",
        before: { value: "380ms", note: "Clicks feel broken. Users tap twice." },
        after: { value: "80ms", note: "Instant response. Product feels alive." },
        delta: "−79%",
        color: "amber",
    },
    {
        metric: "0.02",
        label: "CLS",
        before: { value: "0.28", note: "UI jumps while loading. Trust erodes." },
        after: { value: "0.02", note: "Stable layout. Professional product feel." },
        delta: "−93%",
        color: "pink",
    },
    {
        metric: "94",
        label: "Perf score",
        before: { value: "28 / 100", note: "Google sees a slow page. So do users." },
        after: { value: "94 / 100", note: "All Core Web Vitals passing." },
        delta: "+236%",
        color: "emerald",
    },
];

// ─── Animated Performance Score Gauge ─────────────────────────────────────────

const CX = 100;
const CY = 100;
const R = 70;
const CIRCUMFERENCE = 2 * Math.PI * R;
const ARC_LENGTH = CIRCUMFERENCE * (270 / 360);
const ROTATION = -135;

function scoreColor(s: number) {
    if (s >= 90) return "#34d399";
    if (s >= 50) return "#f59e0b";
    return "#f87171";
}

function scoreDashOffset(s: number) {
    return ARC_LENGTH * (1 - s / 100);
}

function PerformanceGauge({ targetScore = 94, initialScore = 28, delayMs = 400 }: { targetScore?: number; initialScore?: number; delayMs?: number }) {
    const ref = useRef<SVGSVGElement>(null);
    const inView = useInView(ref, { once: true, margin: "-80px" });
    const [score, setScore] = useState(initialScore);

    useEffect(() => {
        if (!inView) return;
        const timeout = setTimeout(() => {
            const start = initialScore;
            const end = targetScore;
            const duration = 2000;
            const startTime = performance.now();
            const tick = (now: number) => {
                const elapsed = now - startTime;
                const t = Math.min(elapsed / duration, 1);
                const eased = 1 - Math.pow(1 - t, 3);
                setScore(Math.round(start + (end - start) * eased));
                if (t < 1) requestAnimationFrame(tick);
            };
            requestAnimationFrame(tick);
        }, delayMs);
        return () => clearTimeout(timeout);
    }, [inView, initialScore, targetScore, delayMs]);

    const color = scoreColor(score);
    const dashOffset = scoreDashOffset(score);

    return (
        <svg ref={ref} viewBox="0 0 200 170" className="w-full max-w-[200px]" aria-label={`Performance score: ${score}`}>
            <circle cx={CX} cy={CY} r={R} fill="none" stroke="rgba(255,255,255,0.07)" strokeWidth="10" strokeLinecap="round"
                strokeDasharray={`${ARC_LENGTH} ${CIRCUMFERENCE}`} transform={`rotate(${ROTATION}, ${CX}, ${CY})`} />
            <circle cx={CX} cy={CY} r={R} fill="none" stroke={color} strokeWidth="10" strokeLinecap="round"
                strokeDasharray={`${ARC_LENGTH} ${CIRCUMFERENCE}`} strokeDashoffset={dashOffset}
                transform={`rotate(${ROTATION}, ${CX}, ${CY})`}
                style={{ transition: "stroke-dashoffset 0.06s linear, stroke 0.4s ease", filter: `drop-shadow(0 0 8px ${color})` }} />
            <text x={CX} y={CY - 4} textAnchor="middle" dominantBaseline="middle" fill="white" fontSize="34" fontWeight="700" fontFamily="system-ui, sans-serif">{score}</text>
            <text x={CX} y={CY + 22} textAnchor="middle" fill="rgba(255,255,255,0.4)" fontSize="10" fontFamily="system-ui, sans-serif">Performance</text>
            <text x="22" y="162" fill="rgba(255,255,255,0.3)" fontSize="9" fontFamily="system-ui, sans-serif">0</text>
            <text x="170" y="162" fill="rgba(255,255,255,0.3)" fontSize="9" fontFamily="system-ui, sans-serif">100</text>
        </svg>
    );
}

// ─── CWV MetricBar ─────────────────────────────────────────────────────────────

interface CWVMetric { label: string; before: string; after: string; beforePct: number; afterPct: number; unit: string; }
const cwvMetrics: CWVMetric[] = [
    { label: "LCP", before: "4.8", after: "1.2", beforePct: 92, afterPct: 24, unit: "s" },
    { label: "INP", before: "380", after: "80", beforePct: 86, afterPct: 19, unit: "ms" },
    { label: "CLS", before: "0.28", after: "0.02", beforePct: 78, afterPct: 6, unit: "" },
];

function MetricBar({ metric, animate }: { metric: CWVMetric; animate: boolean }) {
    return (
        <div className="space-y-1.5">
            <div className="flex items-center justify-between text-[11px] font-mono">
                <span className="text-zinc-400">{metric.label}</span>
                <span className="flex items-center gap-1.5">
                    <span className="text-red-400 line-through opacity-60">{metric.before}{metric.unit}</span>
                    <span className="text-emerald-400">{metric.after}{metric.unit}</span>
                </span>
            </div>
            <div className="relative h-1.5 rounded-full bg-white/[0.06] overflow-hidden">
                <div className="absolute inset-y-0 left-0 rounded-full bg-red-500/40 transition-all duration-[1800ms] ease-out" style={{ width: animate ? `${metric.beforePct}%` : "0%" }} />
                <div className="absolute inset-y-0 left-0 rounded-full bg-emerald-400 transition-all duration-[1800ms] ease-out"
                    style={{ width: animate ? `${metric.afterPct}%` : "0%", boxShadow: "0 0 6px #34d399", transitionDelay: animate ? "600ms" : "0ms" }} />
            </div>
        </div>
    );
}

// ─── Hero Visual ──────────────────────────────────────────────────────────────

function HeroVisual() {
    const ref = useRef<HTMLDivElement>(null);
    const inView = useInView(ref, { once: true });
    const [metricsAnimate, setMetricsAnimate] = useState(false);

    useEffect(() => {
        if (!inView) return;
        const t = setTimeout(() => setMetricsAnimate(true), 600);
        return () => clearTimeout(t);
    }, [inView]);

    return (
        <div ref={ref} className="relative w-full flex justify-center select-none" style={{ perspective: "1200px" }}>
            <motion.div
                initial={{ opacity: 0, y: 32, rotateX: 16 }}
                animate={inView ? { opacity: 1, y: 0, rotateX: 6 } : {}}
                transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
                style={{ transformStyle: "preserve-3d" }}
                className="relative w-full max-w-sm"
            >
                <div className="absolute -inset-6 bg-emerald-500/10 blur-3xl rounded-full pointer-events-none" />
                <div className="relative rounded-2xl border border-white/10 bg-zinc-950/90 backdrop-blur-sm overflow-hidden shadow-[0_40px_80px_-20px_rgba(0,0,0,0.8)]">
                    <BorderBeam size={200} duration={10} colorFrom="#34d399" colorTo="#3b82f6" borderWidth={1.5} />
                    <div className="flex items-center gap-2 px-4 py-3 border-b border-white/[0.06] bg-white/[0.02]">
                        <div className="flex gap-1.5">
                            <div className="w-2.5 h-2.5 rounded-full bg-red-500/70" />
                            <div className="w-2.5 h-2.5 rounded-full bg-amber-500/70" />
                            <div className="w-2.5 h-2.5 rounded-full bg-green-500/70" />
                        </div>
                        <span className="ml-2 font-mono text-[10px] text-zinc-500">performance audit — your-saas.app</span>
                    </div>
                    <div className="p-5 space-y-5">
                        <div className="flex justify-center"><PerformanceGauge targetScore={94} initialScore={28} delayMs={700} /></div>
                        <div className="space-y-3">
                            <p className="text-[10px] font-mono uppercase tracking-widest text-zinc-600">Core Web Vitals</p>
                            {cwvMetrics.map((m) => (<MetricBar key={m.label} metric={m} animate={metricsAnimate} />))}
                        </div>
                        <motion.div
                            initial={{ opacity: 0, scale: 0.9 }}
                            animate={metricsAnimate ? { opacity: 1, scale: 1 } : {}}
                            transition={{ delay: 2.4, duration: 0.4 }}
                            className="flex items-center gap-2 bg-emerald-500/10 border border-emerald-500/20 rounded-lg px-3 py-2"
                        >
                            <span className="relative flex h-2 w-2">
                                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75" />
                                <span className="relative inline-flex h-2 w-2 rounded-full bg-emerald-400" />
                            </span>
                            <span className="text-[11px] font-semibold text-emerald-400">All Core Web Vitals passing</span>
                        </motion.div>
                    </div>
                </div>
                <motion.div initial={{ opacity: 0, x: -12 }} animate={inView ? { opacity: 1, x: 0 } : {}} transition={{ delay: 1.2, duration: 0.5 }}
                    className="absolute -left-4 top-1/3 bg-zinc-900 border border-white/10 rounded-lg px-2.5 py-1.5 flex items-center gap-1.5 shadow-xl">
                    <Clock className="w-3 h-3 text-blue-400" /><span className="text-[10px] font-mono text-zinc-300">LCP 4.8s → 1.2s</span>
                </motion.div>
                <motion.div initial={{ opacity: 0, x: 12 }} animate={inView ? { opacity: 1, x: 0 } : {}} transition={{ delay: 1.5, duration: 0.5 }}
                    className="absolute -right-4 top-1/2 bg-zinc-900 border border-white/10 rounded-lg px-2.5 py-1.5 flex items-center gap-1.5 shadow-xl">
                    <Zap className="w-3 h-3 text-amber-400" /><span className="text-[10px] font-mono text-zinc-300">INP −300ms</span>
                </motion.div>
                <motion.div initial={{ opacity: 0, y: 12 }} animate={inView ? { opacity: 1, x: 0 } : {}} transition={{ delay: 1.8, duration: 0.5 }}
                    className="absolute -bottom-3 left-1/2 -translate-x-1/2 bg-zinc-900 border border-white/10 rounded-lg px-2.5 py-1.5 flex items-center gap-1.5 shadow-xl whitespace-nowrap">
                    <CheckCircle2 className="w-3 h-3 text-emerald-400" /><span className="text-[10px] font-mono text-zinc-300">60% latency reduced</span>
                </motion.div>
            </motion.div>
        </div>
    );
}

// ─── Audit Terminal ────────────────────────────────────────────────────────────

const TERMINAL_LINES: Array<{ text: string; type: "cmd" | "info" | "warn" | "ok" | "fix"; delay: number }> = [
    { text: "$ audit --deep ./my-saas-app --profile production", type: "cmd", delay: 0 },
    { text: "> Scanning 14 routes...", type: "info", delay: 600 },
    { text: "> Analyzing bundle composition...", type: "info", delay: 1100 },
    { text: "⚠  /dashboard: 1.4MB JS (critical threshold exceeded)", type: "warn", delay: 1800 },
    { text: "⚠  /analytics: 892KB unneeded on initial load", type: "warn", delay: 2200 },
    { text: "> Running Core Web Vitals simulation...", type: "info", delay: 2800 },
    { text: "✗  LCP: 4.8s  — target < 2.5s  [POOR]", type: "warn", delay: 3400 },
    { text: "✗  INP: 380ms — target < 200ms [POOR]", type: "warn", delay: 3700 },
    { text: "✗  CLS: 0.28  — target < 0.10  [POOR]", type: "warn", delay: 4000 },
    { text: "> Found 3 critical issues, 9 optimization opportunities", type: "info", delay: 4600 },
    { text: "> Generating prioritized fix plan...", type: "info", delay: 5200 },
    { text: "✓  Fix 1: Split /dashboard bundle  → est. −68% JS", type: "ok", delay: 5900 },
    { text: "✓  Fix 2: Defer analytics imports  → est. LCP −2.1s", type: "ok", delay: 6300 },
    { text: "✓  Fix 3: Stabilize sidebar shifts → est. CLS −0.24", type: "ok", delay: 6700 },
    { text: "✓  Fix 4: Cache API responses (stale-while-revalidate)", type: "ok", delay: 7100 },
    { text: "─────────────────────────────────────────────────────", type: "info", delay: 7600 },
    { text: "  Projected score after fixes: 28 → 94 (↑ 236%)", type: "fix", delay: 8000 },
];

function AuditTerminal() {
    const ref = useRef<HTMLDivElement>(null);
    const inView = useInView(ref, { once: true, margin: "-80px" });
    const [visibleCount, setVisibleCount] = useState(0);

    useEffect(() => {
        if (!inView) return;
        const timers: ReturnType<typeof setTimeout>[] = [];
        TERMINAL_LINES.forEach((line, idx) => {
            const t = setTimeout(() => setVisibleCount(idx + 1), line.delay);
            timers.push(t);
        });
        return () => timers.forEach(clearTimeout);
    }, [inView]);

    return (
        <div ref={ref} className="relative rounded-2xl border border-white/[0.08] bg-[#0d0d0d] overflow-hidden shadow-2xl">
            <BorderBeam size={250} duration={14} colorFrom="#34d399" colorTo="#6366f1" borderWidth={1} />
            <div className="flex items-center gap-2 px-4 py-3 border-b border-white/[0.06] bg-white/[0.02]">
                <div className="flex gap-1.5">
                    <div className="w-2.5 h-2.5 rounded-full bg-red-500/70" />
                    <div className="w-2.5 h-2.5 rounded-full bg-amber-500/70" />
                    <div className="w-2.5 h-2.5 rounded-full bg-green-500/70" />
                </div>
                <Terminal className="ml-2 w-3.5 h-3.5 text-zinc-600" />
                <span className="font-mono text-[10px] text-zinc-500">performance-audit</span>
                <span className="ml-auto flex items-center gap-1.5">
                    <span className="relative flex h-1.5 w-1.5">
                        <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75" />
                        <span className="relative inline-flex h-1.5 w-1.5 rounded-full bg-emerald-400" />
                    </span>
                    <span className="text-[9px] text-zinc-600 font-mono">running</span>
                </span>
            </div>
            <div className="p-4 font-mono text-[11px] leading-6 min-h-[320px] space-y-0.5 overflow-hidden">
                {TERMINAL_LINES.slice(0, visibleCount).map((line, i) => (
                    <motion.div key={i} initial={{ opacity: 0, x: -4 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.2 }}
                        className={cn("whitespace-pre-wrap break-all",
                            line.type === "cmd" && "text-zinc-300",
                            line.type === "info" && "text-zinc-500",
                            line.type === "warn" && "text-amber-400",
                            line.type === "ok" && "text-emerald-400",
                            line.type === "fix" && "text-white font-bold",
                        )}>{line.text}</motion.div>
                ))}
                {visibleCount < TERMINAL_LINES.length && (
                    <span className="inline-block w-2 h-3.5 bg-zinc-400 animate-pulse align-text-bottom" />
                )}
            </div>
        </div>
    );
}

// ─── Waterfall Visual ──────────────────────────────────────────────────────────

const waterfallItems = [
    { label: "HTML document", before: 92, after: 30, color: "bg-blue-400" },
    { label: "Main JS bundle", before: 100, after: 28, color: "bg-purple-400" },
    { label: "API /dashboard", before: 78, after: 22, color: "bg-amber-400" },
    { label: "API /user", before: 62, after: 18, color: "bg-pink-400" },
    { label: "Fonts", before: 45, after: 20, color: "bg-cyan-400" },
    { label: "Images", before: 55, after: 25, color: "bg-emerald-400" },
];

function WaterfallVisual() {
    const ref = useRef<HTMLDivElement>(null);
    const inView = useInView(ref, { once: true, margin: "-80px" });
    const [phase, setPhase] = useState<"before" | "after">("before");

    useEffect(() => {
        if (!inView) return;
        const t = setTimeout(() => setPhase("after"), 1200);
        return () => clearTimeout(t);
    }, [inView]);

    return (
        <div ref={ref} className="space-y-3">
            <div className="flex items-center justify-between mb-4">
                <p className="text-[11px] font-mono uppercase tracking-widest text-zinc-500">Request waterfall</p>
                <div className="flex items-center gap-3 text-[10px] font-mono">
                    <span className="flex items-center gap-1"><span className="w-2 h-2 rounded-sm bg-white/20 inline-block" />Before</span>
                    <span className="flex items-center gap-1"><span className="w-2 h-2 rounded-sm bg-emerald-400 inline-block" />After</span>
                </div>
            </div>
            {waterfallItems.map((item, i) => (
                <div key={item.label} className="flex items-center gap-3">
                    <span className="text-[10px] font-mono text-zinc-600 w-28 shrink-0 truncate">{item.label}</span>
                    <div className="flex-1 relative h-3 bg-white/[0.05] rounded-full overflow-hidden">
                        <motion.div className="absolute inset-y-0 left-0 bg-white/20 rounded-full"
                            initial={{ width: `${item.before}%` }}
                            animate={{ width: phase === "after" ? "0%" : `${item.before}%` }}
                            transition={{ duration: 0.6, delay: i * 0.08, ease: "easeOut" }} />
                        <motion.div className={cn("absolute inset-y-0 left-0 rounded-full", item.color)}
                            initial={{ width: "0%" }}
                            animate={{ width: phase === "after" ? `${item.after}%` : "0%" }}
                            transition={{ duration: 0.6, delay: i * 0.08 + 0.2, ease: "easeOut" }}
                            style={{ boxShadow: "0 0 8px currentColor" }} />
                    </div>
                    <span className={cn("text-[10px] font-mono w-12 text-right tabular-nums transition-colors duration-500",
                        phase === "after" ? "text-emerald-400" : "text-zinc-500")}>
                        {phase === "after" ? `−${Math.round((1 - item.after / item.before) * 100)}%` : "—"}
                    </span>
                </div>
            ))}
        </div>
    );
}

// ─── Differentiators ───────────────────────────────────────────────────────────

const differentiators = [
    {
        title: "I optimize the experience, not just the report",
        body: "PageSpeed scores are useful, but the real goal is faster user flows, better responsiveness, and less friction in the product. A green score that nobody notices is the wrong target.",
    },
    {
        title: "High-impact bottlenecks first",
        body: "Instead of chasing tiny gains everywhere, I identify the parts of the product that are actually hurting user experience and business outcomes and fix those first.",
    },
    {
        title: "Built for products that already exist",
        body: "This service is specifically for teams that don't need a rebuild. They need focused, surgical engineering improvements — not a proposal for a six-month rewrite.",
    },
    {
        title: "Practical recommendations only",
        body: "You get changes that are realistic to implement and worth maintaining. Not a giant theoretical audit that describes every possible improvement and leaves implementation entirely to you.",
    },
];

// ─── Main Page ─────────────────────────────────────────────────────────────────

export function NextjsPerformanceClient() {
    return (
        <main className="min-h-screen bg-black text-foreground selection:bg-white/20">
            <Navbar />

            {/* ── Hero ── */}
            <section className="relative flex min-h-[min(100svh,960px)] flex-col items-center justify-center overflow-hidden bg-background px-4 pb-20 pt-28 md:pt-32">
                <div className="absolute inset-0 z-0 bg-grid-white pointer-events-none [mask-image:radial-gradient(ellipse_at_center,transparent_20%,black)]" />
                <div className="pointer-events-none absolute inset-0 flex items-center justify-center">
                    <div className="h-[28rem] w-[28rem] rounded-full bg-emerald-500/10 blur-[120px]" />
                </div>

                <div className="relative z-10 mx-auto grid max-w-6xl gap-12 lg:grid-cols-2 lg:items-center">
                    <div className="flex flex-col items-center text-center lg:items-start lg:text-left space-y-7">
                        <div className="inline-flex items-center rounded-full border border-zinc-800 bg-zinc-900/50 px-3 py-1 text-sm text-zinc-400 backdrop-blur-sm">
                            <span className="mr-2 flex h-2 w-2 animate-pulse rounded-full bg-emerald-400" />
                            Next.js Performance Optimization
                        </div>

                        <h1 className="text-4xl font-bold tracking-tighter text-white sm:text-5xl xl:text-6xl leading-[1.05]">
                            Speed up your Next.js product — without rewriting everything.
                        </h1>

                        <p className="max-w-xl text-lg text-zinc-400">
                            I help SaaS teams fix slow pages, poor Core Web Vitals, sluggish frontend interactions, and backend bottlenecks — so the product feels faster, converts better, and scales more cleanly.
                        </p>

                        <div className="flex flex-col items-center gap-4 sm:flex-row lg:items-start">
                            <ContactSheet>
                                <Button size="lg" className="h-12 min-w-[220px] bg-white text-base text-black hover:bg-zinc-200">
                                    Book a 20-minute strategy call
                                    <ArrowRight className="ml-2 h-4 w-4" />
                                </Button>
                            </ContactSheet>
                            <Button asChild variant="outline" size="lg" className="h-12 min-w-[220px] border-white/10 text-base hover:bg-white/5 hover:text-white">
                                <Link href="/case-studies">See performance case studies</Link>
                            </Button>
                        </div>

                        <div className="w-full border-y border-white/10 bg-white/[0.02] px-4 py-5 backdrop-blur-sm">
                            <div className="grid grid-cols-3 gap-4 text-center">
                                <div>
                                    <p className="text-xl font-bold tabular-nums text-emerald-400">60%</p>
                                    <p className="mt-0.5 text-[11px] font-medium uppercase tracking-widest text-zinc-500">Latency cut</p>
                                </div>
                                <div className="border-x border-white/10">
                                    <p className="text-xl font-bold tabular-nums text-white">15m → 3m</p>
                                    <p className="mt-0.5 text-[11px] font-medium uppercase tracking-widest text-zinc-500">Build time</p>
                                </div>
                                <div>
                                    <p className="text-xl font-bold tabular-nums text-white">CWV</p>
                                    <p className="mt-0.5 text-[11px] font-medium uppercase tracking-widest text-zinc-500">Focused fixes</p>
                                </div>
                            </div>
                        </div>
                    </div>
                    <HeroVisual />
                </div>

                <div className="pointer-events-none absolute -bottom-8 left-0 right-0 z-20 h-32 bg-gradient-to-t from-black to-transparent" />
            </section>

            {/* ── WHO THIS IS FOR — persona cards with 3D tilt + fit score ── */}
            <SectionWhoItsFor
                personas={personas}
                accent="emerald"
                subLabel="— client fit analysis"
                notFitText="Brochure websites, cosmetic-only redesigns, or projects where business outcomes don't depend on how the product actually performs."
            />

            {/* ── PROBLEMS — agentic incident board ── */}
            <SectionIncidentBoard
                incidents={incidents}
                subLabel="— active issue detection"
                description="Most products feel 'kind of slow' for a long time before the team realises how much damage it is doing to conversion, retention, and trust. These are the patterns I see most."
            />

            {/* ── Agentic Audit Visual ── */}
            <section className="relative border-b border-white/5 px-4 py-20 overflow-hidden">
                <div className="pointer-events-none absolute inset-0">
                    <FlickeringGrid className="absolute inset-0 z-0" squareSize={4} gridGap={6} color="#34d399" maxOpacity={0.08} flickerChance={0.06} />
                    <div className="absolute inset-0 bg-gradient-to-b from-black via-transparent to-black" />
                </div>
                <div className="container relative z-10 mx-auto max-w-5xl">
                    <div className="mb-12 text-center">
                        <p className="font-mono text-[11px] uppercase tracking-[0.2em] text-zinc-500 mb-3">— deep analysis</p>
                        <h2 className="text-3xl font-bold tracking-tight text-white md:text-5xl">
                            What a performance audit<br className="hidden md:block" /> actually looks like
                        </h2>
                        <p className="mt-4 text-zinc-400 max-w-xl mx-auto">
                            Not a generic Lighthouse screenshot. A systematic, prioritized breakdown of what is slowing your product and exactly what to fix first.
                        </p>
                    </div>
                    <div className="grid gap-8 lg:grid-cols-2 items-start">
                        <AuditTerminal />
                        <div className="relative rounded-2xl border border-white/[0.08] bg-zinc-950/60 p-6 overflow-hidden backdrop-blur-sm">
                            <BorderBeam size={200} duration={12} colorFrom="#6366f1" colorTo="#34d399" borderWidth={1} />
                            <WaterfallVisual />
                            <div className="mt-6 pt-4 border-t border-white/[0.06]">
                                <div className="flex items-start gap-3 text-sm text-zinc-400">
                                    <CheckCircle2 className="h-4 w-4 shrink-0 text-emerald-400 mt-0.5" />
                                    <span>Results are validated against real user flows, not just synthetic benchmarks.</span>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* ── WHAT YOU GET — phased pipeline ── */}
            <SectionPhasedPipeline
                phases={phases}
                subLabel="— work plan generated"
                description="The goal is not just &quot;better scores.&quot; It is a product that feels noticeably faster for real users and is easier for your team to keep fast as you ship."
            />

            {/* ── What makes my approach different ── */}
            <section className="border-b border-white/5 px-4 py-20">
                <div className="container mx-auto max-w-5xl">
                    <h2 className="text-3xl font-bold tracking-tight text-white md:text-5xl">
                        What makes my performance approach different
                    </h2>
                    <div className="mt-8 grid gap-4 md:grid-cols-2">
                        {differentiators.map((d, i) => (
                            <ServiceSectionCard key={d.title} delay={i * 0.06}>
                                <h3 className="text-lg font-semibold text-white">{d.title}</h3>
                                <p className="mt-3 text-zinc-400">{d.body}</p>
                            </ServiceSectionCard>
                        ))}
                    </div>
                </div>
            </section>

            {/* ── TYPICAL OUTCOMES — before/after transformation board ── */}
            <SectionOutcomesBoard
                transformations={transformations}
                subLabel="— transformation results"
                description="These are the kinds of changes that actually happen — not vague promises, but specific before-and-after shifts that users feel and businesses measure."
                flickerColor="#34d399"
            />

            {/* ── Process ── */}
            <section className="border-b border-white/5 px-4 py-20">
                <div className="container mx-auto max-w-5xl">
                    <h2 className="text-3xl font-bold tracking-tight text-white md:text-5xl">My process</h2>
                    <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-5">
                        {processSteps.map(([title, body], i) => (
                            <ServiceSectionCard key={title} delay={i * 0.05} className="h-full min-h-[140px] lg:min-h-[180px]">
                                <h3 className="text-xs font-semibold uppercase tracking-widest text-white">{title}</h3>
                                <p className="mt-3 text-sm text-zinc-400">{body}</p>
                            </ServiceSectionCard>
                        ))}
                    </div>
                </div>
            </section>

            {/* ── Selected proof ── */}
            <section className="border-b border-white/5 px-4 py-20">
                <div className="container mx-auto max-w-5xl">
                    <h2 className="text-3xl font-bold tracking-tight text-white md:text-5xl">Selected proof</h2>
                    <div className="mt-8 grid gap-4 md:grid-cols-3">
                        {[
                            { title: "60% latency reduction", body: "Improved backend-heavy product flows where speed directly affected usability and perceived product quality." },
                            { title: "15m → 3m build time", body: "Reduced build and release friction so the team could move faster with less waiting and fewer interruptions." },
                            { title: "Core Web Vitals–focused", body: "Performance work centred on real user experience signals — LCP, INP, and CLS — not just synthetic scores." },
                        ].map((p, i) => (
                            <ServiceSectionCard key={p.title} delay={i * 0.08}>
                                <p className="text-2xl font-bold text-white md:text-3xl">{p.title}</p>
                                <p className="mt-3 text-zinc-400">{p.body}</p>
                            </ServiceSectionCard>
                        ))}
                    </div>
                </div>
            </section>

            {/* ── FAQ ── */}
            <section className="border-b border-white/5 px-4 py-20">
                <div className="container mx-auto max-w-5xl">
                    <h2 className="text-3xl font-bold tracking-tight text-white md:text-5xl">FAQ</h2>
                    <div className="mt-8 space-y-4">
                        {faqItems.map((item, i) => (
                            <ServiceSectionCard key={item.q} delay={i * 0.06}>
                                <h3 className="text-lg font-semibold text-white">{item.q}</h3>
                                <p className="mt-3 text-zinc-400">{item.a}</p>
                            </ServiceSectionCard>
                        ))}
                    </div>
                </div>
            </section>

            {/* ── Final CTA ── */}
            <section className="relative flex w-full flex-col items-center justify-center overflow-hidden border-t border-white/10 bg-black px-4 py-32 text-center">
                <div className="pointer-events-none absolute inset-0 bg-gradient-to-b from-zinc-900/50 to-black" />
                <Particles className="pointer-events-none absolute inset-0" quantity={200} staticity={30} ease={50} color="#ffffff" refresh />
                <div className="relative z-10 mx-auto flex max-w-4xl flex-col items-center gap-8">
                    <div className="animate-in fade-in slide-in-from-bottom-8 duration-700 flex flex-col gap-4 items-center">
                        <h2 className="text-4xl font-bold tracking-tighter text-transparent bg-clip-text bg-gradient-to-b from-white via-white/90 to-white/50 md:text-6xl">
                            Your product does not need to stay slow just because it already shipped.
                        </h2>
                        <p className="max-w-2xl text-lg text-zinc-400 md:text-xl">
                            I help SaaS teams improve Next.js performance in practical, high-impact ways — so the product feels faster, behaves better, and supports growth more cleanly.
                        </p>
                    </div>
                    <div className="animate-in fade-in slide-in-from-bottom-8 duration-700 delay-150 flex flex-col items-center gap-4">
                        <ContactSheet>
                            <ShimmerButton className="shadow-[0_0_40px_-10px_rgba(255,255,255,0.3)] transition-transform duration-300 hover:scale-105">
                                <span className="whitespace-pre-wrap px-4 text-center text-base font-semibold leading-none tracking-tight text-white lg:text-lg">
                                    Book a 20-minute strategy call
                                </span>
                            </ShimmerButton>
                        </ContactSheet>
                        <Link href="/case-studies" className="inline-flex items-center gap-2 text-zinc-300 underline underline-offset-4 hover:text-white">
                            View relevant case studies
                            <ArrowRight className="h-4 w-4" />
                        </Link>
                        <p className="text-xs text-zinc-500 max-w-xl">
                            Best for SaaS founders and engineering teams whose product is live and needs real performance improvements — not just a report.
                        </p>
                    </div>
                </div>
            </section>

            <Footer />
            <MobileNav />
        </main>
    );
}
