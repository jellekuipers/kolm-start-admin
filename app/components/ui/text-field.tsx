import {
  TextField as AriaTextField,
  TextFieldProps as AriaTextFieldProps,
  ValidationResult,
} from "react-aria-components";
import { tv } from "tailwind-variants";

import {
  Description,
  fieldBorderStyles,
  FieldError,
  Input,
  Label,
} from "~/components/ui/field";
import { composeTailwindRenderProps, focusRing } from "~/utils/classes";

const inputStyles = tv({
  extend: focusRing,
  base: "border rounded",
  variants: {
    isFocused: fieldBorderStyles.variants.isFocusWithin,
    isInvalid: fieldBorderStyles.variants.isInvalid,
    isDisabled: fieldBorderStyles.variants.isDisabled,
  },
});

export interface TextFieldProps extends AriaTextFieldProps {
  label?: string;
  description?: string;
  errorMessage?: string | ((validation: ValidationResult) => string);
}

export function TextField({
  className,
  description,
  errorMessage,
  label,
  ...props
}: TextFieldProps) {
  return (
    <AriaTextField
      {...props}
      className={composeTailwindRenderProps(className, "flex flex-col gap-1")}
    >
      {label ? <Label>{label}</Label> : null}
      <Input className={inputStyles} />
      {description ? <Description>{description}</Description> : null}
      <FieldError>{errorMessage}</FieldError>
    </AriaTextField>
  );
}
