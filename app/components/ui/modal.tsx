import {
  Modal as AriaModal,
  ModalOverlay as AriaModalOverlay,
  type ModalOverlayProps,
} from "react-aria-components";

export function Modal(props: ModalOverlayProps) {
  return (
    <AriaModalOverlay
      {...props}
      className="fixed inset-0 z-10 overflow-y-auto bg-black/25 flex min-h-full items-center justify-center p-4 text-center backdrop-blur entering:animate-in entering:fade-in entering:ease-out exiting:animate-out exiting:fade-out exiting:ease-in"
    >
      <AriaModal
        {...props}
        className="w-full max-w-md overflow-hidden rounded-lg bg-white p-6 text-left align-middle shadow-xl entering:animate-in entering:zoom-in-95 entering:ease-out exiting:animate-out exiting:zoom-out-95 exiting:ease-in"
      />
    </AriaModalOverlay>
  );
}
