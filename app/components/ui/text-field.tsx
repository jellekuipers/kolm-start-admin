import {
  TextField as AriaTextField,
  TextFieldProps as AriaTextFieldProps,
} from "react-aria-components";
import { tv } from "tailwind-variants";

import {
  Description,
  fieldBorderStyles,
  FieldError,
  Input,
  Label,
} from "~/components/ui/field";
import { focusRing } from "~/utils/classes";

export interface TextFieldProps extends AriaTextFieldProps {
  description?: string;
  errorMessage?: string | null;
  label?: string;
}

const inputStyles = tv({
  extend: focusRing,
  variants: {
    isFocused: fieldBorderStyles.variants.isFocusWithin,
    isInvalid: fieldBorderStyles.variants.isInvalid,
    isDisabled: fieldBorderStyles.variants.isDisabled,
  },
});

export function TextField({
  description,
  errorMessage,
  label,
  ...props
}: TextFieldProps) {
  return (
    <AriaTextField className="flex flex-col space-y-2" {...props}>
      <Label>{label}</Label>
      <Input className={inputStyles} />
      {description && (
        <Description slot="description">{description}</Description>
      )}
      <FieldError>{errorMessage}</FieldError>
    </AriaTextField>
  );
}
