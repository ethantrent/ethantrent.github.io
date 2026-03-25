"use client";

import Link from "next/link";
import { motion, useReducedMotion } from "framer-motion";
import { ChevronDown, FileDown, Mail } from "lucide-react";
import { FaGithub, FaLinkedin } from "react-icons/fa";
import { FaXTwitter } from "react-icons/fa6";
import { useEffect, useState } from "react";
import { ParticleBackground } from "@/components/ParticleBackground";
import { ProfileAvatar } from "@/components/ProfileAvatar";
import { siteConfig } from "@/data/site";
import { cn } from "@/lib/utils";

const ROLES = [
  "Digital Product Manager · Charles Schwab (Conversational AI)",
  "Cornell Tech AI Fellow · selected from 3,500+ applicants",
  "B.S. Computer Science · BYU–Idaho",
] as const;

/**
 * Hero: split headline, avatar + intro, rotating role line, socials, CTAs, scroll cue pinned to viewport floor.
 */
export function Hero() {
  const reduceMotion = useReducedMotion();
  const [roleIndex, setRoleIndex] = useState(0);

  useEffect(() => {
    if (reduceMotion) return;
    const id = window.setInterval(() => {
      setRoleIndex((i) => (i + 1) % ROLES.length);
    }, 3200);
    return () => window.clearInterval(id);
  }, [reduceMotion]);

  const currentRole = ROLES[roleIndex];
  const tags = siteConfig.heroFloatingTags;
  const avail = siteConfig.availability;

  return (
    <section
      className="relative isolate min-h-[calc(100dvh-4rem)] overflow-hidden px-4 pt-28 pb-24 md:pt-32 md:pb-28"
      aria-labelledby="hero-heading"
    >
      <div className="absolute inset-0 -z-20 bg-gradient-to-b from-accent/[0.03] via-transparent to-transparent dark:from-accent/[0.06]" />
      <ParticleBackground />

      <div className="relative mx-auto w-full max-w-6xl">
        {/* Top row: intro + location */}
        <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
          <div className="flex flex-wrap items-center gap-3">
            <div className="relative">
              <div
                className="absolute -inset-1 rounded-full bg-gradient-to-tr from-accent/50 to-accent-violet/40 blur-md"
                aria-hidden
              />
              <ProfileAvatar
                size={56}
                priority
                className="relative h-14 w-14 rounded-full border-2 border-accent/60 object-cover"
              />
            </div>
            <div className="relative flex flex-col gap-2 sm:flex-row sm:items-center">
              <span className="inline-flex items-center rounded-full border border-fg/15 bg-surface/90 px-4 py-2 text-sm font-semibold text-fg shadow-sm backdrop-blur">
                Hey, I&apos;m {siteConfig.name}
              </span>
              <span className="inline-flex items-center gap-2 rounded-full border border-available/40 bg-available/10 px-3 py-1 text-xs font-semibold text-available">
                <span className="relative flex h-2 w-2">
                  <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-available opacity-40" />
                  <span className="relative inline-flex h-2 w-2 rounded-full bg-available" />
                </span>
                {avail.label}
                <span className="font-normal text-muted">· {avail.detail}</span>
              </span>
              <span
                className="absolute -bottom-1 left-4 h-2 w-2 rotate-45 border-b border-r border-fg/15 bg-surface/90 sm:hidden"
                aria-hidden
              />
            </div>
          </div>
          <p className="font-mono text-[11px] uppercase tracking-widest text-muted sm:max-w-[14rem] sm:text-right">
            <span aria-hidden>{"// "}</span>
            {siteConfig.location}
          </p>
        </div>

        <p className="mt-4 max-w-3xl text-sm font-medium text-accent/90">{siteConfig.cornellBadge}</p>

        <div className="relative mt-8 md:mt-10">
          <motion.h1
            id="hero-heading"
            className="font-display relative z-0 max-w-4xl text-4xl font-bold leading-[1.08] tracking-tight sm:text-5xl lg:text-6xl xl:text-7xl"
            initial={reduceMotion ? false : { opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.55, delay: 0.05 }}
          >
            <span className="block text-accent">AI PRODUCT</span>
            <span className="block text-fg">MANAGER</span>
            <span className="block text-accent-cyan">& BUILDER.</span>
          </motion.h1>

          {!reduceMotion ? (
            <div className="pointer-events-none absolute -right-4 top-0 hidden select-none md:block lg:right-0" aria-hidden>
              {tags.map((tag, i) => (
                <motion.span
                  key={tag}
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: 0.35 + i * 0.08, duration: 0.4 }}
                  className={cn(
                    "absolute rounded-full border border-fg/15 bg-surface/80 px-3 py-1 text-xs font-semibold text-fg shadow-md backdrop-blur",
                    i === 0 && "-top-2 right-0 rotate-[-6deg]",
                    i === 1 && "top-16 right-8 rotate-[4deg]",
                    i === 2 && "top-32 right-2 rotate-[-3deg]",
                  )}
                >
                  {tag}
                </motion.span>
              ))}
            </div>
          ) : (
            <p className="mt-3 flex flex-wrap gap-2 text-xs font-semibold text-muted">
              {tags.map((tag) => (
                <span key={tag} className="rounded-full border border-fg/15 bg-surface/80 px-2 py-0.5">
                  {tag}
                </span>
              ))}
            </p>
          )}
        </div>

        <motion.p
          className="mt-6 min-h-[2.75rem] text-xl font-medium text-fg/90 sm:min-h-[3rem] sm:text-2xl"
          initial={reduceMotion ? false : { opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.12 }}
          aria-live="polite"
        >
          {reduceMotion ? (
            ROLES[0]
          ) : (
            <motion.span
              key={currentRole}
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.35 }}
            >
              {currentRole}
            </motion.span>
          )}
        </motion.p>

        <motion.p
          className="mt-3 max-w-3xl text-sm leading-relaxed text-muted sm:text-base"
          initial={reduceMotion ? false : { opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.45, delay: 0.14 }}
        >
          {siteConfig.heroCredibilityLine}
        </motion.p>

        <motion.div
          className="mt-5"
          initial={reduceMotion ? false : { opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.45, delay: 0.16 }}
        >
          <a
            href={`mailto:${siteConfig.email}`}
            className="inline-flex items-center gap-2 rounded-full border border-fg/10 bg-surface/50 px-3 py-1.5 text-xs font-medium text-muted transition hover:border-accent/35 hover:text-accent sm:text-sm"
          >
            <Mail className="h-3.5 w-3.5 text-accent sm:h-4 sm:w-4" aria-hidden />
            {siteConfig.email}
          </a>
        </motion.div>

        <motion.div
          className="mt-6 flex flex-wrap items-center gap-3"
          initial={reduceMotion ? false : { opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
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
                className={cn(
                  "flex h-11 w-11 items-center justify-center rounded-full border border-fg/15 bg-surface/70 text-fg transition hover:border-accent/50 hover:text-accent",
                )}
                aria-label={label}
              >
                <Icon className="h-4 w-4" aria-hidden />
              </a>
            ))}
          <Link
            href={siteConfig.resumePath}
            className="flex h-11 w-11 items-center justify-center rounded-full border border-fg/15 bg-surface/70 text-fg transition hover:border-accent/50 hover:text-accent"
            download
            aria-label="Download resume PDF"
          >
            <FileDown className="h-4 w-4" aria-hidden />
          </Link>
        </motion.div>

        <motion.div
          className="mt-8"
          initial={reduceMotion ? false : { opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.22 }}
        >
          <a
            href="#projects"
            className="inline-flex items-center justify-center rounded-full bg-accent px-6 py-3 text-sm font-semibold text-white shadow-lg shadow-accent/30 transition hover:bg-accent/90 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent-violet"
          >
            View my work
          </a>
        </motion.div>
      </div>

      <motion.a
        href="#projects"
        className="absolute bottom-5 left-1/2 flex -translate-x-1/2 flex-col items-center gap-1 text-xs font-medium text-muted"
        initial={reduceMotion ? false : { opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.45 }}
        aria-label="Scroll to projects"
      >
        <span className="uppercase tracking-widest">Scroll</span>
        <ChevronDown className="h-5 w-5 animate-bounce text-accent" aria-hidden />
      </motion.a>
    </section>
  );
}
