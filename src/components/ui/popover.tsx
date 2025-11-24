import {
  Popover as AriaPopover,
  type PopoverProps as AriaPopoverProps,
} from "react-aria-components";
import { twMerge } from "tailwind-merge";

interface PopoverProps extends Omit<AriaPopoverProps, "className"> {
  className?: string;
}

export function Popover({ children, className, ...props }: PopoverProps) {
  return (
    <AriaPopover
      {...props}
      className={twMerge(
        "rounded-lg border border-border bg-card p-2 shadow-2xl",
        "dark:shadow-none",
        "entering:fade-in entering:placement-bottom:slide-in-from-top-1 entering:placement-top:slide-in-from-bottom-1 entering:animate-in",
        "exiting:fade-out exiting:placement-bottom:slide-out-to-top-1 exiting:placement-top:slide-out-to-bottom-1 exiting:animate-out",
        className,
      )}
      placement="bottom end"
    >
      {children}
    </AriaPopover>
  );
}
