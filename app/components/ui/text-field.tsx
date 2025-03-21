import {
  TextField as AriaTextField,
  type TextFieldProps as AriaTextFieldProps,
  type ValidationResult,
} from "react-aria-components";

import { Description, FieldError, Input, Label } from "~/components/ui/field";

export interface TextFieldProps extends AriaTextFieldProps {
  label?: string;
  description?: string;
  errorMessage?: string | ((validation: ValidationResult) => string);
}

export function TextField({
  description,
  errorMessage,
  label,
  ...props
}: TextFieldProps) {
  return (
    <AriaTextField {...props} className="flex flex-col gap-1">
      {label ? <Label>{label}</Label> : null}
      <Input className="rounded border border-slate-200" />
      {description ? <Description>{description}</Description> : null}
      <FieldError>{errorMessage}</FieldError>
    </AriaTextField>
  );
}
