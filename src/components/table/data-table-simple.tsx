import { EmptyIcon } from "@phosphor-icons/react";
import {
  type ColumnDef,
  createSortedRowModel,
  flexRender,
  type RowData,
  rowSortingFeature,
  type SortingState,
  tableFeatures,
  useTable,
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

interface DataTableProps<TData extends RowData> {
  columns: Array<ColumnDef<DataTableSimpleFeatures, TData, unknown>>;
  data: TData[];
  label: string;
}

const dataTableSimpleFeatures = tableFeatures({
  rowSortingFeature,
  sortedRowModel: createSortedRowModel(),
});

export type DataTableSimpleFeatures = typeof dataTableSimpleFeatures;

export function DataTableSimple<TData extends RowData>({
  columns,
  data,
  label,
}: DataTableProps<TData>) {
  const { t } = useTranslation();
  const [sorting, setSorting] = useState<SortingState>([]);

  const table = useTable<DataTableSimpleFeatures, TData>({
    columns,
    data,
    features: dataTableSimpleFeatures,
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
            {table.getHeaderGroups().flatMap((headerGroup) =>
              headerGroup.headers.map((header) => (
                <TableColumn key={header.id} id={header.id} isRowHeader>
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
              )),
            )}
          </TableHeader>
          <TableBody>
            {table.getRowModel().rows.map((row) => {
              const cells = row.getAllCells();

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
      ) : (
        <Callout>
          <CalloutIcon>
            <EmptyIcon size={16} />
          </CalloutIcon>
          <CalloutText>{t("common.no_results")}</CalloutText>
        </Callout>
      )}
    </>
  );
}
