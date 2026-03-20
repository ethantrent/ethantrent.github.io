import Image from "next/image";
import { publicPath } from "@/lib/publicPath";
import { cn } from "@/lib/utils";

type Props = {
  imageSrc: string;
  imageAlt: string;
  sizes: string;
};

const mediaClassName =
  "object-contain p-6 transition duration-500 group-hover:scale-[1.02] md:p-8";

/** SVG + raster under /public: plain img avoids next/image quirks on static export (GitHub Pages). */
const USE_IMG = /\.(svg|png|jpe?g|gif|webp)$/i;

/**
 * Project thumbnails from `/public` render with native img for reliable static hosting.
 * Other paths still use next/image.
 */
export function ProjectCardMedia({ imageSrc, imageAlt, sizes }: Props) {
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
