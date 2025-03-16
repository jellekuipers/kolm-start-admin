import {
  FieldError as AriaFieldError,
  Group as AriaGroup,
  Input as AriaInput,
  Label as AriaLabel,
  Text as AriaText,
  composeRenderProps,
  type FieldErrorProps,
  type GroupProps,
  type InputProps,
  type LabelProps,
  type TextProps,
} from "react-aria-components";
import { tv } from "tailwind-variants";

import { composeTailwindRenderProps, focusRing } from "~/utils/classes";

export function Description(props: TextProps) {
  return <AriaText {...props} slot="description" />;
}

export function FieldError(props: FieldErrorProps) {
  return <AriaFieldError className="text-red-500 font-medium" {...props} />;
}

export const fieldBorderStyles = tv({
  extend: focusRing,
  variants: {
    isFocusWithin: {
      false: "border-gray-200",
      true: "border-gray-900",
    },
    isInvalid: {
      true: "border-red-500",
    },
    isDisabled: {
      true: "border-gray-200",
    },
  },
});

export const fieldGroupStyles = tv({
  extend: focusRing,
  base: "group flex items-center border border-gray-200 rounded overflow-hidden",
  variants: fieldBorderStyles.variants,
});

export function FieldGroup({ className, ...props }: GroupProps) {
  return (
    <AriaGroup
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
        "border border-gray-200 rounded px-3 py-1.5",
      )}
    />
  );
}

export function Label(props: LabelProps) {
  return <AriaLabel className="font-medium" {...props} />;
}
