"use server";

import { redirect } from "next/navigation";
import { authConfig } from "./config";
import { createSession, deleteSession } from "./session";
import type { LoginCredentials, AuthResponse, AuthError } from "./types";

/**
 * Server Actions for authentication
 */

type ActionResult<T> = 
  | { success: true; data: T }
  | { success: false; error: AuthError };

/**
 * Login action
 * Replace the mock API call with your actual backend
 */
export async function login(
  credentials: LoginCredentials
): Promise<ActionResult<{ redirectTo: string }>> {
  try {
    // Validate input
    if (!credentials.email || !credentials.password) {
      return {
        success: false,
        error: { message: "Email and password are required" },
      };
    }

    // TODO: Replace with your actual API call
    const response = await authenticateWithBackend(credentials);

    if (!response) {
      return {
        success: false,
        error: { message: "Invalid email or password" },
      };
    }

    // Create session cookie
    await createSession(response.accessToken, response.user);

    return {
      success: true,
      data: { redirectTo: authConfig.routes.dashboard },
    };
  } catch (error) {
    console.error("Login error:", error);
    return {
      success: false,
      error: { message: "An unexpected error occurred" },
    };
  }
}

/**
 * Logout action
 */
export async function logout(): Promise<void> {
  await deleteSession();
  redirect(authConfig.routes.login);
}

/**
 * Mock authentication function
 * TODO: Replace with your actual backend API call
 */
async function authenticateWithBackend(
  credentials: LoginCredentials
): Promise<AuthResponse | null> {
  // Simulate API delay
  await new Promise((resolve) => setTimeout(resolve, 500));

  // Mock validation - replace with real API call
  // Example: const response = await fetch('/api/auth/login', { ... })
  
  if (credentials.email === "demo@example.com" && credentials.password === "password") {
    return {
      user: {
        id: "1",
        email: credentials.email,
        name: "Demo User",
      },
      accessToken: "mock-jwt-token-" + Date.now(),
      expiresIn: 60 * 60 * 24 * 7, // 7 days
    };
  }

  return null;
}

