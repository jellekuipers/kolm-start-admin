import {
  Heading as AriaHeading,
  type HeadingProps,
} from "react-aria-components";
import { twMerge } from "tailwind-merge";

export function Heading({ level, ...props }: HeadingProps) {
  return (
    <AriaHeading
      {...props}
      className={twMerge(
        "font-bold",
        level === 1 && "text-2xl",
        level === 2 && "text-xl",
        level === 3 && "text-lg",
      )}
    />
  );
}
