import Link from "next/link";
import { FileDown } from "lucide-react";
import { FaGithub, FaLinkedin } from "react-icons/fa";
import { FaXTwitter } from "react-icons/fa6";
import { siteConfig } from "@/data/site";

const EXPLORE = [
  ["/about/", "About"],
  ["/experience/", "Experience"],
  ["/projects/", "Case Studies"],
  ["/skills/", "Skills"],
  ["/writing/", "Writing"],
  ["/contact/", "Contact"],
] as const;

/**
 * Dense caption-size footer on canvas: tagline, link grid, socials, meta line.
 */
export function Footer() {
  const year = new Date().getFullYear();
  const ft = siteConfig.footerTagline;
  const followSocials = [
    { href: siteConfig.social.linkedin, label: "LinkedIn", Icon: FaLinkedin },
    { href: siteConfig.social.github, label: "GitHub", Icon: FaGithub },
    { href: siteConfig.social.twitter, label: "X", Icon: FaXTwitter },
  ].filter((item) => Boolean(item.href));

  return (
    <footer className="mt-auto border-t border-hairline bg-bg">
      <div className="mx-auto max-w-6xl px-4 py-12">
        <p className="max-w-2xl font-display text-xl font-semibold leading-snug tracking-tight text-fg sm:text-2xl">
          {ft.before}
          <span className="text-fg">{ft.highlight1}</span>
          {ft.middle}
          <span className="text-accent">{ft.highlight2}</span>
          {ft.after}
        </p>

        <div className="mt-10 grid gap-8 sm:grid-cols-2">
          <div>
            <h2 className="text-[13px] font-medium tracking-[0.03em] text-muted">Explore</h2>
            <ul className="mt-3 grid grid-cols-2 gap-x-8 gap-y-2 text-[13px]">
              {EXPLORE.map(([href, label]) => (
                <li key={href}>
                  <Link href={href} className="text-fg-muted transition hover:text-fg">
                    {label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h2 className="text-[13px] font-medium tracking-[0.03em] text-muted">Follow</h2>
            <ul className="mt-3 flex flex-wrap items-center gap-2">
              {followSocials.map(({ href, label, Icon }) => (
                <li key={label}>
                  <a
                    href={href}
                    className="flex h-9 w-9 items-center justify-center rounded-lg border border-hairline bg-surface text-fg-muted transition hover:border-hairline-strong hover:text-fg"
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={label}
                  >
                    <Icon className="h-4 w-4" aria-hidden />
                  </a>
                </li>
              ))}
              <li>
                <Link
                  href={siteConfig.resumePath}
                  className="flex h-9 w-9 items-center justify-center rounded-lg border border-hairline bg-surface text-fg-muted transition hover:border-hairline-strong hover:text-fg"
                  download
                  aria-label="Download resume PDF"
                >
                  <FileDown className="h-4 w-4" aria-hidden />
                </Link>
              </li>
            </ul>
          </div>
        </div>
      </div>

      <div className="border-t border-hairline px-4 py-5">
        <div className="mx-auto flex max-w-6xl flex-col items-center justify-between gap-3 text-xs text-muted sm:flex-row">
          <p>
            {siteConfig.name} © {year}
            <span className="mx-2 text-muted/50" aria-hidden>
              ·
            </span>
            {siteConfig.location}
            <span className="mx-2 text-muted/50" aria-hidden>
              ·
            </span>
            Last updated {siteConfig.lastUpdated}
          </p>
          <Link href="/privacy/" className="transition hover:text-fg">
            Privacy Policy
          </Link>
        </div>
      </div>
    </footer>
  );
}
