"use client";

import Link from "next/link";
import { ChevronDown, ArrowUpRight, Library } from "lucide-react";
import type { CatalogueTopic } from "@/lib/trap-catalogue";

interface Props {
    topics: CatalogueTopic[];
    currentSlug?: string;
    onNavigate?: () => void;
}

export function TrapLibraryNav({ topics, currentSlug, onNavigate }: Props) {
    function closeMobileMenu(event: React.MouseEvent<HTMLElement>) {
        if ((event.target as HTMLElement).closest("a")) {
            event.currentTarget.closest("details")?.removeAttribute("open");
        }
    }

    const navigation = (
        <nav aria-label="Trap topics" className="space-y-6" onClick={(event) => {
            if ((event.target as HTMLElement).closest("a")) onNavigate?.();
        }}>
            <Link href="/labs/traps" aria-current={!currentSlug ? "page" : undefined} className="flex items-center gap-2 text-sm font-semibold text-indigo-300 hover:text-indigo-200">
                <Library size={16} aria-hidden="true" /> All traps
            </Link>
            {topics.map((topic, index) => (
                <div key={topic.id}>
                {topic.group && topic.group !== topics[index - 1]?.group && <p className="mb-3 text-[10px] font-semibold uppercase tracking-[0.2em] text-white/40">{topic.group}</p>}
                <details open className="group/topic">
                    <summary className="flex cursor-pointer list-none items-center gap-2 text-sm font-medium text-white/85 [&::-webkit-details-marker]:hidden">
                        <ChevronDown size={13} aria-hidden="true" className="transition-transform group-open/topic:rotate-0 -rotate-90 motion-reduce:transition-none" />
                        {topic.title}
                        <span className="ml-auto font-mono text-xs text-white/40">{topic.entries.length}</span>
                    </summary>
                    <Link href={`/labs/traps#${topic.id}`} className="ml-5 mt-3 inline-flex items-center gap-1 text-xs text-white/50 hover:text-indigo-300">View topic <ArrowUpRight size={12} aria-hidden="true" /></Link>
                    <ul className="mt-2 space-y-0.5 border-l border-white/10">
                        {topic.entries.map((entry) => (
                            <li key={entry.slug}>
                                {entry.published ? (
                                    <Link href={`/labs/traps/${entry.slug}`} aria-current={entry.slug === currentSlug ? "page" : undefined} className={`-ml-px block border-l-2 px-4 py-2 text-sm leading-snug transition-colors ${entry.slug === currentSlug ? "border-indigo-300 bg-indigo-400/10 text-indigo-200" : "border-transparent text-white/70 hover:border-white/30 hover:text-white"}`}>
                                        {entry.title}
                                    </Link>
                                ) : (
                                    <span className="flex items-start justify-between gap-2 px-4 py-2 text-sm leading-snug text-white/45">
                                        {entry.title}<span className="mt-0.5 shrink-0 text-[10px] uppercase tracking-wide text-white/35" aria-label="Coming soon">Soon</span>
                                    </span>
                                )}
                            </li>
                        ))}
                    </ul>
                </details>
                </div>
            ))}
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
                    <span className="flex items-center gap-2"><Library size={16} aria-hidden="true" /> Browse topics</span>
                    <ChevronDown size={16} aria-hidden="true" className="transition-transform group-open/mobile:rotate-180 motion-reduce:transition-none" />
                </summary>
                <div className="max-h-[60dvh] overflow-y-auto pb-6" onClick={closeMobileMenu}>{navigation}</div>
            </details>
        </aside>
    );
}
