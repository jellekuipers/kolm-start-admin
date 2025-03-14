import {
  ChevronLeftIcon,
  ChevronRightIcon,
  DoubleArrowLeftIcon,
  DoubleArrowRightIcon,
} from "@radix-ui/react-icons";
import { Table } from "@tanstack/react-table";

import { IconButton } from "~/components/ui/icon-button";

interface DataTablePaginationProps<TData> {
  table: Table<TData>;
}

export function DataTablePagination<TData>({
  table,
}: DataTablePaginationProps<TData>) {
  return (
    <div className="flex items-center gap-2">
      <IconButton
        isDisabled={!table.getCanPreviousPage()}
        onPress={() => table.firstPage()}
      >
        <DoubleArrowLeftIcon />
      </IconButton>
      <IconButton
        isDisabled={!table.getCanPreviousPage()}
        onPress={() => table.previousPage()}
      >
        <ChevronLeftIcon />
      </IconButton>
      <span className="font-medium tabular-nums">
        {table.getState().pagination.pageIndex + 1} of{" "}
        {table.getPageCount().toLocaleString()}
      </span>
      <IconButton
        isDisabled={!table.getCanNextPage()}
        onPress={() => table.nextPage()}
      >
        <ChevronRightIcon />
      </IconButton>
      <IconButton
        isDisabled={!table.getCanNextPage()}
        onPress={() => table.lastPage()}
      >
        <DoubleArrowRightIcon />
      </IconButton>
    </div>
  );
}
