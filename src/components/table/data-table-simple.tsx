import { EmptyIcon } from "@phosphor-icons/react";
import {
  type ColumnDef,
  flexRender,
  getCoreRowModel,
  getSortedRowModel,
  type SortingState,
  useReactTable,
} from "@tanstack/react-table";
import { useState } from "react";
import { useTranslation } from "react-i18next";

import { Callout, CalloutIcon, CalloutText } from "@/components/ui/callout";
import {
  Table,
  TableBody,
  TableCell,
  TableColumn,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

import { DataTableSortButton } from "./data-table-sort-button";

interface DataTableProps<TData, TValue> {
  columns: ColumnDef<TData, TValue>[];
  data: TData[];
  label: string;
}

export function DataTableSimple<TData, TValue>({
  columns,
  data,
  label,
}: DataTableProps<TData, TValue>) {
  const { t } = useTranslation();
  const [sorting, setSorting] = useState<SortingState>([]);

  const table = useReactTable({
    data,
    columns,
    getCoreRowModel: getCoreRowModel(),
    getSortedRowModel: getSortedRowModel(),
    filterFns: { fuzzy: () => true },
    onSortingChange: setSorting,
    state: {
      sorting,
    },
  });

  return (
    <>
      {table.getRowModel().rows?.length ? (
        <Table aria-label={label}>
          <TableHeader>
            {table.getHeaderGroups().map((headerGroup) => (
              <TableRow key={headerGroup.id}>
                {headerGroup.headers.map((header) => (
                  <TableColumn key={header.id} isRowHeader>
                    <div className="flex items-center gap-2">
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
                    {flexRender(cell.column.columnDef.cell, cell.getContext())}
                  </TableCell>
                ))}
              </TableRow>
            ))}
          </TableBody>
        </Table>
      ) : (
        <Callout color="indigo">
          <CalloutIcon>
            <EmptyIcon size={16} />
          </CalloutIcon>
          <CalloutText>{t("common.no_results")}</CalloutText>
        </Callout>
      )}
    </>
  );
}
