import {
  Cell as AriaCell,
  Column as AriaColumn,
  Row as AriaRow,
  Table as AriaTable,
  TableBody as AriaTableBody,
  type TableBodyProps as AriaTableBodyProps,
  type CellProps as AriaTableCellProps,
  type ColumnProps as AriaTableColumnProps,
  TableHeader as AriaTableHeader,
  type TableHeaderProps as AriaTableHeaderProps,
  type TableProps as AriaTableProps,
  type RowProps as AriaTableRowProps,
} from "react-aria-components";
import { twMerge } from "tailwind-merge";
import { tv } from "tailwind-variants";

import { ringNegative } from "@/components/ui/utils";

export function Table(props: AriaTableProps) {
  return (
    <div className={twMerge("-mx-4 overflow-x-auto", "lg:mx-0")}>
      <AriaTable {...props} className="w-full" />
    </div>
  );
}

export function TableBody<T extends object>(props: AriaTableBodyProps<T>) {
  return (
    <AriaTableBody
      {...props}
      className="divide-y divide-border border-border border-y align-middle"
    />
  );
}

const tableCellStyles = tv({
  extend: ringNegative,
  base: "whitespace-nowrap px-4 py-2 align-middle text-sm",
});

export function TableCell(props: AriaTableCellProps) {
  return <AriaCell {...props} className={tableCellStyles()} />;
}

const tableColumnStyles = tv({
  extend: ringNegative,
  base: "whitespace-nowrap px-4 py-2 align-middle",
});

export function TableColumn(props: AriaTableColumnProps) {
  return <AriaColumn {...props} className={tableColumnStyles()} />;
}

export function TableHeader<T extends object>(props: AriaTableHeaderProps<T>) {
  return (
    <AriaTableHeader {...props} className="align-middle font-bold text-sm" />
  );
}

const tableRowStyles = tv({
  extend: ringNegative,
  base: "align-middle",
});

export function TableRow<T extends object>(props: AriaTableRowProps<T>) {
  return <AriaRow {...props} className={tableRowStyles()} />;
}
