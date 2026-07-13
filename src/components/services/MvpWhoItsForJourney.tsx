"use client";

import { useEffect, useRef, useState } from "react";
import { AnimatePresence, motion, useInView } from "motion/react";
import {
  ArrowRight,
  Compass,
  Lightbulb,
  Rocket,
  Users,
  Wrench,
  type LucideIcon,
} from "lucide-react";
import { cn } from "@/lib/utils";

type Persona = {
  id: string;
  icon: LucideIcon;
  label: string;
  title: string;
  stuck: string;
  stuckPoints: string[];
  bridge: string;
  outcome: string;
  outcomePoints: string[];
};

const personas: Persona[] = [
  {
    id: "idea",
    icon: Lightbulb,
    label: "Validated idea",
    title: "You have the idea. You need the product.",
    stuck: "Notes, Notion docs, and half-written PRDs — no engineer who can ship.",
    stuckPoints: ["Unclear MVP scope", "No technical co-founder", "Fear of building the wrong thing"],
    bridge: "I translate your idea into a buildable first release — then I build it.",
    outcome: "A live SaaS MVP real users can try — auth, core flow, and launch included.",
    outcomePoints: ["Scoped backlog", "Working product", "You own the code"],
  },
  {
    id: "nontech",
    icon: Compass,
    label: "Non-technical founder",
    title: "You know the customer. You need a technical partner.",
    stuck: "Agencies talk in jargon. Freelancers disappear. You can't tell progress from theatre.",
    stuckPoints: ["Can't evaluate technical decisions", "Opaque timelines", "No one owns outcomes"],
    bridge: "Plain-language weekly updates. You see demos, not status theatre.",
    outcome: "You understand what shipped, why it matters, and what comes next.",
    outcomePoints: ["Clear milestones", "Direct access to me", "No sales layer"],
  },
  {
    id: "team",
    icon: Users,
    label: "Startup team",
    title: "Your team ships features. You need senior execution.",
    stuck: "Hiring a full stack team is slow and expensive for one critical release.",
    stuckPoints: ["Bandwidth bottleneck", "Architecture debt risk", "Deadline pressure"],
    bridge: "I plug in as senior full-stack capacity — build the release without a hiring detour.",
    outcome: "The product moves forward while your team stays focused on growth.",
    outcomePoints: ["Production-grade code", "Handover-ready", "Works with your stack"],
  },
  {
    id: "existing",
    icon: Wrench,
    label: "Existing MVP",
    title: "Something is live. It isn't ready.",
    stuck: "Vibe-coded or fragile MVP — slow, buggy, or scary to put in front of real customers.",
    stuckPoints: ["Brittle architecture", "Performance issues", "Hard to add features"],
    bridge: "I diagnose what blocks growth, then harden and extend what already exists.",
    outcome: "A product you can sell, scale, and keep shipping on.",
    outcomePoints: ["Stabilised core", "Faster iteration", "Clear next roadmap"],
  },
];

