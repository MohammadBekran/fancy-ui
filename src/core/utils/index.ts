/**
 * Core Utility Functions
 *
 * This module contains utility functions used throughout the application,
 * providing common functionality for class name management and other shared operations.
 */

import type { ClassValue } from "clsx";
import clsx from "clsx";
import { twMerge } from "tailwind-merge";

/**
 * Combines multiple class names and merges Tailwind CSS classes efficiently.
 * Uses clsx for conditional class names and tailwind-merge for deduplication.
 *
 * @param inputs - Class names to be combined
 * @returns Merged class string
 *
 * @example
 * ```tsx
 * cn("base-class", { "conditional-class": isActive }, "additional-class")
 * ```
 */
export const cn = (...inputs: ClassValue[]) => {
  return twMerge(clsx(inputs));
};
