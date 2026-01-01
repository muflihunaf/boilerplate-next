"use server";

/**
 * Server-side API utilities
 * Use these when making API calls from Server Components or Server Actions
 */

import { cookies } from "next/headers";
import { api } from "./client";
import { setAuthTokenGetter } from "./client";
import type { RequestConfig, ApiResponse } from "./types";

/**
 * Get auth token from session cookie (server-side)
 */
async function getServerAuthToken(): Promise<string | null> {
  const cookieStore = await cookies();
  const sessionCookie = cookieStore.get("session");
  
  if (!sessionCookie?.value) {
    return null;
  }
  
  try {
    const session = JSON.parse(sessionCookie.value);
    return session.accessToken || null;
  } catch {
    return null;
  }
}

/**
 * Server API client
 * Automatically attaches auth token from session cookie
 */
export const serverApi = {
  async get<T>(endpoint: string, config?: RequestConfig): Promise<ApiResponse<T | null>> {
    setAuthTokenGetter(getServerAuthToken);
    return api.get<T>(endpoint, config);
  },

  async post<T>(endpoint: string, body?: unknown, config?: RequestConfig): Promise<ApiResponse<T | null>> {
    setAuthTokenGetter(getServerAuthToken);
    return api.post<T>(endpoint, body, config);
  },

  async put<T>(endpoint: string, body?: unknown, config?: RequestConfig): Promise<ApiResponse<T | null>> {
    setAuthTokenGetter(getServerAuthToken);
    return api.put<T>(endpoint, body, config);
  },

  async patch<T>(endpoint: string, body?: unknown, config?: RequestConfig): Promise<ApiResponse<T | null>> {
    setAuthTokenGetter(getServerAuthToken);
    return api.patch<T>(endpoint, body, config);
  },

  async delete<T>(endpoint: string, config?: RequestConfig): Promise<ApiResponse<T | null>> {
    setAuthTokenGetter(getServerAuthToken);
    return api.delete<T>(endpoint, config);
  },
};
