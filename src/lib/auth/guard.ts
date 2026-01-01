import "server-only";

import { cache } from "react";
import { redirect } from "next/navigation";
import { cookies } from "next/headers";
import { authConfig } from "./config";
import type { User, Session } from "./types";

/**
 * Require authentication
 * Redirects to login if not authenticated
 * Cached per request to prevent duplicate checks
 * 
 * @example
 * // In a Server Component
 * export default async function ProtectedPage() {
 *   const user = await requireAuth();
 *   return <div>Hello {user.name}</div>;
 * }
 */
export const requireAuth = cache(async (): Promise<User> => {
  const session = await getSessionFromCookie();

  if (!session?.user) {
    redirect(authConfig.routes.login);
  }

  return session.user;
});

/**
 * Check if user is authenticated (no redirect)
 * Use when you need to conditionally render based on auth status
 * 
 * @example
 * const user = await checkAuth();
 * if (user) {
 *   // Show authenticated content
 * }
 */
export const checkAuth = cache(async (): Promise<User | null> => {
  const session = await getSessionFromCookie();
  return session?.user ?? null;
});

/**
 * Require guest (not authenticated)
 * Redirects to dashboard if already authenticated
 * Use for login/register pages
 * 
 * @example
 * export default async function LoginPage() {
 *   await requireGuest();
 *   return <LoginForm />;
 * }
 */
export const requireGuest = cache(async (): Promise<void> => {
  const session = await getSessionFromCookie();

  if (session?.user) {
    redirect(authConfig.routes.dashboard);
  }
});

/**
 * Get session from cookie (internal helper)
 */
async function getSessionFromCookie(): Promise<Session | null> {
  const cookieStore = await cookies();
  const sessionCookie = cookieStore.get(authConfig.cookieName);

  if (!sessionCookie?.value) {
    return null;
  }

  try {
    const session: Session = JSON.parse(sessionCookie.value);

    // Check if session is expired
    if (session.expiresAt < Date.now()) {
      return null;
    }

    return session;
  } catch {
    return null;
  }
}

