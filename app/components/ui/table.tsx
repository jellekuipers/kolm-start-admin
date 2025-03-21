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

export function Table(props: TableProps) {
  return (
    <div className="-mx-4 overflow-x-auto md:mx-0">
      <AriaTable {...props} className="w-full" />
    </div>
  );
}

export function TableBody<T extends object>(props: TableBodyProps<T>) {
  return (
    <AriaTableBody
      {...props}
      className="divide-y divide-slate-200 border-y border-slate-200 align-middle"
    />
  );
}

export function TableCell(props: CellProps) {
  return (
    <AriaCell {...props} className="px-4 py-2 align-middle whitespace-nowrap" />
  );
}

export function TableColumn(props: ColumnProps) {
  return (
    <AriaColumn
      {...props}
      className="px-4 py-2 align-middle whitespace-nowrap"
    />
  );
}

export function TableHeader<T extends object>(props: TableHeaderProps<T>) {
  return <AriaTableHeader {...props} className="align-middle font-bold" />;
}

export function TableRow<T extends object>(props: RowProps<T>) {
  return <AriaRow {...props} className="align-middle" />;
}
