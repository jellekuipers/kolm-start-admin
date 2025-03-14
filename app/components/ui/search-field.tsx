import { Cross1Icon, MagnifyingGlassIcon } from "@radix-ui/react-icons";
import {
  Button as AriaButton,
  Input as AriaInput,
  SearchField as AriaSearchField,
  SearchFieldProps as AriaSearchFieldProps,
} from "react-aria-components";

import { FieldGroup } from "~/components/ui/field";

export interface SearchFieldProps extends AriaSearchFieldProps {
  placeholder?: string;
}

export function SearchField({ placeholder, ...props }: SearchFieldProps) {
  return (
    <AriaSearchField className="group" {...props}>
      <FieldGroup>
        <MagnifyingGlassIcon aria-hidden className="ml-2" />
        <AriaInput
          className="[&::-webkit-search-cancel-button]:hidden px-3 py-1.5 outline-none"
          placeholder={placeholder}
        />
        <AriaButton className="group-empty:invisible mr-2">
          <Cross1Icon aria-hidden />
        </AriaButton>
      </FieldGroup>
    </AriaSearchField>
  );
}
