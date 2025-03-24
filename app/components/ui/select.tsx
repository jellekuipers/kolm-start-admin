import { CaretDown as CaretDownIcon } from "@phosphor-icons/react";
import {
  Button as AriaButton,
  ListBox as AriaListBox,
  ListBoxItem as AriaListBoxItem,
  Select as AriaSelect,
  SelectValue as AriaSelectValue,
  type SelectProps as AriaSelectProps,
  type ListBoxItemProps,
} from "react-aria-components";
import { twMerge } from "tailwind-merge";

import { Description, FieldError, Label } from "~/components/ui/field";
import { Popover } from "~/components/ui/popover";

interface SelectProps<T extends object>
  extends Omit<AriaSelectProps<T>, "children" | "className"> {
  children: React.ReactNode | ((item: T) => React.ReactNode);
  className?: string;
  description?: string;
  errorMessage?: string | null;
  items?: Iterable<T>;
  label?: string;
}

export function Select<T extends object>({
  children,
  className,
  description,
  errorMessage,
  items,
  label,
  ...props
}: SelectProps<T>) {
  return (
    <AriaSelect
      {...props}
      className={twMerge("flex flex-col gap-2", className)}
    >
      {label ? <Label>{label}</Label> : null}
      <AriaButton
        className={twMerge(
          "flex h-8 items-center justify-between gap-2 rounded border border-slate-300 px-2 text-sm",
          "disabled:border-slate-100 disabled:bg-slate-50 disabled:text-slate-200",
        )}
      >
        <AriaSelectValue>
          {({ defaultChildren, isPlaceholder }) => {
            return isPlaceholder ? "Select" : defaultChildren;
          }}
        </AriaSelectValue>
        <CaretDownIcon size={16} />
      </AriaButton>
      {description ? <Description>{description}</Description> : null}
      <FieldError>{errorMessage}</FieldError>
      <Popover className="w-(--trigger-width)">
        <AriaListBox items={items}>{children}</AriaListBox>
      </Popover>
    </AriaSelect>
  );
}

export function SelectItem(props: ListBoxItemProps) {
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
