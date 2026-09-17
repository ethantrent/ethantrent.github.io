import Link from "next/link";

/** Retains old local links without publishing an unsupported project account. */
export function UnavailableCase() {
  return (
    <div className="shell pb-16">
      <header className="page-head">
        <h1 className="editorial-title">Case study unavailable</h1>
        <p className="mt-5 max-w-xl text-lg leading-relaxed text-muted">
          This case study is not currently published. You can explore my project
          contributions and public code on the Work page.
        </p>
        <Link href="/projects/" className="text-link mt-5">Explore my work</Link>
      </header>
    </div>
  );
}
