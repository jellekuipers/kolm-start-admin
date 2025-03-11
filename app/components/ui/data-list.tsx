import { ComponentProps } from "react";
import { DataList as RadixDataList } from "@radix-ui/themes";

export type DataListRootProps = ComponentProps<typeof RadixDataList.Root>;
export type DataListItemProps = ComponentProps<typeof RadixDataList.Item>;
export type DataListLabelProps = ComponentProps<typeof RadixDataList.Label>;
export type DataListValueProps = ComponentProps<typeof RadixDataList.Value>;

export function Root(props: DataListRootProps) {
  return <RadixDataList.Root {...props} />;
}

export function Item(props: DataListItemProps) {
  return <RadixDataList.Item {...props} />;
}

export function Label(props: DataListLabelProps) {
  return <RadixDataList.Label {...props} />;
}
export function Value(props: DataListValueProps) {
  return <RadixDataList.Value {...props} />;
}

export const DataList = {
  Root,
  Item,
  Label,
  Value,
};
