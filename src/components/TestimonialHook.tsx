import { siteConfig } from "@/data/site";

/**
 * Home social-proof slot — renders only when `siteConfig.testimonial.quote` is filled.
 * Leave quote empty until you have a real LinkedIn / manager excerpt.
 */
export function TestimonialHook() {
  const t = siteConfig.testimonial;
  if (!t.quote?.trim()) return null;

  return (
    <section className="border-t border-hairline py-12" aria-label="Testimonial">
      <blockquote className="mx-auto max-w-2xl px-4 text-center">
        <p className="font-display text-xl font-medium leading-relaxed tracking-tight text-fg md:text-2xl">
          “{t.quote}”
        </p>
        {(t.author || t.role) && (
          <footer className="mt-4 text-sm text-muted">
            {t.author ? <cite className="not-italic font-medium text-fg">{t.author}</cite> : null}
            {t.author && t.role ? <span aria-hidden> · </span> : null}
            {t.role ? <span>{t.role}</span> : null}
          </footer>
        )}
      </blockquote>
    </section>
  );
}
