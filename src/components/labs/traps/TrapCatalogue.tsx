"use client";

import { useState } from "react";
import Link from "next/link";
import { ArrowRight, Search, X, Github } from "lucide-react";
import type { CatalogueTopic } from "@/lib/trap-catalogue";
import { TrapLibraryNav } from "./TrapLibraryNav";

export function TrapCatalogue({ topics, repoUrl }: { topics: CatalogueTopic[]; repoUrl: string }) {
    const [query, setQuery] = useState("");
    const [availability, setAvailability] = useState("all");
    const entries = topics.flatMap((topic) => topic.entries);
    const publishedCount = entries.filter((entry) => entry.published).length;
    const search = query.trim().toLowerCase();
    const visible = topics.map((topic) => ({ ...topic, entries: topic.entries.filter((entry) =>
        `${topic.group ?? ""} ${topic.title} ${entry.title} ${entry.question}`.toLowerCase().includes(search) &&
        (availability === "all" || (availability === "published" ? entry.published : !entry.published))
    ) })).filter((topic) => topic.entries.length);
    const resultCount = visible.reduce((count, topic) => count + topic.entries.length, 0);
    const filtered = search !== "" || availability !== "all";

    function resetFilters() {
        setQuery("");
        setAvailability("all");
    }

    return (
        <div className="mx-auto grid max-w-[1536px] gap-8 px-4 pb-24 pt-24 sm:px-6 lg:grid-cols-[250px_minmax(0,1fr)] lg:gap-12 lg:px-8">
            <TrapLibraryNav topics={topics} onNavigate={resetFilters} />
            <div id="trap-content" className="min-w-0 lg:py-6">
                <header className="border-b border-white/10 pb-9">
                    <p className="mb-4 text-xs font-medium uppercase tracking-[0.18em] text-indigo-300">Labs / Backend & system design</p>
                    <h1 className="font-[family-name:var(--font-labs-display)] text-4xl font-semibold tracking-tight sm:text-5xl">Interview traps</h1>
                    <p className="mt-4 max-w-xl text-base leading-relaxed text-white/60">The code looks right. Then two requests arrive at once. Explore backend traps by topic, replay the bug, and understand the fix.</p>
                    <div className="mt-6 flex flex-wrap items-center gap-x-6 gap-y-3 text-sm">
                        <span className="text-white/50"><span className="text-white">{topics.length}</span> topics <span className="mx-2 text-white/25">/</span> <span className="text-white">{publishedCount}</span> available <span className="mx-2 text-white/25">/</span> {entries.length - publishedCount} coming soon</span>
                        <a href={repoUrl} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2 text-indigo-300 hover:text-indigo-200"><Github size={15} aria-hidden="true" /> Source code</a>
                    </div>
                </header>

                <Link href="/labs/traps/play" className="group mt-7 flex items-center justify-between gap-4 rounded-2xl border border-indigo-300/30 bg-gradient-to-r from-indigo-400/10 to-transparent p-5 transition-colors hover:border-indigo-300/60">
                    <span>
                        <span className="block text-xs font-semibold uppercase tracking-[0.16em] text-indigo-300">New · Play</span>
                        <span className="mt-1 block text-lg font-semibold">Break the Backend</span>
                        <span className="mt-0.5 block text-sm text-white/60">You are the scheduler. Step two requests in any order, double-book the seat, then patch it.</span>
                    </span>
                    <ArrowRight className="shrink-0 transition-transform group-hover:translate-x-1" aria-hidden="true" />
                </Link>

                <div className="my-7 flex flex-col gap-3 sm:flex-row">
                    <div className="relative flex-1">
                        <Search size={17} aria-hidden="true" className="pointer-events-none absolute left-3.5 top-3.5 text-white/40" />
                        <label htmlFor="trap-search" className="sr-only">Search traps</label>
                        <input id="trap-search" type="search" value={query} onChange={(event) => setQuery(event.target.value)} placeholder="Search topics, traps, or questions…" className="h-11 w-full rounded-lg border border-white/15 bg-white/[0.03] pl-11 pr-10 text-sm text-white outline-none placeholder:text-white/40 focus:border-indigo-300 [&::-webkit-search-cancel-button]:hidden" />
                        {query && <button type="button" aria-label="Clear search" onClick={() => setQuery("")} className="absolute right-0 top-0 flex h-11 w-10 items-center justify-center text-white/60 hover:text-white"><X size={16} /></button>}
                    </div>
                    <label htmlFor="trap-availability" className="sr-only">Availability</label>
                    <select id="trap-availability" value={availability} onChange={(event) => setAvailability(event.target.value)} className="h-11 rounded-lg border border-white/15 bg-[#111113] px-3 text-sm text-white/80 outline-none focus:border-indigo-300">
                        <option value="all">All traps</option>
                        <option value="published">Available replays</option>
                        <option value="planned">Coming soon</option>
                    </select>
                </div>
                <p aria-live="polite" role="status" className="mb-8 text-xs text-white/45">{filtered ? `${resultCount} ${resultCount === 1 ? "trap" : "traps"} found` : "Start with an available replay. Upcoming traps are part of the library roadmap."}</p>

                {visible.length ? visible.map((topic, index) => (
                    <div key={topic.id}>
                    {topic.group && topic.group !== visible[index - 1]?.group && <h2 className="mb-6 border-b border-white/10 pb-3 font-[family-name:var(--font-labs-display)] text-2xl font-semibold tracking-tight text-indigo-200">{topic.group}</h2>}
                    <section id={topic.id} aria-labelledby={`${topic.id}-title`} className="mb-12 scroll-mt-24">
                        <div className="mb-5 flex items-baseline justify-between gap-4">
                            <div>
                                {topic.group ? <h3 id={`${topic.id}-title`} className="text-xl font-semibold tracking-tight">{topic.title}</h3> : <h2 id={`${topic.id}-title`} className="text-xl font-semibold tracking-tight">{topic.title}</h2>}
                                <p className="mt-1 text-sm text-white/50">{topic.description}</p>
                            </div>
                            <span className="shrink-0 font-mono text-xs text-white/40">{topic.entries.length} {topic.entries.length === 1 ? "trap" : "traps"}</span>
                        </div>
                        <ul className="divide-y divide-white/10 border-y border-white/10">
                            {topic.entries.map((entry) => {
                                const content = <>
                                    <span className={`mt-2 h-1.5 w-1.5 shrink-0 rounded-full ${entry.published ? "bg-indigo-300" : "bg-white/20"}`} aria-hidden="true" />
                                    <span className="min-w-0 flex-1">
                                        <span className={`block text-base font-medium ${entry.published ? "text-white group-hover:text-indigo-200" : "text-white/65"}`}>{entry.title}</span>
                                        <span className="mt-1 block text-sm leading-relaxed text-white/45">{entry.question}</span>
                                    </span>
                                    <span className={`ml-5 flex shrink-0 items-center gap-2 self-center text-xs sm:text-sm ${entry.published ? "text-indigo-300" : "text-white/40"}`}>
                                        {entry.published ? <>{entry.kind === "design" ? "Read" : "Replay"} <ArrowRight size={15} aria-hidden="true" className="transition-transform group-hover:translate-x-1 motion-reduce:transition-none" /></> : "Coming soon"}
                                    </span>
                                </>;
                                return <li key={entry.slug}>{entry.published ? (
                                    <Link href={`/labs/traps/${entry.slug}`} className="group flex gap-3 rounded-sm px-1 py-5 transition-colors hover:bg-white/[0.03] focus-visible:outline-2 focus-visible:outline-indigo-300 sm:px-3">{content}</Link>
                                ) : <div className="flex gap-3 px-1 py-5 sm:px-3">{content}</div>}</li>;
                            })}
                        </ul>
                    </section>
                    </div>
                )) : (
                    <div className="border-y border-white/10 py-16 text-center">
                        <h2 className="text-lg font-medium">No matching traps</h2>
                        <p className="mt-2 text-sm text-white/50">Try a different search or show all traps.</p>
                        <button type="button" onClick={resetFilters} className="mt-5 rounded-lg border border-white/20 px-4 py-2 text-sm text-indigo-300 hover:bg-white/5">Reset filters</button>
                    </div>
                )}
                <p className="mt-10 border-t border-white/10 pt-6 text-sm text-white/45">New replays are added as episodes are published. Every available replay includes the bug, the fix, and the source code.</p>
            </div>
        </div>
    );
}
