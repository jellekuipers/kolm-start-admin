import {
  GridList as AriaGridList,
  GridListItem as AriaGridListItem,
  type GridListItemProps as AriaGridListItemProps,
  type GridListProps as AriaGridListProps,
} from "react-aria-components";
import { twMerge } from "tailwind-merge";

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

export function GridListItem({ children, ...props }: AriaGridListItemProps) {
  return (
    <AriaGridListItem
      {...props}
      className={twMerge(
        "flex h-8 items-center gap-2 rounded border border-transparent px-2 text-sm font-medium",
        "outline-0 outline-offset-2 outline-indigo-700 focus-visible:outline-2",
        "hover:bg-indigo-50",
        "selected:bg-indigo-50",
        "disabled:bg-gray-50 disabled:text-gray-200",
        "dark:hover:bg-indigo-700",
        "dark:selected:bg-indigo-700",
        "dark:disabled:bg-gray-900 dark:disabled:text-gray-700",
      )}
    >
      {children}
    </AriaGridListItem>
  );
}
