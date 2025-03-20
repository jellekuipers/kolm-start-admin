import {
  Popover as AriaPopover,
  type PopoverProps,
} from "react-aria-components";

import { composeTailwindRenderProps } from "~/utils/classes";

export function Popover({ children, className, ...props }: PopoverProps) {
  return (
    <AriaPopover
      {...props}
      className={composeTailwindRenderProps(
        className,
        "entering:animate-in entering:fade-in entering:placement-bottom:slide-in-from-top-1 entering:placement-top:slide-in-from-bottom-1 exiting:animate-out exiting:fade-out exiting:placement-bottom:slide-out-to-top-1 exiting:placement-top:slide-out-to-bottom-1 rounded-lg border border-slate-100 bg-white p-2 shadow-2xl",
      )}
      placement="bottom end"
    >
      {children}
    </AriaPopover>
  );
}
