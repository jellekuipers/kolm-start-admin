import {
  CaretDown as CaretDownIcon,
  CaretUpDown as CaretUpDownIcon,
  CaretUp as CaretUpIcon,
} from "@phosphor-icons/react";
import type { SortDirection } from "@tanstack/react-table";

import { IconButton } from "~/components/ui/icon-button";

interface DataTableSortButtonProps {
  isSorted: SortDirection | false;
  onClick: ((event: unknown) => void) | undefined;
}

const renderIcon = (isSorted: SortDirection | false) => {
  switch (isSorted) {
    case "asc":
      return <CaretDownIcon size={16} />;
    case "desc":
      return <CaretUpIcon size={16} />;
    default:
      return <CaretUpDownIcon size={16} />;
  }
};

export function DataTableSortButton({
  isSorted,
  onClick,
}: DataTableSortButtonProps) {
  const icon = renderIcon(isSorted);

  return (
    <IconButton aria-label="Sort column" onPress={onClick}>
      {icon}
    </IconButton>
  );
}
