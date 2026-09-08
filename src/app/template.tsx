import type { ReactNode } from "react";
/** Keep document content visible immediately, including before hydration. */
export default function Template({ children }: { children: ReactNode }) {
  return children;
}
