import type { ReactNode } from "react";
import { AskEthanWidget } from "@/components/AskEthanWidget";
import { Footer } from "@/components/Footer";
import { Navbar } from "@/components/Navbar";
export function AppChrome({ children }: { children: ReactNode }) {
  return (
    <>
      <Navbar />
      <main id="main-content" className="flex-1">
        {children}
      </main>
      <Footer />
      <AskEthanWidget />
    </>
  );
}
