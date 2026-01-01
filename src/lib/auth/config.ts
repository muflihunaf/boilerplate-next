/**
 * Auth configuration
 */

export const authConfig = {
  // Cookie settings
  cookieName: "session",
  cookieOptions: {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax" as const,
    path: "/",
    // 7 days in seconds
    maxAge: 60 * 60 * 24 * 7,
  },

  // Routes
  routes: {
    login: "/login",
    dashboard: "/dashboard",
    home: "/",
  },

  // Protected route patterns
  protectedRoutes: ["/dashboard", "/settings", "/profile"],
  publicRoutes: ["/", "/login", "/register"],
} as const;

