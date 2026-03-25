"use client";

import { useEffect, useState } from "react";

type GoatResponse = { count?: number };

/**
 * Optional GoatCounter-style public stats. Set `NEXT_PUBLIC_VISITOR_COUNTER_JSON` to your hosted counter JSON URL
 * (must return `{ count: number }` and allow CORS), or leave unset to hide.
 */
export function VisitorCounter() {
  const url = process.env.NEXT_PUBLIC_VISITOR_COUNTER_JSON?.trim();
  const [count, setCount] = useState<number | null>(null);

  useEffect(() => {
    if (!url) return;
    let cancelled = false;
    fetch(url)
      .then((r) => r.json() as Promise<GoatResponse>)
      .then((data) => {
        if (!cancelled && typeof data?.count === "number") setCount(data.count);
      })
      .catch(() => {});
    return () => {
      cancelled = true;
    };
  }, [url]);

  if (!url || count === null) return null;

  return (
    <p className="text-center text-xs text-muted">
      <span className="font-mono text-fg/80">{count.toLocaleString()}</span> visits tracked
    </p>
  );
}
