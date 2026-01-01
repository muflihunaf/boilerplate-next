import { Container } from "@/components/layout";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";

export default function HomePage() {
  return (
    <>
      {/* Hero Section */}
      <section className="flex flex-1 items-center py-16 md:py-24">
        <Container size="lg" className="text-center">
          <p className="mb-4 text-sm font-medium uppercase tracking-wide text-muted">
            Production Ready
          </p>

          <h1 className="mx-auto max-w-3xl text-balance text-4xl font-bold tracking-tight sm:text-5xl">
            Build faster with Next.js
          </h1>

          <p className="mx-auto mt-6 max-w-xl text-lg text-muted">
            A clean, minimal starter template with App Router, TypeScript, and
            Tailwind CSS. Designed for freelancers and teams.
          </p>

          <div className="mt-10 flex flex-wrap items-center justify-center gap-4">
            <Button size="lg">
              Get Started
              <svg
                className="h-4 w-4"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth={2}
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M13 7l5 5m0 0l-5 5m5-5H6"
                />
              </svg>
            </Button>
            <Button variant="outline" size="lg">
              Documentation
            </Button>
          </div>
        </Container>
      </section>

      {/* Features Section */}
      <section className="border-t border-border bg-surface py-16 md:py-24">
        <Container size="xl">
          <div className="mb-12 text-center">
            <h2 className="text-3xl font-bold tracking-tight">
              Everything you need
            </h2>
            <p className="mt-3 text-muted">
              Clean architecture, sensible defaults, easy to extend.
            </p>
          </div>

          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            <FeatureCard
              icon={
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M13 10V3L4 14h7v7l9-11h-7z"
                />
              }
              title="Fast by default"
              description="Built on Next.js 15 with React 19. Optimized for performance out of the box."
            />

            <FeatureCard
              icon={
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z"
                />
              }
              title="Type safe"
              description="Full TypeScript with strict mode. Catch errors before they reach production."
            />

            <FeatureCard
              icon={
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M7 21a4 4 0 01-4-4V5a2 2 0 012-2h4a2 2 0 012 2v12a4 4 0 01-4 4zm0 0h12a2 2 0 002-2v-4a2 2 0 00-2-2h-2.343M11 7.343l1.657-1.657a2 2 0 012.828 0l2.829 2.829a2 2 0 010 2.828l-8.486 8.485M7 17h.01"
                />
              }
              title="Tailwind CSS"
              description="Utility-first CSS with clean defaults. Easy to customize, no bloat."
            />

            <FeatureCard
              icon={
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M4 5a1 1 0 011-1h14a1 1 0 011 1v2a1 1 0 01-1 1H5a1 1 0 01-1-1V5zM4 13a1 1 0 011-1h6a1 1 0 011 1v6a1 1 0 01-1 1H5a1 1 0 01-1-1v-6zM16 13a1 1 0 011-1h2a1 1 0 011 1v6a1 1 0 01-1 1h-2a1 1 0 01-1-1v-6z"
                />
              }
              title="Clean structure"
              description="Organized folder layout. Easy to navigate, extend, and hand over."
            />

            <FeatureCard
              icon={
                <>
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z"
                  />
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
                  />
                </>
              }
              title="Developer experience"
              description="ESLint, Prettier, and path aliases configured. Just start coding."
            />

            <FeatureCard
              icon={
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                />
              }
              title="SEO ready"
              description="Metadata, Open Graph, and accessibility configured from the start."
            />
          </div>
        </Container>
      </section>

      {/* Footer */}
      <footer className="border-t border-border py-8">
        <Container size="xl" className="text-center text-sm text-muted">
          <p>Built with Next.js, TypeScript, and Tailwind CSS.</p>
        </Container>
      </footer>
    </>
  );
}

/**
 * Feature card component
 */
function FeatureCard({
  icon,
  title,
  description,
}: {
  icon: React.ReactNode;
  title: string;
  description: string;
}) {
  return (
    <Card>
      <div className="mb-4 flex h-10 w-10 items-center justify-center rounded-lg bg-surface">
        <svg
          className="h-5 w-5"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
          strokeWidth={2}
        >
          {icon}
        </svg>
      </div>
      <h3 className="mb-2 font-semibold">{title}</h3>
      <p className="text-sm text-muted">{description}</p>
    </Card>
  );
}
