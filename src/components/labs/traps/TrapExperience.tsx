"use client";

import { useState } from "react";
import dynamic from "next/dynamic";
import type { TrapBundle, TrapVariantName } from "@/types/traps";
import { SEVERITY_COLORS, alpha } from "./palette";
import { ANIMATED_SLUGS } from "./animation/scenes";
import { TrapReplay } from "./TrapReplay";

const TrapAnimation = dynamic(() => import("./animation/TrapAnimation"), {
    ssr: false,
    loading: () => <div className="aspect-[1280/720] w-full animate-pulse rounded-2xl border border-white/10 bg-white/[0.03]" />,
});

type View = "animation" | "network";

const TABS: { id: View; label: string; hint: string }[] = [
    { id: "animation", label: "Animation", hint: "the story" },
    { id: "network", label: "Network view", hint: "step through it" },
];

/** Animation (Remotion) first, then the step-by-step network replay. Traps without a scene show the replay only. */
export function TrapExperience({ trap }: { trap: TrapBundle }) {
    const hasAnimation = ANIMATED_SLUGS.has(trap.slug);
    const [view, setView] = useState<View>(hasAnimation ? "animation" : "network");
    const [variant, setVariant] = useState<TrapVariantName>("bug");

    if (!hasAnimation) return <TrapReplay trap={trap} />;

    return (
        <div className="flex flex-col gap-4">
            <div role="tablist" aria-label="Choose view" className="inline-flex w-full self-start rounded-full border border-white/10 bg-white/[0.03] p-1 sm:w-auto">
                {TABS.map((t) => (
                    <button
                        key={t.id}
                        role="tab"
                        aria-selected={view === t.id}
                        onClick={() => setView(t.id)}
                        className={`flex-1 rounded-full px-5 py-2 text-sm transition-colors sm:flex-none ${view === t.id ? "bg-white text-black" : "text-white/55 hover:text-white"}`}
                    >
                        <span className="font-semibold">{t.label}</span>
                        <span className="hidden opacity-60 md:inline"> · {t.hint}</span>
                    </button>
                ))}
            </div>

            {view === "animation" ? (
                <>
                    <div role="tablist" aria-label="Choose implementation" className="inline-flex w-full self-start rounded-full border border-white/10 bg-white/[0.03] p-1 sm:w-auto">
                        {(["bug", "fix"] as const).map((name) => {
                            const active = name === variant;
                            const c = name === "bug" ? SEVERITY_COLORS.bad : SEVERITY_COLORS.ok;
                            return (
                                <button
                                    key={name}
                                    role="tab"
                                    aria-selected={active}
                                    onClick={() => setVariant(name)}
                                    className="flex-1 rounded-full px-4 py-2 text-sm transition-colors sm:flex-none"
                                    style={active ? { background: alpha(c, 0.16), color: c, boxShadow: `inset 0 0 0 1px ${alpha(c, 0.45)}` } : { color: "rgba(255,255,255,0.55)" }}
                                >
                                    <span className="font-semibold">{name === "bug" ? "The bug" : "The fix"}</span>
                                    <span className="hidden opacity-70 md:inline"> · {trap.variants[name].label}</span>
                                </button>
                            );
                        })}
                    </div>
                    <TrapAnimation trap={trap} variantName={variant} />
                    <p className="text-xs text-white/40">Animated from a real recorded run against Postgres. Press play, or drag the bar to scrub.</p>
                </>
            ) : (
                <TrapReplay trap={trap} variant={variant} onVariantChange={setVariant} />
            )}
        </div>
    );
}
