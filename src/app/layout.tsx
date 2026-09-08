import type { Metadata, Viewport } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { AppChrome } from "@/components/AppChrome";
import { siteConfig } from "@/data/site";
import { cn } from "@/lib/utils";

/** Body / UI — Inter. */
const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

/** Set `NEXT_PUBLIC_SITE_URL` in `.env.local` to your live GitHub Pages URL for correct OG URLs. */
const siteUrl =
  process.env.NEXT_PUBLIC_SITE_URL?.replace(/\/$/, "") ??
  "https://ethantrent.github.io";

/**
 * Root layout: font, global chrome, and default SEO metadata. Warm editorial theme.
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
    images: [
      {
        url: "/og.png",
        width: 1200,
        height: 630,
        alt: "Ethan Trent — Product management",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: siteConfig.title,
    description: siteConfig.description,
    images: ["/og.png"],
  },
  robots: { index: true, follow: true },
  icons: { icon: "/icon.svg" },
};

export const viewport: Viewport = {
  themeColor: "#F5F2EA",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={cn(inter.variable, "h-full")}>
      <body
        className={cn(
          inter.className,
          "flex min-h-full flex-col bg-bg text-fg antialiased",
        )}
      >
        <a href="#main-content" className="skip-link">
          Skip to content
        </a>
        <AppChrome>{children}</AppChrome>
      </body>
    </html>
  );
}
