/**
 * Modal Component Type Definitions
 *
 * This module contains TypeScript type definitions for the Modal component,
 * ensuring type safety and providing comprehensive documentation for developers.
 * The types are designed to be extensible while maintaining strict type checking.
 */

import type { ReactNode } from "react";

/**
 * Modal component props interface.
 * Provides configuration options for the modal's appearance and behavior.
 */
export interface IModalProps {
  /** Controls the visibility of the modal */
  isOpen?: boolean;
  /** Callback function when the modal is closed */
  onClose?: () => void;
  /** Content to be displayed inside the modal */
  children: ReactNode;
  /** Title of the modal */
  title: string;
  /** Description text for the modal */
  description?: string;
  /** Size variant of the modal */
  size?: "sm" | "md" | "lg" | "xl" | "full";
  /** Whether to show the close button */
  showCloseButton?: boolean;
  /** Whether clicking outside closes the modal */
  closeOnOutsideClick?: boolean;
  /** Element that triggers the modal */
  trigger?: ReactNode;
  /** Custom class names for styling different parts of the modal */
  classNames?: IModalClasses;
}

/**
 * Custom class names for styling different parts of the modal component.
 * Provides granular control over the appearance of each modal element.
 */
export interface IModalClasses {
  /** Overlay background of the modal */
  overlay?: string;
  /** Main content container of the modal */
  content?: string;
  /** Title text of the modal */
  title?: string;
  /** Description text of the modal */
  description?: string;
  /** Close button container */
  closeButton?: string;
  /** Close icon within the button */
  closeIcon?: string;
}
