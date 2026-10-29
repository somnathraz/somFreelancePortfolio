"use client";

import { useState } from "react";
import { Check, Copy, ExternalLink } from "lucide-react";

export interface HighlightedTab {
    label: string;
    filename: string;
    code: string;
    html: string;
    href?: string;
    note?: string;
}

/** Tab switching and copy for CodeTabs. The highlighting itself happened on the server. */
export function CodeTabsView({ tabs }: { tabs: HighlightedTab[] }) {
    const [active, setActive] = useState(0);
    const [copied, setCopied] = useState(false);
    const tab = tabs[active];

    const copy = async () => {
        try {
            await navigator.clipboard.writeText(tab.code);
            setCopied(true);
            window.setTimeout(() => setCopied(false), 1500);
        } catch { /* clipboard blocked; the code can still be selected by hand */ }
    };

    return (
        <div className="overflow-hidden rounded-xl border border-(--l-border-strong) bg-(--l-code-bg)">
            <div className="flex flex-wrap items-center justify-between gap-2 border-b border-(--l-border) px-2 py-1.5">
                <div role="tablist" aria-label="Code versions" className="flex flex-wrap gap-1">
                    {tabs.map((t, i) => (
                        <button
                            key={t.label}
                            type="button"
                            role="tab"
                            aria-selected={i === active}
                            onClick={() => setActive(i)}
                            className={`rounded-md px-3 py-1.5 text-sm transition-colors ${i === active ? "bg-(--l-accent-bg) font-semibold text-(--l-fg)" : "text-(--l-muted) hover:text-(--l-fg)"}`}
                        >
                            {t.label}
                        </button>
                    ))}
                </div>
                <div className="flex items-center gap-1">
                    <button type="button" onClick={copy} className="inline-flex items-center gap-1.5 rounded-md px-2.5 py-1.5 text-xs text-(--l-muted) hover:text-(--l-fg)">
                        {copied ? <Check size={13} aria-hidden="true" /> : <Copy size={13} aria-hidden="true" />} {copied ? "Copied" : "Copy"}
                    </button>
                    {tab.href && (
                        <a href={tab.href} target="_blank" rel="noopener" className="inline-flex items-center gap-1.5 rounded-md px-2.5 py-1.5 text-xs text-(--l-muted) hover:text-(--l-fg)">
                            <ExternalLink size={13} aria-hidden="true" /> GitHub
                        </a>
                    )}
                </div>
            </div>
            <p className="border-b border-(--l-border) px-4 py-2 font-mono text-xs text-(--l-faint)">{tab.filename}</p>
            <div
                role="tabpanel"
                className="lesson-code overflow-x-auto py-3 pr-4 font-mono text-[13px] leading-[1.7] [scrollbar-width:thin]"
                dangerouslySetInnerHTML={{ __html: tab.html }}
            />
            {tab.note && <p className="border-t border-(--l-border) px-4 py-2.5 text-xs text-(--l-faint)">{tab.note}</p>}
        </div>
    );
}
