"use client";

import { useEffect, useRef } from "react";

/**
 * Lightweight canvas particle field for the hero. Respects `prefers-reduced-motion`.
 * Radial glow + grid overlay for a more editorial feel (vs. stars alone).
 */
export function ParticleBackground() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduced) return;

    let raf = 0;
    const dpr = Math.min(window.devicePixelRatio || 1, 2);

    type Dot = { x: number; y: number; vx: number; vy: number; r: number; a: number };
    const dots: Dot[] = [];

    const resize = () => {
      const { clientWidth, clientHeight } = canvas;
      canvas.width = clientWidth * dpr;
      canvas.height = clientHeight * dpr;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      dots.length = 0;
      const count = Math.min(56, Math.floor((clientWidth * clientHeight) / 14000));
      for (let i = 0; i < count; i++) {
        dots.push({
          x: Math.random() * clientWidth,
          y: Math.random() * clientHeight,
          vx: (Math.random() - 0.5) * 0.22,
          vy: (Math.random() - 0.5) * 0.22,
          r: Math.random() * 1.2 + 0.35,
          a: Math.random() * 0.28 + 0.1,
        });
      }
    };

    const draw = () => {
      const w = canvas.clientWidth;
      const h = canvas.clientHeight;
      ctx.clearRect(0, 0, w, h);
      for (const d of dots) {
        d.x += d.vx;
        d.y += d.vy;
        if (d.x < 0 || d.x > w) d.vx *= -1;
        if (d.y < 0 || d.y > h) d.vy *= -1;
        ctx.beginPath();
        ctx.fillStyle = `rgba(59, 130, 246, ${d.a})`;
        ctx.arc(d.x, d.y, d.r, 0, Math.PI * 2);
        ctx.fill();
      }
      raf = requestAnimationFrame(draw);
    };

    resize();
    draw();
    window.addEventListener("resize", resize);

    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("resize", resize);
    };
  }, []);

  return (
    <div className="pointer-events-none absolute inset-0 -z-10 overflow-hidden" aria-hidden>
      <div
        className="absolute inset-0 opacity-90 dark:opacity-100"
        style={{
          background:
            "radial-gradient(ellipse 80% 60% at 50% -20%, rgba(59, 130, 246, 0.18), transparent 55%), radial-gradient(ellipse 60% 50% at 100% 50%, rgba(124, 58, 237, 0.12), transparent 50%)",
        }}
      />
      <div
        className="absolute inset-0 opacity-[0.35] dark:opacity-[0.45]"
        style={{
          backgroundImage: `linear-gradient(rgba(148, 163, 184, 0.08) 1px, transparent 1px), linear-gradient(90deg, rgba(148, 163, 184, 0.08) 1px, transparent 1px)`,
          backgroundSize: "48px 48px",
        }}
      />
      <canvas ref={canvasRef} className="absolute inset-0 h-full w-full opacity-70 dark:opacity-90" />
    </div>
  );
}
