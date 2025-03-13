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
import { Callout } from "~/components/ui/callout";
import { Table } from "~/components/ui/table";

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
          <Table.Root>
            <Table.Header>
              {table.getHeaderGroups().map((headerGroup) => (
                <Table.Row key={headerGroup.id}>
                  {headerGroup.headers.map((header) => (
                    <Table.ColumnHeaderCell
                      key={header.id}
                      className="whitespace-nowrap"
                    >
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
                    </Table.ColumnHeaderCell>
                  ))}
                </Table.Row>
              ))}
            </Table.Header>
            <Table.Body>
              {table.getRowModel().rows.map((row) => (
                <Table.Row key={row.id}>
                  {row.getVisibleCells().map((cell) => (
                    <Table.Cell
                      key={cell.id}
                      className="whitespace-nowrap align-middle"
                    >
                      {flexRender(
                        cell.column.columnDef.cell,
                        cell.getContext(),
                      )}
                    </Table.Cell>
                  ))}
                </Table.Row>
              ))}
            </Table.Body>
          </Table.Root>
          <DataTablePagination table={table} />
        </div>
      ) : (
        <Callout.Root>
          <Callout.Icon>
            <ValueNoneIcon />
          </Callout.Icon>
          <Callout.Text>No results</Callout.Text>
        </Callout.Root>
      )}
    </div>
  );
}
