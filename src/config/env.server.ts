import "server-only";

/**
 * Server-Only Environment Variables
 * 
 * ⚠️ NEVER import this file in client components
 * The "server-only" import ensures a build error if imported client-side
 */

/**
 * Get required environment variable (throws if missing)
 */
function required(key: string): string {
  const value = process.env[key];
  if (!value) {
    throw new Error(`Missing required environment variable: ${key}`);
  }
  return value;
}

/**
 * Get optional environment variable with default
 */
function optional(key: string, defaultValue: string): string {
  return process.env[key] || defaultValue;
}

/**
 * Server-only environment variables
 * Contains secrets that should never be exposed to the client
 */
export const serverEnv = {
  // Database
  DATABASE_URL: optional("DATABASE_URL", ""),
  
  // Authentication
  AUTH_SECRET: optional("AUTH_SECRET", "development-secret-change-in-production"),
  
  // External APIs (add your API keys here)
  // STRIPE_SECRET_KEY: required("STRIPE_SECRET_KEY"),
  // SENDGRID_API_KEY: required("SENDGRID_API_KEY"),
  
  // Internal API keys
  INTERNAL_API_KEY: optional("INTERNAL_API_KEY", ""),
  
  // Redis/Cache
  REDIS_URL: optional("REDIS_URL", ""),
} as const;

export type ServerEnv = typeof serverEnv;

/**
 * Validate required environment variables at startup
 * Call this in your server initialization
 */
export function validateServerEnv(): void {
  const errors: string[] = [];

  // Add validation for required production variables
  if (process.env.NODE_ENV === "production") {
    if (!process.env.AUTH_SECRET || process.env.AUTH_SECRET === "development-secret-change-in-production") {
      errors.push("AUTH_SECRET must be set in production");
    }
    // Add more production validations as needed
  }

  if (errors.length > 0) {
    throw new Error(`Environment validation failed:\n${errors.join("\n")}`);
  }
}

