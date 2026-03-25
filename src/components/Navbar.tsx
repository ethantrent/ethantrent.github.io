"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import {
  BookOpen,
  Briefcase,
  Clock3,
  House,
  Layers,
  Mail,
  Menu,
  UserRound,
  X,
} from "lucide-react";
import type { LucideIcon } from "lucide-react";
import { cn } from "@/lib/utils";
import { ThemeToggle } from "@/components/ThemeToggle";

const NAV: { href: string; label: string; icon: LucideIcon }[] = [
  { href: "/", label: "Home", icon: House },
  { href: "/about/", label: "About", icon: UserRound },
  { href: "/experience/", label: "Experience", icon: Clock3 },
  { href: "/projects/", label: "Projects", icon: Briefcase },
  { href: "/skills/", label: "Skills", icon: Layers },
  { href: "/writing/", label: "Writing", icon: BookOpen },
];

/**
 * Floating pill navigation with Lucide icons + isolated Contact CTA.
 */
export function Navbar() {
  const pathname = usePathname();
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setOpen(false);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open]);

  const isActive = (href: string) => {
    if (href === "/") return pathname === "/" || pathname === "";
    const base = href.replace(/\/$/, "");
    return pathname === href || pathname === `${base}/` || pathname.startsWith(`${base}/`);
  };

  return (
    <>
      <motion.header
        initial={{ opacity: 0, y: -8 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.35, delay: 0.1 }}
        className="pointer-events-none fixed inset-x-0 top-0 z-50 flex justify-center px-4 pt-4 md:pt-6"
      >
        <div className="pointer-events-auto flex w-full max-w-6xl items-start justify-between gap-3">
          <div
            className={cn(
              "flex flex-1 items-center justify-center md:flex-none md:justify-start",
              "md:absolute md:left-1/2 md:top-4 md:-translate-x-1/2 md:pt-0",
            )}
          >
            <nav
              aria-label="Primary"
              className={cn(
                "hidden items-center gap-1 rounded-full border border-fg/10 bg-surface/70 px-2 py-2 shadow-lg backdrop-blur-md md:flex",
                scrolled && "bg-surface/90",
              )}
            >
              {NAV.map((item) => {
                const Icon = item.icon;
                return (
                  <Link
                    key={item.href}
                    href={item.href}
                    className={cn(
                      "flex items-center gap-2 rounded-full px-3 py-2 text-sm font-medium text-fg/80 transition hover:text-accent md:px-4",
                      isActive(item.href) && "bg-fg/10 text-fg",
                    )}
                    aria-current={isActive(item.href) ? "page" : undefined}
                  >
                    <Icon className="h-4 w-4 shrink-0 opacity-80" aria-hidden />
                    {item.label}
                  </Link>
                );
              })}
            </nav>

            <button
              type="button"
              className="pointer-events-auto flex h-11 w-11 items-center justify-center rounded-full border border-fg/10 bg-surface/80 text-fg shadow-md backdrop-blur-md md:hidden"
              onClick={() => setOpen(true)}
              aria-expanded={open}
              aria-controls="mobile-nav"
              aria-label="Open menu"
            >
              <Menu className="h-5 w-5" aria-hidden />
            </button>
          </div>

          <div className="pointer-events-auto flex items-center gap-2 md:absolute md:right-4 md:top-4">
            <ThemeToggle />
            <Link
              href="/contact/"
              className={cn(
                "inline-flex items-center gap-2 rounded-full bg-accent px-5 py-2.5 text-sm font-semibold text-white shadow-lg shadow-accent/25 transition hover:bg-accent/90 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent-violet",
                pathname.startsWith("/contact") && "ring-2 ring-accent-violet/60",
              )}
              aria-current={pathname.startsWith("/contact") ? "page" : undefined}
            >
              <Mail className="h-4 w-4 shrink-0" aria-hidden />
              Contact
            </Link>
          </div>
        </div>
      </motion.header>

      <AnimatePresence>
        {open && (
          <>
            <motion.button
              type="button"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 z-50 bg-black/50 md:hidden"
              aria-label="Close menu overlay"
              onClick={() => setOpen(false)}
            />
            <motion.div
              id="mobile-nav"
              role="dialog"
              aria-modal="true"
              aria-label="Mobile navigation"
              initial={{ x: "100%" }}
              animate={{ x: 0 }}
              exit={{ x: "100%" }}
              transition={{ type: "spring", stiffness: 320, damping: 32 }}
              className="fixed inset-y-0 right-0 z-50 flex w-[min(100%,320px)] flex-col border-l border-fg/10 bg-surface p-6 shadow-2xl md:hidden"
            >
              <div className="mb-8 flex items-center justify-between">
                <span className="font-display text-lg font-semibold">Menu</span>
                <button
                  type="button"
                  className="rounded-full border border-fg/10 p-2"
                  onClick={() => setOpen(false)}
                  aria-label="Close menu"
                >
                  <X className="h-5 w-5" aria-hidden />
                </button>
              </div>
              <nav className="flex flex-col gap-2" aria-label="Mobile primary">
                {NAV.map((item) => {
                  const Icon = item.icon;
                  return (
                    <Link
                      key={item.href}
                      href={item.href}
                      onClick={() => setOpen(false)}
                      className={cn(
                        "flex items-center gap-3 rounded-xl px-4 py-3 text-base font-medium text-fg/90 hover:bg-fg/5",
                        isActive(item.href) && "bg-accent/15 text-accent",
                      )}
                      aria-current={isActive(item.href) ? "page" : undefined}
                    >
                      <Icon className="h-5 w-5 shrink-0" aria-hidden />
                      {item.label}
                    </Link>
                  );
                })}
                <Link
                  href="/contact/"
                  onClick={() => setOpen(false)}
                  className="mt-4 inline-flex items-center justify-center gap-2 rounded-xl bg-accent px-4 py-3 text-center font-semibold text-white"
                >
                  <Mail className="h-5 w-5" aria-hidden />
                  Contact
                </Link>
              </nav>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
}
