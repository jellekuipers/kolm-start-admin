import { Button as AriaButton, type ButtonProps } from "react-aria-components";
import { twMerge } from "tailwind-merge";

export function IconButton(props: ButtonProps) {
  return (
    <AriaButton
      {...props}
      className={twMerge(
        "flex size-8 items-center justify-center rounded",
        "disabled:opacity-25",
        "hover:bg-slate-100",
        "pressed:bg-slate-100",
      )}
    />
  );
}
