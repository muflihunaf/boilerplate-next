"use client";

import { useActionState, useEffect, useCallback } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { updateUserAction, type UserFormState } from "../../actions";
import type { User } from "@/types";

interface EditUserFormProps {
  user: User;
}

export function EditUserForm({ user }: EditUserFormProps) {
  const router = useRouter();

  // Bind the user ID to the action
  const boundUpdateAction = useCallback(
    (prevState: UserFormState | undefined, formData: FormData) =>
      updateUserAction(user.id, prevState, formData),
    [user.id]
  );

  const [state, formAction, isPending] = useActionState<UserFormState | undefined, FormData>(
    boundUpdateAction,
    undefined
  );

  // Redirect on success
  useEffect(() => {
    if (state?.success) {
      router.push(`/users/${user.id}`);
      router.refresh();
    }
  }, [state?.success, router, user.id]);

  return (
    <>
      {/* Header */}
      <div className="mb-8">
        <Link
          href={`/users/${user.id}`}
          className="mb-4 inline-flex items-center gap-1 text-sm text-muted no-underline hover:text-foreground"
        >
          <ChevronLeftIcon className="h-4 w-4" />
          Back to User
        </Link>
        <h1 className="text-2xl font-bold">Edit User</h1>
        <p className="mt-1 text-muted">Update {user.name}&apos;s account details</p>
      </div>

      {/* Form */}
      <Card className="max-w-xl">
        <form action={formAction} className="space-y-6">
          {/* Success message */}
          {state?.success && state?.message && (
            <div
              className="rounded-lg border border-success/20 bg-success/5 px-4 py-3 text-sm text-success"
              role="status"
            >
              {state.message}
            </div>
          )}

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
            defaultValue={user.name}
            error={state?.errors?.name}
          />

          {/* Email field */}
          <Input
            name="email"
            type="email"
            label="Email Address"
            placeholder="john@example.com"
            defaultValue={user.email}
            error={state?.errors?.email}
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
              defaultValue={user.role || "user"}
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

          {/* Status field */}
          <div className="w-full">
            <label htmlFor="status" className="mb-1.5 block text-sm font-medium">
              Status
            </label>
            <select
              id="status"
              name="status"
              className="flex h-10 w-full rounded-lg border border-border bg-background px-3 py-2 text-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
              defaultValue={user.status || "active"}
            >
              <option value="active">Active</option>
              <option value="inactive">Inactive</option>
            </select>
          </div>

          {/* Actions */}
          <div className="flex items-center gap-3 pt-2">
            <Button type="submit" isLoading={isPending}>
              Save Changes
            </Button>
            <Link href={`/users/${user.id}`}>
              <Button type="button" variant="outline">
                Cancel
              </Button>
            </Link>
          </div>
        </form>
      </Card>
    </>
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

