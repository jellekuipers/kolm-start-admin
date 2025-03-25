import {
  Button as AriaButton,
  type ButtonProps as AriaButtonProps,
} from "react-aria-components";
import { twMerge } from "tailwind-merge";

export function IconButton(props: AriaButtonProps) {
  return (
    <AriaButton
      {...props}
      className={twMerge(
        "flex size-8 items-center justify-center rounded",
        "outline-0 outline-offset-2 outline-indigo-700 focus-visible:outline-2",
        "disabled:opacity-25",
        "hover:bg-slate-100",
        "pressed:bg-slate-100",
      )}
    />
  );
}
