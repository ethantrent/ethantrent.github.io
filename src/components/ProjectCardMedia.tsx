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

/**
 * Local SVGs use a plain img so they reliably render; next/image often skips SVGs from /public.
 * Raster assets use next/image with fill.
 */
export function ProjectCardMedia({ imageSrc, imageAlt, sizes }: Props) {
  const url = publicPath(imageSrc);
  if (imageSrc.toLowerCase().endsWith(".svg")) {
    return (
      // eslint-disable-next-line @next/next/no-img-element -- next/image often skips local SVGs
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
