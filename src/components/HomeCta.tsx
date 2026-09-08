import Link from "next/link";
import { siteConfig } from "@/data/site";
export function HomeCta() {
  return (
    <section className="shell border-t border-hairline py-10 md:py-12">
      <h2 className="text-2xl font-medium">Contact</h2>
      <p className="mt-4 max-w-xl text-base leading-relaxed text-fg-muted">
        I’m open to conversations about product work and relevant opportunities.
        Email is the easiest way to reach me.
      </p>
      <div className="mt-3 flex flex-wrap gap-x-7">
        <a href={`mailto:${siteConfig.email}`} className="text-link">
          {siteConfig.email}
        </a>
        <Link href="/contact/" className="text-link">
          Contact details
        </Link>
      </div>
    </section>
  );
}
