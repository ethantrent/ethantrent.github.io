import type { Metadata, Viewport } from "next";
import { Figtree, Syne } from "next/font/google";
import "./globals.css";
import { ThemeProvider } from "@/components/providers/ThemeProvider";
import { AppChrome } from "@/components/AppChrome";
import { siteConfig } from "@/data/site";
import { cn } from "@/lib/utils";

/** Readable body (Figtree) + strong display (Syne) — recruiter-friendly scan, not Inter/Space Grotesk. */
const figtree = Figtree({
  subsets: ["latin"],
  variable: "--font-figtree",
  display: "swap",
});

const syne = Syne({
  subsets: ["latin"],
  variable: "--font-syne",
  display: "swap",
});

/** Set `NEXT_PUBLIC_SITE_URL` in `.env.local` to your live GitHub Pages URL for correct OG URLs. */
const siteUrl = process.env.NEXT_PUBLIC_SITE_URL?.replace(/\/$/, "") ?? "http://localhost:3000";

/**
 * Root layout: fonts, theme provider, global chrome, and default SEO metadata.
 */
export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: siteConfig.title,
    template: `%s · ${siteConfig.name}`,
  },
  description: siteConfig.description,
  openGraph: {
    title: siteConfig.title,
    description: siteConfig.description,
    url: "/",
    siteName: siteConfig.name,
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: siteConfig.title,
    description: siteConfig.description,
  },
  robots: { index: true, follow: true },
};

export const viewport: Viewport = {
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "#f5f2eb" },
    { media: "(prefers-color-scheme: dark)", color: "#0d0d0d" },
  ],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={cn(figtree.variable, syne.variable, "h-full")}
      suppressHydrationWarning
    >
      <body
        className={cn(
          figtree.className,
          "flex min-h-full flex-col bg-bg text-fg antialiased",
        )}
      >
        <ThemeProvider>
          <a href="#main-content" className="skip-link">
            Skip to content
          </a>
          <AppChrome>{children}</AppChrome>
        </ThemeProvider>
      </body>
    </html>
  );
}
