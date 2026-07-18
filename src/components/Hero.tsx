"use client";

import Link from "next/link";
import { motion, useReducedMotion } from "framer-motion";
import { ChevronDown, FileDown, Mail } from "lucide-react";
import { FaGithub, FaLinkedin } from "react-icons/fa";
import { FaXTwitter } from "react-icons/fa6";
import { ProfileAvatar } from "@/components/ProfileAvatar";
import { siteConfig } from "@/data/site";
import { buttonPrimary, buttonSecondary } from "@/lib/ui";

const CREDENTIAL_LINE =
  "Digital Product Manager · Charles Schwab · AI Fellow · Cornell Tech";

/**
 * Hero: sentence-case display headline, credential line, availability + dual CTAs first,
 * then email/socials. Hire actions stay in the first mobile viewport.
 */
export function Hero() {
  const reduceMotion = useReducedMotion();

  return (
    <section
      className="relative isolate px-4 pt-24 pb-10 md:pt-28 md:pb-14"
      aria-labelledby="hero-heading"
    >
      <div className="relative mx-auto w-full max-w-6xl">
        <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
          <div className="flex flex-wrap items-center gap-3">
            <ProfileAvatar
              size={48}
              priority
              className="h-12 w-12 rounded-full border border-hairline-strong object-cover"
            />
            <span className="inline-flex items-center rounded-lg border border-hairline bg-surface px-3.5 py-2 text-sm font-medium text-fg">
              Hey, I&apos;m {siteConfig.name}
            </span>
          </div>
          <p className="text-[13px] font-medium tracking-[0.03em] text-muted sm:max-w-[14rem] sm:text-right">
            {siteConfig.location}
          </p>
        </div>

        <motion.p
          className="mt-10 text-[13px] font-medium tracking-[0.03em] text-muted sm:mt-12 md:mt-14"
          initial={reduceMotion ? false : { opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, delay: 0.02 }}
        >
          {siteConfig.hero.label}
        </motion.p>

        <motion.h1
          id="hero-heading"
          className="font-display mt-4 max-w-3xl text-balance text-4xl font-semibold leading-[1.1] tracking-[-0.03em] text-fg sm:text-5xl lg:text-6xl"
          initial={reduceMotion ? false : { opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.45, delay: 0.05 }}
        >
          {siteConfig.hero.headlineLines.join(" ")}
        </motion.h1>

        <motion.p
          className="mt-6 max-w-2xl text-pretty text-base leading-relaxed text-muted sm:text-lg"
          initial={reduceMotion ? false : { opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, delay: 0.1 }}
        >
          {siteConfig.hero.positioning}
        </motion.p>

        <motion.p
          className="mt-5 text-base font-medium text-fg-muted sm:text-lg"
          initial={reduceMotion ? false : { opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, delay: 0.12 }}
        >
          {CREDENTIAL_LINE}
        </motion.p>

        <motion.div
          className="mt-8 flex flex-wrap items-center gap-4"
          initial={reduceMotion ? false : { opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, delay: 0.16 }}
        >
          <span className="inline-flex items-center gap-2 rounded-lg border border-hairline bg-surface px-3.5 py-2 text-[13px] font-medium text-fg-muted">
            <span className="inline-flex h-2 w-2 rounded-full bg-available" aria-hidden />
            {siteConfig.hero.availability}
          </span>
        </motion.div>

        <motion.div
          className="mt-5 flex flex-wrap items-center gap-3"
          initial={reduceMotion ? false : { opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, delay: 0.2 }}
        >
          <Link href={siteConfig.hero.primaryCta.href} className={buttonPrimary}>
            {siteConfig.hero.primaryCta.label}
            <span aria-hidden>→</span>
          </Link>
          <Link href={siteConfig.resumePath} download className={buttonSecondary}>
            <FileDown className="h-4 w-4" aria-hidden />
            {siteConfig.hero.secondaryCtaLabel}
          </Link>
        </motion.div>

        <motion.div
          className="mt-8"
          initial={reduceMotion ? false : { opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, delay: 0.24 }}
        >
          <a
            href={`mailto:${siteConfig.email}`}
            className="inline-flex items-center gap-2 text-sm font-medium text-muted transition hover:text-fg"
          >
            <Mail className="h-4 w-4" aria-hidden />
            {siteConfig.email}
          </a>
        </motion.div>

        <motion.div
          className="mt-4 flex flex-wrap items-center gap-2"
          initial={reduceMotion ? false : { opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, delay: 0.26 }}
          aria-label="Social links"
        >
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
                className="flex h-11 w-11 items-center justify-center rounded-lg border border-hairline bg-surface text-fg-muted transition hover:border-hairline-strong hover:text-fg"
                aria-label={label}
              >
                <Icon className="h-4 w-4" aria-hidden />
              </a>
            ))}
        </motion.div>

        <motion.a
          href="#impact"
          className="mt-8 inline-flex items-center gap-1.5 text-[13px] font-medium text-muted transition hover:text-fg"
          initial={reduceMotion ? false : { opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.4, delay: 0.3 }}
        >
          Scroll for impact
          <ChevronDown
            className={reduceMotion ? "h-4 w-4" : "h-4 w-4 animate-bounce"}
            aria-hidden
          />
        </motion.a>
      </div>
    </section>
  );
}
