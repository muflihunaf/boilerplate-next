import { cn } from "@/lib/utils";
import type { HTMLAttributes, ReactNode } from "react";

type ContainerSize = "sm" | "md" | "lg" | "xl" | "full";

interface ContainerProps extends HTMLAttributes<HTMLDivElement> {
  children: ReactNode;
  size?: ContainerSize;
  /** Remove horizontal padding */
  noPadding?: boolean;
  /** Center content vertically */
  center?: boolean;
  /** Use as section element */
  as?: "div" | "section" | "article" | "main";
}

const sizeMap: Record<ContainerSize, string> = {
  sm: "max-w-screen-sm",   // 640px
  md: "max-w-screen-md",   // 768px
  lg: "max-w-screen-lg",   // 1024px
  xl: "max-w-screen-xl",   // 1280px
  full: "max-w-full",
};

/**
 * Responsive container component
 * Centers content with consistent max-width and padding
 */
export function Container({
  children,
  size = "lg",
  noPadding = false,
  center = false,
  as: Component = "div",
  className,
  ...props
}: ContainerProps) {
  return (
    <Component
      className={cn(
        "mx-auto w-full",
        sizeMap[size],
        !noPadding && "px-4 sm:px-6 lg:px-8",
        center && "flex flex-col items-center justify-center",
        className
      )}
      {...props}
    >
      {children}
    </Component>
  );
}

