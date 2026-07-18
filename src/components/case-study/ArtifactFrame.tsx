import { publicPath } from "@/lib/publicPath";

type Props = {
  /** Labeled callout when no image is available. */
  label: string;
  /** Optional caption under the frame. */
  caption?: string;
  /** Real artifact image under /public — preferred over the abstract placeholder. */
  imageSrc?: string;
  imageAlt?: string;
};

/**
 * Case study artifact: real diagram/screenshot when provided, otherwise a labeled placeholder.
 */
export function ArtifactFrame({ label, caption, imageSrc, imageAlt }: Props) {
  return (
    <figure className="my-8">
      <div className="relative overflow-hidden rounded-xl border border-hairline bg-surface">
        {imageSrc ? (
          // eslint-disable-next-line @next/next/no-img-element -- /public diagrams on static export
          <img
            src={publicPath(imageSrc)}
            alt={imageAlt ?? label}
            className="h-auto w-full object-contain"
            loading="lazy"
            decoding="async"
          />
        ) : (
          <div className="relative flex aspect-[16/9] items-center justify-center">
            <div
              className="absolute inset-0 opacity-[0.07]"
              style={{
                backgroundImage: "radial-gradient(circle, var(--fg) 1px, transparent 1px)",
                backgroundSize: "22px 22px",
              }}
              aria-hidden
            />
            <span className="relative rounded-md border border-hairline-strong bg-surface-2 px-3.5 py-2 text-sm font-medium text-fg-muted">
              {label}
            </span>
          </div>
        )}
      </div>
      {caption ? (
        <figcaption className="mt-3 text-center text-xs text-muted">{caption}</figcaption>
      ) : null}
    </figure>
  );
}
