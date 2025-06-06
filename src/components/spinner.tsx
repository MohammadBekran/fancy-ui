/**
 * Spinner Component
 *
 * A production-grade loading spinner component that provides visual feedback
 * during asynchronous operations. This component implements modern design patterns
 * and accessibility best practices.
 *
 * Implementation Details:
 * - Built with CSS animations for smooth performance
 * - Implements ARIA attributes for screen readers
 * - Uses CSS transforms for hardware acceleration
 * - Supports customizable sizing and colors
 * - Implements consistent animation timing
 *
 * Technical Features:
 * - TypeScript for type safety
 * - TailwindCSS for styling
 * - CSS animations for smooth performance
 * - Accessibility support
 * - Customizable through props
 *
 * @component
 * @example
 * ```tsx
 * <Spinner
 *   size="md"
 *   color="primary"
 *   className="custom-class"
 * />
 * ```
 */

import { forwardRef } from "react";
import { cn } from "@/core/utils";

/**
 * Spinner component props interface
 */
export interface ISpinnerProps extends React.HTMLAttributes<HTMLDivElement> {
  /** Size variant of the spinner */
  size?: "sm" | "md" | "lg";
  /** Color variant of the spinner */
  color?: "primary" | "secondary" | "white";
}

/**
 * Spinner Component Implementation
 *
 * @param props - Component props
 * @param ref - Forwarded ref for direct DOM access
 * @returns A fully accessible and customizable spinner component
 */
const Spinner = forwardRef<HTMLDivElement, ISpinnerProps>(
  ({ size = "md", color = "primary", className, ...props }, ref) => {
    return (
      <div
        ref={ref}
        role="status"
        aria-label="Loading"
        className={cn(
          // Base spinner styles
          "inline-block animate-spin rounded-full border-2 border-current border-t-transparent",
          // Size variants
          {
            "h-4 w-4": size === "sm",
            "h-6 w-6": size === "md",
            "h-8 w-8": size === "lg",
          },
          // Color variants
          {
            "text-blue-600": color === "primary",
            "text-gray-600": color === "secondary",
            "text-white": color === "white",
          },
          className
        )}
        {...props}
      />
    );
  }
);

Spinner.displayName = "Spinner";

export default Spinner;
