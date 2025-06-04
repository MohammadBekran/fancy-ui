import { forwardRef } from "react";

import { cn } from "@/core/utils";

export interface IButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "primary" | "secondary" | "outline";
  size?: "sm" | "md" | "lg";
  isLoading?: boolean;
}

const Button = forwardRef<HTMLButtonElement, IButtonProps>(
  ({ className, variant = "primary", size = "md", isLoading = false, children, ...props }, ref) => {
    return (
      <button
        ref={ref}
        className={cn(
          // Base styles
          "inline-flex items-center justify-center rounded-md font-medium transition-colors",
          "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2",
          // Variants
          {
            "bg-blue-600 text-white hover:bg-blue-700": variant === "primary",
            "bg-gray-600 text-white hover:bg-gray-700": variant === "secondary",
            "border border-gray-300 bg-white hover:bg-gray-50": variant === "outline",
          },
          // Sizes
          {
            "h-8 px-3 text-sm": size === "sm",
            "h-10 px-4": size === "md",
            "h-12 px-6": size === "lg",
          },
          // States
          {
            "opacity-50 cursor-not-allowed": isLoading,
          },
          className
        )}
        disabled={isLoading}
        {...props}
      >
        {isLoading && (
          <span className="mr-2 h-4 w-4 animate-spin rounded-full border-2 border-current border-t-transparent" />
        )}
        {children}
      </button>
    );
  }
);

export default Button;
