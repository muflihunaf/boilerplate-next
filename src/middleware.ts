import { NextRequest, NextResponse } from "next/server";

/**
 * Auth Middleware
 * Protects routes and handles auth redirects
 */

// Routes that require authentication
const protectedRoutes = ["/dashboard", "/settings", "/profile"];

// Routes that should redirect to dashboard if already authenticated
const authRoutes = ["/login", "/register"];

// Check if path matches any pattern
function matchesRoute(path: string, routes: string[]): boolean {
  return routes.some(
    (route) => path === route || path.startsWith(route + "/")
  );
}

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  // Get session cookie
  const sessionCookie = request.cookies.get("session");
  const isAuthenticated = !!sessionCookie?.value;

  // Check if trying to access protected route without auth
  if (matchesRoute(pathname, protectedRoutes) && !isAuthenticated) {
    const loginUrl = new URL("/login", request.url);
    // Store the attempted URL to redirect back after login
    loginUrl.searchParams.set("callbackUrl", pathname);
    return NextResponse.redirect(loginUrl);
  }

  // Redirect authenticated users away from auth pages
  if (matchesRoute(pathname, authRoutes) && isAuthenticated) {
    return NextResponse.redirect(new URL("/dashboard", request.url));
  }

  return NextResponse.next();
}

// Configure which routes use this middleware
export const config = {
  matcher: [
    /*
     * Match all request paths except:
     * - api (API routes)
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico (favicon file)
     * - public files (images, etc.)
     */
    "/((?!api|_next/static|_next/image|favicon.ico|.*\\.(?:svg|png|jpg|jpeg|gif|webp)$).*)",
  ],
};

