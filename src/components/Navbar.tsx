"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import {
  BookOpen,
  Briefcase,
  Clock3,
  FileDown,
  House,
  Layers,
  Mail,
  Menu,
  UserRound,
  X,
} from "lucide-react";
import type { LucideIcon } from "lucide-react";
import { siteConfig } from "@/data/site";
import { cn } from "@/lib/utils";

const NAV: { href: string; label: string; icon: LucideIcon }[] = [
  { href: "/", label: "Home", icon: House },
  { href: "/about/", label: "About", icon: UserRound },
  { href: "/experience/", label: "Experience", icon: Clock3 },
  { href: "/projects/", label: "Case Studies", icon: Briefcase },
  { href: "/skills/", label: "Skills", icon: Layers },
  { href: "/writing/", label: "Writing", icon: BookOpen },
];

/**
 * 56px sticky bar: wordmark left, links center, Resume + Contact right.
 */
export function Navbar() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);

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
      <header className="sticky top-0 z-50 h-14 border-b border-hairline bg-bg/90 backdrop-blur">
        <div className="mx-auto flex h-full max-w-6xl items-center justify-between gap-4 px-4">
          <Link
            href="/"
            className="font-display text-[15px] font-semibold tracking-tight text-fg transition hover:text-fg-muted"
          >
            {siteConfig.name}
          </Link>

          <nav aria-label="Primary" className="hidden items-center gap-1 md:flex">
            {NAV.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className={cn(
                  "rounded-md px-3 py-1.5 text-sm font-medium text-muted transition hover:text-fg",
                  isActive(item.href) && "bg-surface-2 text-fg",
                )}
                aria-current={isActive(item.href) ? "page" : undefined}
              >
                {item.label}
              </Link>
            ))}
          </nav>

          <div className="flex items-center gap-2">
            <Link
              href={siteConfig.resumePath}
              download
              className="hidden min-h-9 items-center gap-1.5 rounded-lg px-3 py-1.5 text-sm font-medium text-muted transition hover:text-fg md:inline-flex"
            >
              <FileDown className="h-4 w-4 shrink-0" aria-hidden />
              Resume
            </Link>
            <Link
              href="/contact/"
              className={cn(
                "hidden min-h-9 items-center gap-2 rounded-lg bg-accent px-3.5 py-1.5 text-sm font-medium text-white transition hover:bg-accent/85 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent md:inline-flex",
              )}
              aria-current={pathname.startsWith("/contact") ? "page" : undefined}
            >
              <Mail className="h-4 w-4 shrink-0" aria-hidden />
              Contact
            </Link>

            <button
              type="button"
              className="flex h-11 w-11 items-center justify-center rounded-lg border border-hairline bg-surface text-fg md:hidden"
              onClick={() => setOpen(true)}
              aria-expanded={open}
              aria-controls="mobile-nav"
              aria-label="Open menu"
            >
              <Menu className="h-5 w-5" aria-hidden />
            </button>
          </div>
        </div>
      </header>

      <AnimatePresence>
        {open && (
          <>
            <motion.button
              type="button"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 z-50 bg-black/60 md:hidden"
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
              className="fixed inset-y-0 right-0 z-50 flex w-[min(100%,320px)] flex-col border-l border-hairline bg-surface p-6 md:hidden"
            >
              <div className="mb-6 flex items-center justify-between">
                <span className="font-display text-lg font-semibold text-fg">Menu</span>
                <button
                  type="button"
                  className="flex h-11 w-11 items-center justify-center rounded-lg border border-hairline bg-surface-2 text-fg"
                  onClick={() => setOpen(false)}
                  aria-label="Close menu"
                >
                  <X className="h-5 w-5" aria-hidden />
                </button>
              </div>

              <div className="mb-4 flex flex-col gap-2">
                <Link
                  href="/contact/"
                  onClick={() => setOpen(false)}
                  className="inline-flex min-h-11 items-center justify-center gap-2 rounded-lg bg-accent px-4 text-sm font-medium text-white transition hover:bg-accent/85"
                >
                  <Mail className="h-5 w-5" aria-hidden />
                  Contact
                </Link>
                <Link
                  href={siteConfig.resumePath}
                  download
                  onClick={() => setOpen(false)}
                  className="inline-flex min-h-11 items-center justify-center gap-2 rounded-lg border border-hairline bg-surface-2 px-4 text-sm font-medium text-fg transition hover:border-hairline-strong"
                >
                  <FileDown className="h-5 w-5" aria-hidden />
                  Resume
                </Link>
              </div>

              <nav className="flex flex-col gap-1" aria-label="Mobile primary">
                {NAV.map((item) => {
                  const Icon = item.icon;
                  return (
                    <Link
                      key={item.href}
                      href={item.href}
                      onClick={() => setOpen(false)}
                      className={cn(
                        "flex min-h-11 items-center gap-3 rounded-lg px-4 py-3 text-base font-medium text-fg-muted transition hover:bg-surface-2 hover:text-fg",
                        isActive(item.href) && "bg-surface-3 text-fg",
                      )}
                      aria-current={isActive(item.href) ? "page" : undefined}
                    >
                      <Icon className="h-5 w-5 shrink-0 text-muted" aria-hidden />
                      {item.label}
                    </Link>
                  );
                })}
              </nav>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
}
