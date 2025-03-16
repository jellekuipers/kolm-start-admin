import {
  Cell as AriaCell,
  Column as AriaColumn,
  Row as AriaRow,
  Table as AriaTable,
  TableBody as AriaTableBody,
  TableHeader as AriaTableHeader,
  CellProps,
  ColumnProps,
  composeRenderProps,
  RowProps,
  TableBodyProps,
  TableHeaderProps,
  TableProps,
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
      <AriaTable className="w-full" {...props} />
    </div>
  );
}

export function TableBody<T extends object>(props: TableBodyProps<T>) {
  return (
    <AriaTableBody
      className="align-middle divide-y divide-gray-200 border-y border-gray-200"
      {...props}
    />
  );
}

export function TableCell({ className, ...props }: CellProps) {
  return (
    <AriaCell
      className={composeRenderProps(className, (className, renderProps) =>
        tableCellStyles({ ...renderProps, className }),
      )}
      {...props}
    />
  );
}

export function TableColumn({ className, ...props }: ColumnProps) {
  return (
    <AriaColumn
      className={composeRenderProps(className, (className, renderProps) =>
        tableCellStyles({ ...renderProps, className, isHeader: true }),
      )}
      {...props}
    />
  );
}

export function TableHeader<T extends object>(props: TableHeaderProps<T>) {
  return <AriaTableHeader className="align-middle" {...props} />;
}

export function TableRow<T extends object>(props: RowProps<T>) {
  return <AriaRow className="align-middle" {...props} />;
}
