"use client";

import dynamic from "next/dynamic";

const Particles = dynamic(
    () => import("@/components/ui/particles").then((mod) => ({ default: mod.Particles })),
    { ssr: false },
);

type DeferredParticlesProps = {
    className?: string;
    quantity?: number;
    staticity?: number;
    ease?: number;
    color?: string;
    refresh?: boolean;
};

export function DeferredParticles(props: DeferredParticlesProps) {
    return <Particles {...props} />;
}
