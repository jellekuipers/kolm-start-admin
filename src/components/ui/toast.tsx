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

interface ToastContent {
  color: keyof typeof toastColors;
  title: string;
  description?: string;
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

const toastColors = {
  gray: twMerge(
    "bg-white text-gray-600 border border-gray-300",
    "dark:bg-gray-700 dark:text-white dark:border dark:border-gray-700",
  ),
  green: twMerge(
    "bg-green-50 text-green-600 border border-green-300",
    "dark:bg-green-700 dark:text-white dark:border dark:border-green-700",
  ),
  indigo: twMerge(
    "bg-indigo-50 text-indigo-700 border border-indigo-300",
    "dark:bg-indigo-600 dark:text-white dark:border dark:border-indigo-700",
  ),
  red: twMerge(
    "bg-red-50 text-red-600 border border-red-300",
    "dark:bg-red-700 dark:text-white dark:border dark:border-red-700",
  ),
} as const;

export function Toast() {
  return (
    <AriaToastRegion
      className="fixed bottom-4 right-4 flex flex-col-reverse gap-2 max-w-80 w-full"
      queue={toastQueue}
    >
      {({ toast }) => {
        const {
          content: { color, description, title },
        } = toast;

        return (
          <AriaToast
            className={twMerge(
              "flex justify-between items-start gap-4 rounded-lg p-4 text-sm w-full",
              toastColors[color],
            )}
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
                "hover:opacity-75",
                "outline-0 outline-offset-2 outline-indigo-700 focus-visible:outline-2",
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
