import Link from "next/link";
import { FileDown } from "lucide-react";
import { FaGithub, FaLinkedin } from "react-icons/fa";
import { FaXTwitter } from "react-icons/fa6";
import { siteConfig } from "@/data/site";
import { cn } from "@/lib/utils";

const EXPLORE = [
  ["/about", "About"],
  ["/experience", "Experience"],
  ["/projects", "Projects"],
  ["/skills", "Skills"],
  ["/contact", "Contact"],
] as const;

/**
 * Footer: tagline, explore links, socials + resume, watermark.
 */
export function Footer() {
  const year = new Date().getFullYear();
  const ft = siteConfig.footerTagline;
  const watermark = siteConfig.watermarkName || siteConfig.name;
  const followSocials = [
    { href: siteConfig.social.linkedin, label: "LinkedIn", Icon: FaLinkedin },
    { href: siteConfig.social.github, label: "GitHub", Icon: FaGithub },
    { href: siteConfig.social.twitter, label: "X", Icon: FaXTwitter },
  ].filter((item) => Boolean(item.href));

  return (
    <footer className="relative mt-auto overflow-hidden border-t border-fg/10 bg-surface/50 backdrop-blur-sm">
      <div className="relative z-10 mx-auto max-w-6xl px-4 py-14">
        <p className="max-w-xl font-display text-xl font-semibold leading-snug text-fg md:text-2xl">
          {ft.before}
          <span className="text-accent-violet">{ft.highlight1}</span>
          {ft.middle}
          <span className="text-accent">{ft.highlight2}</span>
          {ft.after}
        </p>

        <div className="mt-12 grid gap-10 sm:grid-cols-2 sm:gap-x-16">
          <div>
            <h2 className="font-display text-xs font-semibold uppercase tracking-widest text-muted">Explore</h2>
            <ul className="mt-4 space-y-2 text-sm">
              {EXPLORE.map(([href, label]) => (
                <li key={href}>
                  <Link href={href} className="text-fg/80 transition hover:text-accent">
                    {label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h2 className="font-display text-xs font-semibold uppercase tracking-widest text-muted">Follow me</h2>
            <ul className="mt-4 flex flex-wrap items-center gap-3">
              {followSocials.map(({ href, label, Icon }) => (
                <li key={label}>
                  <a
                    href={href}
                    className={cn(
                      "flex h-12 w-12 items-center justify-center rounded-full border bg-bg/40 transition",
                      label === "LinkedIn" &&
                        "border-[#0A66C2]/40 text-[#0A66C2] hover:border-[#0A66C2] hover:bg-[#0A66C2]/15",
                      label === "GitHub" &&
                        "border-fg/20 text-fg hover:border-fg/40 hover:bg-fg/10 dark:hover:bg-white/10",
                      label === "X" && "border-fg/15 text-fg hover:border-accent/50 hover:text-accent",
                    )}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={label}
                  >
                    <Icon className="h-5 w-5" aria-hidden />
                  </a>
                </li>
              ))}
              <li>
                <Link
                  href={siteConfig.resumePath}
                  className="flex h-12 w-12 items-center justify-center rounded-full border border-fg/15 bg-surface/70 text-fg transition hover:border-accent/50 hover:text-accent"
                  download
                  aria-label="Download resume PDF"
                >
                  <FileDown className="h-5 w-5" aria-hidden />
                </Link>
              </li>
            </ul>
          </div>
        </div>
      </div>

      <div
        className="pointer-events-none relative z-0 select-none border-t border-fg/5 py-6 text-center font-display font-bold uppercase leading-none text-fg/[0.07] dark:text-fg/[0.12]"
        style={{ fontSize: "clamp(3rem, 14vw, 7.5rem)" }}
        aria-hidden
      >
        {watermark}
      </div>

      <div className="relative z-10 border-t border-fg/10 bg-bg/40 px-4 py-5 dark:bg-black/30">
        <div className="mx-auto flex max-w-6xl flex-col items-center justify-between gap-3 text-xs text-muted sm:flex-row">
          <p>
            {siteConfig.name} © {year}
            <span className="mx-2 text-fg/20" aria-hidden>
              ·
            </span>
            {siteConfig.location}
          </p>
          <Link href="/privacy" className="transition hover:text-accent">
            Privacy Policy
          </Link>
        </div>
      </div>
    </footer>
  );
}
