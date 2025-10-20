import {
    Separator as AriaSeparator,
    type SeparatorProps as AriaSeparatorProps,
} from "react-aria-components";
import { twMerge } from "tailwind-merge";

export function Separator({
  className,
  orientation,
  ...props
}: AriaSeparatorProps) {
  return (
    <AriaSeparator
      {...props}
      className={twMerge(
        "border-gray-300 bg-gray-300",
        "dark:border-gray-700 dark:bg-gray-800",
        orientation === "horizontal" && "h-px w-full",
        orientation === "vertical" && "w-px",
        className,
      )}
    />
  );
}
