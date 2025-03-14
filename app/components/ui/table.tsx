import {
  Cell as AriaCell,
  Column as AriaColumn,
  Row as AriaRow,
  Table as AriaTable,
  TableBody as AriaTableBody,
  TableHeader as AriaTableHeader,
  CellProps,
  ColumnProps,
  RowProps,
  TableBodyProps,
  TableHeaderProps,
  TableProps,
} from "react-aria-components";

export function Table(props: TableProps) {
  return <AriaTable className="w-full border-collapse" {...props} />;
}

export function TableBody<T extends object>(props: TableBodyProps<T>) {
  return (
    <AriaTableBody
      className="divide-y divide-gray-300 bg-white border-y border-gray-300"
      {...props}
    />
  );
}

export function TableCell(props: CellProps) {
  return (
    <AriaCell
      className="first:pl-0 last:pr-0 px-4 py-3 whitespace-nowrap align-middle"
      {...props}
    />
  );
}

export function TableColumn(props: ColumnProps) {
  return (
    <AriaColumn className="px-4 py-3 text-left whitespace-nowrap" {...props} />
  );
}

export function TableHeader<T extends object>(props: TableHeaderProps<T>) {
  return <AriaTableHeader {...props} />;
}

export function TableRow<T extends object>(props: RowProps<T>) {
  return <AriaRow {...props} />;
}
