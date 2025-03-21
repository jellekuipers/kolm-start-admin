import { Check as CheckIcon, Minus as MinusIcon } from "@phosphor-icons/react";
import {
  Checkbox as AriaCheckbox,
  type CheckboxProps,
} from "react-aria-components";

export function Checkbox({ children, ...props }: CheckboxProps) {
  return (
    <AriaCheckbox {...props} className="flex items-center gap-2 font-medium">
      {({ isIndeterminate, isSelected }) => (
        <>
          <div className="flex size-5 shrink-0 items-center justify-center rounded border border-slate-200 bg-white">
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
