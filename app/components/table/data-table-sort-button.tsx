import {
  CaretDownIcon,
  CaretSortIcon,
  CaretUpIcon,
} from "@radix-ui/react-icons";
import { SortDirection } from "@tanstack/react-table";

import { IconButton } from "~/components/ui/icon-button";

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

  return <IconButton onPress={onClick}>{icon}</IconButton>;
}
