import type { Metadata, Viewport } from "next";
import "@/app/globals.css";

/**
 * Site configuration - update these values for your project
 */
const siteConfig = {
  name: "Next.js Boilerplate",
  description: "A production-ready Next.js starter with App Router, TypeScript, and Tailwind CSS.",
  url: process.env.NEXT_PUBLIC_APP_URL || "http://localhost:3000",
} as const;

/**
 * Metadata configuration
 * @see https://nextjs.org/docs/app/api-reference/functions/generate-metadata
 */
export const metadata: Metadata = {
  title: {
    default: siteConfig.name,
    template: `%s | ${siteConfig.name}`,
  },
  description: siteConfig.description,
  metadataBase: new URL(siteConfig.url),
  openGraph: {
    type: "website",
    locale: "en_US",
    url: siteConfig.url,
    siteName: siteConfig.name,
    title: siteConfig.name,
    description: siteConfig.description,
  },
  twitter: {
    card: "summary_large_image",
    title: siteConfig.name,
    description: siteConfig.description,
  },
  robots: {
    index: true,
    follow: true,
  },
};

/**
 * Viewport configuration
 * @see https://nextjs.org/docs/app/api-reference/functions/generate-viewport
 */
export const viewport: Viewport = {
  themeColor: "#ffffff",
  width: "device-width",
  initialScale: 1,
  maximumScale: 5,
};

/**
 * Root Layout
 * Wraps all pages with global styles and structure
 */
export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className="min-h-screen bg-background text-foreground antialiased">
        {/* Accessibility: Skip to main content */}
        <a
          href="#main"
          className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-50 focus:rounded-md focus:bg-foreground focus:px-4 focus:py-2 focus:text-background"
        >
          Skip to content
        </a>

        {/* Page content */}
        <div id="main" className="relative flex min-h-screen flex-col">
          {children}
        </div>
      </body>
    </html>
  );
}
