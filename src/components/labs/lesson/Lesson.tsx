import Link from "next/link";
import { codeToHtml } from "shiki";
import { ArrowRight, ChevronDown, Github, Star } from "lucide-react";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { LiteYouTube } from "@/components/labs/traps/LiteYouTube";
import { findTrackStep, nextLiveStep } from "@/lib/systems";
import { getConcept, type ConceptId } from "@/lib/concepts";
import { TRAPS_REPO_URL } from "@/lib/traps";
import { ThemeToggle, themeBootScript } from "./ThemeToggle";
import { CodeTabsView } from "./CodeTabsView";

/**
 * The reading layout every lesson uses: one focused column, a "where am I" strip instead of a
 * sidebar, and a light/dark theme scoped to the lesson. Section order is the lesson template:
 * summary → why → words → picture → options → choice → check → code → remember.
 */

export type Tone = "bug" | "fix" | "warn" | "info";

const TONE: Record<Tone, { fg: string; bg: string }> = {
    bug: { fg: "var(--l-bug)", bg: "var(--l-bug-bg)" },
    fix: { fg: "var(--l-fix)", bg: "var(--l-fix-bg)" },
    warn: { fg: "var(--l-warn)", bg: "var(--l-warn-bg)" },
    info: { fg: "var(--l-accent)", bg: "var(--l-accent-bg)" },
};

export function LessonShell({ path, title, question, children }: { path: string; title: string; question: string; children: React.ReactNode }) {
    const inTrack = findTrackStep(path);
    const track = inTrack?.track;
    const index = inTrack?.index ?? 0;
    const prev = track && index > 0 ? track.steps[index - 1] : undefined;
    const next = inTrack ? nextLiveStep(inTrack.track, inTrack.index) : undefined;

    return (
        <main className="min-h-screen bg-black text-white">
            <Navbar />
            <div data-lesson-theme="dark" suppressHydrationWarning className="pt-16 selection:bg-indigo-500/30">
                <script dangerouslySetInnerHTML={{ __html: themeBootScript }} />
                <div className="sticky top-16 z-30 border-b border-(--l-border) bg-[color-mix(in_srgb,var(--l-bg)_92%,transparent)] backdrop-blur">
                    <div className="mx-auto flex max-w-[46rem] items-center gap-3 px-4 py-2.5 text-sm sm:px-6">
                        {track ? (
                            <>
                                <Link href={`/labs/systems/${track.id}`} className="min-w-0 truncate text-(--l-muted) hover:text-(--l-fg)">
                                    World {track.world} · {track.name}
                                </Link>
                                <span className="hidden shrink-0 text-(--l-faint) sm:inline">Step {index + 1} of {track.steps.length}</span>
                                <span className="hidden shrink-0 gap-1 sm:flex" aria-hidden="true">
                                    {track.steps.map((step, i) => (
                                        <span key={step.id} className="h-1 w-3.5 rounded-full" style={{ background: i <= index ? "var(--l-accent)" : "var(--l-border-strong)" }} />
                                    ))}
                                </span>
                            </>
                        ) : (
                            <Link href="/labs/traps" className="text-(--l-muted) hover:text-(--l-fg)">Interview traps</Link>
                        )}
                        <div className="ml-auto flex shrink-0 items-center gap-2">
                            {track && (
                                <details className="group relative">
                                    <summary className="flex cursor-pointer list-none items-center gap-1 rounded-full px-2.5 py-1.5 text-(--l-muted) hover:text-(--l-fg) [&::-webkit-details-marker]:hidden">
                                        All steps <ChevronDown size={14} aria-hidden="true" className="transition-transform group-open:rotate-180" />
                                    </summary>
                                    <ol className="absolute right-0 top-full mt-2 w-72 rounded-xl border border-(--l-border-strong) bg-(--l-bg) p-2 shadow-xl">
                                        {track.steps.map((step, i) => (
                                            <li key={step.id}>
                                                {step.href ? (
                                                    <Link href={step.href} aria-current={i === index ? "step" : undefined} className={`flex gap-2 rounded-lg px-3 py-2 ${i === index ? "bg-(--l-accent-bg) text-(--l-fg)" : "text-(--l-muted) hover:text-(--l-fg)"}`}>
                                                        <span className="w-4 shrink-0 font-mono text-xs leading-5 text-(--l-faint)">{i + 1}</span>{step.title}
                                                    </Link>
                                                ) : (
                                                    <span className="flex gap-2 px-3 py-2 text-(--l-faint)"><span className="w-4 shrink-0 font-mono text-xs leading-5">{i + 1}</span>{step.title} · soon</span>
                                                )}
                                            </li>
                                        ))}
                                    </ol>
                                </details>
                            )}
                            <ThemeToggle />
                            <a href={TRAPS_REPO_URL} target="_blank" rel="noopener" className="hidden items-center gap-1.5 rounded-full px-2.5 py-1.5 text-(--l-muted) hover:text-(--l-fg) sm:inline-flex">
                                <Star size={14} aria-hidden="true" /> Star
                            </a>
                        </div>
                    </div>
                </div>

                <article className="mx-auto max-w-[46rem] px-4 pb-24 pt-12 text-[17px] leading-[1.75] sm:px-6">
                    <header>
                        <h1 className="font-[family-name:var(--font-labs-display)] text-4xl font-bold leading-[1.1] tracking-tight sm:text-5xl">{title}</h1>
                        <p className="mt-4 text-xl leading-relaxed text-(--l-muted)">{question}</p>
                        {(prev || next) && (
                            <p className="mt-4 text-sm text-(--l-faint)">
                                {prev && <>Before this: {prev.href ? <Link href={prev.href} className="underline decoration-(--l-border-strong) underline-offset-4 hover:text-(--l-fg)">{prev.title}</Link> : prev.title}</>}
                                {prev && next && <span className="mx-2">·</span>}
                                {next?.href && <>Next: <Link href={next.href} className="underline decoration-(--l-border-strong) underline-offset-4 hover:text-(--l-fg)">{next.title}</Link></>}
                            </p>
                        )}
                    </header>
                    {children}
                </article>
            </div>
            <Footer />
        </main>
    );
}

