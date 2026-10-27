"use client";

import { useEffect, useMemo, useRef } from "react";
import type { TrapActor } from "@/types/traps";
import { alpha } from "./palette";

type Token = { text: string; kind: "kw" | "str" | "com" | "num" | "plain" };

const KEYWORDS = new Set([
    "async", "await", "const", "let", "return", "if", "else", "export", "function", "import", "from", "type", "new", "throw", "try", "catch",
]);

/** Tiny TS highlighter. Enough for 40-line snippets; tracks template strings across lines. */
function tokenize(source: string): Token[][] {
    const out: Token[][] = [];
    let inTemplate = false;
    for (const line of source.split("\n")) {
        const tokens: Token[] = [];
        let i = 0;
        const push = (text: string, kind: Token["kind"]) => text && tokens.push({ text, kind });
        while (i < line.length) {
            if (inTemplate) {
                const end = line.indexOf("`", i);
                if (end === -1) { push(line.slice(i), "str"); i = line.length; }
                else { push(line.slice(i, end + 1), "str"); i = end + 1; inTemplate = false; }
                continue;
            }
            const rest = line.slice(i);
            if (rest.startsWith("//") || rest.startsWith("/*") || (i === 0 && /^\s*\*/.test(line))) { push(rest, "com"); break; }
            const ch = line[i];
            if (ch === "`") {
                const end = line.indexOf("`", i + 1);
                if (end === -1) { push(rest, "str"); inTemplate = true; break; }
                push(line.slice(i, end + 1), "str"); i = end + 1; continue;
            }
            if (ch === '"' || ch === "'") {
                let j = i + 1;
                while (j < line.length && line[j] !== ch) j += line[j] === "\\" ? 2 : 1;
                push(line.slice(i, j + 1), "str"); i = j + 1; continue;
            }
            const word = /^[A-Za-z_$][\w$]*/.exec(rest)?.[0];
            if (word) { push(word, KEYWORDS.has(word) ? "kw" : "plain"); i += word.length; continue; }
            const num = /^\d+/.exec(rest)?.[0];
            if (num) { push(num, "num"); i += num.length; continue; }
            push(ch, "plain"); i++;
        }
        out.push(tokens);
    }
    return out;
}

const TOKEN_CLASS: Record<Token["kind"], string> = {
    kw: "text-indigo-300",
    str: "text-emerald-300",
    com: "text-white/35 italic",
    num: "text-amber-300",
    plain: "text-white/85",
};

/**
 * The exact source that ran. The active step is highlighted in the color of
 * the actor executing it, and every user has a "program counter" badge in the
 * gutter, so you can see two users standing on the same line.
 */
export function TrapCode({
    source,
    steps,
    activeStep,
    activeActor,
    positions,
    actors,
    colors,
    fileName,
}: {
    source: string;
    steps: Record<string, [number, number]>;
    activeStep?: string;
    activeActor?: string;
    /** actor id → step they're on */
    positions: Record<string, string>;
    actors: TrapActor[];
    colors: Record<string, string>;
    fileName: string;
}) {
    const lines = useMemo(() => tokenize(source), [source]);
    const scrollRef = useRef<HTMLDivElement>(null);
    const range = activeStep ? steps[activeStep] : undefined;

    const badgesByLine = useMemo(() => {
        const map: Record<number, string[]> = {};
        for (const [actor, step] of Object.entries(positions)) {
            const r = steps[step];
            if (r) (map[r[0]] ??= []).push(actor);
        }
        return map;
    }, [positions, steps]);

    useEffect(() => {
        if (!range || !scrollRef.current) return;
        const el = scrollRef.current.querySelector<HTMLElement>(`[data-line="${range[0]}"]`);
        if (!el) return;
        const box = scrollRef.current;
        const top = el.offsetTop - box.clientHeight / 3;
        box.scrollTo({ top, behavior: "smooth" });
    }, [range]);

    const color = activeActor ? colors[activeActor] : "#ffffff";
    const label = (id: string) => actors.find((a) => a.id === id)?.label ?? id;

    return (
        <div className="flex min-h-0 flex-col overflow-hidden rounded-2xl border border-white/10 bg-[#0b0b0f]">
            <div className="flex items-center justify-between border-b border-white/10 px-4 py-2.5">
                <span className="font-mono text-xs text-white/60">{fileName}</span>
                {activeStep && (
                    <span className="font-mono text-[11px]" style={{ color }}>
                        {label(activeActor ?? "")} → step: {activeStep}
                    </span>
                )}
            </div>
            <div ref={scrollRef} className="relative max-h-[420px] overflow-auto py-2 font-mono text-[12.5px] leading-[1.7]">
                {lines.map((tokens, i) => {
                    const n = i + 1;
                    const active = range && n >= range[0] && n <= range[1];
                    const badges = badgesByLine[n] ?? [];
                    return (
                        <div
                            key={i}
                            data-line={n}
                            className="flex min-w-max pr-4 transition-colors duration-300"
                            style={active ? { background: alpha(color, 0.12), boxShadow: `inset 3px 0 0 ${color}` } : undefined}
                        >
                            <span className="flex w-14 shrink-0 items-center justify-end gap-0.5 pr-1">
                                {badges.map((a) => (
                                    <span
                                        key={a}
                                        title={`${label(a)} is here`}
                                        className="flex h-4 w-4 items-center justify-center rounded-full text-[9px] font-bold text-black"
                                        style={{ background: colors[a] }}
                                    >
                                        {label(a)[0]}
                                    </span>
                                ))}
                            </span>
                            <span className="w-7 shrink-0 select-none pr-3 text-right text-white/20">{n}</span>
                            <span className="whitespace-pre">
                                {tokens.map((t, j) => (
                                    <span key={j} className={TOKEN_CLASS[t.kind]}>{t.text}</span>
                                ))}
                            </span>
                        </div>
                    );
                })}
            </div>
        </div>
    );
}
