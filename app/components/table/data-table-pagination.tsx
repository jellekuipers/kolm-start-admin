import {
  ChevronLeftIcon,
  ChevronRightIcon,
  DoubleArrowLeftIcon,
  DoubleArrowRightIcon,
} from "@radix-ui/react-icons";
import { Table } from "@tanstack/react-table";

import { IconButton } from "~/components/ui/icon-button";
import { Text } from "~/components/ui/text";

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
      <Text
        size="2"
        style={{
          fontVariantNumeric: "tabular-nums",
        }}
        weight="medium"
      >
        {table.getState().pagination.pageIndex + 1} of{" "}
        {table.getPageCount().toLocaleString()}
      </Text>
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
