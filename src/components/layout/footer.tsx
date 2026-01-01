import { Container } from "./container";

interface FooterProps {
  /** Company/site name for copyright */
  siteName?: string;
}

/**
 * Minimal footer component
 */
export function Footer({ siteName = "Boilerplate" }: FooterProps) {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="mt-auto border-t border-border py-6">
      <Container size="xl" className="flex flex-col items-center justify-between gap-4 sm:flex-row">
        <p className="text-sm text-muted">
          © {currentYear} {siteName}. All rights reserved.
        </p>

        {/* Footer links - extend as needed */}
        <nav className="flex items-center gap-4">
          <a
            href="#"
            className="text-sm text-muted no-underline transition-colors hover:text-foreground"
          >
            Privacy
          </a>
          <a
            href="#"
            className="text-sm text-muted no-underline transition-colors hover:text-foreground"
          >
            Terms
          </a>
        </nav>
      </Container>
    </footer>
  );
}

