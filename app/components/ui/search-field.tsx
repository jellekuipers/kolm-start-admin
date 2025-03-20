import {
  MagnifyingGlass as MagnifyingGlassIcon,
  X as XIcon,
} from "@phosphor-icons/react";
import {
  Button as AriaButton,
  SearchField as AriaSearchField,
  SearchFieldProps as AriaSearchFieldProps,
  ValidationResult,
} from "react-aria-components";

import {
  Description,
  FieldError,
  FieldGroup,
  Input,
  Label,
} from "~/components/ui/field";
import { composeTailwindRenderProps } from "~/utils/classes";

export interface SearchFieldProps extends AriaSearchFieldProps {
  label?: string;
  description?: string;
  errorMessage?: string | ((validation: ValidationResult) => string);
}

export function SearchField({
  label,
  className,
  description,
  errorMessage,
  ...props
}: SearchFieldProps) {
  return (
    <AriaSearchField
      {...props}
      className={composeTailwindRenderProps(
        className,
        "group flex min-w-[40px] flex-col gap-1",
      )}
    >
      {label && <Label>{label}</Label>}
      <FieldGroup>
        <MagnifyingGlassIcon
          aria-hidden
          className="ml-2 fill-slate-500 group-disabled:fill-slate-200"
        />
        <Input
          className="[&::-webkit-search-cancel-button]:hidden"
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
