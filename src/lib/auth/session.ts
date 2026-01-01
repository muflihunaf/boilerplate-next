"use server";

import { cookies } from "next/headers";
import { authConfig } from "./config";
import type { Session, User } from "./types";

/**
 * Session utilities for server-side auth
 * Uses http-only cookies for secure JWT storage
 */

/**
 * Create a new session cookie
 */
export async function createSession(accessToken: string, user: User): Promise<void> {
  const cookieStore = await cookies();
  
  const session: Session = {
    user,
    accessToken,
    expiresAt: Date.now() + authConfig.cookieOptions.maxAge * 1000,
  };

  cookieStore.set(
    authConfig.cookieName,
    JSON.stringify(session),
    authConfig.cookieOptions
  );
}

/**
 * Get current session from cookie
 */
export async function getSession(): Promise<Session | null> {
  const cookieStore = await cookies();
  const sessionCookie = cookieStore.get(authConfig.cookieName);

  if (!sessionCookie?.value) {
    return null;
  }

  try {
    const session: Session = JSON.parse(sessionCookie.value);
    
    // Check if session is expired
    if (session.expiresAt < Date.now()) {
      await deleteSession();
      return null;
    }

    return session;
  } catch {
    return null;
  }
}

/**
 * Get current user from session
 */
export async function getUser(): Promise<User | null> {
  const session = await getSession();
  return session?.user ?? null;
}

/**
 * Get access token from session
 */
export async function getAccessToken(): Promise<string | null> {
  const session = await getSession();
  return session?.accessToken ?? null;
}

/**
 * Delete session cookie (logout)
 */
export async function deleteSession(): Promise<void> {
  const cookieStore = await cookies();
  cookieStore.delete(authConfig.cookieName);
}

/**
 * Check if user is authenticated
 */
export async function isAuthenticated(): Promise<boolean> {
  const session = await getSession();
  return session !== null;
}

