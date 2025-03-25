import {
  MagnifyingGlass as MagnifyingGlassIcon,
  X as XIcon,
} from "@phosphor-icons/react";
import {
  Button as AriaButton,
  SearchField as AriaSearchField,
  type SearchFieldProps as AriaSearchFieldProps,
  type ValidationResult as AriaValidationResult,
} from "react-aria-components";

import {
  Description,
  FieldError,
  FieldGroup,
  Input,
  Label,
} from "~/components/ui/field";

export interface SearchFieldProps extends AriaSearchFieldProps {
  label?: string;
  description?: string;
  errorMessage?: string | ((validation: AriaValidationResult) => string);
}

export function SearchField({
  label,
  description,
  errorMessage,
  ...props
}: SearchFieldProps) {
  return (
    <AriaSearchField
      {...props}
      aria-label="Search"
      className="group flex min-w-[40px] flex-col gap-1"
    >
      {label && <Label>{label}</Label>}
      <FieldGroup>
        <MagnifyingGlassIcon
          aria-hidden
          className="ml-2 fill-slate-500 group-disabled:fill-slate-200"
        />
        <Input
          className="outline-none [&::-webkit-search-cancel-button]:hidden"
          placeholder="Search.."
        />
        <AriaButton className="mr-1 w-6 group-empty:invisible">
          <XIcon aria-hidden />
        </AriaButton>
      </FieldGroup>
      {description && <Description>{description}</Description>}
      <FieldError>{errorMessage}</FieldError>
    </AriaSearchField>
  );
}
