import { EmptyIcon } from "@phosphor-icons/react";
import { rankItem } from "@tanstack/match-sorter-utils";
import {
  type ColumnDef,
  columnFilteringFeature,
  columnVisibilityFeature,
  createFilteredRowModel,
  createPaginatedRowModel,
  createSortedRowModel,
  type FilterFn,
  flexRender,
  globalFilteringFeature,
  type PaginationState,
  type RowData,
  rowPaginationFeature,
  rowSortingFeature,
  type SortingState,
  type TableFeatures,
  tableFeatures,
  useTable,
} from "@tanstack/react-table";
import type React from "react";
import { useState } from "react";
import { useTranslation } from "react-i18next";

import { DataTableSearch } from "@/components/table/data-table-search";
import { Callout, CalloutIcon, CalloutText } from "@/components/ui/callout";
import {
  Table,
  TableBody,
  TableCell,
  TableColumn,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

import { DataTableColumnFilter } from "./data-table-column-filter";
import { DataTablePagination } from "./data-table-pagination";
import { DataTableSortButton } from "./data-table-sort-button";

interface DataTableProps<TData extends RowData> {
  actions?: React.ReactNode;
  columns: Array<ColumnDef<DataTableFeatures, TData, unknown>>;
  data: TData[];
  defaultColumnVisibility?: Record<string, boolean>;
  label: string;
}

const fuzzyFilter: FilterFn<TableFeatures, RowData> = (
  row,
  columnId,
  value,
  addMeta,
) => {
  const itemRank = rankItem(row.getValue(columnId), value);

  addMeta?.({
    itemRank,
  });

  return itemRank.passed;
};

const dataTableFeatures = tableFeatures({
  columnFilteringFeature,
  columnVisibilityFeature,
  filteredRowModel: createFilteredRowModel(),
  filterFns: { fuzzy: fuzzyFilter },
  globalFilteringFeature,
  paginatedRowModel: createPaginatedRowModel(),
  rowPaginationFeature,
  rowSortingFeature,
  sortedRowModel: createSortedRowModel(),
});

export type DataTableFeatures = typeof dataTableFeatures;

export function DataTable<TData extends RowData>({
  actions,
  columns,
  data,
  defaultColumnVisibility,
  label,
}: DataTableProps<TData>) {
  const { t } = useTranslation();
  const [columnVisibility, setColumnVisibility] = useState(
    defaultColumnVisibility ?? {},
  );
  const [globalFilter, setGlobalFilter] = useState<string>("");
  const [sorting, setSorting] = useState<SortingState>([]);
  const [pagination, setPagination] = useState<PaginationState>({
    pageIndex: 0,
    pageSize: 25,
  });

  const table = useTable<DataTableFeatures, TData>({
    columns,
    data,
    features: dataTableFeatures,
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
      <div className="flex flex-wrap justify-between gap-4">
        <DataTableSearch onChange={setGlobalFilter} value={globalFilter} />
        {defaultColumnVisibility ? (
          <DataTableColumnFilter table={table} />
        ) : null}
        {actions}
      </div>
      {table.getRowModel().rows?.length ? (
        <div className="space-y-4">
          <Table aria-label={label}>
            <TableHeader>
              {table.getHeaderGroups().flatMap((headerGroup) =>
                headerGroup.headers.map((header) => (
                  <TableColumn key={header.id} id={header.id} isRowHeader>
                    <div className="flex items-center gap-4">
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
                )),
              )}
            </TableHeader>
            <TableBody>
              {table.getRowModel().rows.map((row) => {
                const cells = row.getVisibleCells?.() ?? row.getAllCells();

                return (
                  <TableRow key={row.id}>
                    {cells.map((cell) => (
                      <TableCell key={cell.id}>
                        {flexRender(
                          cell.column.columnDef.cell,
                          cell.getContext(),
                        )}
                      </TableCell>
                    ))}
                  </TableRow>
                );
              })}
            </TableBody>
          </Table>
          <DataTablePagination table={table} />
        </div>
      ) : (
        <Callout>
          <CalloutIcon>
            <EmptyIcon size={16} />
          </CalloutIcon>
          <CalloutText>{t("common.no_results")}</CalloutText>
        </Callout>
      )}
    </div>
  );
}
