import React, { useId, useState } from "react";

import { VALIDATION_MESSAGES, VALIDATION_PATTERNS } from "@/features/input/core/constants";
import { HidePasswordIcon, ShowPasswordIcon } from "@/features/input/core/icons";
import type { IInputProps, IValidationResult } from "@/features/input/core/types";

import { cn } from "@/core/utils";

/**
 * Input Component
 *
 * A production-grade form input component that provides a robust foundation for form handling
 * in React applications. This component implements best practices for accessibility, validation,
 * and user experience while maintaining high performance and flexibility.
 *
 * Key Features:
 * - Built-in form validation with customizable patterns
 * - Secure password handling with visibility toggle
 * - Real-time character counting
 * - Loading state management
 * - Animated error feedback
 * - Comprehensive helper text system
 * - TailwindCSS-powered styling with customization options
 * - Full ARIA compliance and keyboard navigation
 * - TypeScript support with comprehensive type definitions
 *
 * @component
 * @example
 * ```tsx
 * <Input
 *   name="email"
 *   label="Email Address"
 *   type="email"
 *   validationType="email"
 *   required
 *   helperText="We'll never share your email"
 * />
 * ```
 */
const Input = ({
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
}: IInputProps) => {
  // Track input state and validation
  const [isFocused, setIsFocused] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [internalError, setInternalError] = useState<string>();
  const [internalValue, setInternalValue] = useState(externalValue ?? "");
  const generatedId = useId();

  // Derived state
  const inputId = props.id || generatedId;
  const isPassword = type === "password";
  const value = externalValue ?? internalValue;
  const currentLength = typeof value === "string" ? value.length : 0;
  const inputType = isPassword ? (showPassword ? "text" : "password") : type;

  // Validate input value against all validation rules
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

  // Event handlers for input interactions
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

  // Toggle password visibility state
  const togglePasswordVisibility = () => {
    setShowPassword((prev) => !prev);
  };

  // Dynamic class names for different input states
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

  /**
   * Input Component Implementation
   *
   * @param props - Component props extending HTMLInputElement attributes
   * @returns A fully accessible and feature-rich input component
   */
  return (
    <div className={wrapperClassName}>
      {/* Input label with required indicator */}
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
        {/* Main input element */}
        <input
          id={inputId}
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
          aria-describedby={error || internalError || helperText ? `${inputId}-message` : undefined}
          {...props}
        />
        {/* Password visibility toggle */}
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
        {/* Loading spinner */}
        {isLoading && (
          <div className="absolute right-2 top-1/2 -translate-y-1/2">
            <div className="animate-spin rounded-full h-5 w-5 border-2 border-gray-300 border-t-blue-500" />
          </div>
        )}
      </div>
      {/* Helper text and character count */}
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
};

export default Input;