function JourneyNode({
  tone,
  eyebrow,
  title,
  points,
  delay,
  active,
}: {
  tone: "stuck" | "bridge" | "outcome";
  eyebrow: string;
  title: string;
  points: string[];
  delay: number;
  active: boolean;
}) {
  const styles = {
    stuck: {
      border: "border-rose-500/25",
      glow: "shadow-[0_0_40px_-18px_rgba(244,63,94,0.45)]",
      eyebrow: "text-rose-300/80",
      bar: "bg-rose-400",
    },
    bridge: {
      border: "border-emerald-400/35",
      glow: "shadow-[0_0_50px_-14px_rgba(52,211,153,0.55)]",
      eyebrow: "text-emerald-300",
      bar: "bg-emerald-400",
    },
    outcome: {
      border: "border-sky-400/30",
      glow: "shadow-[0_0_40px_-18px_rgba(56,189,248,0.4)]",
      eyebrow: "text-sky-300/90",
      bar: "bg-sky-400",
    },
  }[tone];

  return (
    <motion.div
      initial={{ opacity: 0, y: 18, scale: 0.98 }}
      animate={active ? { opacity: 1, y: 0, scale: 1 } : { opacity: 0, y: 18 }}
      transition={{ duration: 0.45, delay, ease: "easeOut" }}
      className={cn(
        "relative overflow-hidden rounded-2xl border bg-zinc-950/80 p-5",
        styles.border,
        styles.glow
      )}
    >
      <div className={cn("mb-3 h-0.5 w-10 rounded-full", styles.bar)} />
      <p className={cn("font-mono text-[10px] uppercase tracking-[0.2em]", styles.eyebrow)}>
        {eyebrow}
      </p>
      <p className="mt-2 text-sm leading-relaxed text-zinc-200">{title}</p>
      <ul className="mt-4 space-y-1.5">
        {points.map((point, i) => (
          <motion.li
            key={point}
            initial={{ opacity: 0, x: -6 }}
            animate={active ? { opacity: 1, x: 0 } : {}}
            transition={{ delay: delay + 0.15 + i * 0.06 }}
            className="flex items-start gap-2 text-xs text-zinc-500"
          >
            <span
              className={cn(
                "mt-1.5 h-1 w-1 shrink-0 rounded-full",
                tone === "stuck" ? "bg-rose-400/70" : tone === "bridge" ? "bg-emerald-400" : "bg-sky-400"
              )}
            />
            {point}
          </motion.li>
        ))}
      </ul>
      {tone === "bridge" ? (
        <motion.div
          className="pointer-events-none absolute -right-8 -top-8 h-24 w-24 rounded-full bg-emerald-400/10 blur-2xl"
          animate={active ? { opacity: [0.35, 0.7, 0.35] } : { opacity: 0 }}
          transition={{ duration: 2.4, repeat: Infinity, ease: "easeInOut" }}
        />
      ) : null}
    </motion.div>
  );
}

function BridgeArrow({ delay, active }: { delay: number; active: boolean }) {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.8 }}
      animate={active ? { opacity: 1, scale: 1 } : { opacity: 0 }}
      transition={{ duration: 0.35, delay }}
      className="flex items-center justify-center py-1 lg:py-0"
    >
      <div className="relative flex h-10 w-10 items-center justify-center rounded-full border border-white/10 bg-black">
        <motion.div
          animate={active ? { x: [0, 3, 0] } : {}}
          transition={{ duration: 1.2, repeat: Infinity, ease: "easeInOut" }}
        >
          <ArrowRight className="h-4 w-4 text-emerald-300 rotate-90 lg:rotate-0" />
        </motion.div>
        <Rocket className="absolute -right-1 -top-1 h-3 w-3 text-emerald-400/60" />
      </div>
    </motion.div>
  );
}

