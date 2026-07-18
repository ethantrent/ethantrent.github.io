import Image from "next/image";
import { publicPath } from "@/lib/publicPath";
import { cn } from "@/lib/utils";

type Props = {
  imageSrc: string;
  imageAlt: string;
  sizes: string;
  /** When set, renders a labeled abstract artifact placeholder instead of the image. */
  artifactLabel?: string;
};

const mediaClassName =
  "object-contain p-6 transition duration-500 group-hover:scale-[1.02] md:p-8";

/** SVG + raster under /public: plain img avoids next/image quirks on static export (GitHub Pages). */
const USE_IMG = /\.(svg|png|jpe?g|gif|webp)$/i;

/**
 * Project thumbnails from `/public` render with native img for reliable static hosting.
 * Real images win; `artifactLabel` is only a fallback when there is no image asset.
 */
export function ProjectCardMedia({ imageSrc, imageAlt, sizes, artifactLabel }: Props) {
  const hasImage = Boolean(imageSrc?.trim());

  if (!hasImage && artifactLabel) {
    return (
      <div
        className="absolute inset-0 flex items-center justify-center bg-surface-2"
        role="img"
        aria-label={imageAlt}
      >
        <div
          className="absolute inset-0 opacity-[0.07]"
          style={{
            backgroundImage: "radial-gradient(circle, var(--fg) 1px, transparent 1px)",
            backgroundSize: "22px 22px",
          }}
          aria-hidden
        />
        <span className="relative rounded-md border border-hairline-strong bg-surface px-3.5 py-2 text-sm font-medium text-fg-muted">
          {artifactLabel}
        </span>
      </div>
    );
  }

  const url = publicPath(imageSrc);
  if (USE_IMG.test(imageSrc)) {
    return (
      // eslint-disable-next-line @next/next/no-img-element -- reliable /public assets on static export
      <img
        src={url}
        alt={imageAlt}
        className={cn("absolute inset-0 h-full w-full", mediaClassName)}
        loading="lazy"
        decoding="async"
      />
    );
  }
  return <Image src={url} alt={imageAlt} fill className={mediaClassName} sizes={sizes} />;
}
