"use client";

import { useEffect, useRef, useState, useCallback } from "react";
import { motion, useScroll, useTransform } from "framer-motion";

/**
 * Blue stroke behind Featured Work cards.
 * Peeks left/right, shoots right on the last card, ends bottom-right.
 * Uses Catmull-Rom → cubic bezier conversion for perfectly smooth curves.
 */

interface FlowingLineProps {
    containerRef: React.RefObject<HTMLElement | null>;
    cardRefs: React.RefObject<(HTMLElement | null)[]>;
    className?: string;
}

type Pt = { x: number; y: number };

function getOffset(section: HTMLElement, el: HTMLElement) {
    let x = 0, y = 0;
    let node: HTMLElement | null = el;
    while (node && node !== section) {
        x += node.offsetLeft;
        y += node.offsetTop;
        node = node.offsetParent as HTMLElement | null;
    }
    return { x, y, w: el.offsetWidth, h: el.offsetHeight };
}

/**
 * Convert an array of points to a smooth SVG path using
 * Catmull-Rom → Cubic Bezier conversion (no sharp kinks).
 */
function catmullRomPath(points: Pt[], tension = 0.35): string {
    if (points.length < 2) return "";
    if (points.length === 2) {
        return `M ${points[0].x.toFixed(1)} ${points[0].y.toFixed(1)} L ${points[1].x.toFixed(1)} ${points[1].y.toFixed(1)}`;
    }

    let d = `M ${points[0].x.toFixed(1)} ${points[0].y.toFixed(1)}`;

    for (let i = 0; i < points.length - 1; i++) {
        const p0 = points[Math.max(i - 1, 0)];
        const p1 = points[i];
        const p2 = points[i + 1];
        const p3 = points[Math.min(i + 2, points.length - 1)];

        // Catmull-Rom tangents scaled by tension
        const cp1x = p1.x + (p2.x - p0.x) * tension;
        const cp1y = p1.y + (p2.y - p0.y) * tension;
        const cp2x = p2.x - (p3.x - p1.x) * tension;
        const cp2y = p2.y - (p3.y - p1.y) * tension;

        d += ` C ${cp1x.toFixed(1)} ${cp1y.toFixed(1)}, ${cp2x.toFixed(1)} ${cp2y.toFixed(1)}, ${p2.x.toFixed(1)} ${p2.y.toFixed(1)}`;
    }

    return d;
}

function buildPoints(section: HTMLElement, cards: (HTMLElement | null)[]): Pt[] {
    const w = section.offsetWidth;
    const h = section.offsetHeight;
    const valid = cards.filter(Boolean) as HTMLElement[];

    if (valid.length === 0) {
        return [
            { x: 10, y: 0 },
            { x: w * 0.5, y: h * 0.5 },
            { x: w - 8, y: h - 8 },
        ];
    }

    const pts: Pt[] = [{ x: 10, y: 0 }];

    valid.forEach((card, i) => {
        const { x: left, y: top, w: cw, h: ch } = getOffset(section, card);
        const right = left + cw;
        const isLast = i === valid.length - 1;

        if (isLast) {
            pts.push({ x: left + cw * 0.45, y: top + ch * 0.2 });
            pts.push({ x: right + 20, y: top + ch * 0.4 });
            pts.push({ x: w - 4, y: top + ch * 0.6 });
            pts.push({ x: w - 2, y: top + ch * 0.9 });
            pts.push({ x: w - 2, y: h - 2 });
            return;
        }

        const peekLeft = i % 2 === 0;
        if (peekLeft) {
            pts.push({ x: Math.max(6, left - 36), y: top + ch * 0.22 });
            pts.push({ x: Math.max(4, left - 56), y: top + ch * 0.5 });
            pts.push({ x: Math.max(8, left - 28), y: top + ch * 0.82 });
        } else {
            pts.push({ x: Math.min(w - 6, right + 36), y: top + ch * 0.22 });
            pts.push({ x: Math.min(w - 4, right + 56), y: top + ch * 0.5 });
            pts.push({ x: Math.min(w - 8, right + 28), y: top + ch * 0.82 });
        }

        // Bridge to next card
        if (i + 1 < valid.length) {
            const next = getOffset(section, valid[i + 1]);
            const gapY = (top + ch + next.y) / 2;
            const nextIsLast = i + 1 === valid.length - 1;
            pts.push({
                x: nextIsLast ? w * 0.68 : peekLeft ? w * 0.58 : w * 0.42,
                y: gapY,
            });
        }
    });

    return pts;
}

