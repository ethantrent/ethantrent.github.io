"use client";

import { motion, useReducedMotion } from "framer-motion";
import { Code2 } from "lucide-react";
import { toolkitCards } from "@/data/toolkit";
import { siteConfig } from "@/data/site";
import { TECH_ICON_MAP } from "@/lib/tech-icons";
import { cn } from "@/lib/utils";

/**
 * Large split cards with gradients + stacked logos (Sugith-style tools screen, DOM edition).
 */
export function ToolkitSection() {
  const reduceMotion = useReducedMotion();

  return (
    <div className="space-y-10">
      <header className="max-w-3xl">
        <p className="text-sm font-semibold uppercase tracking-widest text-accent">My toolkit</p>
        <h1 className="font-display mt-3 text-4xl font-bold text-fg md:text-5xl">How I actually work</h1>
        <p className="mt-4 text-pretty text-muted">{siteConfig.pageIntros.toolkit}</p>
      </header>

      <ul className="grid gap-8 md:grid-cols-2">
        {toolkitCards.map((card, i) => (
          <motion.li
            key={card.id}
            initial={reduceMotion ? false : { opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-40px" }}
            transition={{ delay: i * 0.05, duration: 0.45 }}
            className="overflow-hidden rounded-2xl border border-fg/10 bg-surface/80 shadow-lg backdrop-blur-sm"
          >
            <div
              className={cn(
                "relative flex min-h-[140px] items-center justify-center gap-4 bg-gradient-to-br px-6 py-10",
                card.panelClass,
              )}
            >
              <div className="flex flex-wrap items-center justify-center gap-3">
                {card.iconKeys.map((key) => {
                  const Icon = TECH_ICON_MAP[key] ?? Code2;
                  return (
                    <span
                      key={key}
                      className="flex h-14 w-14 items-center justify-center rounded-2xl border border-white/20 bg-black/25 text-white shadow-inner backdrop-blur-sm"
                    >
                      <Icon className="h-7 w-7" aria-hidden />
                    </span>
                  );
                })}
              </div>
            </div>
            <div className="p-6">
              <h2 className="font-display text-xl font-bold text-fg">{card.title}</h2>
              <p className="mt-3 text-sm leading-relaxed text-muted">{card.blurb}</p>
            </div>
          </motion.li>
        ))}
      </ul>
    </div>
  );
}
