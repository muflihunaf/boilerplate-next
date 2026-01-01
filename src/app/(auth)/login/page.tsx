"use client";

import { useActionState, useEffect } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import Link from "next/link";
import { loginAction, type LoginFormState } from "@/lib/auth/actions";
import { Container } from "@/components/layout";

export default function LoginPage() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const callbackUrl = searchParams.get("callbackUrl") || "/dashboard";

  const [state, formAction, isPending] = useActionState<LoginFormState | undefined, FormData>(
    loginAction,
    undefined
  );

  // Redirect on successful login
  useEffect(() => {
    if (state?.success) {
      router.push(callbackUrl);
      router.refresh();
    }
  }, [state?.success, callbackUrl, router]);

  return (
    <div className="flex min-h-screen items-center justify-center px-4 py-12">
      <Container size="sm" className="w-full max-w-sm">
        {/* Header */}
        <div className="mb-8 text-center">
          <h1 className="text-2xl font-semibold tracking-tight">Sign in</h1>
          <p className="mt-2 text-sm text-muted">
            Enter your credentials to continue
          </p>
        </div>

        {/* Form */}
        <form action={formAction} className="space-y-4">
          {/* General error message */}
          {state?.message && (
            <div 
              className="rounded-lg border border-error/20 bg-error/5 px-4 py-3 text-sm text-error"
              role="alert"
            >
              {state.message}
            </div>
          )}

          {/* Email field */}
          <div className="space-y-1.5">
            <label htmlFor="email" className="block text-sm font-medium">
              Email
            </label>
            <input
              id="email"
              name="email"
              type="email"
              placeholder="you@example.com"
              autoComplete="email"
              autoFocus
              aria-describedby={state?.errors?.email ? "email-error" : undefined}
              className={`
                block w-full rounded-lg border bg-background px-3 py-2.5 text-sm
                placeholder:text-muted
                focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 focus:ring-offset-background
                disabled:cursor-not-allowed disabled:opacity-50
                ${state?.errors?.email ? "border-error" : "border-border"}
              `}
            />
            {state?.errors?.email && (
              <p id="email-error" className="text-sm text-error" role="alert">
                {state.errors.email}
              </p>
            )}
          </div>

          {/* Password field */}
          <div className="space-y-1.5">
            <div className="flex items-center justify-between">
              <label htmlFor="password" className="block text-sm font-medium">
                Password
              </label>
              <Link
                href="/forgot-password"
                className="text-sm text-muted no-underline hover:text-foreground"
              >
                Forgot password?
              </Link>
            </div>
            <input
              id="password"
              name="password"
              type="password"
              placeholder="••••••••"
              autoComplete="current-password"
              aria-describedby={state?.errors?.password ? "password-error" : undefined}
              className={`
                block w-full rounded-lg border bg-background px-3 py-2.5 text-sm
                placeholder:text-muted
                focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 focus:ring-offset-background
                disabled:cursor-not-allowed disabled:opacity-50
                ${state?.errors?.password ? "border-error" : "border-border"}
              `}
            />
            {state?.errors?.password && (
              <p id="password-error" className="text-sm text-error" role="alert">
                {state.errors.password}
              </p>
            )}
          </div>

          {/* Submit button */}
          <button
            type="submit"
            disabled={isPending}
            className="
              flex w-full items-center justify-center gap-2 rounded-lg 
              bg-foreground px-4 py-2.5 text-sm font-medium text-background
              transition-opacity hover:opacity-90
              focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 focus:ring-offset-background
              disabled:cursor-not-allowed disabled:opacity-50
            "
          >
            {isPending ? (
              <>
                <svg
                  className="h-4 w-4 animate-spin"
                  fill="none"
                  viewBox="0 0 24 24"
                >
                  <circle
                    className="opacity-25"
                    cx="12"
                    cy="12"
                    r="10"
                    stroke="currentColor"
                    strokeWidth="4"
                  />
                  <path
                    className="opacity-75"
                    fill="currentColor"
                    d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                  />
                </svg>
                <span>Signing in...</span>
              </>
            ) : (
              "Sign in"
            )}
          </button>
        </form>

        {/* Divider */}
        <div className="relative my-6">
          <div className="absolute inset-0 flex items-center">
            <div className="w-full border-t border-border" />
          </div>
          <div className="relative flex justify-center text-xs uppercase">
            <span className="bg-background px-2 text-muted">Demo</span>
          </div>
        </div>

        {/* Demo credentials */}
        <div className="rounded-lg border border-border bg-surface/50 p-4 text-sm">
          <div className="flex items-start gap-3">
            <div className="mt-0.5 rounded-full bg-info/10 p-1">
              <svg className="h-3.5 w-3.5 text-info" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            </div>
            <div className="space-y-1">
              <p className="font-medium">Test credentials</p>
              <p className="text-muted">
                <span className="select-all">demo@example.com</span> / <span className="select-all">password</span>
              </p>
            </div>
          </div>
        </div>

        {/* Footer */}
        <p className="mt-6 text-center text-sm text-muted">
          Don&apos;t have an account?{" "}
          <Link href="/register" className="font-medium text-foreground">
            Create one
          </Link>
        </p>
      </Container>
    </div>
  );
}
