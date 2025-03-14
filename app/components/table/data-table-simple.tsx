import { useState } from "react";
import { ValueNoneIcon } from "@radix-ui/react-icons";
import {
  flexRender,
  getCoreRowModel,
  getSortedRowModel,
  SortingState,
  useReactTable,
  type ColumnDef,
} from "@tanstack/react-table";

import { Callout, CalloutIcon, CalloutText } from "~/components/ui/callout";
import { Table } from "~/components/ui/table";

import { DataTableSortButton } from "./data-table-sort-button";

interface DataTableProps<TData, TValue> {
  columns: ColumnDef<TData, TValue>[];
  data: TData[];
  variant?: "surface" | "ghost" | undefined;
}

export function DataTableSimple<TData, TValue>({
  columns,
  data,
  variant,
}: DataTableProps<TData, TValue>) {
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
        <Table.Root variant={variant}>
          <Table.Header>
            {table.getHeaderGroups().map((headerGroup) => (
              <Table.Row key={headerGroup.id}>
                {headerGroup.headers.map((header) => (
                  <Table.ColumnHeaderCell
                    key={header.id}
                    className="whitespace-nowrap"
                  >
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
                    className="align-middle whitespace-nowrap"
                  >
                    {flexRender(cell.column.columnDef.cell, cell.getContext())}
                  </Table.Cell>
                ))}
              </Table.Row>
            ))}
          </Table.Body>
        </Table.Root>
      ) : (
        <Callout>
          <CalloutIcon>
            <ValueNoneIcon />
          </CalloutIcon>
          <CalloutText>No results</CalloutText>
        </Callout>
      )}
    </>
  );
}
