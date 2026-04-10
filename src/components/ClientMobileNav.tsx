"use client";

import dynamic from "next/dynamic";

const MobileNav = dynamic(() => import("@/components/MobileNav").then((mod) => ({ default: mod.MobileNav })), {
    ssr: false,
});

export function ClientMobileNav() {
    return <MobileNav />;
}
