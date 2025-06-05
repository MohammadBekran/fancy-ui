import React, { forwardRef, useId, useState } from "react";

import { VALIDATION_MESSAGES, VALIDATION_PATTERNS } from "@/features/input/core/constants";
import { HidePasswordIcon, ShowPasswordIcon } from "@/features/input/core/icons";
import type {
  IInputClasses,
  IValidationResult,
  TValidationPattern,
} from "@/features/input/core/types";

import { cn } from "@/core/utils";

/**
 * Props for the Input component.
 * Extends all standard input props except 'className'.
 */
export interface IInputProps
  extends Omit<React.InputHTMLAttributes<HTMLInputElement>, "className"> {
  /** The label for the input. */
  label?: string;
  /** Error message to display. */
  error?: string;
  /** Helper text to display below the input. */
  helperText?: string;
  /** If true, the input will take the full width of its container. */
  fullWidth?: boolean;
  /** If true, the input is required. */
  required?: boolean;
  /** Name of the input (required for forms). */
  name: string;
  /** If true, shows a password visibility toggle for password fields. */
  showPasswordToggle?: boolean;
  /** If true, shows a character count indicator. */
  showCharacterCount?: boolean;
  /** Maximum allowed length for the input value. */
  maxLength?: number;
  /** Minimum required length for the input value. */
  minLength?: number;
  /** If true, shows a loading spinner in the input. */
  isLoading?: boolean;
  /** Built-in validation type to use. */
  validationType?: TValidationPattern;
  /** Custom validation function. Returns an error message if invalid, or undefined if valid. */
  customValidation?: (value: string) => string | undefined;
  /** Custom class names for styling. */
  classes?: IInputClasses;
}

/**
 * A highly customizable, accessible, and reusable input component for forms.
 * Supports built-in and custom validation, error handling, helper text, password visibility toggle, loading state, and more.
 *
 * @param props IInputProps
 * @param ref React ref for the input element
 */
