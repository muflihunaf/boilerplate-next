import Link from "next/link";
import { notFound } from "next/navigation";
import { requireAuth } from "@/lib/auth/guard";
import { getUser } from "@/lib/api";
import { Container } from "@/components/layout";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { formatDate } from "@/lib/utils";
import { DeleteUserButton } from "./delete-button";

interface UserDetailPageProps {
  params: Promise<{ id: string }>;
}

export async function generateMetadata({ params }: UserDetailPageProps) {
  const { id } = await params;
  const user = await getUser(id);
  return {
    title: user ? user.name : "User Not Found",
  };
}

export default async function UserDetailPage({ params }: UserDetailPageProps) {
  await requireAuth();
  const { id } = await params;
  const user = await getUser(id);

  if (!user) {
    notFound();
  }

  return (
    <div className="py-12">
      <Container size="lg">
        {/* Header */}
        <div className="mb-8">
          <Link
            href="/users"
            className="text-muted hover:text-foreground mb-4 inline-flex items-center gap-1 text-sm no-underline"
          >
            <ChevronLeftIcon className="h-4 w-4" />
            Back to Users
          </Link>
          <div className="flex items-start justify-between">
            <div className="flex items-center gap-4">
              <div className="bg-surface flex h-16 w-16 items-center justify-center rounded-full text-2xl font-semibold">
                {user.name.charAt(0).toUpperCase()}
              </div>
              <div>
                <h1 className="text-2xl font-bold">{user.name}</h1>
                <p className="text-muted">{user.email}</p>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <Link href={`/users/${id}/edit`}>
                <Button variant="outline">Edit</Button>
              </Link>
              <DeleteUserButton userId={id} userName={user.name} />
            </div>
          </div>
        </div>

        {/* User Details */}
        <div className="grid gap-6 md:grid-cols-2">
          <Card>
            <h2 className="mb-4 text-lg font-semibold">Profile Information</h2>
            <dl className="space-y-4">
              <div>
                <dt className="text-muted text-sm font-medium">Full Name</dt>
                <dd className="mt-1">{user.name}</dd>
              </div>
              <div>
                <dt className="text-muted text-sm font-medium">Email Address</dt>
                <dd className="mt-1">{user.email}</dd>
              </div>
              <div>
                <dt className="text-muted text-sm font-medium">User ID</dt>
                <dd className="mt-1 font-mono text-sm">{user.id}</dd>
              </div>
            </dl>
          </Card>

          <Card>
            <h2 className="mb-4 text-lg font-semibold">Account Details</h2>
            <dl className="space-y-4">
              <div>
                <dt className="text-muted text-sm font-medium">Role</dt>
                <dd className="mt-1">
                  <span
                    className={`inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium ${
                      user.role === "admin" ? "bg-info/10 text-info" : "bg-surface text-muted"
                    }`}
                  >
                    {user.role || "user"}
                  </span>
                </dd>
              </div>
              <div>
                <dt className="text-muted text-sm font-medium">Status</dt>
                <dd className="mt-1">
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
                </dd>
              </div>
              <div>
                <dt className="text-muted text-sm font-medium">Created</dt>
                <dd className="mt-1">{formatDate(user.createdAt)}</dd>
              </div>
              <div>
                <dt className="text-muted text-sm font-medium">Last Updated</dt>
                <dd className="mt-1">{formatDate(user.updatedAt)}</dd>
              </div>
            </dl>
          </Card>
        </div>
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
