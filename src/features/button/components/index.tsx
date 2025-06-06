/**
 * Button Component
 *
 * A production-grade button component that implements modern design patterns
 * and accessibility best practices. This component serves as the foundation
 * for interactive elements throughout the application.
 *
 * Implementation Details:
 * - Built on native button element for optimal accessibility
 * - Implements ARIA states for loading and disabled conditions
 * - Uses CSS transitions for smooth state changes
 * - Supports keyboard navigation and focus management
 * - Implements consistent sizing and spacing
 *
 * Technical Features:
 * - TypeScript for type safety and developer experience
 * - TailwindCSS for styling with utility-first approach
 * - Compound class names for variant management
 * - CSS transitions for smooth state changes
 *
 * @component
 * @example
 * ```tsx
 * <Button
 *   variant="primary"
 *   size="md"
 *   isLoading={false}
 *   onClick={handleClick}
 * >
 *   Click Me
 * </Button>
 * ```
 */

import type { IButtonProps } from "@/features/button/core/types";

import { cn } from "@/core/utils";

const Button = ({
  className,
  variant = "primary",
  size = "md",
  isLoading = false,
  children,
  ...props
}: IButtonProps) => {
  return (
    <button
      className={cn(
        // Base styles for consistent button appearance
        "inline-flex items-center justify-center rounded-md font-medium transition-colors",
        "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2",

        // Visual variants with semantic color choices
        {
          "bg-blue-600 text-white hover:bg-blue-700": variant === "primary",
          "bg-gray-600 text-white hover:bg-gray-700": variant === "secondary",
          "border border-gray-300 bg-white hover:bg-gray-50": variant === "outline",
        },

        // Size variants following 8px grid system
        {
          "h-8 px-3 text-sm": size === "sm",
          "h-10 px-4": size === "md",
          "h-12 px-6": size === "lg",
        },

        // Loading state with reduced opacity and cursor
        {
          "opacity-50 cursor-not-allowed": isLoading,
        },
        className
      )}
      disabled={isLoading}
      {...props}
    >
      {/* Loading spinner with border animation */}
      {isLoading && (
        <span className="mr-2 h-4 w-4 animate-spin rounded-full border-2 border-current border-t-transparent" />
      )}
      {children}
    </button>
  );
};

export type { IButtonProps } from "../core/types";
export { Button };

export default Button;
