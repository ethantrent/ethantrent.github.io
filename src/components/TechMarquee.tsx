"use client";

import Marquee from "react-fast-marquee";
import { useReducedMotion } from "framer-motion";
import { siteConfig } from "@/data/site";
import { MARQUEE_TECH, TECH_ICON_MAP } from "@/lib/tech-icons";
import { Code2 } from "lucide-react";

function TechPill({ label, iconKey }: { label: string; iconKey: string }) {
  const Icon = TECH_ICON_MAP[iconKey] ?? Code2;
  return (
    <span className="mx-3 inline-flex items-center gap-2 rounded-full border border-fg/15 bg-surface/90 px-5 py-2.5 text-sm font-semibold text-fg shadow-sm backdrop-blur">
      <Icon className="h-5 w-5 shrink-0 text-accent" aria-hidden />
      {label}
    </span>
  );
}

function Row({ reverse }: { reverse?: boolean }) {
  const doubled = [...MARQUEE_TECH, ...MARQUEE_TECH];
  return (
    <Marquee
      direction={reverse ? "right" : "left"}
      speed={32}
      gradient
      gradientColor="var(--bg)"
      gradientWidth={80}
      className="py-2"
    >
      {doubled.map((item, i) => (
        <TechPill key={`${item.key}-${i}`} label={item.label} iconKey={item.key} />
      ))}
    </Marquee>
  );
}

/**
 * Infinite skills strip (icons + labels); static row when `prefers-reduced-motion`.
 */
export function TechMarquee() {
  const reduceMotion = useReducedMotion();
  const t = siteConfig.techMarquee;

  return (
    <section className="border-y border-fg/10 bg-surface/25 py-14 backdrop-blur-sm" aria-label="Skills">
      <div className="mx-auto max-w-6xl px-4 text-center">
        <p className="text-sm font-semibold uppercase tracking-[0.25em] text-accent">My skills</p>
        <p className="mx-auto mt-3 max-w-2xl text-pretty text-sm text-muted sm:text-base">
          {t.introBefore}
          <span className="font-semibold text-keyword-orange">{t.introHighlight1}</span>
          {t.introMiddle}
          <span className="font-semibold text-keyword-teal">{t.introHighlight2}</span>
          {t.introAfter}
        </p>
      </div>
      <div className="mt-8 overflow-hidden">
        {reduceMotion ? (
          <div className="flex flex-wrap justify-center gap-3 px-4">
            {MARQUEE_TECH.map((item) => (
              <TechPill key={item.key} label={item.label} iconKey={item.key} />
            ))}
          </div>
        ) : (
          <div className="flex flex-col gap-4">
            <Row />
            <Row reverse />
          </div>
        )}
      </div>
    </section>
  );
}