export function MvpWhoItsForJourney() {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });
  const [activeId, setActiveId] = useState(personas[0].id);
  const [journeyKey, setJourneyKey] = useState(0);
  const [userPaused, setUserPaused] = useState(false);

  const active = personas.find((p) => p.id === activeId) ?? personas[0];

  useEffect(() => {
    if (!inView || userPaused) return;
    const id = window.setInterval(() => {
      setActiveId((current) => {
        const idx = personas.findIndex((p) => p.id === current);
        return personas[(idx + 1) % personas.length].id;
      });
    }, 6500);
    return () => window.clearInterval(id);
  }, [inView, userPaused]);

  useEffect(() => {
    setJourneyKey((k) => k + 1);
  }, [activeId]);

  return (
    <section ref={ref} className="relative overflow-hidden border-b border-white/5 px-4 py-20">
      <div className="pointer-events-none absolute inset-0 bg-grid-white/[0.02]" />
      <div className="pointer-events-none absolute left-1/2 top-24 h-64 w-64 -translate-x-1/2 rounded-full bg-emerald-500/10 blur-[100px]" />

      <div className="container relative z-10 mx-auto max-w-6xl">
        <motion.div
          initial={{ opacity: 0, y: 14 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5 }}
        >
          <p className="font-mono text-[11px] uppercase tracking-[0.2em] text-zinc-500">
            — founder journey
          </p>
          <h2 className="mt-3 text-3xl font-bold tracking-tight text-white md:text-5xl">
            Who this is for
          </h2>
          <p className="mt-3 max-w-2xl text-zinc-400">
            Pick where you are today. I bridge the gap between a stuck founder and a product
            people can actually use.
          </p>
        </motion.div>

        {/* Persona selector */}
        <div className="mt-8 flex gap-2 overflow-x-auto pb-1 [-ms-overflow-style:none] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
          {personas.map((persona, i) => {
            const selected = persona.id === activeId;
            return (
              <motion.button
                key={persona.id}
                type="button"
                initial={{ opacity: 0, y: 10 }}
                animate={inView ? { opacity: 1, y: 0 } : {}}
                transition={{ delay: 0.1 + i * 0.06 }}
                onClick={() => {
                  setUserPaused(true);
                  setActiveId(persona.id);
                }}
                className={cn(
                  "inline-flex shrink-0 items-center gap-2 rounded-full border px-3.5 py-2 text-sm transition-colors",
                  selected
                    ? "border-emerald-400/40 bg-emerald-400/10 text-white"
                    : "border-white/10 bg-white/[0.02] text-zinc-400 hover:border-white/20 hover:text-zinc-200"
                )}
              >
                <persona.icon className={cn("h-3.5 w-3.5", selected ? "text-emerald-300" : "")} />
                {persona.label}
              </motion.button>
            );
          })}
        </div>

        {/* Journey stage */}
        <div className="mt-8">
          <AnimatePresence mode="wait">
            <motion.div
              key={active.id}
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -6 }}
              transition={{ duration: 0.3 }}
            >
              <h3 className="text-xl font-semibold tracking-tight text-white md:text-2xl">
                {active.title}
              </h3>
            </motion.div>
          </AnimatePresence>

          <div key={journeyKey} className="mt-6 grid items-stretch gap-3 lg:grid-cols-[1fr_auto_1fr_auto_1fr]">
            <JourneyNode
              tone="stuck"
              eyebrow="Where you are"
              title={active.stuck}
              points={active.stuckPoints}
              delay={0.05}
              active={inView}
            />
            <BridgeArrow delay={0.25} active={inView} />
            <JourneyNode
              tone="bridge"
              eyebrow="How I bridge it"
              title={active.bridge}
              points={["Direct engineer", "Scope → build → launch", "India timezone · remote"]}
              delay={0.35}
              active={inView}
            />
            <BridgeArrow delay={0.55} active={inView} />
            <JourneyNode
              tone="outcome"
              eyebrow="Where you land"
              title={active.outcome}
              points={active.outcomePoints}
              delay={0.65}
              active={inView}
            />
          </div>

          {/* Progress rail */}
          <div className="mt-8 hidden items-center gap-3 lg:flex">
            <span className="font-mono text-[10px] uppercase tracking-widest text-zinc-600">
              Path
            </span>
            <div className="relative h-px flex-1 overflow-hidden bg-white/[0.06]">
              <motion.div
                key={`rail-${journeyKey}`}
                className="absolute inset-y-0 left-0 bg-gradient-to-r from-rose-400/70 via-emerald-400 to-sky-400"
                initial={{ width: "0%" }}
                animate={{ width: "100%" }}
                transition={{ duration: 1.2, ease: "easeOut" }}
              />
            </div>
            <span className="font-mono text-[10px] uppercase tracking-widest text-zinc-500">
              Idea → product
            </span>
          </div>
        </div>

        <p className="mt-8 text-sm text-zinc-500">
          Not for brochure sites or template pages. Built for founders shipping real SaaS and web
          products.
        </p>
      </div>
    </section>
  );
}
