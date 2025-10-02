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
        "disabled:text-gray-300",
        "dark:disabled:text-gray-700",
      )}
    >
      {/** biome-ignore lint/complexity/noUselessFragments: Required by Aria */}
      <>
        <div
          className={twMerge(
            "flex size-4 shrink-0 items-center justify-center rounded border border-gray-300 bg-white",
            "dark:border-gray-800 dark:bg-gray-900",
          )}
        >
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
