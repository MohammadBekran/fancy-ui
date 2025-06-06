/**
 * Calendar Component Icons
 *
 * This module contains SVG icon components used in the Calendar component,
 * providing consistent and accessible iconography for navigation and actions.
 * The icons are implemented as React components with customizable styling.
 */

import React from "react";

import { cn } from "@/core/utils";

/**
 * Base props interface for calendar icons
 * Extends standard SVG attributes for maximum flexibility
 */
export type TIconProps = React.SVGAttributes<SVGElement>;

export const ChevronLeftIcon = ({ className, ...props }: TIconProps) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    className={cn("h-4 w-4", className)}
    {...props}
  >
    <path d="M15 18l-6-6 6-6" />
  </svg>
);

export const ChevronRightIcon = ({ className, ...props }: TIconProps) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    className={cn("h-4 w-4", className)}
    {...props}
  >
    <path d="M9 18l6-6-6-6" />
  </svg>
);

export const CalendarIcon = ({ className, ...props }: TIconProps) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    className={cn("h-4 w-4", className)}
    {...props}
  >
    <rect x="3" y="4" width="18" height="18" rx="2" ry="2" />
    <line x1="16" y1="2" x2="16" y2="6" />
    <line x1="8" y1="2" x2="8" y2="6" />
    <line x1="3" y1="10" x2="21" y2="10" />
  </svg>
);

export const CheckIcon = ({ className, ...props }: TIconProps) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    className={cn("h-4 w-4", className)}
    {...props}
  >
    <polyline points="20 6 9 17 4 12" />
  </svg>
);

export const ChevronDownIcon = ({ className, ...props }: TIconProps) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    className={cn("h-4 w-4", className)}
    {...props}
  >
    <polyline points="6 9 12 15 18 9" />
  </svg>
);
