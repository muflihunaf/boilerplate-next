import { forwardRef, type HTMLAttributes } from "react";
import { cn } from "@/lib/utils";

/**
 * Card variants
 */
const variants = {
  default: "bg-background border-border",
  muted: "bg-surface border-border",
  outline: "bg-transparent border-border",
} as const;

export type CardVariant = keyof typeof variants;

export interface CardProps extends HTMLAttributes<HTMLDivElement> {
  /** Visual style variant */
  variant?: CardVariant;
  /** Remove padding */
  noPadding?: boolean;
}

/**
 * Card component
 *
 * @example
 * <Card>Content</Card>
 * <Card variant="muted">Muted card</Card>
 * <Card noPadding>No padding</Card>
 */
const Card = forwardRef<HTMLDivElement, CardProps>(
  ({ className, variant = "default", noPadding = false, ...props }, ref) => (
    <div
      ref={ref}
      className={cn(
        "rounded-xl border shadow-sm",
        variants[variant],
        !noPadding && "p-6",
        className
      )}
      {...props}
    />
  )
);
Card.displayName = "Card";

/**
 * Card Header
 */
const CardHeader = forwardRef<HTMLDivElement, HTMLAttributes<HTMLDivElement>>(
  ({ className, ...props }, ref) => (
    <div
      ref={ref}
      className={cn("flex flex-col gap-1.5", className)}
      {...props}
    />
  )
);
CardHeader.displayName = "CardHeader";

/**
 * Card Title
 */
const CardTitle = forwardRef<HTMLHeadingElement, HTMLAttributes<HTMLHeadingElement>>(
  ({ className, ...props }, ref) => (
    <h3
      ref={ref}
      className={cn("text-lg font-semibold leading-tight", className)}
      {...props}
    />
  )
);
CardTitle.displayName = "CardTitle";

/**
 * Card Description
 */
const CardDescription = forwardRef<HTMLParagraphElement, HTMLAttributes<HTMLParagraphElement>>(
  ({ className, ...props }, ref) => (
    <p
      ref={ref}
      className={cn("text-sm text-muted", className)}
      {...props}
    />
  )
);
CardDescription.displayName = "CardDescription";

/**
 * Card Content
 */
const CardContent = forwardRef<HTMLDivElement, HTMLAttributes<HTMLDivElement>>(
  ({ className, ...props }, ref) => (
    <div ref={ref} className={cn("pt-4", className)} {...props} />
  )
);
CardContent.displayName = "CardContent";

/**
 * Card Footer
 */
const CardFooter = forwardRef<HTMLDivElement, HTMLAttributes<HTMLDivElement>>(
  ({ className, ...props }, ref) => (
    <div
      ref={ref}
      className={cn("flex items-center gap-2 pt-4", className)}
      {...props}
    />
  )
);
CardFooter.displayName = "CardFooter";

export { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter };
