import { useState } from "react";
import { ValueNoneIcon } from "@radix-ui/react-icons";
import { RankingInfo, rankItem } from "@tanstack/match-sorter-utils";
import {
  FilterFn,
  flexRender,
  getCoreRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  PaginationState,
  SortingState,
  useReactTable,
  type ColumnDef,
} from "@tanstack/react-table";

import { DataTableSearch } from "~/components/table/data-table-search";
import { Callout, CalloutIcon, CalloutText } from "~/components/ui/callout";
import {
  Table,
  TableBody,
  TableCell,
  TableColumn,
  TableHeader,
  TableRow,
} from "~/components/ui/table";

import { DataTableColumnFilter } from "./data-table-column-filter";
import { DataTablePagination } from "./data-table-pagination";
import { DataTableSortButton } from "./data-table-sort-button";

declare module "@tanstack/react-table" {
  interface FilterFns {
    fuzzy: FilterFn<unknown>;
  }
  interface FilterMeta {
    itemRank: RankingInfo;
  }
}

interface DataTableProps<TData, TValue> {
  columns: ColumnDef<TData, TValue>[];
  data: TData[];
  defaultColumnVisibility?: Record<string, boolean>;
}

const fuzzyFilter: FilterFn<unknown> = (row, columnId, value, addMeta) => {
  const itemRank = rankItem(row.getValue(columnId), value);

  addMeta({
    itemRank,
  });

  return itemRank.passed;
};

export function DataTable<TData, TValue>({
  columns,
  data,
  defaultColumnVisibility,
}: DataTableProps<TData, TValue>) {
  const [columnVisibility, setColumnVisibility] = useState(
    defaultColumnVisibility ?? {},
  );
  const [globalFilter, setGlobalFilter] = useState<string>("");
  const [sorting, setSorting] = useState<SortingState>([]);
  const [pagination, setPagination] = useState<PaginationState>({
    pageIndex: 0,
    pageSize: 50,
  });

  const table = useReactTable({
    data,
    columns,
    filterFns: {
      fuzzy: fuzzyFilter,
    },
    getCoreRowModel: getCoreRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    getSortedRowModel: getSortedRowModel(),
    globalFilterFn: "fuzzy",
    onColumnVisibilityChange: setColumnVisibility,
    onGlobalFilterChange: setGlobalFilter,
    onPaginationChange: setPagination,
    onSortingChange: setSorting,
    state: {
      columnVisibility,
      globalFilter,
      pagination,
      sorting,
    },
  });

  return (
    <div className="space-y-4">
      <div className="flex gap-4 justify-between flex-wrap">
        <DataTableSearch onChange={setGlobalFilter} value={globalFilter} />
        {defaultColumnVisibility ? (
          <DataTableColumnFilter table={table} />
        ) : null}
      </div>
      {table.getRowModel().rows?.length ? (
        <div className="space-y-4">
          <Table>
            <TableHeader>
              {table.getHeaderGroups().map((headerGroup) => (
                <TableRow key={headerGroup.id}>
                  {headerGroup.headers.map((header) => (
                    <TableColumn key={header.id}>
                      <div className="flex gap-4 items-center">
                        {header.isPlaceholder
                          ? null
                          : flexRender(
                              header.column.columnDef.header,
                              header.getContext(),
                            )}
                        {header.column.getCanSort() ? (
                          <DataTableSortButton
                            isSorted={header.column.getIsSorted()}
                            onClick={header.column.getToggleSortingHandler()}
                          />
                        ) : null}
                      </div>
                    </TableColumn>
                  ))}
                </TableRow>
              ))}
            </TableHeader>
            <TableBody>
              {table.getRowModel().rows.map((row) => (
                <TableRow key={row.id}>
                  {row.getVisibleCells().map((cell) => (
                    <TableCell key={cell.id}>
                      {flexRender(
                        cell.column.columnDef.cell,
                        cell.getContext(),
                      )}
                    </TableCell>
                  ))}
                </TableRow>
              ))}
            </TableBody>
          </Table>
          <DataTablePagination table={table} />
        </div>
      ) : (
        <Callout>
          <CalloutIcon>
            <ValueNoneIcon />
          </CalloutIcon>
          <CalloutText>No results</CalloutText>
        </Callout>
      )}
    </div>
  );
}
