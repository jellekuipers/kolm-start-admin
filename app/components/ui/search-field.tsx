import { Cross1Icon, MagnifyingGlassIcon } from "@radix-ui/react-icons";
import {
  Button as AriaButton,
  Input as AriaInput,
  SearchField as AriaSearchField,
  SearchFieldProps as AriaSearchFieldProps,
} from "react-aria-components";

import { FieldError, FieldGroup, Label } from "~/components/ui/field";

export interface SearchFieldProps extends AriaSearchFieldProps {
  errorMessage?: string | null;
  label?: string;
  placeholder?: string;
}

export function SearchField({
  errorMessage,
  label,
  placeholder,
  ...props
}: SearchFieldProps) {
  return (
    <AriaSearchField
      className="group space-y-1 border border-gray-300 rounded px-3 py-1.5"
      {...props}
    >
      {label && <Label>{label}</Label>}
      <FieldGroup>
        <MagnifyingGlassIcon aria-hidden className="ml-2" />
        <AriaInput
          className="[&::-webkit-search-cancel-button]:hidden w-full h-full "
          placeholder={placeholder}
        />
        <AriaButton className="group-empty:invisible mr-2">
          <Cross1Icon aria-hidden />
        </AriaButton>
      </FieldGroup>
      <FieldError>{errorMessage}</FieldError>
    </AriaSearchField>
  );
}
