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

import { focusRing } from "~/utils/classes";

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
      false: "border-gray-300",
      true: "border-indigo-700",
    },
    isInvalid: {
      true: "border-red-500",
    },
    isDisabled: {
      true: "border-gray-300",
    },
  },
});

export const fieldGroupStyles = tv({
  extend: focusRing,
  base: "group flex items-center border border-gray-300 rounded overflow-hidden",
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

const inputStyles = tv({
  extend: focusRing,
  base: "px-3 h-9 rounded border border-gray-300",
  variants: fieldBorderStyles.variants,
});

export function Input({ className, ...props }: InputProps) {
  return (
    <AriaInput
      {...props}
      className={composeRenderProps(className, (className, renderProps) =>
        inputStyles({ ...renderProps, className }),
      )}
    />
  );
}

export function Label(props: LabelProps) {
  return <AriaLabel className="font-medium" {...props} />;
}
