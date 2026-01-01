"use server";

/**
 * Users API Service
 * Server-side functions for user CRUD operations
 */

import { serverApi } from "./server";
import type { User, CreateUserInput, UpdateUserInput, PaginatedResponse } from "@/types";

const USERS_ENDPOINT = "/users";

/**
 * Fetch paginated list of users
 */
export async function getUsers(params?: {
  page?: number;
  limit?: number;
  search?: string;
}): Promise<PaginatedResponse<User>> {
  const queryParams: Record<string, string> = {};

  if (params?.page) queryParams.page = String(params.page);
  if (params?.limit) queryParams.limit = String(params.limit);
  if (params?.search) queryParams.search = params.search;

  const response = await serverApi.get<PaginatedResponse<User>>(USERS_ENDPOINT, {
    params: queryParams,
  });

  // Return mock data if API not available
  if (!response.data) {
    return getMockUsers(params);
  }

  return response.data;
}

/**
 * Fetch single user by ID
 */
export async function getUser(id: string): Promise<User | null> {
  const response = await serverApi.get<User>(`${USERS_ENDPOINT}/${id}`);
  return response.data;
}

/**
 * Create a new user
 */
export async function createUser(input: CreateUserInput): Promise<User | null> {
  const response = await serverApi.post<User>(USERS_ENDPOINT, input);
  return response.data;
}

/**
 * Update an existing user
 */
export async function updateUser(id: string, input: UpdateUserInput): Promise<User | null> {
  const response = await serverApi.patch<User>(`${USERS_ENDPOINT}/${id}`, input);
  return response.data;
}

/**
 * Delete a user
 */
export async function deleteUser(id: string): Promise<boolean> {
  const response = await serverApi.delete(`${USERS_ENDPOINT}/${id}`);
  return response.ok;
}

/**
 * Mock data for development/demo
 * TODO: Remove when backend is ready
 */
function getMockUsers(params?: {
  page?: number;
  limit?: number;
  search?: string;
}): PaginatedResponse<User> {
  const mockUsers: User[] = [
    {
      id: "1",
      name: "John Doe",
      email: "john@example.com",
      role: "admin",
      status: "active",
      createdAt: "2024-01-15T10:00:00Z",
      updatedAt: "2024-01-15T10:00:00Z",
    },
    {
      id: "2",
      name: "Jane Smith",
      email: "jane@example.com",
      role: "user",
      status: "active",
      createdAt: "2024-02-20T14:30:00Z",
      updatedAt: "2024-02-20T14:30:00Z",
    },
    {
      id: "3",
      name: "Bob Wilson",
      email: "bob@example.com",
      role: "user",
      status: "inactive",
      createdAt: "2024-03-10T09:15:00Z",
      updatedAt: "2024-03-10T09:15:00Z",
    },
    {
      id: "4",
      name: "Alice Brown",
      email: "alice@example.com",
      role: "admin",
      status: "active",
      createdAt: "2024-03-25T16:45:00Z",
      updatedAt: "2024-03-25T16:45:00Z",
    },
    {
      id: "5",
      name: "Charlie Davis",
      email: "charlie@example.com",
      role: "user",
      status: "active",
      createdAt: "2024-04-05T11:20:00Z",
      updatedAt: "2024-04-05T11:20:00Z",
    },
  ];

  const page = params?.page || 1;
  const limit = params?.limit || 10;
  const search = params?.search?.toLowerCase() || "";

  // Filter by search
  let filtered = mockUsers;
  if (search) {
    filtered = mockUsers.filter(
      (user) =>
        user.name.toLowerCase().includes(search) || user.email.toLowerCase().includes(search)
    );
  }

  // Paginate
  const start = (page - 1) * limit;
  const items = filtered.slice(start, start + limit);

  return {
    data: items,
    meta: {
      total: filtered.length,
      page,
      limit,
      totalPages: Math.ceil(filtered.length / limit),
    },
  };
}
