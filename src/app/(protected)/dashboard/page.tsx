import { requireAuth } from "@/lib/auth/guard";
import { logout } from "@/lib/auth";
import { Container } from "@/components/layout";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";

export const metadata = {
  title: "Dashboard",
};

export default async function DashboardPage() {
  // Require authentication - redirects to login if not authenticated
  const user = await requireAuth();

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
            This page uses <code className="rounded bg-surface px-1.5 py-0.5 text-foreground">requireAuth()</code> to 
            ensure only authenticated users can access it. Unauthenticated users are 
            automatically redirected to the login page.
          </p>
        </div>
      </Container>
    </div>
  );
}
