import { CaretDown as CaretDownIcon } from "@phosphor-icons/react";
import {
  Button as AriaButton,
  ListBox as AriaListBox,
  ListBoxItem as AriaListBoxItem,
  Select as AriaSelect,
  SelectProps as AriaSelectProps,
  SelectValue as AriaSelectValue,
  ListBoxItemProps,
} from "react-aria-components";
import { tv } from "tailwind-variants";

import { Description, FieldError, Label } from "~/components/ui/field";
import { Popover } from "~/components/ui/popover";
import { focusRing } from "~/utils/classes";

export interface SelectProps<T extends object>
  extends Omit<AriaSelectProps<T>, "children"> {
  children: React.ReactNode | ((item: T) => React.ReactNode);
  description?: string;
  errorMessage?: string | null;
  items?: Iterable<T>;
  label?: string;
}

const selectStyles = tv({
  extend: focusRing,
  base: "border border-gray-200 rounded flex items-center justify-between gap-2 px-3 py-1.5",
  variants: {
    isDisabled: {
      false: "pressed:bg-gray-50",
      true: "text-gray-200 border-gray-200",
    },
  },
});

export function Select<T extends object>({
  children,
  description,
  errorMessage,
  items,
  label,
  ...props
}: SelectProps<T>) {
  return (
    <AriaSelect className="flex flex-col gap-2" {...props}>
      <Label>{label}</Label>
      <AriaButton className={selectStyles}>
        <AriaSelectValue>
          {({ defaultChildren, isPlaceholder }) => {
            return isPlaceholder ? "Select" : defaultChildren;
          }}
        </AriaSelectValue>
        <CaretDownIcon size={16} />
      </AriaButton>
      {description && <Description>{description}</Description>}
      <FieldError>{errorMessage}</FieldError>
      <Popover className="min-w-(--trigger-width)">
        <AriaListBox items={items}>{children}</AriaListBox>
      </Popover>
    </AriaSelect>
  );
}

export function SelectItem(props: ListBoxItemProps) {
  return (
    <AriaListBoxItem
      {...props}
      className="rounded px-3 py-1.5 font-medium flex items-center gap-2 hover:bg-gray-900 hover:text-white cursor-default"
    />
  );
}
