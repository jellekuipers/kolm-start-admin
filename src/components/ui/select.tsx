import { CaretDownIcon } from "@phosphor-icons/react";
import {
  Button as AriaButton,
  ListBox as AriaListBox,
  ListBoxItem as AriaListBoxItem,
  type ListBoxItemProps as AriaListBoxItemProps,
  Select as AriaSelect,
  type SelectProps as AriaSelectProps,
  SelectValue as AriaSelectValue,
} from "react-aria-components";
import { twMerge } from "tailwind-merge";

import { Description, FieldError, Label } from "@/components/ui/field";
import { Popover } from "@/components/ui/popover";

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
          "flex h-8 items-center justify-between gap-2 rounded border border-gray-300 px-2 text-sm",
          "outline-0 outline-offset-2 outline-indigo-700 focus:outline-2 focus-visible:outline-2",
          "disabled:border-gray-100 disabled:bg-gray-50 disabled:text-gray-200",
          "dark:border-gray-800 dark:bg-gray-900",
          "dark:disabled:border-gray-800 dark:disabled:bg-gray-900 dark:disabled:text-gray-700",
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
        <AriaListBox className="outline-hidden" items={items}>
          {children}
        </AriaListBox>
      </Popover>
    </AriaSelect>
  );
}

export function SelectItem(props: AriaListBoxItemProps) {
  return (
    <AriaListBoxItem
      {...props}
      className={twMerge(
        "flex h-8 cursor-default items-center gap-2 rounded px-2 text-sm outline-0",
        "outline-0 outline-offset-2 outline-indigo-700 focus-visible:outline-2",
        "hover:bg-indigo-700 hover:text-white",
        "disabled:bg-gray-50 disabled:text-gray-200",
        "dark:hover:bg-indigo-600",
        "dark:disabled:bg-gray-900 dark:disabled:text-gray-700",
      )}
    />
  );
}
