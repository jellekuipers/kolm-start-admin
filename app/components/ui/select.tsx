import { CaretDown as CaretDownIcon } from "@phosphor-icons/react";
import {
  Button as AriaButton,
  ListBox as AriaListBox,
  ListBoxItem as AriaListBoxItem,
  Select as AriaSelect,
  SelectValue as AriaSelectValue,
  composeRenderProps,
  type SelectProps as AriaSelectProps,
  type ListBoxItemProps,
} from "react-aria-components";
import { tv } from "tailwind-variants";

import { Description, FieldError, Label } from "~/components/ui/field";
import { Popover } from "~/components/ui/popover";
import { focusRing } from "~/utils/classes";

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
  extend: focusRing,
  base: "flex items-center justify-between gap-2",
  variants: {
    variant: {
      default: "border border-slate-200 rounded px-3 py-1.5",
      unstyled: "rounded w-fit",
    },
    isDisabled: {
      true: "text-slate-200 border-slate-200",
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

const selectItemStyles = tv({
  extend: focusRing,
  base: "flex cursor-default items-center gap-2 rounded px-3 py-1.5 font-medium",
  variants: {
    isHovered: {
      true: "bg-indigo-700 text-white",
    },
  },
});

export function SelectItem({ className, ...props }: ListBoxItemProps) {
  return (
    <AriaListBoxItem
      {...props}
      className={composeRenderProps(className, (className, renderProps) =>
        selectItemStyles({ ...renderProps, className }),
      )}
    />
  );
}
