/**
 * Environment Variables
 * 
 * This file provides type-safe access to environment variables.
 * 
 * IMPORTANT:
 * - NEXT_PUBLIC_* variables are exposed to the browser
 * - All other variables are server-only
 * - Never import serverEnv in client components
 */

// ============================================
// PUBLIC ENVIRONMENT VARIABLES
// Safe to use in client components
// ============================================

/**
 * Public environment variables
 * These are bundled into the client JavaScript
 */
export const publicEnv = {
  /** Application name */
  APP_NAME: process.env.NEXT_PUBLIC_APP_NAME || "Next.js Boilerplate",
  
  /** Public URL of the application */
  APP_URL: process.env.NEXT_PUBLIC_APP_URL || "http://localhost:3000",
  
  /** API base URL (public endpoint) */
  API_URL: process.env.NEXT_PUBLIC_API_URL || "/api",
  
  /** Enable analytics */
  ENABLE_ANALYTICS: process.env.NEXT_PUBLIC_ENABLE_ANALYTICS === "true",
  
  /** Current environment */
  IS_PRODUCTION: process.env.NODE_ENV === "production",
  IS_DEVELOPMENT: process.env.NODE_ENV === "development",
} as const;

export type PublicEnv = typeof publicEnv;