export function FlowingLine({ containerRef, cardRefs, className = "" }: FlowingLineProps) {
    const measureRef = useRef<SVGPathElement>(null);
    const [pathD, setPathD] = useState("");
    const [vb, setVb] = useState("0 0 1440 2400");
    const [pathLen, setPathLen] = useState(3500);

    const { scrollYProgress } = useScroll({
        target: containerRef,
        // Start drawing as soon as section enters viewport
        offset: ["start end", "end 0.35"],
    });

    // Full stroke by 75% scroll through the section — feels fast
    const dashOffset = useTransform(scrollYProgress, [0, 0.75], [pathLen, 0]);
    const opacity = useTransform(scrollYProgress, [0, 0.02, 0.85, 1], [0, 1, 1, 0.6]);

    const measure = useCallback(() => {
        const section = containerRef.current;
        if (!section) return;
        setVb(`0 0 ${section.offsetWidth} ${section.offsetHeight}`);
        const pts = buildPoints(section, cardRefs.current ?? []);
        setPathD(catmullRomPath(pts, 0.3));
    }, [containerRef, cardRefs]);

    useEffect(() => {
        measure();
        const raf = requestAnimationFrame(measure);
        const t1 = setTimeout(measure, 150);
        const t2 = setTimeout(measure, 700);
        window.addEventListener("resize", measure);
        return () => {
            cancelAnimationFrame(raf);
            clearTimeout(t1);
            clearTimeout(t2);
            window.removeEventListener("resize", measure);
        };
    }, [measure]);

    useEffect(() => {
        if (!pathD || !measureRef.current) return;
        const len = measureRef.current.getTotalLength();
        if (Number.isFinite(len) && len > 0) setPathLen(len);
    }, [pathD]);

    if (!pathD) return null;

    return (
        <div
            className={`pointer-events-none absolute inset-0 z-[1] overflow-visible ${className}`}
            aria-hidden
        >
            <svg className="h-full w-full" viewBox={vb} preserveAspectRatio="none" fill="none">
                <defs>
                    <linearGradient id="arc-g" x1="0%" y1="0%" x2="100%" y2="100%">
                        <stop offset="0%" stopColor="#6366f1" stopOpacity="0.1" />
                        <stop offset="6%" stopColor="#6366f1" stopOpacity="1" />
                        <stop offset="50%" stopColor="#818cf8" stopOpacity="1" />
                        <stop offset="85%" stopColor="#6366f1" stopOpacity="0.95" />
                        <stop offset="100%" stopColor="#a78bfa" stopOpacity="0.5" />
                    </linearGradient>
                    <filter id="arc-f" x="-25%" y="-8%" width="150%" height="116%">
                        <feGaussianBlur stdDeviation="6" result="b" />
                        <feMerge>
                            <feMergeNode in="b" />
                            <feMergeNode in="SourceGraphic" />
                        </feMerge>
                    </filter>
                </defs>

                <path ref={measureRef} d={pathD} fill="none" stroke="transparent" />

                <motion.path
                    d={pathD}
                    stroke="url(#arc-g)"
                    strokeWidth="44"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    fill="none"
                    filter="url(#arc-f)"
                    style={{
                        strokeDasharray: pathLen,
                        strokeDashoffset: dashOffset,
                        opacity,
                    }}
                />
            </svg>
        </div>
    );
}
