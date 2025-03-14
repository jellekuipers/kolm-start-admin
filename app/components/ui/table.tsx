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
  return <AriaTable {...props} />;
}

export function TableBody<T extends object>(props: TableBodyProps<T>) {
  return <AriaTableBody {...props} />;
}

export function TableCell(props: CellProps) {
  return <AriaCell className="whitespace-nowrap align-middle" {...props} />;
}

export function TableColumn(props: ColumnProps) {
  return <AriaColumn className="whitespace-nowrap" {...props} />;
}

export function TableHeader<T extends object>(props: TableHeaderProps<T>) {
  return <AriaTableHeader {...props} />;
}

export function TableRow<T extends object>(props: RowProps<T>) {
  return <AriaRow {...props} />;
}
