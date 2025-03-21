import {
  Heading as AriaHeading,
  Modal as AriaModal,
  ModalOverlay as AriaModalOverlay,
  type HeadingProps,
  type ModalOverlayProps,
} from "react-aria-components";
import { twMerge } from "tailwind-merge";

export function Modal(props: ModalOverlayProps) {
  return (
    <AriaModalOverlay
      {...props}
      className={twMerge(
        "fixed inset-0 z-10 flex min-h-full items-center justify-center overflow-y-auto bg-black/25 p-4 text-center backdrop-blur",
        "entering:animate-in entering:fade-in entering:ease-out",
        "exiting:animate-out exiting:fade-out exiting:ease-in",
      )}
    >
      <AriaModal
        {...props}
        className={twMerge(
          "w-full max-w-md overflow-hidden rounded-lg bg-white p-6 text-left align-middle shadow-xl",
          "entering:animate-in entering:zoom-in-95 entering:ease-out",
          "exiting:animate-out exiting:zoom-out-95 exiting:ease-in",
        )}
      />
    </AriaModalOverlay>
  );
}

export function ModalHeading(props: HeadingProps) {
  return <AriaHeading {...props} className="text-2xl font-bold" />;
}
