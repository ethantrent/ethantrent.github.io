"use client";

import { useEffect, useState } from "react";

export type TocItem = {
  id: string;
  label: string;
};

type Props = {
  items: readonly TocItem[];
};

/**
 * Sticky desktop section jump links for long PM case studies.
 */
export function CaseStudyToc({ items }: Props) {
  const [activeId, setActiveId] = useState(items[0]?.id ?? "");

  useEffect(() => {
    const headings = items
      .map((item) => document.getElementById(item.id))
      .filter((el): el is HTMLElement => Boolean(el));

    if (!headings.length) return;

    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((e) => e.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio);
        if (visible[0]?.target.id) {
          setActiveId(visible[0].target.id);
        }
      },
      { rootMargin: "-20% 0px -60% 0px", threshold: [0, 0.25, 0.5, 1] },
    );

    headings.forEach((el) => observer.observe(el));
    return () => observer.disconnect();
  }, [items]);

  return (
    <nav
      className="sticky top-20 hidden max-h-[calc(100vh-6rem)] w-44 shrink-0 overflow-y-auto lg:block"
      aria-label="On this page"
    >
      <p className="text-[11px] font-medium uppercase tracking-[0.08em] text-muted">On this page</p>
      <ul className="mt-3 space-y-1 border-l border-hairline">
        {items.map((item) => {
          const active = item.id === activeId;
          return (
            <li key={item.id}>
              <a
                href={`#${item.id}`}
                className={
                  active
                    ? "-ml-px block border-l border-accent pl-3 text-[13px] font-medium text-fg"
                    : "-ml-px block border-l border-transparent pl-3 text-[13px] text-muted transition hover:text-fg"
                }
              >
                {item.label}
              </a>
            </li>
          );
        })}
      </ul>
    </nav>
  );
}
