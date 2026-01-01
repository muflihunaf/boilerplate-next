import { redirect } from "next/navigation";
import { getUser, logout } from "@/lib/auth";
import { Container } from "@/components/layout";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";

export const metadata = {
  title: "Dashboard",
};

export default async function DashboardPage() {
  const user = await getUser();

  // Double-check auth (middleware should catch this, but just in case)
  if (!user) {
    redirect("/login");
  }

  return (
    <div className="py-12">
      <Container size="lg">
        {/* Header */}
        <div className="mb-8 flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold">Dashboard</h1>
            <p className="mt-1 text-muted">Welcome back, {user.name}</p>
          </div>

          <form action={logout}>
            <Button variant="outline" type="submit">
              Sign out
            </Button>
          </form>
        </div>

        {/* Content */}
        <div className="grid gap-6 md:grid-cols-3">
          <Card>
            <h3 className="mb-2 font-semibold">Profile</h3>
            <div className="space-y-1 text-sm text-muted">
              <p>Name: {user.name}</p>
              <p>Email: {user.email}</p>
              <p>ID: {user.id}</p>
            </div>
          </Card>

          <Card>
            <h3 className="mb-2 font-semibold">Quick Stats</h3>
            <div className="space-y-1 text-sm text-muted">
              <p>Projects: 12</p>
              <p>Tasks: 48</p>
              <p>Completed: 36</p>
            </div>
          </Card>

          <Card>
            <h3 className="mb-2 font-semibold">Recent Activity</h3>
            <p className="text-sm text-muted">No recent activity</p>
          </Card>
        </div>

        {/* Info box */}
        <div className="mt-8 rounded-lg border border-border bg-surface p-6">
          <h2 className="mb-2 font-semibold">🔒 Protected Route</h2>
          <p className="text-sm text-muted">
            This page is protected by the auth middleware. Unauthenticated users
            are automatically redirected to the login page. The session is stored
            in an HTTP-only cookie for security.
          </p>
        </div>
      </Container>
    </div>
  );
}

