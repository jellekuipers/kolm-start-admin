import {
  Heading as AriaHeading,
  type HeadingProps as AriaHeadingProps,
} from "react-aria-components";
import { twMerge } from "tailwind-merge";

export function Heading({ className, level, ...props }: AriaHeadingProps) {
  return (
    <AriaHeading
      {...props}
      className={twMerge(
        "font-bold text-foreground",
        level === 1 && "text-2xl",
        level === 2 && "text-xl",
        level === 3 && "text-lg",
        className,
      )}
      level={level}
    />
  );
}
