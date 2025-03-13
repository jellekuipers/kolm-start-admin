import { ChevronDownIcon } from "@radix-ui/react-icons";
import {
  ListBox as AriaListBox,
  ListBoxItem as AriaListBoxItem,
  Select as AriaSelect,
  SelectProps as AriaSelectProps,
  SelectValue as AriaSelectValue,
  ListBoxItemProps,
  ValidationResult,
} from "react-aria-components";

import { Button } from "~/components/ui/button";
import { Description, FieldError, Label } from "~/components/ui/field";
import { Popover } from "~/components/ui/popover";

export interface SelectProps<T extends object>
  extends Omit<AriaSelectProps<T>, "children"> {
  children: React.ReactNode | ((item: T) => React.ReactNode);
  description?: string;
  errorMessage?: string | ((validation: ValidationResult) => string);
  items?: Iterable<T>;
  label?: string;
}

export function Select<T extends object>({
  children,
  description,
  errorMessage,
  items,
  label,
  ...props
}: SelectProps<T>) {
  return (
    <AriaSelect {...props}>
      <Label>{label}</Label>
      <Button>
        <AriaSelectValue />
        <ChevronDownIcon />
      </Button>
      {description && (
        <Description slot="description">{description}</Description>
      )}
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
      className="rounded px-3 py-1.5 text-sm font-medium flex items-center gap-2 hover:bg-gray-50 cursor-default"
      {...props}
    />
  );
}
