import { cn } from "@/lib/utils";

/**
 * Loader sizes
 */
const sizes = {
  sm: "h-4 w-4 border-2",
  md: "h-6 w-6 border-2",
  lg: "h-8 w-8 border-3",
  xl: "h-12 w-12 border-4",
} as const;

export type LoaderSize = keyof typeof sizes;

export interface LoaderProps {
  /** Size of the loader */
  size?: LoaderSize;
  /** Additional CSS classes */
  className?: string;
  /** Text to display below loader */
  text?: string;
  /** Use full screen centered layout */
  fullScreen?: boolean;
}

/**
 * Loader component
 *
 * @example
 * <Loader />
 * <Loader size="lg" text="Loading..." />
 * <Loader fullScreen />
 */
export function Loader({
  size = "md",
  className,
  text,
  fullScreen = false,
}: LoaderProps) {
  const spinner = (
    <div
      className={cn(
        "animate-spin rounded-full border-border border-t-foreground",
        sizes[size],
        className
      )}
      role="status"
      aria-label="Loading"
    />
  );

  if (fullScreen) {
    return (
      <div className="fixed inset-0 flex items-center justify-center bg-background/80 backdrop-blur-sm">
        <div className="flex flex-col items-center gap-3">
          {spinner}
          {text && <p className="text-sm text-muted">{text}</p>}
        </div>
      </div>
    );
  }

  if (text) {
    return (
      <div className="flex flex-col items-center gap-3">
        {spinner}
        <p className="text-sm text-muted">{text}</p>
      </div>
    );
  }

  return spinner;
}

/**
 * Page loader - centered in container
 *
 * @example
 * <PageLoader />
 * <PageLoader text="Loading data..." />
 */
export function PageLoader({ text }: { text?: string }) {
  return (
    <div className="flex flex-1 items-center justify-center py-12">
      <Loader size="lg" text={text} />
    </div>
  );
}

/**
 * Inline loader - for buttons or inline content
 *
 * @example
 * <InlineLoader />
 */
export function InlineLoader({ className }: { className?: string }) {
  return <Loader size="sm" className={className} />;
}

/**
 * Skeleton loader - placeholder for content
 *
 * @example
 * <Skeleton className="h-4 w-32" />
 * <Skeleton className="h-20 w-full" />
 */
export function Skeleton({ className }: { className?: string }) {
  return (
    <div
      className={cn(
        "animate-pulse rounded-md bg-surface",
        className
      )}
    />
  );
}

