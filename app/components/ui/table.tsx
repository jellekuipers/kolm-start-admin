import type { ComponentProps } from "react";
import { Table as RadixTable } from "@radix-ui/themes";

export type TableBodyProps = ComponentProps<typeof RadixTable.Body>;
export type TableRootProps = ComponentProps<typeof RadixTable.Root>;
export type TableHeaderProps = ComponentProps<typeof RadixTable.Header>;
export type TableRowProps = ComponentProps<typeof RadixTable.Row>;
export type TableCellProps = ComponentProps<typeof RadixTable.Cell>;
export type TableColumnHeaderCellProps = ComponentProps<
  typeof RadixTable.ColumnHeaderCell
>;
export type TableRowHeaderCellProps = ComponentProps<
  typeof RadixTable.RowHeaderCell
>;

export function Body(props: TableBodyProps) {
  return <RadixTable.Body {...props} />;
}

export function Root(props: TableRootProps) {
  return <RadixTable.Root {...props} />;
}

export function Header(props: TableHeaderProps) {
  return <RadixTable.Header {...props} />;
}

export function Row(props: TableRowProps) {
  return <RadixTable.Row {...props} />;
}

export function Cell(props: TableCellProps) {
  return <RadixTable.Cell {...props} />;
}

export function ColumnHeaderCell(props: TableColumnHeaderCellProps) {
  return <RadixTable.ColumnHeaderCell {...props} />;
}

export function RowHeaderCell(props: TableRowHeaderCellProps) {
  return <RadixTable.RowHeaderCell {...props} />;
}

export const Table = {
  Root,
  Header,
  Body,
  Row,
  Cell,
  ColumnHeaderCell,
  RowHeaderCell,
};
