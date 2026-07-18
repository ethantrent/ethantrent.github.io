"use client";

import type { ReactNode } from "react";
import { AskEthanWidget } from "@/components/AskEthanWidget";
import { Footer } from "@/components/Footer";
import { Navbar } from "@/components/Navbar";
import { VisitorCounter } from "@/components/VisitorCounter";

/**
 * Client shell: global chrome so `layout.tsx` stays a server component.
 */
export function AppChrome({ children }: { children: ReactNode }) {
  return (
    <>
      <Navbar />
      <main id="main-content" className="flex-1">
        {children}
      </main>
      <div className="mx-auto max-w-6xl px-4 pb-6">
        <VisitorCounter />
      </div>
      <Footer />
      <AskEthanWidget />
    </>
  );
}
