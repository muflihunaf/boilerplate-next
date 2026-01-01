"use client";

import { useEffect } from "react";
import { Button } from "@/components/ui/button";

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    console.error(error);
  }, [error]);

  return (
    <div className="flex flex-1 flex-col items-center justify-center px-4 py-20 text-center">
      <span className="text-4xl">⚠️</span>
      <h1 className="mt-4 text-2xl font-bold">Something went wrong</h1>
      <p className="mt-2 text-muted">
        An unexpected error occurred. Please try again.
      </p>
      <div className="mt-8">
        <Button onClick={() => reset()}>Try again</Button>
      </div>
    </div>
  );
}
