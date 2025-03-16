import {
  Cell as AriaCell,
  Column as AriaColumn,
  Row as AriaRow,
  Table as AriaTable,
  TableBody as AriaTableBody,
  TableHeader as AriaTableHeader,
  composeRenderProps,
  type CellProps,
  type ColumnProps,
  type RowProps,
  type TableBodyProps,
  type TableHeaderProps,
  type TableProps,
} from "react-aria-components";
import { tv } from "tailwind-variants";

const tableCellStyles = tv({
  base: "align-middle px-4 py-2 whitespace-nowrap",
  variants: {
    isHeader: {
      true: "font-bold",
      false: "font-normal",
    },
  },
});

export function Table(props: TableProps) {
  return (
    <div className="overflow-x-auto -mx-4 md:mx-0 outline-none">
      <AriaTable {...props} className="w-full" />
    </div>
  );
}

export function TableBody<T extends object>(props: TableBodyProps<T>) {
  return (
    <AriaTableBody
      {...props}
      className="align-middle divide-y divide-gray-200 border-y border-gray-300"
    />
  );
}

export function TableCell({ className, ...props }: CellProps) {
  return (
    <AriaCell
      {...props}
      className={composeRenderProps(className, (className, renderProps) =>
        tableCellStyles({ ...renderProps, className }),
      )}
    />
  );
}

export function TableColumn({ className, ...props }: ColumnProps) {
  return (
    <AriaColumn
      {...props}
      className={composeRenderProps(className, (className, renderProps) =>
        tableCellStyles({ ...renderProps, className, isHeader: true }),
      )}
    />
  );
}

export function TableHeader<T extends object>(props: TableHeaderProps<T>) {
  return <AriaTableHeader {...props} className="align-middle" />;
}

export function TableRow<T extends object>(props: RowProps<T>) {
  return <AriaRow {...props} className="align-middle" />;
}
