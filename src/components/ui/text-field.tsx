import {
  TextField as AriaTextField,
  type TextFieldProps as AriaTextFieldProps,
  type ValidationResult as AriaValidationResult,
} from "react-aria-components";
import { twMerge } from "tailwind-merge";

import { Description, FieldError, Input, Label } from "@/components/ui/field";
import { ring } from "@/components/ui/utils";

export interface TextFieldProps extends AriaTextFieldProps {
  label?: string;
  description?: string;
  errorMessage?: string | ((validation: AriaValidationResult) => string);
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
          "rounded border border-input",
          "disabled:border-muted disabled:bg-muted disabled:text-muted-foreground",
          "invalid:border-destructive",
          ring(),
        )}
      />
      {description ? <Description>{description}</Description> : null}
      <FieldError>{errorMessage}</FieldError>
    </AriaTextField>
  );
}
