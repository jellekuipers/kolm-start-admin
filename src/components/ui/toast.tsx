import { XIcon } from "@phosphor-icons/react";
import {
  Button as AriaButton,
  Text as AriaText,
  UNSTABLE_Toast as AriaToast,
  UNSTABLE_ToastContent as AriaToastContent,
  UNSTABLE_ToastQueue as AriaToastQueue,
  UNSTABLE_ToastRegion as AriaToastRegion,
} from "react-aria-components";
import { flushSync } from "react-dom";
import { twMerge } from "tailwind-merge";
import { tv } from "tailwind-variants";

interface ToastContent {
  color?: "primary" | "secondary" | "success" | "destructive";
  description?: string;
  title: string;
}

interface ToastProps {
  description?: string;
  title: string;
}

export const toastQueue = new AriaToastQueue<ToastContent>({
  wrapUpdate(fn) {
    if ("startViewTransition" in document) {
      document.startViewTransition(() => {
        flushSync(fn);
      });
    } else {
      fn();
    }
  },
});

export const toast = {
  error: ({ description, title }: ToastProps) =>
    toastQueue.add({ title, description, color: "destructive" }),
  info: ({ description, title }: ToastProps) =>
    toastQueue.add({ title, description, color: "primary" }),
  success: ({ description, title }: ToastProps) =>
    toastQueue.add({ title, description, color: "success" }),
};

const toastStyles = tv({
  base: "relative flex w-full items-start justify-between gap-4 rounded-lg p-4 text-sm",
  variants: {
    color: {
      primary: "bg-accent text-accent-foreground border border-primary/20",
      secondary: "bg-card text-muted-foreground border border-border",
      success: "bg-success/10 text-success border border-success/20",
      destructive:
        "bg-destructive/10 text-destructive border border-destructive/20",
    },
  },
});

export function Toast() {
  return (
    <AriaToastRegion
      className="fixed right-4 bottom-4 flex w-full max-w-80 flex-col-reverse gap-2"
      queue={toastQueue}
    >
      {({ toast }) => {
        const {
          content: { color = "primary", description, title },
        } = toast;

        return (
          <AriaToast
            className={toastStyles({ color })}
            style={{ viewTransitionName: toast.key }}
            toast={toast}
          >
            <AriaToastContent className="flex flex-col gap-2">
              <AriaText className="font-semibold" slot="title">
                {title}
              </AriaText>
              <AriaText slot="description">{description}</AriaText>
            </AriaToastContent>
            <AriaButton
              className={twMerge(
                "absolute top-4 right-4",
                "hover:opacity-75",
                "outline-0 outline-ring outline-offset-2 focus-visible:outline-2",
              )}
              slot="close"
            >
              <XIcon size={16} />
            </AriaButton>
          </AriaToast>
        );
      }}
    </AriaToastRegion>
  );
}
