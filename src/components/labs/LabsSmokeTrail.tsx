"use client";

import { useEffect, useRef } from "react";

type Wisp = {
  x: number; y: number; vx: number; vy: number;
  age: number; life: number; size: number; angle: number; spin: number;
};

// Smooth, layered noise gives every puff torn, vaporous edges instead of circles.
function noise(x: number, y: number) {
  const hash = (a: number, b: number) => {
    const n = Math.sin(a * 127.1 + b * 311.7) * 43758.5453;
    return n - Math.floor(n);
  };
  const ix = Math.floor(x), iy = Math.floor(y);
  const fx = x - ix, fy = y - iy;
  const u = fx * fx * (3 - 2 * fx), v = fy * fy * (3 - 2 * fy);
  return (hash(ix, iy) * (1 - u) + hash(ix + 1, iy) * u) * (1 - v)
    + (hash(ix, iy + 1) * (1 - u) + hash(ix + 1, iy + 1) * u) * v;
}

function makeSmokeTexture() {
  const texture = document.createElement("canvas");
  texture.width = texture.height = 128;
  const ctx = texture.getContext("2d");
  if (!ctx) return texture;
  const pixels = ctx.createImageData(128, 128);
  for (let y = 0; y < 128; y++) {
    for (let x = 0; x < 128; x++) {
      const nx = x / 128, ny = y / 128;
      const cloud = noise(nx * 5, ny * 5) * .55
        + noise(nx * 11 + 8, ny * 11) * .3
        + noise(nx * 23, ny * 23 + 3) * .15;
      const radius = Math.hypot(nx - .5, ny - .5) * 2;
      const falloff = Math.pow(Math.max(0, 1 - radius), 1.4);
      const density = Math.max(0, cloud - .22) * falloff;
      const i = (y * 128 + x) * 4;
      // Charcoal body with cool ash highlights, visible on the dark Labs canvas.
      pixels.data[i] = 85 + cloud * 85;
      pixels.data[i + 1] = 85 + cloud * 85;
      pixels.data[i + 2] = 100 + cloud * 90;
      pixels.data[i + 3] = Math.min(255, density * 650);
    }
  }
  ctx.putImageData(pixels, 0, 0);
  return texture;
}

/** Labs-only atmospheric cursor wake. No React updates in the animation loop. */
export function LabsSmokeTrail() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas?.getContext("2d", { alpha: true });
    if (!canvas || !ctx) return;

    const motion = window.matchMedia("(prefers-reduced-motion: reduce)");
    const pointer = window.matchMedia("(any-pointer: fine)");
    let enabled = false;
    let texture: HTMLCanvasElement | null = null;
    let wisps: Wisp[] = [];
    let frame = 0;
    let lastFrame = 0;
    let width = 0, height = 0;
    let previous: { x: number; y: number; time: number } | null = null;

    const clear = () => {
      cancelAnimationFrame(frame);
      frame = 0;
      wisps = [];
      previous = null;
      ctx.clearRect(0, 0, width, height);
    };

    const resize = () => {
      clear();
      width = window.innerWidth;
      height = window.innerHeight;
      // Smoke benefits from soft rendering; avoid a full retina-sized buffer.
      const resolution = Math.min(1, 1600 / width);
      canvas.width = Math.round(width * resolution);
      canvas.height = Math.round(height * resolution);
      ctx.setTransform(resolution, 0, 0, resolution, 0, 0);
    };

    const render = (now: number) => {
      const dt = Math.min((now - lastFrame) / 1000, .04);
      lastFrame = now;
      ctx.clearRect(0, 0, width, height);
      wisps = wisps.filter(w => w.age < w.life);
      for (const w of wisps) {
        w.age += dt;
        const t = Math.min(1, w.age / w.life);
        // Curl away from the pointer's momentum and slowly rise as it diffuses.
        w.vx += Math.sin(w.y * .012 + now * .0004) * dt * 9;
        w.vy += Math.cos(w.x * .01 - now * .0003) * dt * 7;
        w.vx *= Math.exp(-dt * .65);
        w.vy *= Math.exp(-dt * .65);
        w.x += w.vx * dt;
        w.y += (w.vy - 11) * dt;
        w.angle += w.spin * dt;
        const size = w.size * (1 + t * 2.5);
        ctx.save();
        ctx.translate(w.x, w.y);
        ctx.rotate(w.angle);
        ctx.globalAlpha = Math.min(1, w.age * 10) * Math.pow(1 - t, 1.6) * .6;
        if (texture) ctx.drawImage(texture, -size, -size * .75, size * 2, size * 1.5);
        ctx.restore();
      }
      // Completely idle once the wake has dissipated.
      frame = wisps.length ? requestAnimationFrame(render) : 0;
    };

    const onMove = (event: PointerEvent) => {
      if (!enabled || document.hidden || event.pointerType === "touch") return;
      const now = performance.now();
      const x = event.clientX, y = event.clientY;
      const from = previous && now - previous.time < 140 ? previous : { x, y, time: now - 16 };
      const dx = x - from.x, dy = y - from.y;
      const distance = Math.hypot(dx, dy);
      if (previous && distance < 5) return;
      const steps = Math.min(12, Math.max(1, Math.ceil(distance / 14)));
      for (let i = 1; i <= steps; i++) {
        wisps.push({
          x: from.x + dx * i / steps + (Math.random() - .5) * 12,
          y: from.y + dy * i / steps + (Math.random() - .5) * 12,
          vx: Math.max(-90, Math.min(90, dx * 1.2)) + (Math.random() - .5) * 20,
          vy: Math.max(-90, Math.min(90, dy * 1.2)) + (Math.random() - .5) * 20,
          age: 0, life: 2.8 + Math.random() * 1.6,
          size: 32 + Math.random() * 24,
          angle: Math.random() * Math.PI * 2,
          spin: (Math.random() - .5) * .7,
        });
      }
      if (wisps.length > 160) wisps.splice(0, wisps.length - 160);
      previous = { x, y, time: now };
      if (!frame) {
        lastFrame = now;
        frame = requestAnimationFrame(render);
      }
    };

    const updatePreferences = () => {
      enabled = pointer.matches && !motion.matches;
      if (enabled && !texture) texture = makeSmokeTexture();
      if (!enabled) clear();
    };
    const onLeave = () => { previous = null; };
    const onVisibility = () => { if (document.hidden) clear(); };

    resize();
    updatePreferences();
    window.addEventListener("pointermove", onMove, { passive: true });
    window.addEventListener("resize", resize, { passive: true });
    window.addEventListener("blur", clear);
    document.documentElement.addEventListener("pointerleave", onLeave);
    document.addEventListener("visibilitychange", onVisibility);
    motion.addEventListener("change", updatePreferences);
    pointer.addEventListener("change", updatePreferences);
    return () => {
      clear();
      window.removeEventListener("pointermove", onMove);
      window.removeEventListener("resize", resize);
      window.removeEventListener("blur", clear);
      document.documentElement.removeEventListener("pointerleave", onLeave);
      document.removeEventListener("visibilitychange", onVisibility);
      motion.removeEventListener("change", updatePreferences);
      pointer.removeEventListener("change", updatePreferences);
    };
  }, []);

  return <canvas ref={canvasRef} aria-hidden="true" data-labs-smoke className="pointer-events-none fixed inset-0 z-[2] h-full w-full" />;
}
