import {
  TextField as AriaTextField,
  TextFieldProps as AriaTextFieldProps,
} from "react-aria-components";

import { Description, FieldError, Input, Label } from "~/components/ui/field";

export interface TextFieldProps extends AriaTextFieldProps {
  description?: string;
  errorMessage?: string | null;
  label?: string;
}

export function TextField({
  description,
  errorMessage,
  label,
  ...props
}: TextFieldProps) {
  return (
    <AriaTextField className="space-y-1" {...props}>
      <Label>{label}</Label>
      <Input />
      {description && (
        <Description slot="description">{description}</Description>
      )}
      <FieldError>{errorMessage}</FieldError>
    </AriaTextField>
  );
}
