import Link from "next/link";
import { Container } from "./container";

interface HeaderProps {
  /** Site/brand name */
  siteName?: string;
}

/**
 * Minimal header component
 * Add navigation items as needed
 */
export function Header({ siteName = "Boilerplate" }: HeaderProps) {
  return (
    <header className="sticky top-0 z-40 w-full border-b border-border bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <Container size="xl" className="flex h-14 items-center justify-between">
        {/* Logo/Brand */}
        <Link
          href="/"
          className="font-semibold no-underline transition-opacity hover:opacity-70"
        >
          {siteName}
        </Link>

        {/* Navigation - extend as needed */}
        <nav className="flex items-center gap-6">
          <Link
            href="/"
            className="text-sm text-muted no-underline transition-colors hover:text-foreground"
          >
            Home
          </Link>
          {/* Add more links here */}
        </nav>
      </Container>
    </header>
  );
}

