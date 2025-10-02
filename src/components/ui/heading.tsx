import {
  Heading as AriaHeading,
  type HeadingProps as AriaHeadingProps,
} from "react-aria-components";
import { twMerge } from "tailwind-merge";

export function Heading({ level, ...props }: AriaHeadingProps) {
  return (
    <AriaHeading
      {...props}
      className={twMerge(
        "font-bold text-gray-900",
        "dark:text-white",
        level === 1 && "text-2xl",
        level === 2 && "text-xl",
        level === 3 && "text-lg",
      )}
    />
  );
}
