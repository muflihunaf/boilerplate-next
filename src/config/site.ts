/**
 * Site configuration
 * Centralized settings for metadata and branding
 */
export const siteConfig = {
  name: "Next.js Boilerplate",
  description: "A production-ready Next.js starter with App Router, TypeScript, and Tailwind CSS.",
  url: process.env.NEXT_PUBLIC_APP_URL || "http://localhost:3000",
  author: "Your Name",
  keywords: ["Next.js", "React", "TypeScript", "Tailwind CSS"],
  links: {
    github: "https://github.com/yourusername/your-repo",
  },
} as const;

export type SiteConfig = typeof siteConfig;
