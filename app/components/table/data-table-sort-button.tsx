import {
  CaretDownIcon,
  CaretSortIcon,
  CaretUpIcon,
} from "@radix-ui/react-icons";
import { IconButton } from "@radix-ui/themes";
import { SortDirection } from "@tanstack/react-table";

interface DataTableSortButtonProps {
  isSorted: SortDirection | false;
  onClick: ((event: unknown) => void) | undefined;
}

const renderIcon = (isSorted: SortDirection | false) => {
  switch (isSorted) {
    case "asc":
      return <CaretDownIcon />;
    case "desc":
      return <CaretUpIcon />;
    default:
      return <CaretSortIcon />;
  }
};

export function DataTableSortButton({
  isSorted,
  onClick,
}: DataTableSortButtonProps) {
  const icon = renderIcon(isSorted);

  return (
    <IconButton color="gray" onClick={onClick} variant="ghost">
      {icon}
    </IconButton>
  );
}
