import {
  Cell as AriaCell,
  Column as AriaColumn,
  Row as AriaRow,
  Table as AriaTable,
  TableBody as AriaTableBody,
  TableHeader as AriaTableHeader,
  type CellProps,
  type ColumnProps,
  type RowProps,
  type TableBodyProps,
  type TableHeaderProps,
  type TableProps,
} from "react-aria-components";
import { twMerge } from "tailwind-merge";

export function Table({ className, ...props }: TableProps) {
  return (
    <div className="-mx-4 overflow-x-auto md:mx-0">
      <AriaTable
        {...props}
        className={twMerge("w-full", className as string)}
      />
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
        "divide-y divide-slate-200 border-y border-slate-200 align-middle",
        className as string,
      )}
    />
  );
}

export function TableCell({ className, ...props }: CellProps) {
  return (
    <AriaCell
      {...props}
      className={twMerge(
        "px-4 py-2 align-middle text-sm whitespace-nowrap",
        className as string,
      )}
    />
  );
}

export function TableColumn({ className, ...props }: ColumnProps) {
  return (
    <AriaColumn
      {...props}
      className={twMerge(
        "px-4 py-2 align-middle whitespace-nowrap",
        className as string,
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
      className={twMerge("align-middle text-sm font-bold", className as string)}
    />
  );
}

export function TableRow<T extends object>({
  className,
  ...props
}: RowProps<T>) {
  return (
    <AriaRow
      {...props}
      className={twMerge("align-middle", className as string)}
    />
  );
}
