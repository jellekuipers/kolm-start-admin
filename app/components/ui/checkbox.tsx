import { Check as CheckIcon, Minus as MinusIcon } from "@phosphor-icons/react";
import { Checkbox as AriaCheckbox, CheckboxProps } from "react-aria-components";

export function Checkbox({ children, ...props }: CheckboxProps) {
  return (
    <AriaCheckbox className="flex gap-2 items-center font-medium" {...props}>
      {({ isIndeterminate, isSelected }) => (
        <>
          <div className="size-5 shrink-0 rounded flex items-center justify-center border border-gray-300">
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
