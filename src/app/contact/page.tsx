import type { Metadata } from "next";
import dynamic from "next/dynamic";
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
      <div className="py-12 text-center text-sm text-muted" aria-busy="true">
        Loading form…
      </div>
    ),
  },
);

export default function ContactPage() {
  return (
    <div className="mx-auto max-w-6xl px-4 py-24 md:py-28">
      <header className="max-w-3xl">
        <p className="text-sm font-semibold uppercase tracking-widest text-accent">Contact</p>
        <h1 className="font-display mt-3 text-4xl font-bold text-fg md:text-5xl">Let&apos;s talk</h1>
        <p className="mt-4 text-pretty text-muted">{siteConfig.pageIntros.contact}</p>
      </header>
      <div className="mt-14">
        <ContactForm />
      </div>
    </div>
  );
}
