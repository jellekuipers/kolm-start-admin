import { SearchField } from "@/components/ui/search-field";

interface DataTableSearchProps {
  onChange: (value: string) => void;
  value: string;
}

export function DataTableSearch({ onChange, value }: DataTableSearchProps) {
  return <SearchField onChange={onChange} value={value} />;
}
