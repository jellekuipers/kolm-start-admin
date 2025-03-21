import {
  CaretDoubleLeft as CaretDoubleLeftIcon,
  CaretDoubleRight as CaretDoubleRightIcon,
  CaretLeft as CaretLeftIcon,
  CaretRight as CaretRightIcon,
} from "@phosphor-icons/react";
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
        <CaretDoubleLeftIcon size={16} />
      </IconButton>
      <IconButton
        isDisabled={!table.getCanPreviousPage()}
        onPress={() => table.previousPage()}
      >
        <CaretLeftIcon size={16} />
      </IconButton>
      <span className="font-semibold tabular-nums">
        {(table.getState().pagination.pageIndex + 1).toString()} of{" "}
        {table.getPageCount().toString()}
      </span>
      <IconButton
        isDisabled={!table.getCanNextPage()}
        onPress={() => table.nextPage()}
      >
        <CaretRightIcon size={16} />
      </IconButton>
      <IconButton
        isDisabled={!table.getCanNextPage()}
        onPress={() => table.lastPage()}
      >
        <CaretDoubleRightIcon size={16} />
      </IconButton>
    </div>
  );
}
