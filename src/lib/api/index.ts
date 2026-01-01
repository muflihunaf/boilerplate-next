// API exports
export { api, setAuthTokenGetter } from "./client";
export { ApiError, isApiError, getErrorMessage } from "./errors";
export type { RequestConfig, ApiResponse, PaginatedData, ListParams } from "./types";

// Server API is exported separately due to "use server" directive
// Use: import { serverApi } from "@/lib/api/server"
