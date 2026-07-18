import Link from "next/link";
import { siteConfig } from "@/data/site";
import { MARQUEE_TECH, TECH_ICON_MAP } from "@/lib/tech-icons";
import { Code2 } from "lucide-react";

function TechPill({ label, iconKey }: { label: string; iconKey: string }) {
  const Icon = TECH_ICON_MAP[iconKey] ?? Code2;
  return (
    <span className="inline-flex items-center gap-2 rounded-md border border-hairline bg-surface-2 px-3 py-1.5 text-[13px] font-medium text-fg-muted">
      <Icon className="h-4 w-4 shrink-0 text-muted" aria-hidden />
      {label}
    </span>
  );
}

/**
 * Static "Tools & domains" grid — content preserved from the old marquee, motion removed.
 */
export function TechMarquee() {
  const t = siteConfig.techMarquee;

  return (
    <section className="border-y border-hairline py-12" aria-label="Skills preview">
      <div className="mx-auto max-w-6xl px-4">
        <p className="text-[13px] font-medium tracking-[0.03em] text-muted">Tools & domains</p>
        <p className="mt-3 max-w-2xl text-pretty text-sm text-muted sm:text-base">
          {t.introBefore}
          <Link href="/skills/" className="font-medium text-accent hover:underline">
            {t.introHighlight1}
          </Link>
          {t.introMiddle}
          <span className="font-medium text-fg">{t.introHighlight2}</span>
          {t.introAfter}
        </p>
        <div className="mt-8 flex flex-wrap gap-2">
          {MARQUEE_TECH.map((item) => (
            <TechPill key={item.key} label={item.label} iconKey={item.key} />
          ))}
        </div>
      </div>
    </section>
  );
}
