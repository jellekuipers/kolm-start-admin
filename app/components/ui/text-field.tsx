import {
  TextField as RACTextField,
  TextFieldProps as RACTextFieldProps,
} from "react-aria-components";

import { Description, FieldError, Input, Label } from "~/components/ui/field";

export interface TextFieldProps extends RACTextFieldProps {
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
    <RACTextField className="flex flex-col gap-1" {...props}>
      <Label>{label}</Label>
      <Input />
      {description && (
        <Description slot="description">{description}</Description>
      )}
      <FieldError>{errorMessage}</FieldError>
    </RACTextField>
  );
}
