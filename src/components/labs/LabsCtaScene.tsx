"use client";

import { useEffect, useRef, useCallback } from "react";

/**
 * Lusion-style particle field for the CTA.
 * Shapes continuously drift/flow (never sit still), and the mouse
 * creates a flowing wake that pushes them aside with inertia.
 */

interface Shape {
    x: number;
    y: number;
    // Ambient drift
    flowAngle: number;
    flowSpeed: number;
    // Mouse displacement (lerped)
    ox: number;
    oy: number;
    // Physics
    vx: number;
    vy: number;
    size: number;
    depth: number; // 0 = far, 1 = near — affects speed & opacity
    rotation: number;
    rotationSpeed: number;
    type: number;
    color: string;
    opacity: number;
    phase: number; // unique noise phase
}

// Tuned for a black background — lights + midtones stay visible; no near-black fills
const SHAPE_COLORS = [
    "#71717a",
    "#a1a1aa",
    "#d4d4d8",
    "#e4e4e7",
    "#f4f4f5",
    "#ffffff",
    "#52525b",
    "#c4c4cc",
    // Accent pops
    "#818cf8",
    "#6366f1",
    "#34d399",
    "#f87171",
    "#a78bfa",
    "#fbbf24",
    "#38bdf8",
    "#f472b6",
];

function drawShape(ctx: CanvasRenderingContext2D, shape: Shape) {
    ctx.save();
    ctx.translate(shape.x + shape.ox, shape.y + shape.oy);
    ctx.rotate(shape.rotation);
    ctx.globalAlpha = shape.opacity;
    ctx.fillStyle = shape.color;

    const s = shape.size;

    switch (shape.type) {
        case 0: {
            ctx.beginPath();
            for (let i = 0; i < 5; i++) {
                const a = (Math.PI * 2 * i) / 5 - Math.PI / 2;
                if (i === 0) ctx.moveTo(Math.cos(a) * s, Math.sin(a) * s);
                else ctx.lineTo(Math.cos(a) * s, Math.sin(a) * s);
            }
            ctx.closePath();
            ctx.fill();
            break;
        }
        case 1: {
            ctx.beginPath();
            ctx.moveTo(0, -s);
            ctx.lineTo(s * 0.8, s * 0.6);
            ctx.lineTo(-s * 0.8, s * 0.6);
            ctx.closePath();
            ctx.fill();
            break;
        }
        case 2: {
            ctx.beginPath();
            ctx.arc(0, 0, s, 0, Math.PI * 2);
            ctx.arc(0, 0, s * 0.5, 0, Math.PI * 2, true);
            ctx.closePath();
            ctx.fill();
            break;
        }
        case 3: {
            // Bowtie
            ctx.beginPath();
            ctx.moveTo(-s, -s * 0.65);
            ctx.lineTo(0, 0);
            ctx.lineTo(-s, s * 0.65);
            ctx.closePath();
            ctx.fill();
            ctx.beginPath();
            ctx.moveTo(s, -s * 0.65);
            ctx.lineTo(0, 0);
            ctx.lineTo(s, s * 0.65);
            ctx.closePath();
            ctx.fill();
            break;
        }
        case 4: {
            const w = s * 0.28;
            ctx.fillRect(-w, -s, w * 2, s * 2);
            ctx.fillRect(-s, -w, s * 2, w * 2);
            break;
        }
        case 5: {
            ctx.beginPath();
            for (let i = 0; i < 6; i++) {
                const a = (Math.PI * 2 * i) / 6;
                if (i === 0) ctx.moveTo(Math.cos(a) * s, Math.sin(a) * s);
                else ctx.lineTo(Math.cos(a) * s, Math.sin(a) * s);
            }
            ctx.closePath();
            ctx.fill();
            break;
        }
        case 6: {
            ctx.beginPath();
            for (let i = 0; i < 8; i++) {
                const a = (Math.PI * 2 * i) / 8 - Math.PI / 8;
                const r = i % 2 === 0 ? s : s * 0.35;
                if (i === 0) ctx.moveTo(Math.cos(a) * r, Math.sin(a) * r);
                else ctx.lineTo(Math.cos(a) * r, Math.sin(a) * r);
            }
            ctx.closePath();
            ctx.fill();
            break;
        }
    }

    ctx.restore();
}

interface LabsCtaSceneProps {
    containerRef: React.RefObject<HTMLElement | null>;
}

