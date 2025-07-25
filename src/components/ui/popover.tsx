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
        "rounded-lg border border-slate-300 bg-white p-2 shadow-2xl",
        "entering:animate-in entering:fade-in entering:placement-bottom:slide-in-from-top-1 entering:placement-top:slide-in-from-bottom-1",
        "exiting:animate-out exiting:fade-out exiting:placement-bottom:slide-out-to-top-1 exiting:placement-top:slide-out-to-bottom-1",
        className,
      )}
      placement="bottom end"
    >
      {children}
    </AriaPopover>
  );
}
