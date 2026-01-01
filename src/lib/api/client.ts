/**
 * API Client
 * A simple, testable fetch wrapper with auth and error handling
 */

import { ApiError, isApiError } from "./errors";
import type { RequestConfig, ApiResponse } from "./types";

/**
 * Default configuration
 */
const DEFAULT_BASE_URL = process.env.NEXT_PUBLIC_API_URL || "/api";

const defaultHeaders: HeadersInit = {
  "Content-Type": "application/json",
};

/**
 * Token getter function type
 * Allows different auth strategies (cookie, localStorage, etc.)
 */
type TokenGetter = () => string | null | Promise<string | null>;

let getAuthToken: TokenGetter = () => null;

/**
 * Set the auth token getter function
 * Call this once during app initialization
 */
export function setAuthTokenGetter(getter: TokenGetter): void {
  getAuthToken = getter;
}

/**
 * Build full URL with query params
 */
function buildUrl(endpoint: string, baseUrl: string, params?: Record<string, string>): string {
  const url = new URL(endpoint, baseUrl);
  
  if (params) {
    Object.entries(params).forEach(([key, value]) => {
      if (value !== undefined && value !== null) {
        url.searchParams.set(key, value);
      }
    });
  }
  
  return url.toString();
}

/**
 * Merge headers with auth token
 */
async function buildHeaders(customHeaders?: HeadersInit): Promise<Headers> {
  const headers = new Headers(defaultHeaders);
  
  // Add custom headers
  if (customHeaders) {
    const custom = new Headers(customHeaders);
    custom.forEach((value, key) => headers.set(key, value));
  }
  
  // Add auth token if available
  const token = await getAuthToken();
  if (token) {
    headers.set("Authorization", `Bearer ${token}`);
  }
  
  return headers;
}

/**
 * Parse response based on content type
 */
async function parseResponse<T>(response: Response): Promise<T | null> {
  const contentType = response.headers.get("content-type");
  
  if (!contentType) {
    return null;
  }
  
  if (contentType.includes("application/json")) {
    const text = await response.text();
    return text ? JSON.parse(text) : null;
  }
  
  return response.text() as unknown as T;
}

/**
 * Handle error responses
 */
async function handleErrorResponse(response: Response): Promise<never> {
  let message = response.statusText;
  let data: unknown = null;
  
  try {
    const body = await response.text();
    if (body) {
      const parsed = JSON.parse(body);
      message = parsed.message || parsed.error || message;
      data = parsed;
    }
  } catch {
    // Use default message
  }
  
  throw new ApiError(response.status, message, data);
}

/**
 * Core request function
 */
async function request<T>(
  method: string,
  endpoint: string,
  config: RequestConfig = {}
): Promise<ApiResponse<T | null>> {
  const {
    baseUrl = DEFAULT_BASE_URL,
    params,
    headers: customHeaders,
    body,
    ...fetchOptions
  } = config;

  const url = buildUrl(endpoint, baseUrl, params);
  const headers = await buildHeaders(customHeaders);

  try {
    const response = await fetch(url, {
      method,
      headers,
      body: body ? JSON.stringify(body) : undefined,
      credentials: "include",
      ...fetchOptions,
    });

    if (!response.ok) {
      await handleErrorResponse(response);
    }

    const data = await parseResponse<T>(response);

    return {
      data,
      status: response.status,
      ok: true,
    };
  } catch (error) {
    // Re-throw API errors
    if (isApiError(error)) {
      throw error;
    }
    
    // Wrap unexpected errors
    throw new ApiError(0, error instanceof Error ? error.message : "Network error");
  }
}

/**
 * API Client object
 * Simple interface for all HTTP methods
 */
export const api = {
  get<T>(endpoint: string, config?: RequestConfig): Promise<ApiResponse<T | null>> {
    return request<T>("GET", endpoint, config);
  },

  post<T>(endpoint: string, body?: unknown, config?: RequestConfig): Promise<ApiResponse<T | null>> {
    return request<T>("POST", endpoint, { ...config, body });
  },

  put<T>(endpoint: string, body?: unknown, config?: RequestConfig): Promise<ApiResponse<T | null>> {
    return request<T>("PUT", endpoint, { ...config, body });
  },

  patch<T>(endpoint: string, body?: unknown, config?: RequestConfig): Promise<ApiResponse<T | null>> {
    return request<T>("PATCH", endpoint, { ...config, body });
  },

  delete<T>(endpoint: string, config?: RequestConfig): Promise<ApiResponse<T | null>> {
    return request<T>("DELETE", endpoint, config);
  },
};
