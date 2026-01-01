/**
 * API Error handling
 */

/**
 * Custom API error class
 * Provides structured error information
 */
export class ApiError extends Error {
  constructor(
    public readonly status: number,
    message: string,
    public readonly data?: unknown
  ) {
    super(message);
    this.name = "ApiError";
  }

  /**
   * Check if error is a specific status code
   */
  is(status: number): boolean {
    return this.status === status;
  }

  /**
   * Common status checks
   */
  get isUnauthorized(): boolean {
    return this.status === 401;
  }

  get isForbidden(): boolean {
    return this.status === 403;
  }

  get isNotFound(): boolean {
    return this.status === 404;
  }

  get isValidationError(): boolean {
    return this.status === 422;
  }

  get isServerError(): boolean {
    return this.status >= 500;
  }

  get isNetworkError(): boolean {
    return this.status === 0;
  }
}

/**
 * Type guard for ApiError
 */
export function isApiError(error: unknown): error is ApiError {
  return error instanceof ApiError;
}

/**
 * Extract user-friendly message from error
 */
export function getErrorMessage(error: unknown): string {
  if (isApiError(error)) {
    // Handle common cases
    if (error.isUnauthorized) {
      return "Please sign in to continue";
    }
    if (error.isForbidden) {
      return "You don't have permission to do this";
    }
    if (error.isNotFound) {
      return "The requested resource was not found";
    }
    if (error.isNetworkError) {
      return "Unable to connect. Please check your internet connection";
    }
    if (error.isServerError) {
      return "Something went wrong. Please try again later";
    }
    return error.message;
  }

  if (error instanceof Error) {
    return error.message;
  }

  return "An unexpected error occurred";
}

