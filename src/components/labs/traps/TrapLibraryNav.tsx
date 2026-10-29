"use client";

import Link from "next/link";
import { ChevronDown, Library, Play } from "lucide-react";
import { getAllTracks, liveStepCount } from "@/lib/systems";
import type { NavLink } from "@/lib/library-nav";

interface Props {
    /** Path of the page being shown, to mark it as current. */
    currentHref?: string;
    /** Live pages outside a track, from getStandaloneLinks() (server only). */
    standalone: NavLink[];
}

const linkClass = (current: boolean) =>
    `-ml-px flex items-center gap-2 border-l-2 px-4 py-2 text-sm leading-snug transition-colors ${current ? "border-indigo-300 bg-indigo-400/10 text-indigo-200" : "border-transparent text-white/70 hover:border-white/30 hover:text-white"}`;

export function TrapLibraryNav({ currentHref, standalone }: Props) {
    function closeMobileMenu(event: React.MouseEvent<HTMLElement>) {
        if ((event.target as HTMLElement).closest("a")) {
            event.currentTarget.closest("details")?.removeAttribute("open");
        }
    }

    const navigation = (
        <nav aria-label="Trap library" className="space-y-7">
            <Link href="/labs/traps" aria-current={currentHref === "/labs/traps" ? "page" : undefined} className="flex items-center gap-2 text-sm font-semibold text-indigo-300 hover:text-indigo-200">
                <Library size={16} aria-hidden="true" /> Start here
            </Link>

            <div>
                <p className="mb-3 text-[10px] font-semibold uppercase tracking-[0.2em] text-white/40">Worlds</p>
                {getAllTracks().map((track) => {
                    const trackHref = `/labs/systems/${track.id}`;
                    const live = track.steps.filter((step) => step.href);
                    const pending = track.steps.length - liveStepCount(track);
                    return (
                        <details key={track.id} open className="group/topic">
                            <summary className="flex cursor-pointer list-none items-center gap-2 text-sm font-medium text-white/85 [&::-webkit-details-marker]:hidden">
                                <ChevronDown size={13} aria-hidden="true" className="-rotate-90 transition-transform group-open/topic:rotate-0 motion-reduce:transition-none" />
                                <span className="font-mono text-xs text-white/40">W{track.world}</span> {track.name}
                            </summary>
                            <ul className="mt-2 space-y-0.5 border-l border-white/10">
                                <li><Link href={trackHref} aria-current={currentHref === trackHref ? "page" : undefined} className={linkClass(currentHref === trackHref)}>Overview</Link></li>
                                {live.map((step) => (
                                    <li key={step.id}>
                                        <Link href={step.href!} aria-current={currentHref === step.href ? "page" : undefined} className={linkClass(currentHref === step.href)}>
                                            <span className="min-w-0 flex-1">{step.title}</span>
                                            {step.format === "play" && <Play size={11} aria-label="Playable" className="shrink-0 text-indigo-300" />}
                                        </Link>
                                    </li>
                                ))}
                            </ul>
                            {pending > 0 && <p className="ml-5 mt-2 text-xs text-white/35">{pending} more steps in progress</p>}
                        </details>
                    );
                })}
            </div>

            {standalone.length > 0 && (
                <div>
                    <p className="mb-3 text-[10px] font-semibold uppercase tracking-[0.2em] text-white/40">More from the lab</p>
                    <ul className="space-y-0.5 border-l border-white/10">
                        {standalone.map((link) => (
                            <li key={link.href}><Link href={link.href} aria-current={currentHref === link.href ? "page" : undefined} className={linkClass(currentHref === link.href)}>{link.title}</Link></li>
                        ))}
                    </ul>
                </div>
            )}
        </nav>
    );

    return (
        <aside className="min-w-0 lg:border-r lg:border-white/10">
            <div className="sticky top-20 hidden max-h-[calc(100dvh-6rem)] overflow-y-auto py-6 pr-6 [scrollbar-width:thin] [scrollbar-color:#333_transparent] lg:block">
                <p className="mb-6 text-[10px] font-semibold uppercase tracking-[0.2em] text-white/40">The trap library</p>
                {navigation}
            </div>
            <details className="group/mobile border-y border-white/10 lg:hidden">
                <summary className="flex cursor-pointer list-none items-center justify-between py-4 text-sm font-medium [&::-webkit-details-marker]:hidden">
                    <span className="flex items-center gap-2"><Library size={16} aria-hidden="true" /> Browse the library</span>
                    <ChevronDown size={16} aria-hidden="true" className="transition-transform group-open/mobile:rotate-180 motion-reduce:transition-none" />
                </summary>
                <div className="max-h-[60dvh] overflow-y-auto pb-6" onClick={closeMobileMenu}>{navigation}</div>
            </details>
        </aside>
    );
}
