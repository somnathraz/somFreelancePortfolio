"use client";

import { useEffect, useRef, useState, useCallback } from "react";

/**
 * Lusion Labs–style custom cursor.
 * Smooth circle with backdrop-filter: invert(1) grayscale(1).
 * Softened edges with box-shadow + slight backdrop blur.
 * Fast lerp so it feels responsive, not laggy.
 */

interface LabsCursorProps {
    containerRef: React.RefObject<HTMLElement | null>;
}

const SIZE = 120;
const HALF = SIZE / 2;
const LERP = 0.22; // faster follow — Lusion feels snappy, not sluggish

export function LabsCursor({ containerRef }: LabsCursorProps) {
    const dotRef = useRef<HTMLDivElement>(null);
    const pos = useRef({ x: -300, y: -300 });
    const target = useRef({ x: -300, y: -300 });
    const rafRef = useRef(0);
    const activeRef = useRef(false);
    const [enabled, setEnabled] = useState(false);

    const tick = useCallback(() => {
        pos.current.x += (target.current.x - pos.current.x) * LERP;
        pos.current.y += (target.current.y - pos.current.y) * LERP;

        if (dotRef.current) {
            dotRef.current.style.transform = `translate3d(${pos.current.x - HALF}px, ${pos.current.y - HALF}px, 0) scale(${activeRef.current ? 1 : 0.4})`;
        }
        rafRef.current = requestAnimationFrame(tick);
    }, []);

    useEffect(() => {
        const isFine = window.matchMedia("(pointer: fine)").matches;
        setEnabled(isFine);
        if (!isFine) return;

        const container = containerRef.current;
        if (!container) return;

        const onMove = (e: MouseEvent) => {
            target.current.x = e.clientX;
            target.current.y = e.clientY;
        };

        const onEnter = (e: MouseEvent) => {
            activeRef.current = true;
            // Snap to mouse position immediately — no slide-in
            pos.current.x = e.clientX;
            pos.current.y = e.clientY;
            target.current.x = e.clientX;
            target.current.y = e.clientY;
            if (dotRef.current) dotRef.current.style.opacity = "1";
        };

        const onLeave = () => {
            activeRef.current = false;
            if (dotRef.current) dotRef.current.style.opacity = "0";
        };

        container.addEventListener("mousemove", onMove);
        container.addEventListener("mouseenter", onEnter);
        container.addEventListener("mouseleave", onLeave);

        rafRef.current = requestAnimationFrame(tick);

        return () => {
            cancelAnimationFrame(rafRef.current);
            container.removeEventListener("mousemove", onMove);
            container.removeEventListener("mouseenter", onEnter);
            container.removeEventListener("mouseleave", onLeave);
        };
    }, [containerRef, tick]);

    if (!enabled) return null;

    return (
        <div
            ref={dotRef}
            aria-hidden
            style={{
                position: "fixed",
                top: 0,
                left: 0,
                width: SIZE,
                height: SIZE,
                borderRadius: "50%",
                pointerEvents: "none",
                zIndex: 99999,
                backdropFilter: "invert(1) grayscale(1)",
                WebkitBackdropFilter: "invert(1) grayscale(1)",
                // Soft edge — prevents the hard/aliased circle boundary
                boxShadow: "0 0 18px 6px rgba(0,0,0,0.25), inset 0 0 12px 4px rgba(0,0,0,0.12)",
                opacity: 0,
                // Smooth scale + opacity transition
                transition: "opacity 0.18s ease, transform 0.35s cubic-bezier(0.22, 1, 0.36, 1)",
                willChange: "transform, opacity",
            }}
        />
    );
}
