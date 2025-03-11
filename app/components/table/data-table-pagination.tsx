import {
  ChevronLeftIcon,
  ChevronRightIcon,
  DoubleArrowLeftIcon,
  DoubleArrowRightIcon,
} from "@radix-ui/react-icons";
import { Table } from "@tanstack/react-table";

import { Flex } from "~/components/ui/flex";
import { IconButton } from "~/components/ui/icon-button";
import { Text } from "~/components/ui/text";

interface DataTablePaginationProps<TData> {
  table: Table<TData>;
}

export function DataTablePagination<TData>({
  table,
}: DataTablePaginationProps<TData>) {
  return (
    <Flex align="center" gap="4">
      <IconButton
        color="gray"
        disabled={!table.getCanPreviousPage()}
        onClick={() => table.firstPage()}
        variant="ghost"
      >
        <DoubleArrowLeftIcon />
      </IconButton>
      <IconButton
        color="gray"
        disabled={!table.getCanPreviousPage()}
        onClick={() => table.previousPage()}
        variant="ghost"
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
        color="gray"
        disabled={!table.getCanNextPage()}
        onClick={() => table.nextPage()}
        variant="ghost"
      >
        <ChevronRightIcon />
      </IconButton>
      <IconButton
        color="gray"
        disabled={!table.getCanNextPage()}
        onClick={() => table.lastPage()}
        variant="ghost"
      >
        <DoubleArrowRightIcon />
      </IconButton>
    </Flex>
  );
}
