import { MagnifyingGlassIcon, XIcon } from "@phosphor-icons/react";
import {
  Button as AriaButton,
  SearchField as AriaSearchField,
  type SearchFieldProps as AriaSearchFieldProps,
  type ValidationResult as AriaValidationResult,
} from "react-aria-components";
import { useTranslation } from "react-i18next";
import { twMerge } from "tailwind-merge";

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
  const { t } = useTranslation();

  return (
    <AriaSearchField
      {...props}
      aria-label={t("aria.search")}
      className="group flex min-w-[40px] flex-col gap-1"
    >
      {label && <Label>{label}</Label>}
      <FieldGroup>
        <MagnifyingGlassIcon
          aria-hidden
          className={twMerge(
            "ml-2 fill-gray-500 group-disabled:fill-gray-200",
            "dark:fill-gray-300 dark:group-disabled:fill-gray-700",
          )}
        />
        <Input
          className="outline-none [&::-webkit-search-cancel-button]:hidden"
          placeholder={t("common.search_placeholder")}
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
