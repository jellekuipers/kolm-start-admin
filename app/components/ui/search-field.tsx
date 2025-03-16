import {
  MagnifyingGlass as MagnifyingGlassIcon,
  X as XIcon,
} from "@phosphor-icons/react";
import {
  Button as AriaButton,
  SearchField as AriaSearchField,
  type SearchFieldProps as AriaSearchFieldProps,
} from "react-aria-components";

import { FieldGroup, Input } from "~/components/ui/field";

export interface SearchFieldProps extends AriaSearchFieldProps {
  placeholder?: string;
}

export function SearchField({ placeholder, ...props }: SearchFieldProps) {
  return (
    <AriaSearchField {...props} className="group">
      <FieldGroup>
        <MagnifyingGlassIcon aria-hidden className="ml-2" />
        <Input
          className="[&::-webkit-search-cancel-button]:hidden border-none"
          placeholder={placeholder}
        />
        <AriaButton className="group-empty:invisible mr-2">
          <XIcon aria-hidden />
        </AriaButton>
      </FieldGroup>
    </AriaSearchField>
  );
}
