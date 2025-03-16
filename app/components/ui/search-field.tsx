import {
  MagnifyingGlass as MagnifyingGlassIcon,
  X as XIcon,
} from "@phosphor-icons/react";
import {
  Button as AriaButton,
  Input as AriaInput,
  SearchField as AriaSearchField,
  type SearchFieldProps as AriaSearchFieldProps,
} from "react-aria-components";

import { FieldGroup } from "~/components/ui/field";

export interface SearchFieldProps extends AriaSearchFieldProps {
  placeholder?: string;
}

export function SearchField({ placeholder, ...props }: SearchFieldProps) {
  return (
    <AriaSearchField {...props} className="group">
      <FieldGroup>
        <MagnifyingGlassIcon aria-hidden className="ml-2" size={16} />
        <AriaInput
          className="[&::-webkit-search-cancel-button]:hidden px-3 py-1.5 outline-none"
          placeholder={placeholder}
        />
        <AriaButton className="group-empty:invisible mr-2">
          <XIcon aria-hidden size={16} />
        </AriaButton>
      </FieldGroup>
    </AriaSearchField>
  );
}
