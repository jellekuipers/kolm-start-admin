import { ChevronDownIcon } from "@radix-ui/react-icons";
import {
  Button as AriaButton,
  ListBox as AriaListBox,
  ListBoxItem as AriaListBoxItem,
  Select as AriaSelect,
  SelectProps as AriaSelectProps,
  SelectValue as AriaSelectValue,
  ListBoxItemProps,
} from "react-aria-components";

import { FieldError, Label } from "~/components/ui/field";
import { Popover } from "~/components/ui/popover";

export interface SelectProps<T extends object>
  extends Omit<AriaSelectProps<T>, "children"> {
  children: React.ReactNode | ((item: T) => React.ReactNode);
  description?: string;
  errorMessage?: string | null;
  items?: Iterable<T>;
  label?: string;
}

export function Select<T extends object>({
  children,
  errorMessage,
  items,
  label,
  ...props
}: SelectProps<T>) {
  return (
    <AriaSelect className="flex flex-col gap-1" {...props}>
      <Label>{label}</Label>
      <AriaButton className="border border-gray-300 rounded flex items-center justify-between gap-2 px-3 py-1.5">
        <AriaSelectValue />
        <ChevronDownIcon />
      </AriaButton>
      <FieldError>{errorMessage}</FieldError>
      <Popover>
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
