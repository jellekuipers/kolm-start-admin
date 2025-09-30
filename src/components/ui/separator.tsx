import {
  Separator as AriaSeparator,
  type SeparatorProps as AriaSeparatorProps,
} from "react-aria-components";
import { twMerge } from "tailwind-merge";

export function Separator(props: AriaSeparatorProps) {
  return (
    <AriaSeparator
      {...props}
      className={twMerge("border-gray-300", "dark:border-gray-800")}
    />
  );
}
