import {
  TextField as AriaTextField,
  type TextFieldProps as AriaTextFieldProps,
  type ValidationResult as AriaValidationResult,
} from "react-aria-components";
import { twMerge } from "tailwind-merge";

import { Description, FieldError, Input, Label } from "@/components/ui/field";

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
          "rounded border border-gray-300",
          "outline-0 outline-offset-2 outline-indigo-700 focus:outline-2 focus-visible:outline-2",
          "disabled:border-gray-100 disabled:bg-gray-50 disabled:text-gray-200",
          "invalid:border-red-300",
          "dark:border-gray-700 dark:bg-gray-800",
          "dark:disabled:border-gray-800 dark:disabled:bg-gray-900 dark:disabled:text-gray-700",
          "dark:invalid:border-red-700",
        )}
      />
      {description ? <Description>{description}</Description> : null}
      <FieldError>{errorMessage}</FieldError>
    </AriaTextField>
  );
}
