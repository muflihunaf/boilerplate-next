"use server";

import { redirect } from "next/navigation";
import { authConfig } from "./config";
import { createSession, deleteSession } from "./session";
import type { LoginCredentials, AuthResponse } from "./types";

/**
 * Form state for useActionState
 */
export type LoginFormState = {
  errors?: {
    email?: string;
    password?: string;
  };
  message?: string;
  success?: boolean;
};

/**
 * Login action (for useActionState)
 */
export async function loginAction(
  _prevState: LoginFormState | undefined,
  formData: FormData
): Promise<LoginFormState> {
  const email = formData.get("email") as string;
  const password = formData.get("password") as string;

  // Validate input
  const errors: LoginFormState["errors"] = {};

  if (!email) {
    errors.email = "Email is required";
  } else if (!email.includes("@")) {
    errors.email = "Please enter a valid email";
  }

  if (!password) {
    errors.password = "Password is required";
  } else if (password.length < 6) {
    errors.password = "Password must be at least 6 characters";
  }

  if (Object.keys(errors).length > 0) {
    return { errors };
  }

  try {
    // Authenticate with backend
    const response = await authenticateWithBackend({ email, password });

    if (!response) {
      return { message: "Invalid email or password" };
    }

    // Create session cookie
    await createSession(response.accessToken, response.user);

    return { success: true };
  } catch (error) {
    console.error("Login error:", error);
    return { message: "An unexpected error occurred. Please try again." };
  }
}

/**
 * Legacy login function (for programmatic use)
 */
export async function login(credentials: LoginCredentials) {
  try {
    if (!credentials.email || !credentials.password) {
      return {
        success: false as const,
        error: { message: "Email and password are required" },
      };
    }

    const response = await authenticateWithBackend(credentials);

    if (!response) {
      return {
        success: false as const,
        error: { message: "Invalid email or password" },
      };
    }

    await createSession(response.accessToken, response.user);

    return {
      success: true as const,
      data: { redirectTo: authConfig.routes.dashboard },
    };
  } catch (error) {
    console.error("Login error:", error);
    return {
      success: false as const,
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
  await new Promise((resolve) => setTimeout(resolve, 800));

  // Mock validation - replace with real API call
  if (credentials.email === "demo@example.com" && credentials.password === "password") {
    return {
      user: {
        id: "1",
        email: credentials.email,
        name: "Demo User",
      },
      accessToken: "mock-jwt-token-" + Date.now(),
      expiresIn: 60 * 60 * 24 * 7,
    };
  }

  return null;
}
