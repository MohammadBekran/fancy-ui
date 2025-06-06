/**
 * Input Component Validation Constants
 *
 * This module contains comprehensive validation patterns and corresponding error messages
 * for the Input component. These constants are used to validate various types of input data
 * and provide user-friendly error messages.
 *
 * The validation patterns are implemented as regular expressions and are designed to be
 * both strict enough to ensure data quality while being flexible enough to handle common
 * input variations.
 */

/**
 * Validation Patterns
 *
 * A collection of regular expressions for validating different types of input data.
 * Each pattern is carefully crafted to match common formats while maintaining security
 * and data integrity.
 *
 * @constant
 * @type {Record<string, RegExp>}
 */
export const VALIDATION_PATTERNS = {
  email: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
  phone: /^\+?[\d\s-]{10,}$/,
  url: /^(https?:\/\/)?([\da-z.-]+)\.([a-z.]{2,6})([/\w .-]*)*\/?$/,
  numeric: /^\d+$/,
  alphanumeric: /^[a-zA-Z0-9]+$/,
  password: /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d@$!%*#?&]{8,}$/,
  username: /^[a-zA-Z0-9_-]{3,20}$/,
  postalCode: /^\d{5}(-\d{4})?$/,
  date: /^\d{4}-\d{2}-\d{2}$/,
  time: /^([01]?[0-9]|2[0-3]):[0-5][0-9]$/,
  creditCard:
    /^(?:4[0-9]{12}(?:[0-9]{3})?|5[1-5][0-9]{14}|3[47][0-9]{13}|3(?:0[0-5]|[68][0-9])[0-9]{11}|6(?:011|5[0-9]{2})[0-9]{12}|(?:2131|1800|35\d{3})\d{11})$/,
  ipv4: /^(\d{1,3}\.){3}\d{1,3}$/,
  hexColor: /^#([A-Fa-f0-9]{6}|[A-Fa-f0-9]{3})$/,
  strongPassword: /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/,
  currency: /^\$?\d+(\.\d{2})?$/,
  phoneUS: /^(\+\d{1,2}\s?)?\(?\d{3}\)?[\s.-]?\d{3}[\s.-]?\d{4}$/,
  phoneUK: /^(\+44|0)7\d{9}$/,
  phoneEU: /^(\+?3?2?|0)[1-9]\d{7,8}$/,
  socialSecurity: /^\d{3}-?\d{2}-?\d{4}$/,
  zipCodeUK: /^[A-Z]{1,2}\d[A-Z\d]? ?\d[A-Z]{2}$/,
  zipCodeCA: /^[A-Z]\d[A-Z] \d[A-Z]\d$/,
  macAddress: /^([0-9A-Fa-f]{2}[:-]){5}([0-9A-Fa-f]{2})$/,
  domain: /^[a-zA-Z0-9][a-zA-Z0-9-]{1,61}[a-zA-Z0-9]\.[a-zA-Z]{2,}$/,
  slug: /^[a-z0-9]+(?:-[a-z0-9]+)*$/,
  semver: /^\d+\.\d+\.\d+$/,
} as const;

/**
 * Validation Messages
 *
 * User-friendly error messages corresponding to each validation pattern.
 * Messages are designed to be clear, concise, and helpful to users when
 * validation fails.
 *
 * @constant
 * @type {Record<string, string | ((param: number) => string)>}
 */
export const VALIDATION_MESSAGES = {
  email: "Please enter a valid email address",
  phone: "Please enter a valid phone number (e.g., +1234567890)",
  url: "Please enter a valid URL (e.g., https://example.com)",
  numeric: "Please enter numbers only",
  alphanumeric: "Please enter letters and numbers only",
  password: "Password must be at least 8 characters with letters and numbers",
  required: "This field is required",
  minLength: (min: number) => `Minimum ${min} characters required`,
  maxLength: (max: number) => `Maximum ${max} characters allowed`,
  username:
    "Username must be 3-20 characters and can only contain letters, numbers, underscores, and hyphens",
  postalCode: "Please enter a valid postal code (e.g., 12345 or 12345-6789)",
  date: "Please enter a valid date in YYYY-MM-DD format",
  time: "Please enter a valid time in HH:MM format (24-hour)",
  creditCard: "Please enter a valid credit card number",
  ipv4: "Please enter a valid IPv4 address",
  hexColor: "Please enter a valid hex color code (e.g., #FF0000 or #F00)",
  strongPassword:
    "Password must be at least 8 characters with uppercase, lowercase, number, and special character",
  currency: "Please enter a valid currency amount (e.g., $10.99)",
  phoneUS: "Please enter a valid US phone number (e.g., (123) 456-7890)",
  phoneUK: "Please enter a valid UK phone number (e.g., +44 7123456789)",
  phoneEU: "Please enter a valid EU phone number",
  socialSecurity: "Please enter a valid SSN (e.g., 123-45-6789)",
  zipCodeUK: "Please enter a valid UK postcode (e.g., SW1A 1AA)",
  zipCodeCA: "Please enter a valid Canadian postal code (e.g., A1A 1A1)",
  macAddress: "Please enter a valid MAC address (e.g., 00:1A:2B:3C:4D:5E)",
  domain: "Please enter a valid domain name (e.g., example.com)",
  slug: "Please enter a valid slug (e.g., my-page-title)",
  semver: "Please enter a valid semantic version (e.g., 1.0.0)",
} as const;
