import type { Metadata } from "next";
import dynamic from "next/dynamic";
import Link from "next/link";
import { siteConfig } from "@/data/site";

export const metadata: Metadata = {
  title: "Contact",
  alternates: { canonical: "/contact/" },
  description: siteConfig.seoPages.contact,
  openGraph: {
    url: "/contact/",
    images: ["/og.png"],
    title: "Contact",
    description: siteConfig.seoPages.contact,
  },
};

const ContactForm = dynamic(
  () =>
    import("@/components/ContactForm").then((m) => ({
      default: m.ContactForm,
    })),
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
    <div className="shell py-10 md:py-12">
      <header className="max-w-2xl border-b border-hairline pb-10">
        <h1 className="editorial-title mt-5">Contact</h1>
        <p className="mt-4 max-w-xl text-pretty text-base leading-relaxed text-muted">
          {siteConfig.pageIntros.contact}
        </p>
        <nav
          className="mt-4 flex flex-wrap gap-x-7"
          aria-label="Direct contact"
        >
          <a href={`mailto:${siteConfig.email}`} className="text-link">
            {siteConfig.email}
          </a>
          <a href={siteConfig.social.linkedin} className="text-link">
            LinkedIn
          </a>
        </nav>
      </header>

      <div className="mt-10 md:mt-12">
        <ContactForm />
      </div>

      <p className="mt-12 text-xs text-muted">
        Submissions are handled per the{" "}
        <Link
          href="/privacy/"
          className="cursor-pointer text-accent transition duration-200 hover:underline"
        >
          privacy notice
        </Link>
        .
      </p>
    </div>
  );
}