export function LabsCtaScene({ containerRef }: LabsCtaSceneProps) {
    const canvasRef = useRef<HTMLCanvasElement>(null);
    const shapesRef = useRef<Shape[]>([]);
    const mouseRef = useRef({ x: -9999, y: -9999, px: -9999, py: -9999 });
    const animFrameRef = useRef(0);
    const sizeRef = useRef({ w: 0, h: 0 });
    const timeRef = useRef(0);

    const initShapes = useCallback((w: number, h: number) => {
        const count = Math.min(Math.floor((w * h) / 2400), 580);
        const shapes: Shape[] = [];

        for (let i = 0; i < count; i++) {
            const isAccent = Math.random() < 0.14;
            const colorIdx = isAccent
                ? 8 + Math.floor(Math.random() * (SHAPE_COLORS.length - 8))
                : Math.floor(Math.random() * 8);

            const depth = Math.random(); // 0 far → 1 near
            const size = (5 + Math.random() * 18) * (0.55 + depth * 0.7);

            shapes.push({
                x: Math.random() * w,
                y: Math.random() * h,
                flowAngle: Math.random() * Math.PI * 2,
                flowSpeed: (0.15 + Math.random() * 0.55) * (0.4 + depth * 0.9),
                ox: 0,
                oy: 0,
                vx: 0,
                vy: 0,
                size,
                depth,
                rotation: Math.random() * Math.PI * 2,
                rotationSpeed: (Math.random() - 0.5) * 0.012 * (0.5 + depth),
                type: Math.floor(Math.random() * 7),
                color: SHAPE_COLORS[colorIdx],
                // Higher base opacity so shapes don’t feel cut off on black
                opacity: isAccent
                    ? 0.85 + Math.random() * 0.15
                    : 0.28 + depth * 0.45 + Math.random() * 0.15,
                phase: Math.random() * Math.PI * 2,
            });
        }

        shapesRef.current = shapes;
        sizeRef.current = { w, h };
    }, []);

    useEffect(() => {
        const canvas = canvasRef.current;
        const container = containerRef.current;
        if (!canvas || !container) return;

        const ctx = canvas.getContext("2d");
        if (!ctx) return;

        const resize = () => {
            const dpr = Math.min(window.devicePixelRatio, 2);
            const rect = container.getBoundingClientRect();
            canvas.width = rect.width * dpr;
            canvas.height = rect.height * dpr;
            ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
            canvas.style.width = `${rect.width}px`;
            canvas.style.height = `${rect.height}px`;
            initShapes(rect.width, rect.height);
        };

        resize();
        window.addEventListener("resize", resize);

        const handleMouseMove = (e: MouseEvent) => {
            const rect = container.getBoundingClientRect();
            const mx = e.clientX - rect.left;
            const my = e.clientY - rect.top;
            mouseRef.current.px = mouseRef.current.x;
            mouseRef.current.py = mouseRef.current.y;
            mouseRef.current.x = mx;
            mouseRef.current.y = my;
        };

        const handleMouseLeave = () => {
            mouseRef.current = { x: -9999, y: -9999, px: -9999, py: -9999 };
        };

        container.addEventListener("mousemove", handleMouseMove);
        container.addEventListener("mouseleave", handleMouseLeave);

        const animate = () => {
            const { w, h } = sizeRef.current;
            timeRef.current += 0.016;
            const t = timeRef.current;

            ctx.clearRect(0, 0, w, h);

            const { x: mx, y: my, px, py } = mouseRef.current;
            const mouseActive = mx > -1000;
            const mdx = mouseActive ? mx - px : 0;
            const mdy = mouseActive ? my - py : 0;
            const mouseSpeed = Math.min(Math.hypot(mdx, mdy), 40);

            const PUSH_RADIUS = 180;
            const PUSH_FORCE = 0.55;
            const WAKE_FORCE = 0.35;
            const FRICTION = 0.9;
            const RETURN = 0.045;

            for (const shape of shapesRef.current) {
                // ── Continuous flowing drift (Lusion-style ambient motion) ──
                // Slowly wander the flow angle with unique phase
                shape.flowAngle +=
                    Math.sin(t * 0.3 + shape.phase) * 0.008 +
                    Math.cos(t * 0.17 + shape.phase * 1.3) * 0.005;

                const driftX = Math.cos(shape.flowAngle) * shape.flowSpeed;
                const driftY =
                    Math.sin(shape.flowAngle) * shape.flowSpeed +
                    // slight upward bias so field feels like it’s rising/flowing
                    -0.08 * shape.depth;

                // Gentle wave wobble on top of directional drift
                const waveX = Math.sin(t * 0.4 + shape.phase + shape.y * 0.008) * 0.25;
                const waveY = Math.cos(t * 0.35 + shape.phase + shape.x * 0.008) * 0.2;

                shape.x += driftX + waveX;
                shape.y += driftY + waveY;

                // ── Mouse flowing wake ──
                if (mouseActive) {
                    const dx = shape.x + shape.ox - mx;
                    const dy = shape.y + shape.oy - my;
                    const dist = Math.hypot(dx, dy);

                    if (dist < PUSH_RADIUS && dist > 0.5) {
                        const falloff = 1 - dist / PUSH_RADIUS;
                        const strength = falloff * falloff * PUSH_FORCE * (0.6 + shape.depth);

                        // Radial push away from cursor
                        shape.vx += (dx / dist) * strength * 8;
                        shape.vy += (dy / dist) * strength * 8;

                        // Tangential / wake flow in mouse movement direction
                        if (mouseSpeed > 0.5) {
                            shape.vx += mdx * WAKE_FORCE * falloff;
                            shape.vy += mdy * WAKE_FORCE * falloff;
                        }
                    }
                }

                // Integrate mouse offset with spring return
                shape.vx *= FRICTION;
                shape.vy *= FRICTION;
                shape.ox += shape.vx;
                shape.oy += shape.vy;
                shape.ox += -shape.ox * RETURN;
                shape.oy += -shape.oy * RETURN;

                // Rotate while flowing
                shape.rotation += shape.rotationSpeed;

                // Wrap around edges so the field feels endless
                if (shape.x < -50) shape.x = w + 40;
                if (shape.x > w + 50) shape.x = -40;
                if (shape.y < -50) shape.y = h + 40;
                if (shape.y > h + 50) shape.y = -40;

                drawShape(ctx, shape);
            }

            animFrameRef.current = requestAnimationFrame(animate);
        };

        animFrameRef.current = requestAnimationFrame(animate);

        return () => {
            cancelAnimationFrame(animFrameRef.current);
            window.removeEventListener("resize", resize);
            container.removeEventListener("mousemove", handleMouseMove);
            container.removeEventListener("mouseleave", handleMouseLeave);
        };
    }, [containerRef, initShapes]);

    return (
        <canvas
            ref={canvasRef}
            className="pointer-events-none absolute inset-0 h-full w-full"
            style={{ background: "transparent" }}
        />
    );
}