export function Section({ id, title, children }: { id: string; title: string; children: React.ReactNode }) {
    return (
        <section id={id} aria-labelledby={`${id}-title`} className="mt-16 scroll-mt-32">
            <h2 id={`${id}-title`} className="mb-4 font-[family-name:var(--font-labs-display)] text-2xl font-semibold tracking-tight">{title}</h2>
            {children}
        </section>
    );
}

export function Prose({ paragraphs }: { paragraphs: string[] }) {
    return <div className="space-y-4">{paragraphs.map((p) => <p key={p}>{p}</p>)}</div>;
}

export function SummaryCard({ items }: { items: { label: string; text: string }[] }) {
    return (
        <section aria-labelledby="summary-title" className="mt-10 rounded-2xl border border-(--l-border-strong) border-l-4 border-l-(--l-accent) bg-(--l-accent-bg) p-5 sm:p-6">
            <h2 id="summary-title" className="mb-3 text-sm font-semibold uppercase tracking-[0.12em] text-(--l-accent)">In 30 seconds</h2>
            <dl className="space-y-2.5 text-base">
                {items.map((item) => (
                    <div key={item.label} className="sm:grid sm:grid-cols-[8.5rem_minmax(0,1fr)] sm:gap-4">
                        <dt className="font-semibold">{item.label}</dt>
                        <dd className="text-(--l-muted)">{item.text}</dd>
                    </div>
                ))}
            </dl>
        </section>
    );
}

export function WordsYouNeed({ ids }: { ids: ConceptId[] }) {
    return (
        <dl className="grid gap-x-8 gap-y-4 sm:grid-cols-2">
            {ids.map((id) => {
                const concept = getConcept(id);
                return (
                    <div key={id} className="border-t border-(--l-border) pt-3">
                        <dt className="font-semibold">{concept.term}</dt>
                        <dd className="mt-1 text-[15px] leading-relaxed text-(--l-muted)">{concept.definition}</dd>
                    </div>
                );
            })}
        </dl>
    );
}

