"use client";
import Link from "next/link";
import { siteConfig } from "@/data/site";
import { openAskEthan } from "@/lib/askEthan";
export function Footer() {
  return (
    <footer className="border-t border-hairline py-8">
      <div className="shell">
        <div className="flex flex-col justify-between gap-8 md:flex-row">
          <div>
            <Link href="/" className="text-base font-medium">
              Ethan Trent
            </Link>
            <p className="mt-2 text-sm text-muted">
              AI product, developer tools, and technical teaching.
            </p>
            <p className="mt-2 text-xs text-muted">Dallas, Texas</p>
          </div>
          <nav
            aria-label="Footer"
            className="flex flex-wrap gap-x-6 gap-y-1 text-sm"
          >
            <Link className="text-link" href="/experience/">
              Experience
            </Link>
            <Link className="text-link" href="/skills/">
              Capabilities
            </Link>
            <a className="text-link" href={siteConfig.social.linkedin}>
              LinkedIn
            </a>
            <a className="text-link" href={siteConfig.social.github}>
              GitHub
            </a>
          </nav>
        </div>
        <div className="mt-8 flex flex-wrap items-center justify-between gap-x-7 gap-y-1 border-t border-hairline pt-5 text-xs text-muted">
          <span>
            © {new Date().getFullYear()} Ethan Trent · Updated{" "}
            {siteConfig.lastUpdated}
          </span>
          <div className="flex flex-wrap items-center gap-x-6">
            <Link
              href={siteConfig.resumePath}
              download
              className="inline-flex min-h-11 items-center underline underline-offset-4"
            >
              {siteConfig.resumeLabel}
            </Link>
            <button
              onClick={() => openAskEthan()}
              className="min-h-11 underline underline-offset-4"
            >
              Ask Ethan · AI assistant
            </button>
            <Link
              className="inline-flex min-h-11 items-center"
              href="/privacy/"
            >
              Privacy
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
