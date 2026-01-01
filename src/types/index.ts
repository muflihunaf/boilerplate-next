/**
 * Global type definitions
 * Add your shared types here
 */

// API Response types
export interface ApiResponse<T> {
  data: T;
  message?: string;
  success: boolean;
}

export interface PaginatedResponse<T> {
  data: T[];
  meta: {
    total: number;
    page: number;
    limit: number;
    totalPages: number;
  };
}

// Common entity types
export interface BaseEntity {
  id: string;
  createdAt: string;
  updatedAt: string;
}

// User types
export type UserRole = "admin" | "user";
export type UserStatus = "active" | "inactive";

export interface User extends BaseEntity {
  email: string;
  name: string;
  avatar?: string;
  role?: UserRole;
  status?: UserStatus;
}

export interface CreateUserInput {
  name: string;
  email: string;
  role: UserRole;
}

export interface UpdateUserInput {
  name?: string;
  email?: string;
  role?: UserRole;
  status?: UserStatus;
}

// Form states
export type FormStatus = "idle" | "loading" | "success" | "error";

// Utility types
export type Nullable<T> = T | null;
export type Optional<T> = T | undefined;
