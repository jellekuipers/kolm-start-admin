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

interface TableProps extends Omit<AriaTableProps, "className"> {
  className?: string;
}

export interface TableBodyProps<T extends object>
  extends Omit<AriaTableBodyProps<T>, "className"> {
  className?: string;
}

interface TableCellProps extends Omit<AriaTableCellProps, "className"> {
  className?: string;
}

interface TableColumnProps extends Omit<AriaTableColumnProps, "className"> {
  className?: string;
}

export interface TableHeaderProps<T extends object>
  extends Omit<AriaTableHeaderProps<T>, "className"> {
  className?: string;
}

export interface TableRowProps<T extends object>
  extends Omit<AriaTableRowProps<T>, "className"> {
  className?: string;
}

export function Table({ className, ...props }: TableProps) {
  return (
    <div className={twMerge("-mx-4 overflow-x-auto", "lg:mx-0")}>
      <AriaTable {...props} className={twMerge("w-full", className)} />
    </div>
  );
}

export function TableBody<T extends object>({
  className,
  ...props
}: TableBodyProps<T>) {
  return (
    <AriaTableBody
      {...props}
      className={twMerge(
        "divide-y divide-gray-300 border-y border-gray-300 align-middle",
        "dark:divide-gray-700 dark:border-gray-700",
        className,
      )}
    />
  );
}

export function TableCell({ className, ...props }: TableCellProps) {
  return (
    <AriaCell
      {...props}
      className={twMerge(
        "px-4 py-2 align-middle text-sm whitespace-nowrap",
        "outline-0 -outline-offset-2 outline-indigo-700 focus-visible:outline-2",
        className,
      )}
    />
  );
}

export function TableColumn({ className, ...props }: TableColumnProps) {
  return (
    <AriaColumn
      {...props}
      className={twMerge(
        "px-4 py-2 align-middle whitespace-nowrap",
        "outline-0 -outline-offset-2 outline-indigo-700 focus-visible:outline-2",
        className,
      )}
    />
  );
}

export function TableHeader<T extends object>({
  className,
  ...props
}: TableHeaderProps<T>) {
  return (
    <AriaTableHeader
      {...props}
      className={twMerge("align-middle text-sm font-bold", className)}
    />
  );
}

export function TableRow<T extends object>({
  className,
  ...props
}: TableRowProps<T>) {
  return (
    <AriaRow
      {...props}
      className={twMerge(
        "align-middle",
        "outline-0 -outline-offset-2 outline-indigo-700 focus-visible:outline-2",
        className,
      )}
    />
  );
}
