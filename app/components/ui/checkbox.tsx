import { Check as CheckIcon, Minus as MinusIcon } from "@phosphor-icons/react";
import {
  Checkbox as AriaCheckbox,
  type CheckboxProps,
} from "react-aria-components";

export function Checkbox({ children, ...props }: CheckboxProps) {
  return (
    <AriaCheckbox {...props} className="flex gap-2 items-center font-medium">
      {({ isIndeterminate, isSelected }) => (
        <>
          <div className="size-5 shrink-0 rounded flex items-center justify-center border border-gray-200">
            {isIndeterminate ? (
              <MinusIcon aria-hidden size={16} />
            ) : isSelected ? (
              <CheckIcon aria-hidden size={16} />
            ) : null}
          </div>
          {children}
        </>
      )}
    </AriaCheckbox>
  );
}
