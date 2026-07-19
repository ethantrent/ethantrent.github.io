import type { Metadata } from "next";
import dynamic from "next/dynamic";
import Link from "next/link";
import { siteConfig } from "@/data/site";

export const metadata: Metadata = {
  title: "Contact",
  description: siteConfig.seoPages.contact,
  openGraph: { title: "Contact", description: siteConfig.seoPages.contact },
};

const ContactForm = dynamic(
  () => import("@/components/ContactForm").then((m) => ({ default: m.ContactForm })),
  {
    ssr: true,
    loading: () => (
      <div className="py-12 text-sm text-muted" aria-busy="true">
        Loading form…
      </div>
    ),
  },
);

export default function ContactPage() {
  return (
    <div className="mx-auto max-w-6xl px-4 py-24 md:py-28">
      <header className="max-w-2xl border-b border-hairline pb-10">
        <p className="text-[13px] font-medium tracking-[0.03em] text-muted">Contact</p>
        <h1 className="font-display mt-3 text-4xl font-semibold tracking-tight text-fg md:text-5xl">
          Let&apos;s talk
        </h1>
        <p className="mt-4 max-w-xl text-pretty text-base leading-relaxed text-muted">
          {siteConfig.pageIntros.contact}
        </p>
      </header>

      <div className="mt-10 md:mt-12">
        <ContactForm />
      </div>

      <p className="mt-12 text-xs text-muted">
        Submissions are handled per the{" "}
        <Link href="/privacy/" className="cursor-pointer text-accent transition duration-200 hover:underline">
          privacy notice
        </Link>
        .
      </p>
    </div>
  );
}