/** One path through the system, step by step, ending in what it leads to. */
export function Flow({ title, steps, outcome, tone }: { title: string; steps: string[]; outcome: string; tone: Tone }) {
    const t = TONE[tone];
    return (
        <div className="rounded-2xl border border-(--l-border) p-4 sm:p-5">
            <p className="mb-3 font-semibold">{title}</p>
            <ol className="flex flex-wrap items-center gap-2 text-[15px]">
                {steps.map((step, i) => (
                    <li key={step} className="flex items-center gap-2">
                        <span className="rounded-lg border border-(--l-border-strong) bg-(--l-card) px-3 py-1.5">{step}</span>
                        {i < steps.length - 1 && <ArrowRight size={14} aria-hidden="true" className="text-(--l-faint)" />}
                    </li>
                ))}
            </ol>
            <p className="mt-3 rounded-lg px-3 py-2 text-[15px]" style={{ color: t.fg, background: t.bg }}>{outcome}</p>
        </div>
    );
}

export function OptionCards({ options }: { options: { label: string; code: string; good: string; cost: string }[] }) {
    return (
        <div className="grid gap-4 sm:grid-cols-2">
            {options.map((option) => (
                <div key={option.label} className="rounded-2xl border border-(--l-border) bg-(--l-card) p-5">
                    <p className="font-semibold">{option.label}</p>
                    <code className="mt-3 block overflow-x-auto rounded-lg bg-(--l-code-bg) px-3 py-2 font-mono text-[13px] text-(--l-muted)">{option.code}</code>
                    <p className="mt-3 text-[15px]"><span className="font-semibold text-(--l-fix)">Good: </span><span className="text-(--l-muted)">{option.good}</span></p>
                    <p className="mt-2 text-[15px]"><span className="font-semibold text-(--l-bug)">Cost: </span><span className="text-(--l-muted)">{option.cost}</span></p>
                </div>
            ))}
        </div>
    );
}

export function Callout({ tone, title, children }: { tone: Tone; title: string; children: React.ReactNode }) {
    const t = TONE[tone];
    return (
        <div className="mt-6 rounded-xl border-l-4 px-5 py-4" style={{ borderColor: t.fg, background: t.bg }}>
            <p className="font-semibold" style={{ color: t.fg }}>{title}</p>
            <div className="mt-1 text-[15px] text-(--l-muted)">{children}</div>
        </div>
    );
}

export function CheckYourself({ items }: { items: { q: string; a: string }[] }) {
    return (
        <ol className="space-y-3">
            {items.map((item, i) => (
                <li key={item.q}>
                    <details className="group rounded-xl border border-(--l-border) bg-(--l-card)">
                        <summary className="flex cursor-pointer list-none items-start gap-3 px-5 py-4 [&::-webkit-details-marker]:hidden">
                            <span className="font-mono text-sm leading-7 text-(--l-faint)">{i + 1}</span>
                            <span className="flex-1 font-medium">{item.q}</span>
                            <span className="shrink-0 text-sm leading-7 text-(--l-accent) group-open:hidden">Show answer</span>
                            <span className="hidden shrink-0 text-sm leading-7 text-(--l-faint) group-open:inline">Hide</span>
                        </summary>
                        <p className="border-t border-(--l-border) px-5 py-4 pl-11 text-[15px] text-(--l-muted)">{item.a}</p>
                    </details>
                </li>
            ))}
        </ol>
    );
}

export interface CodeTab {
    label: string;
    filename: string;
    code: string;
    lang?: string;
    href?: string;
    note?: string;
}

/** Read-only code, highlighted at build time in both themes. No highlighter ships to the browser. */
export async function CodeTabs({ tabs }: { tabs: CodeTab[] }) {
    const highlighted = await Promise.all(tabs.map(async (tab) => ({
        ...tab,
        html: await codeToHtml(tab.code.trimEnd(), { lang: tab.lang ?? "ts", themes: { light: "github-light", dark: "github-dark" }, defaultColor: false }),
    })));
    return <CodeTabsView tabs={highlighted} />;
}

