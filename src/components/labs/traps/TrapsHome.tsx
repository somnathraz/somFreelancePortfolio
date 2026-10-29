import Link from "next/link";
import { ArrowRight, BookOpen, Github, Hammer, Zap } from "lucide-react";
import { TrapLibraryNav } from "./TrapLibraryNav";
import { DIFFICULTY_COLORS, UPCOMING_WORLDS, getAllTracks, liveStepCount } from "@/lib/systems";
import type { NavLink } from "@/lib/library-nav";

const HOW = [
    { Icon: BookOpen, color: "#a5b4fc", title: "Learn the design", body: "The requirements and the core decision, with the trade-off said out loud." },
    { Icon: Zap, color: "#fb7185", title: "Break it", body: "Each trap is a real bug in that design. Step through it until it breaks." },
    { Icon: Hammer, color: "#34d399", title: "Build it", body: "Put the system together yourself and see which traps your design falls into." },
];

/** The library's front door: tracks first, then the live pages outside a track. Nothing that is not ready. */
export function TrapsHome({ standalone, repoUrl }: { standalone: NavLink[]; repoUrl: string }) {
    return (
        <div className="mx-auto grid max-w-[1536px] gap-8 px-4 pb-24 pt-24 sm:px-6 lg:grid-cols-[250px_minmax(0,1fr)] lg:gap-12 lg:px-8">
            <TrapLibraryNav currentHref="/labs/traps" standalone={standalone} />
            <div className="min-w-0 lg:py-6">
                <header className="max-w-3xl">
                    <p className="mb-4 text-xs font-medium uppercase tracking-[0.18em] text-indigo-300">Labs / Backend & system design</p>
                    <h1 className="font-[family-name:var(--font-labs-display)] text-4xl font-semibold tracking-tight sm:text-6xl">Interview traps</h1>
                    <p className="mt-5 text-lg leading-relaxed text-white/65">Learn system design by watching it break. Each world is one system, harder than the last: learn the design, break it with the bugs interviewers ask about, then build it yourself.</p>
                    <a href={repoUrl} target="_blank" rel="noopener noreferrer" className="mt-5 inline-flex items-center gap-2 text-sm text-indigo-300 hover:text-indigo-200"><Github size={15} aria-hidden="true" /> Every trap is runnable code</a>
                </header>

                <ol aria-label="How a world works" className="mt-10 grid gap-3 sm:grid-cols-3">
                    {HOW.map((step, i) => (
                        <li key={step.title} className="rounded-2xl border border-white/10 bg-white/[0.02] p-5">
                            <span className="flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.14em]" style={{ color: step.color }}><step.Icon size={14} aria-hidden="true" /> {i + 1}. {step.title}</span>
                            <p className="mt-2 text-sm leading-relaxed text-white/60">{step.body}</p>
                        </li>
                    ))}
                </ol>

                <section aria-labelledby="tracks-title" className="mt-14">
                    <h2 id="tracks-title" className="mb-5 font-[family-name:var(--font-labs-display)] text-2xl font-semibold">The worlds</h2>
                    {getAllTracks().map((track) => {
                        const live = liveStepCount(track);
                        return (
                            <Link key={track.id} href={`/labs/systems/${track.id}`} className="group block rounded-3xl border border-indigo-300/25 bg-gradient-to-br from-indigo-500/[0.12] via-transparent to-transparent p-6 transition-colors hover:border-indigo-300/50 sm:p-8">
                                <div className="flex flex-wrap items-start justify-between gap-4">
                                    <div className="max-w-2xl">
                                        <p className="text-xs font-semibold uppercase tracking-[0.16em] text-indigo-300">World {track.world} <span className="mx-1.5 text-white/25">·</span><span style={{ color: DIFFICULTY_COLORS[track.difficulty] }}>{track.difficulty}</span> <span className="mx-1.5 text-white/25">·</span>{track.steps.length} steps</p>
                                        <h3 className="mt-2 font-[family-name:var(--font-labs-display)] text-3xl font-semibold group-hover:text-indigo-100">{track.title}</h3>
                                        <p className="mt-2 text-white/65">{track.tagline}</p>
                                    </div>
                                    <span className="inline-flex shrink-0 items-center gap-2 rounded-full bg-white px-5 py-2.5 text-sm font-semibold text-black">Start world {track.world} <ArrowRight size={15} aria-hidden="true" className="transition-transform group-hover:translate-x-0.5" /></span>
                                </div>
                                <ol aria-label="Steps" className="mt-6 flex flex-wrap gap-2">
                                    {track.steps.map((step, i) => (
                                        <li key={step.id} className={`rounded-full border px-3 py-1 text-xs ${step.href ? "border-white/20 text-white/80" : "border-dashed border-white/10 text-white/35"}`}>{i + 1}. {step.title}</li>
                                    ))}
                                </ol>
                                <div className="mt-5 flex items-center gap-3">
                                    <div className="h-1.5 w-40 overflow-hidden rounded-full bg-white/10" aria-hidden="true"><div className="h-full rounded-full bg-indigo-300" style={{ width: `${(live / track.steps.length) * 100}%` }} /></div>
                                    <span className="text-xs text-white/45">{live} of {track.steps.length} ready, the rest are being written</span>
                                </div>
                            </Link>
                        );
                    })}
                    <div className="mt-5">
                        <p className="mb-3 text-xs font-semibold uppercase tracking-[0.16em] text-white/40">Coming next, in order</p>
                        <ol aria-label="Upcoming worlds" className="flex flex-wrap gap-2">
                            {UPCOMING_WORLDS.map((w) => (
                                <li key={String(w.world)} className="inline-flex items-center gap-2 rounded-full border border-white/10 px-3 py-1.5 text-xs text-white/55">
                                    <span className="font-mono text-white/35">{w.world === "Final" ? "Final" : `W${w.world}`}</span>
                                    {w.name}
                                    <span aria-hidden="true" className="h-1.5 w-1.5 rounded-full" style={{ background: DIFFICULTY_COLORS[w.difficulty] }} />
                                    <span className="sr-only">{w.difficulty}</span>
                                </li>
                            ))}
                        </ol>
                    </div>
                </section>

                {standalone.length > 0 && (
                    <section aria-labelledby="more-title" className="mt-14">
                        <h2 id="more-title" className="mb-5 font-[family-name:var(--font-labs-display)] text-2xl font-semibold">More from the lab</h2>
                        <ul className="grid gap-4 md:grid-cols-2">
                            {standalone.map((link) => (
                                <li key={link.href}>
                                    <Link href={link.href} className="group flex h-full flex-col justify-between gap-5 rounded-2xl border border-white/10 bg-white/[0.02] p-6 transition-colors hover:border-white/25">
                                        <span>
                                            <span className="block text-lg font-semibold group-hover:text-indigo-200">{link.title}</span>
                                            {link.description && <span className="mt-2 block text-sm leading-relaxed text-white/55">{link.description}</span>}
                                        </span>
                                        <span className="inline-flex items-center gap-2 text-sm font-semibold text-indigo-300">Open <ArrowRight size={15} aria-hidden="true" className="transition-transform group-hover:translate-x-1" /></span>
                                    </Link>
                                </li>
                            ))}
                        </ul>
                    </section>
                )}
            </div>
        </div>
    );
}
