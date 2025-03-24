// WIP

import { CaretDown as CaretDownIcon } from "@phosphor-icons/react";
import {
  Button as AriaButton,
  ComboBox as AriaComboBox,
  ComboBoxProps as AriaComboBoxProps,
  ListBox as AriaListBox,
  ListBoxItem as AriaListBoxItem,
  ValidationResult,
  type ListBoxItemProps,
} from "react-aria-components";
import { twMerge } from "tailwind-merge";

import {
  Description,
  FieldError,
  FieldGroup,
  Input,
  Label,
} from "~/components/ui/field";
import { Popover } from "~/components/ui/popover";

export interface ComboBoxProps<T extends object>
  extends Omit<AriaComboBoxProps<T>, "children" | "className"> {
  children: React.ReactNode | ((item: T) => React.ReactNode);
  className?: string;
  description?: string | null;
  errorMessage?: string | ((validation: ValidationResult) => string);
  label?: string;
}

export function ComboBox<T extends object>({
  children,
  className,
  description,
  errorMessage,
  items,
  label,
  ...props
}: ComboBoxProps<T>) {
  return (
    <AriaComboBox
      {...props}
      className={twMerge("flex flex-col gap-2", className)}
      onInputChange={(value) => console.log(value)}
    >
      {label ? <Label>{label}</Label> : null}
      <FieldGroup className="relative">
        <Input className="flex-1 outline-none" />
        <AriaButton className="absolute right-0 h-8 px-2">
          <CaretDownIcon aria-hidden size={16} />
        </AriaButton>
      </FieldGroup>
      {description ? <Description>{description}</Description> : null}
      <FieldError>{errorMessage}</FieldError>
      <Popover className="h-60 w-(--trigger-width) overflow-y-auto" isNonModal>
        <AriaListBox items={items}>{children}</AriaListBox>
      </Popover>
    </AriaComboBox>
  );
}

export function ComboBoxItem(props: ListBoxItemProps) {
  return (
    <AriaListBoxItem
      {...props}
      className={twMerge(
        "flex h-8 cursor-default items-center gap-2 rounded px-2 text-sm",
        "hover:bg-indigo-700 hover:text-white",
      )}
    />
  );
}
