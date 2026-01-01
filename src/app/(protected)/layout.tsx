import Link from "next/link";
import { Container } from "@/components/layout";

/**
 * Protected layout
 * Wraps all authenticated pages
 */
export default function ProtectedLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      {/* Simple navigation header */}
      <header className="border-b border-border bg-background">
        <Container size="lg" className="flex h-14 items-center justify-between">
          <Link href="/dashboard" className="font-semibold no-underline">
            Dashboard
          </Link>
          <nav className="flex items-center gap-4">
            <Link
              href="/dashboard"
              className="text-sm text-muted no-underline hover:text-foreground"
            >
              Home
            </Link>
            <Link
              href="/settings"
              className="text-sm text-muted no-underline hover:text-foreground"
            >
              Settings
            </Link>
          </nav>
        </Container>
      </header>

      {/* Page content */}
      <main className="flex-1">{children}</main>
    </>
  );
}

