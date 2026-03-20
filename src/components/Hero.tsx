"use client";

import Image from "next/image";
import Link from "next/link";
import { motion, useReducedMotion } from "framer-motion";
import { ChevronDown, FileDown, Mail } from "lucide-react";
import { FaGithub, FaLinkedin } from "react-icons/fa";
import { FaXTwitter } from "react-icons/fa6";
import { useEffect, useState } from "react";
import { ParticleBackground } from "@/components/ParticleBackground";
import { siteConfig } from "@/data/site";
import { publicPath } from "@/lib/publicPath";
import { cn } from "@/lib/utils";

const ROLES = [
  "Incoming PM Intern · Schwab Conversational AI",
  "AI Fellow · Cornell Tech × Break Through Tech",
  "CS @ BYU–Idaho · Cloud, agents, and RAG at scale",
] as const;

/**
 * Hero: split headline, avatar + intro, rotating role line, socials, CTAs.
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

  return (
    <section
      className="relative isolate flex min-h-[calc(90vh-4rem)] flex-col overflow-hidden px-4 pt-28 pb-0 md:pt-32"
      aria-labelledby="hero-heading"
    >
      <div className="absolute inset-0 -z-10 bg-gradient-to-b from-accent/5 via-transparent to-transparent dark:from-accent/10" />
      <ParticleBackground />

      <div className="relative mx-auto flex w-full max-w-6xl flex-1 flex-col justify-center pb-6">
        {/* Top row: intro + location */}
        <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
          <div className="flex flex-wrap items-center gap-3">
            <div className="relative">
              <div
                className="absolute -inset-1 rounded-full bg-gradient-to-tr from-accent/50 to-accent-violet/40 blur-md"
                aria-hidden
              />
              <Image
                src={publicPath("/avatar-placeholder.svg")}
                alt="Ethan Trent"
                width={56}
                height={56}
                className="relative rounded-full border-2 border-accent/60 object-cover"
                priority
              />
            </div>
            <div className="relative">
              <span
                className="inline-flex items-center rounded-full border border-fg/15 bg-surface/90 px-4 py-2 text-sm font-semibold text-fg shadow-sm backdrop-blur"
                style={{
                  clipPath: "none",
                }}
              >
                Hey, I&apos;m {siteConfig.name}
              </span>
              <span
                className="absolute -bottom-1 left-4 h-2 w-2 rotate-45 border-b border-r border-fg/15 bg-surface/90"
                aria-hidden
              />
            </div>
          </div>
          <p className="font-mono text-[11px] uppercase tracking-widest text-muted sm:max-w-[14rem] sm:text-right">
            <span aria-hidden>{"// "}</span>
            {siteConfig.location}
          </p>
        </div>

        <p className="mt-6 max-w-[12rem] font-mono text-[11px] leading-relaxed tracking-wide text-muted md:absolute md:left-0 md:top-[38%] md:mt-0 md:-translate-y-1/2">
          {siteConfig.hero.roleCaption}
        </p>

        <div className="relative mt-10 md:mt-14">
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
        </div>

        <motion.p
          className="mt-6 min-h-[2.5rem] text-xl font-medium text-fg/90 sm:text-2xl"
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
          className="mt-4 max-w-xl text-pretty text-base leading-relaxed text-muted sm:text-lg"
          initial={reduceMotion ? false : { opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.18 }}
        >
          I bridge product ownership, cloud delivery, and applied AI — from AWS migrations and internal agent
          programs to a RAG campus assistant for 20,000+ students.
        </motion.p>

        <motion.div
          className="mt-4 flex flex-wrap items-center gap-x-4 gap-y-2 text-sm text-fg/90"
          initial={reduceMotion ? false : { opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.45, delay: 0.2 }}
        >
          <a
            href={`mailto:${siteConfig.email}`}
            className="inline-flex items-center gap-2 rounded-full border border-fg/10 bg-surface/60 px-3 py-1.5 font-medium transition hover:border-accent/40 hover:text-accent"
          >
            <Mail className="h-4 w-4 text-accent" aria-hidden />
            {siteConfig.email}
          </a>
        </motion.div>

        <motion.div
          className="mt-6 flex flex-wrap items-center gap-3"
          initial={reduceMotion ? false : { opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.22 }}
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
          className="mt-10 flex flex-wrap gap-4"
          initial={reduceMotion ? false : { opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.24 }}
        >
          <a
            href="#projects"
            className="inline-flex items-center justify-center rounded-full bg-accent px-6 py-3 text-sm font-semibold text-white shadow-lg shadow-accent/30 transition hover:bg-accent/90 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent-violet"
          >
            View my work
          </a>
          <Link
            href={siteConfig.resumePath}
            className="inline-flex items-center justify-center rounded-full border border-fg/15 bg-surface/60 px-6 py-3 text-sm font-semibold text-fg backdrop-blur transition hover:border-accent/40 hover:text-accent focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent"
            download
          >
            Download resume
          </Link>
        </motion.div>
      </div>

      <motion.a
        href="#projects"
        className="mx-auto mt-auto flex flex-col items-center gap-1 pb-6 pt-4 text-xs font-medium text-muted"
        initial={reduceMotion ? false : { opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.5 }}
        aria-label="Scroll to projects"
      >
        <span className="uppercase tracking-widest">Scroll</span>
        <ChevronDown className="h-5 w-5 animate-bounce text-accent" aria-hidden />
      </motion.a>
    </section>
  );
}
