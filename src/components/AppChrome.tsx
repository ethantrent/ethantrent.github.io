"use client";

import type { ReactNode } from "react";
import { CustomCursor } from "@/components/CustomCursor";
import { Footer } from "@/components/Footer";
import { Navbar } from "@/components/Navbar";

/**
 * Client shell: custom cursor + global chrome so `layout.tsx` stays a server component.
 */
export function AppChrome({ children }: { children: ReactNode }) {
  return (
    <>
      <CustomCursor />
      <Navbar />
      <main id="main-content" className="flex-1 pt-6">
        {children}
      </main>
      <Footer />
    </>
  );
}
