import {
  GridList as AriaGridList,
  GridListItem as AriaGridListItem,
  type GridListItemProps as AriaGridListItemProps,
  type GridListProps as AriaGridListProps,
} from "react-aria-components";
import { tv } from "tailwind-variants";

import { ring } from "@/components/ui/utils";

export function GridList<T extends object>({
  children,
  ...props
}: AriaGridListProps<T>) {
  return (
    <AriaGridList {...props} className="space-y-px outline-0">
      {children}
    </AriaGridList>
  );
}

const gridListItemStyles = tv({
  extend: ring,
  base: [
    "flex h-8 items-center gap-2 rounded border border-transparent px-2 font-medium text-sm",
    "hover:bg-accent",
    "selected:bg-accent",
    "disabled:bg-muted disabled:text-muted-foreground",
  ],
});

export function GridListItem({ children, ...props }: AriaGridListItemProps) {
  return (
    <AriaGridListItem {...props} className={gridListItemStyles()}>
      {children}
    </AriaGridListItem>
  );
}
