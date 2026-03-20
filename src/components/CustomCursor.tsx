"use client";

import { useEffect, useState } from "react";
import { motion, useMotionValue, useSpring } from "framer-motion";
/**
 * Desktop-only custom cursor ring; disables with reduced motion or coarse pointer.
 * Adds `custom-cursor-active` on `body` (see `globals.css`).
 */
export function CustomCursor() {
  const [enabled, setEnabled] = useState(false);
  const [hovering, setHovering] = useState(false);
  const x = useMotionValue(-100);
  const y = useMotionValue(-100);
  const sx = useSpring(x, { stiffness: 420, damping: 32, mass: 0.35 });
  const sy = useSpring(y, { stiffness: 420, damping: 32, mass: 0.35 });

  useEffect(() => {
    const fine = window.matchMedia("(pointer: fine)");
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)");
    const sync = () => setEnabled(fine.matches && !reduced.matches);
    sync();
    fine.addEventListener("change", sync);
    reduced.addEventListener("change", sync);
    return () => {
      fine.removeEventListener("change", sync);
      reduced.removeEventListener("change", sync);
    };
  }, []);

  useEffect(() => {
    if (!enabled) return;
    document.body.classList.add("custom-cursor-active");

    const onMove = (e: MouseEvent) => {
      x.set(e.clientX);
      y.set(e.clientY);
    };

    const onOver = (e: MouseEvent) => {
      const t = e.target as HTMLElement | null;
      if (!t) {
        setHovering(false);
        return;
      }
      setHovering(!!t.closest("a, button, [role='button'], input, textarea, select, summary, label"));
    };

    window.addEventListener("mousemove", onMove);
    window.addEventListener("mouseover", onOver);

    return () => {
      document.body.classList.remove("custom-cursor-active");
      window.removeEventListener("mousemove", onMove);
      window.removeEventListener("mouseover", onOver);
    };
  }, [enabled, x, y]);

  if (!enabled) return null;

  return (
    <motion.div
      className="pointer-events-none fixed left-0 top-0 z-[9999] h-9 w-9 -translate-x-1/2 -translate-y-1/2 rounded-full border-2 border-accent bg-accent/10 backdrop-blur-[2px] will-change-transform"
      style={{ left: sx, top: sy }}
      animate={{ scale: hovering ? 1.45 : 1 }}
      transition={{ type: "spring", stiffness: 400, damping: 28 }}
      aria-hidden
    />
  );
}
