"use client";

import Link from "next/link";
import { useReducedMotion } from "framer-motion";
import { siteConfig } from "@/data/site";
import { MARQUEE_TECH, TECH_ICON_MAP } from "@/lib/tech-icons";
import { cn } from "@/lib/utils";
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

/** Two equal-width bands so translateX(-50%) loops; second band hidden from SR (duplicate). */
function Row({ reverse }: { reverse?: boolean }) {
  const band = (suffix: string, hidden: boolean) => (
    <span className={cn("inline-flex shrink-0", hidden && "select-none")} aria-hidden={hidden || undefined}>
      {MARQUEE_TECH.map((item) => (
        <TechPill key={`${item.key}${suffix}`} label={item.label} iconKey={item.key} />
      ))}
    </span>
  );
  return (
    <div className="tech-marquee-row relative min-w-0 w-full overflow-x-hidden py-2">
      <div className={cn("tech-marquee-track", reverse && "tech-marquee-track--reverse")}>
        {band("", false)}
        {band("-loop", true)}
      </div>
    </div>
  );
}

/**
 * Infinite skills strip (icons + labels); static row when `prefers-reduced-motion`.
 * Links to full skills matrix for PM-framed depth.
 */
export function TechMarquee() {
  const reduceMotion = useReducedMotion();
  const t = siteConfig.techMarquee;

  return (
    <section className="border-y border-fg/10 bg-bg/30 py-12 backdrop-blur-sm dark:bg-surface/20" aria-label="Skills preview">
      <div className="mx-auto max-w-6xl px-4 text-center">
        <p className="text-sm font-semibold uppercase tracking-[0.25em] text-accent">Tools & domains</p>
        <p className="mx-auto mt-3 max-w-2xl text-pretty text-sm text-muted sm:text-base">
          {t.introBefore}
          <Link
            href="/skills/"
            className="font-semibold text-keyword-orange underline decoration-accent/40 underline-offset-2 transition hover:text-accent"
          >
            {t.introHighlight1}
          </Link>
          {t.introMiddle}
          <span className="font-semibold text-keyword-teal">{t.introHighlight2}</span>
          {t.introAfter}
        </p>
      </div>
      <div className="mt-8 min-w-0 overflow-x-hidden">
        {reduceMotion ? (
          <div className="flex flex-wrap justify-center gap-3 px-4">
            {MARQUEE_TECH.map((item) => (
              <TechPill key={item.key} label={item.label} iconKey={item.key} />
            ))}
          </div>
        ) : (
          <div className="flex min-w-0 w-full flex-col gap-4">
            <Row />
            <Row reverse />
          </div>
        )}
      </div>
    </section>
  );
}
