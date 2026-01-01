import { requireAuth } from "@/lib/auth/guard";
import { Container } from "@/components/layout";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

export const metadata = {
  title: "Settings",
};

export default async function SettingsPage() {
  // One line to protect the page
  const user = await requireAuth();

  return (
    <div className="py-12">
      <Container size="lg">
        <div className="mb-8">
          <h1 className="text-2xl font-bold">Settings</h1>
          <p className="mt-1 text-muted">Manage your account settings</p>
        </div>

        <div className="space-y-6">
          {/* Profile Settings */}
          <Card>
            <h2 className="mb-4 text-lg font-semibold">Profile</h2>
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium">Name</label>
                <input
                  type="text"
                  defaultValue={user.name}
                  className="mt-1 block w-full max-w-md rounded-lg border border-border bg-background px-3 py-2 text-sm"
                  disabled
                />
              </div>
              <div>
                <label className="block text-sm font-medium">Email</label>
                <input
                  type="email"
                  defaultValue={user.email}
                  className="mt-1 block w-full max-w-md rounded-lg border border-border bg-background px-3 py-2 text-sm"
                  disabled
                />
              </div>
              <Button variant="secondary" disabled>
                Save changes
              </Button>
            </div>
          </Card>

          {/* Security Settings */}
          <Card>
            <h2 className="mb-4 text-lg font-semibold">Security</h2>
            <div className="space-y-4">
              <div>
                <h3 className="text-sm font-medium">Password</h3>
                <p className="text-sm text-muted">
                  Last changed: Never
                </p>
              </div>
              <Button variant="outline" disabled>
                Change password
              </Button>
            </div>
          </Card>

          {/* Danger Zone */}
          <Card className="border-error/20">
            <h2 className="mb-4 text-lg font-semibold text-error">Danger Zone</h2>
            <p className="mb-4 text-sm text-muted">
              Once you delete your account, there is no going back.
            </p>
            <Button variant="destructive" disabled>
              Delete account
            </Button>
          </Card>
        </div>
      </Container>
    </div>
  );
}

