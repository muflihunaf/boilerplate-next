import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Enable React strict mode for better development experience
  reactStrictMode: true,

  // Enable standalone output for Docker deployment
  // Creates a minimal production build with only necessary files
  output: "standalone",

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

  // Experimental features (enable as needed)
  experimental: {
    // typedRoutes: true,
  },
};

export default nextConfig;
