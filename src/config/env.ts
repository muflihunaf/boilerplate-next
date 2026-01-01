/**
 * Environment configuration
 * Type-safe access to environment variables
 */

const getEnvVar = (key: string, defaultValue?: string): string => {
  const value = process.env[key] || defaultValue;
  if (value === undefined) {
    throw new Error(`Missing environment variable: ${key}`);
  }
  return value;
};

export const env = {
  // Node environment
  NODE_ENV: process.env.NODE_ENV || "development",
  
  // App configuration
  NEXT_PUBLIC_APP_NAME: getEnvVar("NEXT_PUBLIC_APP_NAME", "Next.js Boilerplate"),
  NEXT_PUBLIC_APP_URL: getEnvVar("NEXT_PUBLIC_APP_URL", "http://localhost:3000"),
  
  // API configuration
  NEXT_PUBLIC_API_URL: getEnvVar("NEXT_PUBLIC_API_URL", "http://localhost:3000/api"),
  
  // Feature flags (add as needed)
  // NEXT_PUBLIC_ENABLE_ANALYTICS: getEnvVar("NEXT_PUBLIC_ENABLE_ANALYTICS", "false") === "true",
} as const;

export type Env = typeof env;

