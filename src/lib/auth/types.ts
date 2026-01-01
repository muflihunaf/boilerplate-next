/**
 * Auth types
 */

export interface User {
  id: string;
  email: string;
  name: string;
}

export interface Session {
  user: User;
  accessToken: string;
  expiresAt: number;
}

export interface LoginCredentials {
  email: string;
  password: string;
}

export interface AuthResponse {
  user: User;
  accessToken: string;
  expiresIn: number;
}

export type AuthError = {
  message: string;
  code?: string;
};

