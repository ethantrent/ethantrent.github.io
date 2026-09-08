import Link from "next/link";
export function HumanCue() {
  return (
    <section className="shell border-t border-hairline py-10 md:py-12">
      <div className="max-w-[68ch]">
        <h2 className="text-2xl font-medium">About me</h2>
        <p className="mt-4 text-base leading-relaxed text-fg-muted">
          I grew up playing and streaming games, built a PC, and later thought
          I’d go into physical therapy. An introductory programming class
          changed my plans.
        </p>
        <Link href="/about/" className="text-link mt-3">
          More about me
        </Link>
      </div>
    </section>
  );
}
