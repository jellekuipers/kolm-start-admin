import { MagnifyingGlassIcon } from "@radix-ui/react-icons";

import { TextField } from "~/components/ui/text-field";

interface DataTableSearchProps {
  onChange: React.ChangeEventHandler<HTMLInputElement>;
  value: string;
}

export function DataTableSearch({ onChange, value }: DataTableSearchProps) {
  return (
    <TextField.Root
      onChange={onChange}
      placeholder="Search…"
      type="search"
      value={value}
    >
      <TextField.Slot>
        <MagnifyingGlassIcon />
      </TextField.Slot>
    </TextField.Root>
  );
}
