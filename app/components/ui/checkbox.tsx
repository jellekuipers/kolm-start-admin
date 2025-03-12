import { CheckIcon, MinusIcon } from "@radix-ui/react-icons";
import { CheckboxProps, Checkbox as RACCheckbox } from "react-aria-components";

export function Checkbox({ children, ...props }: CheckboxProps) {
  return (
    <RACCheckbox className="flex gap-2 items-center font-medium" {...props}>
      {({ isIndeterminate, isSelected }) => (
        <>
          <div className="size-5 shrink-0 rounded flex items-center justify-center border border-gray-300">
            {isIndeterminate ? (
              <MinusIcon aria-hidden />
            ) : isSelected ? (
              <CheckIcon aria-hidden />
            ) : null}
          </div>
          {children}
        </>
      )}
    </RACCheckbox>
  );
}
