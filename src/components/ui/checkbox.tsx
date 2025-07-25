import { CheckIcon } from "@phosphor-icons/react";
import {
  Checkbox as AriaCheckbox,
  type CheckboxProps as AriaCheckboxProps,
} from "react-aria-components";
import { twMerge } from "tailwind-merge";

export function Checkbox({ children, ...props }: AriaCheckboxProps) {
  return (
    <AriaCheckbox
      {...props}
      className={twMerge(
        "group flex items-center gap-2 font-medium",
        "disabled:text-slate-300",
      )}
    >
      <>
        <div className="flex size-4 shrink-0 items-center justify-center rounded border border-slate-300 bg-white">
          <CheckIcon
            aria-hidden
            className="group-selected:inline-block hidden"
            size={16}
          />
        </div>
        {children}
      </>
    </AriaCheckbox>
  );
}
