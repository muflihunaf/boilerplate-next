import { Suspense } from "react";
import Link from "next/link";
import { requireAuth } from "@/lib/auth/guard";
import { getUsers } from "@/lib/api";
import { Container } from "@/components/layout";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/loader";
import { formatDate } from "@/lib/utils";
import type { User } from "@/types";

export const metadata = {
  title: "Users",
};

interface UsersPageProps {
  searchParams: Promise<{ page?: string; search?: string }>;
}

export default async function UsersPage({ searchParams }: UsersPageProps) {
  await requireAuth();
  const params = await searchParams;

  return (
    <div className="py-12">
      <Container size="lg">
        {/* Header */}
        <div className="mb-8 flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold">Users</h1>
            <p className="text-muted mt-1">Manage your team members</p>
          </div>
          <Link href="/users/new">
            <Button>
              <PlusIcon className="h-4 w-4" />
              Add User
            </Button>
          </Link>
        </div>

        {/* Search */}
        <div className="mb-6">
          <SearchForm initialSearch={params.search} />
        </div>

        {/* Users List */}
        <Suspense fallback={<UsersTableSkeleton />}>
          <UsersTable page={Number(params.page) || 1} search={params.search} />
        </Suspense>
      </Container>
    </div>
  );
}

/**
 * Search form component
 */
function SearchForm({ initialSearch }: { initialSearch?: string }) {
  return (
    <form className="flex gap-3">
      <input
        type="text"
        name="search"
        placeholder="Search users..."
        defaultValue={initialSearch}
        className="border-border bg-background placeholder:text-muted focus-visible:ring-ring flex h-10 w-full max-w-sm rounded-lg border px-3 py-2 text-sm focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:outline-none"
      />
      <Button type="submit" variant="secondary">
        Search
      </Button>
    </form>
  );
}

/**
 * Users table with data fetching
 */
async function UsersTable({ page, search }: { page: number; search?: string }) {
  const { data: users, meta } = await getUsers({ page, limit: 10, search });

  if (users.length === 0) {
    return (
      <Card className="flex flex-col items-center justify-center py-12">
        <UsersIcon className="text-muted h-12 w-12" />
        <h3 className="mt-4 text-lg font-medium">No users found</h3>
        <p className="text-muted mt-1 text-sm">
          {search ? "Try a different search term" : "Get started by adding a new user"}
        </p>
        {!search && (
          <Link href="/users/new" className="mt-4">
            <Button>Add User</Button>
          </Link>
        )}
      </Card>
    );
  }

  return (
    <>
      {/* Table */}
      <Card noPadding>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-border bg-surface/50 border-b">
                <th className="text-muted px-6 py-3 text-left text-xs font-medium tracking-wider uppercase">
                  User
                </th>
                <th className="text-muted px-6 py-3 text-left text-xs font-medium tracking-wider uppercase">
                  Role
                </th>
                <th className="text-muted px-6 py-3 text-left text-xs font-medium tracking-wider uppercase">
                  Status
                </th>
                <th className="text-muted px-6 py-3 text-left text-xs font-medium tracking-wider uppercase">
                  Created
                </th>
                <th className="text-muted px-6 py-3 text-right text-xs font-medium tracking-wider uppercase">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="divide-border divide-y">
              {users.map((user) => (
                <UserRow key={user.id} user={user} />
              ))}
            </tbody>
          </table>
        </div>
      </Card>

      {/* Pagination */}
      {meta.totalPages > 1 && (
        <div className="mt-6 flex items-center justify-between">
          <p className="text-muted text-sm">
            Showing {(page - 1) * meta.limit + 1} to {Math.min(page * meta.limit, meta.total)} of{" "}
            {meta.total} users
          </p>
          <div className="flex gap-2">
            {page > 1 && (
              <Link href={`/users?page=${page - 1}${search ? `&search=${search}` : ""}`}>
                <Button variant="outline" size="sm">
                  Previous
                </Button>
              </Link>
            )}
            {page < meta.totalPages && (
              <Link href={`/users?page=${page + 1}${search ? `&search=${search}` : ""}`}>
                <Button variant="outline" size="sm">
                  Next
                </Button>
              </Link>
            )}
          </div>
        </div>
      )}
    </>
  );
}

/**
 * Individual user row
 */
