"use client";

import { useMemo, useSyncExternalStore, type ComponentType } from "react";
import { AbsoluteFill } from "remotion";
import { Player } from "@remotion/player";
import type { TrapBundle, TrapVariantName } from "@/types/traps";
import { BookingScene, type SceneProps } from "./BookingScene";
import { FPS, HEIGHT, WIDTH, buildTimeline } from "./timeline";

/** One Remotion scene per kind of trap. The trace JSON drives timing and content; the scene supplies the UI. */
const SCENES: Record<string, ComponentType<SceneProps>> = {
    "booking-race-condition": BookingScene,
};

const NARROW = "(max-width: 639px)";

function useNarrow() {
    return useSyncExternalStore(
        (notify) => {
            const query = window.matchMedia(NARROW);
            query.addEventListener("change", notify);
            return () => query.removeEventListener("change", notify);
        },
        () => window.matchMedia(NARROW).matches,
        () => false,
    );
}

/**
 * On a phone the 16:9 scene shrinks until its code is unreadable. Crop to the right-hand column (caption, both
 * phones, the database), which is the story; the full source is in the Network view tab.
 */
const CROP = { x: 590, width: 690 };

type CroppedProps = SceneProps & { Scene: ComponentType<SceneProps> };

function CroppedScene({ trap, variantName, Scene }: CroppedProps) {
    return (
        <AbsoluteFill style={{ overflow: "hidden" }}>
            <div style={{ position: "absolute", left: -CROP.x, top: 0, width: WIDTH, height: HEIGHT }}>
                <Scene trap={trap} variantName={variantName} />
            </div>
        </AbsoluteFill>
    );
}

export default function TrapAnimation({ trap, variantName }: { trap: TrapBundle; variantName: TrapVariantName }) {
    const narrow = useNarrow();
    const Scene = SCENES[trap.slug];
    const events = trap.variants[variantName].events;
    const { total } = useMemo(() => buildTimeline(events), [events]);
    const inputProps = useMemo(() => (narrow ? { trap, variantName, Scene } : { trap, variantName }), [narrow, trap, variantName, Scene]);
    if (!Scene) return null;

    const width = narrow ? CROP.width : WIDTH;
    const component = (narrow ? CroppedScene : Scene) as unknown as ComponentType<Record<string, unknown>>;

    return (
        <div className="overflow-hidden rounded-2xl border border-white/10 bg-black">
            <Player
                key={`${trap.slug}-${variantName}-${narrow ? "narrow" : "wide"}`}
                component={component}
                inputProps={inputProps as Record<string, unknown>}
                durationInFrames={total}
                fps={FPS}
                compositionWidth={width}
                compositionHeight={HEIGHT}
                controls
                clickToPlay
                spaceKeyToPlayOrPause
                allowFullscreen
                acknowledgeRemotionLicense
                style={{ width: "100%", aspectRatio: `${width} / ${HEIGHT}` }}
            />
            {narrow && <p className="border-t border-white/10 px-4 py-2 text-xs text-white/45">Phone view. Open the Network view tab to read the code, or go fullscreen.</p>}
        </div>
    );
}
