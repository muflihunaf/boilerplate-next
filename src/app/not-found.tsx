import Link from "next/link";
import { Button } from "@/components/ui/button";

export default function NotFound() {
  return (
    <div className="flex flex-1 flex-col items-center justify-center px-6 py-24 text-center">
      <div className="animate-fade-in">
        <span className="text-8xl font-bold text-primary">404</span>
        <h1 className="mt-4 text-3xl font-bold">Page Not Found</h1>
        <p className="mt-2 text-muted">
          Sorry, we couldn&apos;t find the page you&apos;re looking for.
        </p>
        <div className="mt-8">
          <Button asChild>
            <Link href="/">Go back home</Link>
          </Button>
        </div>
      </div>
    </div>
  );
}