export function GitHubCard({ title, body, command, secondary }: { title: string; body: string; command?: string; secondary?: { label: string; href: string } }) {
    return (
        <div className="mt-6 flex flex-col gap-5 rounded-2xl border border-(--l-border-strong) bg-(--l-card) p-5 sm:flex-row sm:items-center sm:justify-between sm:p-6">
            <div className="min-w-0">
                <p className="flex items-center gap-2 font-semibold"><Github size={17} aria-hidden="true" /> {title}</p>
                <p className="mt-1 text-[15px] text-(--l-muted)">{body}</p>
                {command && <code className="mt-3 inline-block rounded-lg bg-(--l-code-bg) px-3 py-1.5 font-mono text-[13px] text-(--l-muted)">{command}</code>}
            </div>
            <div className="flex shrink-0 flex-wrap gap-2">
                <a href={TRAPS_REPO_URL} target="_blank" rel="noopener" className="inline-flex items-center gap-2 rounded-full bg-(--l-fg) px-4 py-2 text-sm font-semibold text-(--l-bg) hover:opacity-90">
                    <Star size={15} aria-hidden="true" /> Star the repo
                </a>
                {secondary && <a href={secondary.href} target="_blank" rel="noopener" className="inline-flex items-center rounded-full border border-(--l-border-strong) px-4 py-2 text-sm font-semibold hover:bg-(--l-card)">{secondary.label}</a>}
            </div>
        </div>
    );
}

export function WatchShort({ youtubeId, youtubeUrl, instagramUrl, title }: { youtubeId: string; youtubeUrl: string; instagramUrl?: string; title: string }) {
    return (
        <details className="group mt-16 rounded-2xl border border-(--l-border)">
            <summary className="flex cursor-pointer list-none items-center justify-between px-5 py-4 [&::-webkit-details-marker]:hidden">
                <span className="font-medium">Watch the 60-second version</span>
                <ChevronDown size={16} aria-hidden="true" className="text-(--l-faint) transition-transform group-open:rotate-180" />
            </summary>
            <div className="grid gap-5 border-t border-(--l-border) p-5 sm:grid-cols-[220px_minmax(0,1fr)] sm:items-center">
                <div className="mx-auto aspect-[9/16] w-full max-w-[220px] overflow-hidden rounded-xl border border-(--l-border) bg-black">
                    <LiteYouTube id={youtubeId} title={title} />
                </div>
                <div className="flex flex-wrap gap-3 text-sm">
                    <a href={youtubeUrl} target="_blank" rel="noopener" className="rounded-full border border-(--l-border-strong) px-4 py-2 font-semibold hover:bg-(--l-card)">Open on YouTube</a>
                    {instagramUrl && <a href={instagramUrl} target="_blank" rel="noopener" className="rounded-full border border-(--l-border-strong) px-4 py-2 font-semibold hover:bg-(--l-card)">Open on Instagram</a>}
                </div>
            </div>
        </details>
    );
}

export function RememberNext({ remember, path }: { remember: string; path: string }) {
    const inTrack = findTrackStep(path);
    const next = inTrack ? nextLiveStep(inTrack.track, inTrack.index) : undefined;
    return (
        <section aria-label="Remember and next" className="mt-16 border-t border-(--l-border) pt-8">
            <p className="text-sm font-semibold uppercase tracking-[0.12em] text-(--l-faint)">Remember</p>
            <p className="mt-2 text-xl font-medium leading-relaxed">{remember}</p>
            {next?.href ? (
                <Link href={next.href} className="group mt-8 flex items-center justify-between gap-4 rounded-2xl border border-(--l-border-strong) p-5 transition-colors hover:bg-(--l-card)">
                    <span>
                        <span className="block text-xs uppercase tracking-[0.14em] text-(--l-faint)">Next</span>
                        <span className="mt-1 block text-lg font-semibold">{next.title}</span>
                        <span className="mt-1 block text-[15px] text-(--l-muted)">{next.summary}</span>
                    </span>
                    <ArrowRight className="shrink-0 transition-transform group-hover:translate-x-1" aria-hidden="true" />
                </Link>
            ) : inTrack && (
                <Link href={`/labs/systems/${inTrack.track.id}`} className="mt-8 inline-flex items-center gap-2 font-semibold text-(--l-accent)">Back to the world overview <ArrowRight size={16} aria-hidden="true" /></Link>
            )}
        </section>
    );
}