const Input = forwardRef<HTMLInputElement, IInputProps>(
  (
    {
      label,
      error,
      helperText,
      fullWidth = false,
      type = "text",
      required = false,
      name,
      showPasswordToggle = false,
      showCharacterCount = false,
      maxLength,
      minLength,
      isLoading = false,
      validationType,
      customValidation,
      classes,
      value: externalValue,
      onChange,
      onBlur,
      onFocus,
      ...props
    },
    ref
  ) => {
    // State
    const [isFocused, setIsFocused] = useState(false);
    const [showPassword, setShowPassword] = useState(false);
    const [internalError, setInternalError] = useState<string>();
    const [internalValue, setInternalValue] = useState(externalValue ?? "");

    // Derived values
    const inputId = props.id || useId();
    const isPassword = type === "password";
    const value = externalValue ?? internalValue;
    const currentLength = typeof value === "string" ? value.length : 0;
    const inputType = isPassword ? (showPassword ? "text" : "password") : type;

    // Validation function
    const validateInput = (value: string): IValidationResult => {
      if (required && !value) {
        return { isValid: false, message: VALIDATION_MESSAGES.required };
      }

      if (minLength && value.length < minLength) {
        return {
          isValid: false,
          message: VALIDATION_MESSAGES.minLength(minLength),
        };
      }

      if (maxLength && value.length > maxLength) {
        return {
          isValid: false,
          message: VALIDATION_MESSAGES.maxLength(maxLength),
        };
      }

      if (validationType && value) {
        const pattern = VALIDATION_PATTERNS[validationType];
        if (!pattern.test(value)) {
          return {
            isValid: false,
            message: VALIDATION_MESSAGES[validationType],
          };
        }
      }

      if (customValidation) {
        const customError = customValidation(value);
        if (customError) {
          return { isValid: false, message: customError };
        }
      }

      return { isValid: true };
    };

    // Event handlers
    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
      const newValue = e.target.value;
      const { isValid, message } = validateInput(newValue);

      setInternalError(isValid ? undefined : message);
      setInternalValue(newValue);
      onChange?.(e);
    };

    const handleBlur = (e: React.FocusEvent<HTMLInputElement>) => {
      const { isValid, message } = validateInput(e.target.value);
      setInternalError(isValid ? undefined : message);
      setIsFocused(false);
      onBlur?.(e);
    };

    const handleFocus = (e: React.FocusEvent<HTMLInputElement>) => {
      setIsFocused(true);
      onFocus?.(e);
    };

    const togglePasswordVisibility = () => {
      setShowPassword((prev) => !prev);
    };

    // Class names
    const inputClassName = cn(
      "w-full rounded-md text-sm px-3 py-2",
      "border border-gray-200 bg-white",
      "placeholder:text-gray-400",
      "transition-all duration-200 ease-in-out",
      "focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500",
      "disabled:cursor-not-allowed disabled:bg-gray-50 disabled:text-gray-500",
      "hover:border-gray-300",
      {
        "border-red-500 focus:border-red-500 focus:ring-red-500": error || internalError,
        "scale-[1.01]": isFocused,
        "pr-10": (isPassword && showPasswordToggle) || isLoading,
      },
      classes?.input
    );

    const wrapperClassName = cn(
      "flex flex-col gap-1.5",
      "transition-all duration-300 ease-in-out",
      fullWidth ? "w-full" : "max-w-[300px]",
      classes?.wrapper
    );

    const labelClassName = cn(
      "text-sm font-medium text-gray-700",
      "transition-all duration-200 ease-in-out",
      "transform",
      isFocused && "translate-y-[-2px]",
      classes?.label
    );

    const messageClassName = cn(
      "text-sm",
      "transition-all duration-200 ease-in-out",
      "transform",
      error || internalError ? "text-red-500" : "text-gray-500",
      {
        "animate-shake": error || internalError,
      },
      classes?.error || classes?.helperText
    );

    const characterCountClassName = cn(
      "text-xs text-gray-500",
      "transition-all duration-200 ease-in-out",
      {
        "text-red-500": currentLength >= (maxLength || 0),
      },
      classes?.characterCount
    );

    return (
      <div className={wrapperClassName}>
        {label && (
          <label htmlFor={inputId} className={labelClassName}>
            {label}
            {required && (
              <span className="text-red-500 ml-1" aria-hidden="true">
                *
              </span>
            )}
          </label>
        )}
        <div className="relative">
          <input
            id={inputId}
            ref={ref}
            type={inputType}
            name={name}
            value={value}
            onChange={handleChange}
            onBlur={handleBlur}
            onFocus={handleFocus}
            required={required}
            maxLength={maxLength}
            minLength={minLength}
            disabled={isLoading}
            className={inputClassName}
            aria-invalid={!!(error || internalError)}
            aria-describedby={
              error || internalError || helperText ? `${inputId}-message` : undefined
            }
            {...props}
          />
          {isPassword && showPasswordToggle && (
            <button
              type="button"
              onClick={togglePasswordVisibility}
              className={cn(
                "absolute right-2 top-1/2 -translate-y-1/2",
                "text-gray-500 hover:text-gray-700",
                "transition-colors",
                classes?.showPasswordIcon || classes?.hidePasswordIcon
              )}
              aria-label={showPassword ? "Hide password" : "Show password"}
            >
              {showPassword ? (
                <HidePasswordIcon className="w-5 h-5" />
              ) : (
                <ShowPasswordIcon className="w-5 h-5" />
              )}
            </button>
          )}
          {isLoading && (
            <div className="absolute right-2 top-1/2 -translate-y-1/2">
              <div className="animate-spin rounded-full h-5 w-5 border-2 border-gray-300 border-t-blue-500" />
            </div>
          )}
        </div>
        <div className="flex justify-between items-center">
          {(error || internalError || helperText) && (
            <div id={`${inputId}-message`} className={messageClassName}>
              {error || internalError || helperText}
            </div>
          )}
          {showCharacterCount && maxLength && (
            <div className={characterCountClassName}>
              {currentLength}/{maxLength}
            </div>
          )}
        </div>
      </div>
    );
  }
);

export default Input;
