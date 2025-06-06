/**
 * Button Component Type Definitions
 *
 * This module contains TypeScript type definitions for the Button component,
 * ensuring type safety and providing comprehensive documentation for developers.
 * The types are designed to be extensible while maintaining strict type checking.
 */

import type { ButtonHTMLAttributes } from "react";

/**
 * Button component props interface.
 * Extends standard HTML button attributes with additional styling and state options.
 *
 * @interface IButtonProps
 * @extends {ButtonHTMLAttributes<HTMLButtonElement>}
 *
 * @property {('primary'|'secondary'|'outline')} [variant='primary'] - Visual style variant of the button
 * @property {('sm'|'md'|'lg')} [size='md'] - Size variant of the button
 * @property {boolean} [isLoading=false] - Loading state indicator
 *
 * @example
 * ```tsx
 * const buttonProps: IButtonProps = {
 *   variant: 'primary',
 *   size: 'md',
 *   isLoading: false,
 *   onClick: handleClick
 * };
 * ```
 */
export interface IButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  /** Visual style variant of the button */
  variant?: "primary" | "secondary" | "outline";
  /** Size of the button */
  size?: "sm" | "md" | "lg";
  /** Loading state of the button */
  isLoading?: boolean;
}
