import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Enable React strict mode for better development experience
  reactStrictMode: true,

  // Image optimization configuration
  images: {
    remotePatterns: [
      // Add your image domains here
      // Example:
      // {
      //   protocol: "https",
      //   hostname: "example.com",
      // },
    ],
  },

  // Environment variables that should be available on the client
  env: {
    NEXT_PUBLIC_APP_NAME: process.env.NEXT_PUBLIC_APP_NAME,
    NEXT_PUBLIC_APP_URL: process.env.NEXT_PUBLIC_APP_URL,
  },

  // Experimental features (enable as needed)
  experimental: {
    // typedRoutes: true,
  },
};

export default nextConfig;

