"use client";

import { useActionState, useEffect } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { Container } from "@/components/layout";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { createUserAction, type UserFormState } from "../actions";

export default function NewUserPage() {
  const router = useRouter();
  const [state, formAction, isPending] = useActionState<UserFormState | undefined, FormData>(
    createUserAction,
    undefined
  );

  // Redirect on success
  useEffect(() => {
    if (state?.success) {
      router.push("/users");
      router.refresh();
    }
  }, [state?.success, router]);

  return (
    <div className="py-12">
      <Container size="lg">
        {/* Header */}
        <div className="mb-8">
          <Link
            href="/users"
            className="mb-4 inline-flex items-center gap-1 text-sm text-muted no-underline hover:text-foreground"
          >
            <ChevronLeftIcon className="h-4 w-4" />
            Back to Users
          </Link>
          <h1 className="text-2xl font-bold">Add New User</h1>
          <p className="mt-1 text-muted">Create a new team member account</p>
        </div>

        {/* Form */}
        <Card className="max-w-xl">
          <form action={formAction} className="space-y-6">
            {/* Error message */}
            {state?.message && !state.success && (
              <div
                className="rounded-lg border border-error/20 bg-error/5 px-4 py-3 text-sm text-error"
                role="alert"
              >
                {state.message}
              </div>
            )}

            {/* Name field */}
            <Input
              name="name"
              label="Full Name"
              placeholder="John Doe"
              error={state?.errors?.name}
              required
            />

            {/* Email field */}
            <Input
              name="email"
              type="email"
              label="Email Address"
              placeholder="john@example.com"
              error={state?.errors?.email}
              required
            />

            {/* Role field */}
            <div className="w-full">
              <label htmlFor="role" className="mb-1.5 block text-sm font-medium">
                Role
              </label>
              <select
                id="role"
                name="role"
                className="flex h-10 w-full rounded-lg border border-border bg-background px-3 py-2 text-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
                defaultValue="user"
                required
              >
                <option value="user">User</option>
                <option value="admin">Admin</option>
              </select>
              {state?.errors?.role && (
                <p className="mt-1.5 text-sm text-error" role="alert">
                  {state.errors.role}
                </p>
              )}
            </div>

            {/* Actions */}
            <div className="flex items-center gap-3 pt-2">
              <Button type="submit" isLoading={isPending}>
                Create User
              </Button>
              <Link href="/users">
                <Button type="button" variant="outline">
                  Cancel
                </Button>
              </Link>
            </div>
          </form>
        </Card>
      </Container>
    </div>
  );
}

/**
 * Chevron left icon
 */
function ChevronLeftIcon({ className }: { className?: string }) {
  return (
    <svg
      className={className}
      fill="none"
      viewBox="0 0 24 24"
      stroke="currentColor"
      strokeWidth={2}
    >
      <path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" />
    </svg>
  );
}

