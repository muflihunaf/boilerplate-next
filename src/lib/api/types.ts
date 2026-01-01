/**
 * API Types
 */

/**
 * Request configuration options
 */
export interface RequestConfig extends Omit<RequestInit, "body" | "method"> {
  /** Base URL for the API */
  baseUrl?: string;
  /** Query parameters */
  params?: Record<string, string>;
  /** Request body (will be JSON stringified) */
  body?: unknown;
}

/**
 * Successful API response
 */
export interface ApiResponse<T> {
  data: T;
  status: number;
  ok: boolean;
}

/**
 * Paginated response from backend
 */
export interface PaginatedData<T> {
  items: T[];
  total: number;
  page: number;
  limit: number;
  totalPages: number;
}

/**
 * Common query params for lists
 */
export interface ListParams {
  page?: string;
  limit?: string;
  search?: string;
  sort?: string;
  order?: "asc" | "desc";
}

