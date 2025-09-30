import {
  Dialog as AriaDialog,
  type DialogProps as AriaDialogProps,
  DialogTrigger as AriaDialogTrigger,
  type DialogTriggerProps as AriaDialogTriggerProps,
} from "react-aria-components";
import { twMerge } from "tailwind-merge";

export function Dialog(props: AriaDialogProps) {
  return (
    <AriaDialog
      {...props}
      className={twMerge(
        "relative flex flex-col gap-4 outline-0 text-gray-900",
        "dark:text-white",
      )}
    />
  );
}

export function DialogTrigger(props: AriaDialogTriggerProps) {
  return <AriaDialogTrigger {...props} />;
}
