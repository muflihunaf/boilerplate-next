import { forwardRef, type ButtonHTMLAttributes } from "react";
import { cn } from "@/lib/utils";

/**
 * Button variants
 */
const variants = {
  primary: "bg-foreground text-background hover:bg-foreground/90",
  secondary: "bg-surface text-foreground hover:bg-surface-hover",
  outline: "border border-border bg-transparent hover:bg-surface",
  ghost: "bg-transparent hover:bg-surface",
  destructive: "bg-error text-white hover:bg-error/90",
  link: "text-foreground underline-offset-4 hover:underline bg-transparent",
} as const;

/**
 * Button sizes
 */
const sizes = {
  sm: "h-8 px-3 text-xs gap-1.5",
  md: "h-10 px-4 text-sm gap-2",
  lg: "h-12 px-6 text-base gap-2.5",
  icon: "h-10 w-10 p-0",
} as const;

export type ButtonVariant = keyof typeof variants;
export type ButtonSize = keyof typeof sizes;

export interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  /** Visual style variant */
  variant?: ButtonVariant;
  /** Size of the button */
  size?: ButtonSize;
  /** Show loading spinner and disable button */
  isLoading?: boolean;
  /** Render as child element (for use with Link) */
  asChild?: boolean;
}

/**
 * Button component
 *
 * @example
 * <Button>Click me</Button>
 * <Button variant="outline" size="lg">Large outline</Button>
 * <Button isLoading>Saving...</Button>
 * <Button asChild><Link href="/page">Go</Link></Button>
 */
const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  (
    {
      className,
      variant = "primary",
      size = "md",
      isLoading = false,
      disabled,
      asChild = false,
      children,
      ...props
    },
    ref
  ) => {
    const baseStyles = cn(
      "inline-flex items-center justify-center font-medium rounded-lg",
      "transition-colors duration-150",
      "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background",
      "disabled:pointer-events-none disabled:opacity-50",
      variants[variant],
      sizes[size],
      className
    );

    // Render as span wrapper for Link children
    if (asChild) {
      return <span className={baseStyles}>{children}</span>;
    }

    return (
      <button
        ref={ref}
        className={baseStyles}
        disabled={disabled || isLoading}
        {...props}
      >
        {isLoading && <Spinner className="h-4 w-4" />}
        {children}
      </button>
    );
  }
);

Button.displayName = "Button";

/**
 * Inline spinner for button loading state
 */
function Spinner({ className }: { className?: string }) {
  return (
    <svg
      className={cn("animate-spin", className)}
      xmlns="http://www.w3.org/2000/svg"
      fill="none"
      viewBox="0 0 24 24"
    >
      <circle
        className="opacity-25"
        cx="12"
        cy="12"
        r="10"
        stroke="currentColor"
        strokeWidth="4"
      />
      <path
        className="opacity-75"
        fill="currentColor"
        d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
      />
    </svg>
  );
}

export { Button };
