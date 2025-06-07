import * as Dialog from "@radix-ui/react-dialog";

import { cn } from "../../../core/utils";
import Button from "../../button/components";
import type { IModalProps } from "../core/types";

import "../components/index.css";

/**
 * A flexible modal component built on top of Radix UI Dialog.
 * Provides a fully accessible and customizable modal experience.
 *
 * Features:
 * - Multiple size variants
 * - Customizable overlay
 * - Animated transitions
 * - Close on outside click
 * - Optional trigger element
 * - Custom styling through classes prop
 * - Full accessibility support
 */
const Modal = ({
  isOpen,
  onClose,
  children,
  title,
  description,
  size = "md",
  showCloseButton = true,
  closeOnOutsideClick = true,
  trigger,
  classes = {},
}: IModalProps) => {
  return (
    <Dialog.Root open={isOpen} onOpenChange={closeOnOutsideClick ? onClose : undefined}>
      {/* Modal trigger element */}
      {trigger && <Dialog.Trigger asChild>{trigger}</Dialog.Trigger>}
      <Dialog.Portal>
        {/* Backdrop overlay */}
        <Dialog.Overlay
          className={cn("fixed inset-0 z-1 backdrop-blur-sm bg-black/50", classes.overlay)}
        />
        {/* Modal content */}
        <Dialog.Content
          className={cn(
            // Base modal styles
            "fixed left-[50%] top-[50%] translate-x-[-50%] translate-y-[-50%]",
            "rounded-lg shadow-xl p-6 bg-white",
            "overflow-y-auto z-2",
            // Opening animation
            "data-[state=open]:animate-[modalOpenFadeIn_200ms_ease-out]",
            // Closing animation
            "data-[state=closed]:animate-[modalCloseFadeOut_200ms_ease-out]",
            // Size variants
            {
              "w-[90%] max-w-[300px]": size === "sm",
              "w-[90%] max-w-[500px]": size === "md",
              "w-[90%] max-w-[800px]": size === "lg",
              "w-[90%] max-w-[1200px]": size === "xl",
              "w-[95%] h-[95vh]": size === "full",
            },
            classes.content
          )}
        >
          {/* Modal title */}
          {title && (
            <Dialog.Title className={cn("text-lg font-semibold text-gray-900", classes.title)}>
              {title}
            </Dialog.Title>
          )}
          {/* Modal description */}
          {description && (
            <Dialog.Description className={cn("text-sm text-gray-500")}>
              {description}
            </Dialog.Description>
          )}
          {/* Modal content */}
          {children}
          {/* Close button */}
          {showCloseButton && (
            <Dialog.Close asChild>
              <Button
                variant="outline"
                size="sm"
                onClick={onClose}
                className={cn(
                  "absolute top-6 right-6 rounded-full cursor-pointer p-2 ml-auto transition-all duration-200 ease-in-out hover:scale-110 hover:bg-gray-100 active:scale-95",
                  classes.closeButton
                )}
              >
                <svg
                  className={cn("h-4 w-4", classes.closeIcon)}
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M6 18L18 6M6 6l12 12"
                  />
                </svg>
              </Button>
            </Dialog.Close>
          )}
        </Dialog.Content>
      </Dialog.Portal>
    </Dialog.Root>
  );
};

export default Modal;
