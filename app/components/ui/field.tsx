import {
  FieldError as AriaFieldError,
  Input as AriaInput,
  Label as AriaLabel,
  composeRenderProps,
  FieldErrorProps,
  Group,
  GroupProps,
  InputProps,
  LabelProps,
  Text,
  TextProps,
} from "react-aria-components";
import { twMerge } from "tailwind-merge";
import { tv } from "tailwind-variants";

import { composeTailwindRenderProps, focusRing } from "~/utils/classes";

export function Description({ className, ...props }: TextProps) {
  return (
    <Text
      {...props}
      slot="description"
      className={twMerge("text-sm text-slate-600", className)}
    />
  );
}

export function FieldError({ className, ...props }: FieldErrorProps) {
  return (
    <AriaFieldError
      {...props}
      className={composeTailwindRenderProps(className, "text-sm text-red-600")}
    />
  );
}

export const fieldBorderStyles = tv({
  variants: {
    isFocusWithin: {
      false: "border-slate-300",
      true: "border-slate-600",
    },
    isInvalid: {
      true: "border-red-600",
    },
    isDisabled: {
      true: "border-slate-200",
    },
  },
});

export const fieldGroupStyles = tv({
  extend: focusRing,
  base: "group flex items-center h-9 bg-white border rounded overflow-hidden",
  variants: fieldBorderStyles.variants,
});

export function FieldGroup({ className, ...props }: GroupProps) {
  return (
    <Group
      {...props}
      className={composeRenderProps(className, (className, renderProps) =>
        fieldGroupStyles({ ...renderProps, className }),
      )}
    />
  );
}

export function Input({ className, ...props }: InputProps) {
  return (
    <AriaInput
      {...props}
      className={composeTailwindRenderProps(
        className,
        "px-3 h-9 min-w-0 outline-0 bg-white disabled:text-slate-200",
      )}
    />
  );
}

export function Label({ className, ...props }: LabelProps) {
  return (
    <AriaLabel
      {...props}
      className={twMerge(
        "text-slate-600 font-medium cursor-default w-fit",
        className,
      )}
    />
  );
}
