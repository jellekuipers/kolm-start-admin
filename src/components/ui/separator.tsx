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
        "border-border",
        orientation === "horizontal" && "h-px w-full",
        orientation === "vertical" && "w-px",
        className,
      )}
    />
  );
}
