import type { Metadata } from "next";
import Link from "next/link";
import { siteConfig } from "@/data/site";

export const metadata: Metadata = {
  title: "Privacy",
  description: siteConfig.seoPages.privacy,
  robots: { index: false, follow: false },
};

/**
 * Short honest policy for a static GitHub Pages portfolio + Formspree contact.
 */
export default function PrivacyPage() {
  return (
    <div className="mx-auto max-w-2xl px-4 py-24 md:py-28">
      <h1 className="font-display text-4xl font-semibold tracking-tight text-fg">Privacy</h1>
      <p className="mt-6 text-sm leading-relaxed text-muted">
        This site is a static portfolio hosted on GitHub Pages. It does not run first-party analytics, advertising
        pixels, or account systems.
      </p>
      <h2 className="font-display mt-10 text-lg font-semibold text-fg">Contact form</h2>
      <p className="mt-3 text-sm leading-relaxed text-muted">
        If you submit the contact form, your name, email, company, and message are sent to{" "}
        <a
          href="https://formspree.io/legal/privacy-policy/"
          target="_blank"
          rel="noopener noreferrer"
          className="font-medium text-accent hover:underline"
        >
          Formspree
        </a>{" "}
        so I can reply. Formspree processes that submission under their privacy policy. I use the information only to
        respond to your inquiry and do not sell it.
      </p>
      <h2 className="font-display mt-10 text-lg font-semibold text-fg">Direct email and LinkedIn</h2>
      <p className="mt-3 text-sm leading-relaxed text-muted">
        Mailto links and LinkedIn open in your client or on LinkedIn’s platform. Those channels are governed by your
        email provider or LinkedIn’s policies, not by this site.
      </p>
      <h2 className="font-display mt-10 text-lg font-semibold text-fg">Ask Ethan (optional)</h2>
      <p className="mt-3 text-sm leading-relaxed text-muted">
        When the optional chat assistant is enabled, questions you type are sent to a separate HTTPS API I operate (for
        example a Cloudflare Worker). Do not send secrets or sensitive personal data in that chat. If chat is
        unavailable, the widget only points you to email, LinkedIn, or the contact form.
      </p>
      <h2 className="font-display mt-10 text-lg font-semibold text-fg">Hosting</h2>
      <p className="mt-3 text-sm leading-relaxed text-muted">
        GitHub may collect standard server logs when you visit the site. See{" "}
        <a
          href="https://docs.github.com/en/site-policy/privacy-policies/github-privacy-statement"
          target="_blank"
          rel="noopener noreferrer"
          className="font-medium text-accent hover:underline"
        >
          GitHub’s privacy statement
        </a>
        .
      </p>
      <p className="mt-8 text-sm text-muted">
        Questions:{" "}
        <a href={`mailto:${siteConfig.email}`} className="font-medium text-accent hover:underline">
          {siteConfig.email}
        </a>
        .
      </p>
      <Link href="/" className="mt-10 inline-block text-sm font-semibold text-accent hover:underline">
        ← Back home
      </Link>
    </div>
  );
}
