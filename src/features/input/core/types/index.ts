import { VALIDATION_PATTERNS } from "@/features/input/core/constants";

/**
 * Input Component Type Definitions
 *
 * This module contains TypeScript type definitions for the Input component,
 * ensuring type safety and providing comprehensive documentation for developers.
 * The types are designed to be extensible while maintaining strict type checking.
 */

/**
 * Validation result interface for input validation
 * @interface IValidationResult
 * @property {boolean} isValid - Indicates if the input value passes validation
 * @property {string} [message] - Optional error message for failed validation
 */
export interface IValidationResult {
  isValid: boolean;
  message?: string;
}

/**
 * Core input component props interface
 * Extends native HTMLInputElement attributes while adding custom functionality
 *
 * @interface IInputProps
 * @extends {React.InputHTMLAttributes<HTMLInputElement>}
 */
export interface IInputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  /** Unique identifier for the input field */
  name: string;

  /** Display label for the input field */
  label?: string;

  /** Type of validation to apply to the input */
  validationType?: keyof typeof VALIDATION_PATTERNS;

  /** Custom validation function that returns an error message if validation fails */
  customValidation?: (value: string) => string | undefined;

  /** Whether to show password visibility toggle for password inputs */
  showPasswordToggle?: boolean;

  /** Whether to display character count */
  showCharacterCount?: boolean;

  /** Loading state indicator */
  isLoading?: boolean;

  /** Error message to display */
  error?: string;

  /** Helper text to display below the input */
  helperText?: string;

  /** Whether the input should take full width of its container */
  fullWidth?: boolean;

  /** Custom class names for styling different parts of the input */
  classes?: {
    wrapper?: string;
    label?: string;
    input?: string;
    error?: string;
    helperText?: string;
    characterCount?: string;
    showPasswordIcon?: string;
    hidePasswordIcon?: string;
  };
}

/**
 * Input component reference type
 * Allows direct access to the underlying input element
 */
export type InputRef = React.RefObject<HTMLInputElement>;

/**
 * Custom class names for styling different parts of the input component.
 */
export interface IInputClasses {
  wrapper?: string;
  input?: string;
  label?: string;
  error?: string;
  helperText?: string;
  characterCount?: string;
  showPasswordIcon?: string;
  hidePasswordIcon?: string;
}

/**
 * Available validation patterns for the input component.
 * Maps to the validation patterns defined in constants.
 */
export type TValidationPattern = keyof typeof VALIDATION_PATTERNS;
