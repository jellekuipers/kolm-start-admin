import {
  TextField as AriaTextField,
  type TextFieldProps as AriaTextFieldProps,
  type ValidationResult,
} from "react-aria-components";
import { twMerge } from "tailwind-merge";

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
      <Input
        className={twMerge(
          "rounded border border-slate-300",
          "outline-0 outline-offset-2 outline-indigo-700 focus-visible:outline-2",
        )}
      />
      {description ? <Description>{description}</Description> : null}
      <FieldError>{errorMessage}</FieldError>
    </AriaTextField>
  );
}
