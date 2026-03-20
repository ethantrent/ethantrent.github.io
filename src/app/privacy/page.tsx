import type { Metadata } from "next";
import Link from "next/link";
import { siteConfig } from "@/data/site";

export const metadata: Metadata = {
  title: "Privacy",
  description: siteConfig.seoPages.privacy,
  robots: { index: false, follow: false },
};

/**
 * Non-legal placeholder — replace with a real policy if you collect analytics or form data beyond Formspree.
 */
export default function PrivacyPage() {
  return (
    <div className="mx-auto max-w-2xl px-4 py-24 md:py-28">
      <h1 className="font-display text-4xl font-bold text-fg">Privacy</h1>
      <p className="mt-6 text-sm leading-relaxed text-muted">
        This is a <strong>placeholder</strong> page. This static site does not run first-party analytics in the
        template as-shipped. If you add analytics, embeds, or change how contact submissions are processed, update
        this page accordingly.
      </p>
      <p className="mt-4 text-sm text-muted">
        Contact form submissions are handled by your configured third-party provider (e.g. Formspree). Review their
        privacy policy for how they process data.
      </p>
      <Link href="/" className="mt-10 inline-block text-sm font-semibold text-accent hover:underline">
        ← Back home
      </Link>
    </div>
  );
}
