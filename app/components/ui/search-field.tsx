import {
  Button as RACButton,
  SearchField as RACSearchField,
  SearchFieldProps as RACSearchFieldProps,
} from "react-aria-components";

import { Description, FieldError, Input, Label } from "~/components/ui/field";

export interface SearchFieldProps extends RACSearchFieldProps {
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
    <RACSearchField {...props}>
      {label && <Label>{label}</Label>}
      <Input placeholder={placeholder} />
      <RACButton>✕</RACButton>
      {description && (
        <Description slot="description">{description}</Description>
      )}
      <FieldError>{errorMessage}</FieldError>
    </RACSearchField>
  );
}
