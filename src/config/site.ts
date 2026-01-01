/**
 * Site configuration
 * Centralized place for all site-wide settings
 */
export const siteConfig = {
  name: "Next.js Boilerplate",
  description:
    "A production-ready Next.js boilerplate with App Router, TypeScript, and Tailwind CSS",
  url: process.env.NEXT_PUBLIC_APP_URL || "http://localhost:3000",
  author: "Your Name",
  keywords: [
    "Next.js",
    "React",
    "TypeScript",
    "Tailwind CSS",
    "App Router",
  ],
  links: {
    github: "https://github.com/yourusername/your-repo",
    twitter: "https://twitter.com/yourusername",
  },
} as const;

export type SiteConfig = typeof siteConfig;

