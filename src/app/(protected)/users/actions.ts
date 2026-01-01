"use server";

/**
 * User Server Actions
 * Handle form submissions and mutations for users
 */

import { revalidatePath } from "next/cache";
import { createUser, updateUser, deleteUser } from "@/lib/api";
import type { UserRole } from "@/types";

/**
 * Form state for user actions
 */
export type UserFormState = {
  errors?: {
    name?: string;
    email?: string;
    role?: string;
  };
  message?: string;
  success?: boolean;
};

/**
 * Create user action
 */
export async function createUserAction(
  _prevState: UserFormState | undefined,
  formData: FormData
): Promise<UserFormState> {
  const name = formData.get("name") as string;
  const email = formData.get("email") as string;
  const role = formData.get("role") as UserRole;

  // Validate input
  const errors: UserFormState["errors"] = {};

  if (!name || name.trim().length < 2) {
    errors.name = "Name must be at least 2 characters";
  }

  if (!email) {
    errors.email = "Email is required";
  } else if (!email.includes("@")) {
    errors.email = "Please enter a valid email";
  }

  if (!role || !["admin", "user"].includes(role)) {
    errors.role = "Please select a valid role";
  }

  if (Object.keys(errors).length > 0) {
    return { errors };
  }

  try {
    const user = await createUser({ name: name.trim(), email, role });

    if (!user) {
      return { message: "Failed to create user. Please try again." };
    }

    revalidatePath("/users");
    return { success: true, message: "User created successfully" };
  } catch (error) {
    console.error("Create user error:", error);
    return { message: "An unexpected error occurred. Please try again." };
  }
}

/**
 * Update user action
 */
export async function updateUserAction(
  id: string,
  _prevState: UserFormState | undefined,
  formData: FormData
): Promise<UserFormState> {
  const name = formData.get("name") as string;
  const email = formData.get("email") as string;
  const role = formData.get("role") as UserRole;

  // Validate input
  const errors: UserFormState["errors"] = {};

  if (name && name.trim().length < 2) {
    errors.name = "Name must be at least 2 characters";
  }

  if (email && !email.includes("@")) {
    errors.email = "Please enter a valid email";
  }

  if (role && !["admin", "user"].includes(role)) {
    errors.role = "Please select a valid role";
  }

  if (Object.keys(errors).length > 0) {
    return { errors };
  }

  try {
    const user = await updateUser(id, {
      ...(name && { name: name.trim() }),
      ...(email && { email }),
      ...(role && { role }),
    });

    if (!user) {
      return { message: "Failed to update user. Please try again." };
    }

    revalidatePath("/users");
    revalidatePath(`/users/${id}`);
    return { success: true, message: "User updated successfully" };
  } catch (error) {
    console.error("Update user error:", error);
    return { message: "An unexpected error occurred. Please try again." };
  }
}

/**
 * Delete user action
 */
export async function deleteUserAction(id: string): Promise<{ success: boolean; message: string }> {
  try {
    const success = await deleteUser(id);

    if (!success) {
      return { success: false, message: "Failed to delete user" };
    }

    revalidatePath("/users");
    return { success: true, message: "User deleted successfully" };
  } catch (error) {
    console.error("Delete user error:", error);
    return { success: false, message: "An unexpected error occurred" };
  }
}
