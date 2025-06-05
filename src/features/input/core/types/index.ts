import { VALIDATION_PATTERNS } from "@/features/input/core/constants";

export type TValidationPattern = keyof typeof VALIDATION_PATTERNS;

export interface IValidationResult {
  isValid: boolean;
  message?: string;
}

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
