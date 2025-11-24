import { MagnifyingGlassIcon, XIcon } from "@phosphor-icons/react";
import {
  Button as AriaButton,
  SearchField as AriaSearchField,
  type SearchFieldProps as AriaSearchFieldProps,
  type ValidationResult as AriaValidationResult,
} from "react-aria-components";
import { useTranslation } from "react-i18next";

import {
  Description,
  FieldError,
  FieldGroup,
  Input,
  Label,
} from "@/components/ui/field";

export interface SearchFieldProps extends AriaSearchFieldProps {
  description?: string;
  errorMessage?: string | ((validation: AriaValidationResult) => string);
  label?: string;
}

export function SearchField({
  description,
  errorMessage,
  label,
  ...props
}: SearchFieldProps) {
  const { t } = useTranslation();

  return (
    <AriaSearchField
      {...props}
      aria-label={t("aria.search")}
      className="group flex min-w-10 flex-col gap-1"
    >
      {label ? <Label>{label}</Label> : null}
      <FieldGroup>
        <MagnifyingGlassIcon
          aria-hidden
          className="ml-2 fill-muted-foreground group-disabled:fill-muted-foreground/50"
        />
        <Input
          className="outline-none [&::-webkit-search-cancel-button]:hidden"
          placeholder={t("common.search_placeholder")}
        />
        <AriaButton className="mr-1 w-6 group-empty:invisible">
          <XIcon aria-hidden />
        </AriaButton>
      </FieldGroup>
      {description ? <Description>{description}</Description> : null}
      <FieldError>{errorMessage}</FieldError>
    </AriaSearchField>
  );
}
