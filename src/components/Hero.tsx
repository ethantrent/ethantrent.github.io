"use client";

import Link from "next/link";
import { motion, useReducedMotion } from "framer-motion";
import { ChevronDown, FileDown } from "lucide-react";
import { FaGithub, FaLinkedin } from "react-icons/fa";
import { FaXTwitter } from "react-icons/fa6";
import { siteConfig } from "@/data/site";
import { buttonPrimary, buttonSecondary } from "@/lib/ui";

/**
 * First viewport: one composition — brand, value headline, one supporting line,
 * Contact + Resume CTAs, and atmosphere-only bleed (ink depth + grid + soft wash).
 * Email / socials sit in a quiet secondary row so hire actions stay primary.
 */
export function Hero() {
  const reduceMotion = useReducedMotion();
  const fade = (delay: number) =>
    reduceMotion
      ? {}
      : {
          initial: { opacity: 0, y: 10 },
          animate: { opacity: 1, y: 0 },
          transition: { duration: 0.4, delay, ease: "easeOut" as const },
        };

  return (
    <section
      className="hero-atmosphere relative isolate overflow-hidden"
      aria-labelledby="hero-heading"
    >
      <div className="hero-grid pointer-events-none absolute inset-0" aria-hidden />
      <div className="hero-bleed pointer-events-none absolute inset-0" aria-hidden />

      <div className="relative mx-auto flex min-h-[min(100svh,52rem)] w-full max-w-6xl flex-col justify-between px-4 pt-24 pb-10 md:pt-28 md:pb-14">
        <div className="max-w-xl pt-2 lg:max-w-2xl md:pt-8">
          <motion.p
            className="text-[13px] font-medium tracking-[0.03em] text-muted"
            {...fade(0.02)}
          >
            {siteConfig.hero.label}
          </motion.p>

          <motion.h1
            id="hero-heading"
            className="font-display mt-4 text-5xl font-semibold leading-[1.02] tracking-[-0.035em] text-fg sm:text-6xl lg:text-7xl"
            {...fade(0.06)}
          >
            {siteConfig.name}
          </motion.h1>

          <motion.p
            className="font-display mt-7 max-w-xl text-balance text-xl font-semibold leading-snug tracking-[-0.02em] text-fg-muted sm:text-2xl lg:text-[1.8rem]"
            {...fade(0.11)}
          >
            {siteConfig.hero.headlineLines.join(" ")}
          </motion.p>

          <motion.p
            className="mt-5 max-w-lg text-pretty text-base leading-relaxed text-muted sm:text-[1.05rem]"
            {...fade(0.15)}
          >
            {siteConfig.hero.positioning}
          </motion.p>

          <motion.p
            className="mt-6 inline-flex items-center gap-2 text-[13px] font-medium text-fg-muted"
            {...fade(0.18)}
          >
            <span
              className="inline-flex h-2 w-2 shrink-0 rounded-full bg-available"
              aria-hidden
            />
            {siteConfig.hero.availability}
          </motion.p>

          <motion.div className="mt-8 flex flex-wrap items-center gap-3" {...fade(0.22)}>
            <Link href={siteConfig.hero.primaryCta.href} className={buttonPrimary}>
              {siteConfig.hero.primaryCta.label}
              <span aria-hidden>→</span>
            </Link>
            <Link href={siteConfig.resumePath} download className={buttonSecondary}>
              <FileDown className="h-4 w-4" aria-hidden />
              {siteConfig.hero.secondaryCtaLabel}
            </Link>
          </motion.div>
        </div>

        <motion.div
          className="mt-auto flex flex-col gap-6 pt-16 sm:flex-row sm:items-end sm:justify-between"
          {...fade(0.28)}
        >
          <a
            href="#impact"
            className="inline-flex min-h-11 cursor-pointer items-center gap-1.5 text-[13px] font-medium text-muted transition duration-200 hover:text-fg"
          >
            Scroll for impact
            <ChevronDown className="h-4 w-4" aria-hidden />
          </a>

          <div className="flex flex-wrap items-center gap-x-4 gap-y-2" aria-label="Social links">
            <a
              href={`mailto:${siteConfig.email}`}
              className="cursor-pointer text-sm text-muted transition duration-200 hover:text-fg"
            >
              {siteConfig.email}
            </a>
            <span className="hidden h-3 w-px bg-hairline sm:inline-block" aria-hidden />
            <div className="flex items-center gap-1">
              {[
                { href: siteConfig.social.linkedin, label: "LinkedIn", Icon: FaLinkedin },
                { href: siteConfig.social.github, label: "GitHub", Icon: FaGithub },
                { href: siteConfig.social.twitter, label: "X", Icon: FaXTwitter },
              ]
                .filter((item) => Boolean(item.href))
                .map(({ href, label, Icon }) => (
                  <a
                    key={label}
                    href={href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex h-11 w-11 cursor-pointer items-center justify-center rounded-lg text-muted transition duration-200 hover:bg-surface-2 hover:text-fg"
                    aria-label={label}
                  >
                    <Icon className="h-4 w-4" aria-hidden />
                  </a>
                ))}
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
