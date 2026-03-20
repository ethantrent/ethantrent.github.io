import { clsx, type ClassValue } from "clsx";

/** Merges conditional class names (Tailwind-friendly). */
export function cn(...inputs: ClassValue[]) {
  return clsx(inputs);
}
