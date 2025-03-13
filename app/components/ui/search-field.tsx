import {
  Button as AriaButton,
  SearchField as AriaSearchField,
  SearchFieldProps as AriaSearchFieldProps,
} from "react-aria-components";

import { Description, FieldError, Input, Label } from "~/components/ui/field";

export interface SearchFieldProps extends AriaSearchFieldProps {
  description?: string;
  errorMessage?: string | null;
  label?: string;
  placeholder?: string;
}

export function SearchField({
  description,
  errorMessage,
  label,
  placeholder,
  ...props
}: SearchFieldProps) {
  return (
    <AriaSearchField {...props}>
      {label && <Label>{label}</Label>}
      <Input placeholder={placeholder} />
      <AriaButton>✕</AriaButton>
      {description && (
        <Description slot="description">{description}</Description>
      )}
      <FieldError>{errorMessage}</FieldError>
    </AriaSearchField>
  );
}
