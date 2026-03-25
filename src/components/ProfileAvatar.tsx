"use client";

import { useCallback, useState } from "react";
import { publicPath } from "@/lib/publicPath";
import { siteConfig } from "@/data/site";
import { cn } from "@/lib/utils";

type Props = {
  alt?: string;
  className?: string;
  size: number;
  /** LCP: set on hero only */
  priority?: boolean;
};

/**
 * Profile image from /public. Tries professional headshot first, falls back to mark SVG on error.
 */
export function ProfileAvatar({ alt = "Ethan Trent", className, size, priority }: Props) {
  const { primarySrc, fallbackSrc } = siteConfig.profilePhoto;
  const [src, setSrc] = useState<string>(primarySrc);

  const onError = useCallback(() => {
    setSrc((s) => (s === fallbackSrc ? s : fallbackSrc));
  }, [fallbackSrc]);

  return (
    // eslint-disable-next-line @next/next/no-img-element
    <img
      src={publicPath(src)}
      alt={alt}
      width={size}
      height={size}
      className={cn(className)}
      decoding="async"
      onError={onError}
      {...(priority ? { fetchPriority: "high" as const } : { loading: "lazy" as const })}
    />
  );
}
