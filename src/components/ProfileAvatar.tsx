import { publicPath } from "@/lib/publicPath";
import { cn } from "@/lib/utils";

const PROFILE_SRC = "/profile-mark.svg";

type Props = {
  alt?: string;
  className?: string;
  size: number;
  /** LCP: set on hero only */
  priority?: boolean;
};

/**
 * Profile image from /public. Uses native img so SVG always renders (next/image often omits local SVGs).
 */
export function ProfileAvatar({ alt = "Ethan Trent", className, size, priority }: Props) {
  return (
    // eslint-disable-next-line @next/next/no-img-element
    <img
      src={publicPath(PROFILE_SRC)}
      alt={alt}
      width={size}
      height={size}
      className={cn(className)}
      decoding="async"
      {...(priority ? { fetchPriority: "high" as const } : { loading: "lazy" as const })}
    />
  );
}
