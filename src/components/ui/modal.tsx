import {
  Heading as AriaHeading,
  type HeadingProps as AriaHeadingProps,
  Modal as AriaModal,
  ModalOverlay as AriaModalOverlay,
  type ModalOverlayProps as AriaModalOverlayProps,
} from "react-aria-components";
import { twMerge } from "tailwind-merge";

export function Modal({
  isDismissable,
  isOpen,
  onOpenChange,
  ...props
}: AriaModalOverlayProps) {
  return (
    <AriaModalOverlay
      className={twMerge(
        "fixed inset-0 z-10 flex min-h-full items-center justify-center overflow-y-auto bg-black/25 p-4 text-center backdrop-blur",
        "entering:fade-in entering:animate-in entering:ease-out",
        "exiting:fade-out exiting:animate-out exiting:ease-in",
      )}
      isDismissable={isDismissable}
      isOpen={isOpen}
      onOpenChange={onOpenChange}
    >
      <AriaModal
        {...props}
        className={twMerge(
          "w-full max-w-lg overflow-hidden rounded-lg border border-border bg-background p-6 text-left align-middle shadow-2xl",
          "dark:shadow-none",
          "entering:zoom-in-95 entering:animate-in entering:ease-out",
          "exiting:zoom-out-95 exiting:animate-out exiting:ease-in",
        )}
      />
    </AriaModalOverlay>
  );
}

export function ModalHeading(props: AriaHeadingProps) {
  return <AriaHeading {...props} className="font-bold text-xl" />;
}