function UserRow({ user }: { user: User }) {
  return (
    <tr className="hover:bg-surface/50 transition-colors">
      <td className="px-6 py-4 whitespace-nowrap">
        <div className="flex items-center gap-3">
          <div className="bg-surface flex h-10 w-10 items-center justify-center rounded-full text-sm font-medium">
            {user.name.charAt(0).toUpperCase()}
          </div>
          <div>
            <div className="font-medium">{user.name}</div>
            <div className="text-muted text-sm">{user.email}</div>
          </div>
        </div>
      </td>
      <td className="px-6 py-4 whitespace-nowrap">
        <span
          className={`inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium ${
            user.role === "admin" ? "bg-info/10 text-info" : "bg-surface text-muted"
          }`}
        >
          {user.role || "user"}
        </span>
      </td>
      <td className="px-6 py-4 whitespace-nowrap">
        <span
          className={`inline-flex items-center gap-1.5 text-sm ${
            user.status === "active" ? "text-success" : "text-muted"
          }`}
        >
          <span
            className={`h-2 w-2 rounded-full ${
              user.status === "active" ? "bg-success" : "bg-muted"
            }`}
          />
          {user.status || "active"}
        </span>
      </td>
      <td className="text-muted px-6 py-4 text-sm whitespace-nowrap">
        {formatDate(user.createdAt)}
      </td>
      <td className="px-6 py-4 text-right whitespace-nowrap">
        <div className="flex items-center justify-end gap-2">
          <Link href={`/users/${user.id}`}>
            <Button variant="ghost" size="sm">
              View
            </Button>
          </Link>
          <Link href={`/users/${user.id}/edit`}>
            <Button variant="ghost" size="sm">
              Edit
            </Button>
          </Link>
        </div>
      </td>
    </tr>
  );
}

/**
 * Table skeleton for loading state
 */
function UsersTableSkeleton() {
  return (
    <Card noPadding>
      <div className="overflow-x-auto">
        <table className="w-full">
          <thead>
            <tr className="border-border bg-surface/50 border-b">
              <th className="px-6 py-3 text-left">
                <Skeleton className="h-4 w-16" />
              </th>
              <th className="px-6 py-3 text-left">
                <Skeleton className="h-4 w-12" />
              </th>
              <th className="px-6 py-3 text-left">
                <Skeleton className="h-4 w-14" />
              </th>
              <th className="px-6 py-3 text-left">
                <Skeleton className="h-4 w-16" />
              </th>
              <th className="px-6 py-3 text-right">
                <Skeleton className="ml-auto h-4 w-16" />
              </th>
            </tr>
          </thead>
          <tbody className="divide-border divide-y">
            {[...Array(5)].map((_, i) => (
              <tr key={i}>
                <td className="px-6 py-4">
                  <div className="flex items-center gap-3">
                    <Skeleton className="h-10 w-10 rounded-full" />
                    <div>
                      <Skeleton className="h-4 w-24" />
                      <Skeleton className="mt-1 h-3 w-32" />
                    </div>
                  </div>
                </td>
                <td className="px-6 py-4">
                  <Skeleton className="h-5 w-14 rounded-full" />
                </td>
                <td className="px-6 py-4">
                  <Skeleton className="h-4 w-16" />
                </td>
                <td className="px-6 py-4">
                  <Skeleton className="h-4 w-24" />
                </td>
                <td className="px-6 py-4">
                  <div className="flex justify-end gap-2">
                    <Skeleton className="h-8 w-12" />
                    <Skeleton className="h-8 w-12" />
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </Card>
  );
}

/**
 * Plus icon
 */
function PlusIcon({ className }: { className?: string }) {
  return (
    <svg
      className={className}
      fill="none"
      viewBox="0 0 24 24"
      stroke="currentColor"
      strokeWidth={2}
    >
      <path strokeLinecap="round" strokeLinejoin="round" d="M12 4v16m8-8H4" />
    </svg>
  );
}

/**
 * Users icon
 */
function UsersIcon({ className }: { className?: string }) {
  return (
    <svg
      className={className}
      fill="none"
      viewBox="0 0 24 24"
      stroke="currentColor"
      strokeWidth={1.5}
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M15 19.128a9.38 9.38 0 002.625.372 9.337 9.337 0 004.121-.952 4.125 4.125 0 00-7.533-2.493M15 19.128v-.003c0-1.113-.285-2.16-.786-3.07M15 19.128v.106A12.318 12.318 0 018.624 21c-2.331 0-4.512-.645-6.374-1.766l-.001-.109a6.375 6.375 0 0111.964-3.07M12 6.375a3.375 3.375 0 11-6.75 0 3.375 3.375 0 016.75 0zm8.25 2.25a2.625 2.625 0 11-5.25 0 2.625 2.625 0 015.25 0z"
      />
    </svg>
  );
}
