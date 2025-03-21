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
import { tv } from "tailwind-variants";

import { Description, FieldError, Label } from "~/components/ui/field";
import { Popover } from "~/components/ui/popover";

interface SelectProps<T extends object>
  extends Omit<AriaSelectProps<T>, "children"> {
  children: React.ReactNode | ((item: T) => React.ReactNode);
  description?: string;
  errorMessage?: string | null;
  items?: Iterable<T>;
  label?: string;
  variant?: "default" | "unstyled";
}

const selectStyles = tv({
  base: "flex items-center justify-between gap-2 disabled:border-slate-100 disabled:text-slate-100",
  variants: {
    variant: {
      default: "rounded border border-slate-200 px-3 py-1.5",
      unstyled: "w-fit rounded",
    },
  },
  defaultVariants: {
    variant: "default",
  },
});

export function Select<T extends object>({
  children,
  description,
  errorMessage,
  items,
  label,
  variant,
  ...props
}: SelectProps<T>) {
  return (
    <AriaSelect {...props} className="flex flex-col gap-2">
      {label ? <Label>{label}</Label> : null}
      <AriaButton className={selectStyles({ variant })}>
        <AriaSelectValue>
          {({ defaultChildren, isPlaceholder }) => {
            return isPlaceholder ? "Select" : defaultChildren;
          }}
        </AriaSelectValue>
        <CaretDownIcon size={16} />
      </AriaButton>
      {description ? <Description>{description}</Description> : null}
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
      className={twMerge(
        "flex cursor-default items-center gap-2 rounded px-3 py-1.5",
        "hover:bg-indigo-700 hover:text-white",
      )}
    />
  );
}
