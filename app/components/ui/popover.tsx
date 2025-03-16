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
        "border border-slate-100 rounded-lg bg-white shadow-2xl p-2 entering:animate-in entering:fade-in entering:placement-bottom:slide-in-from-top-1 entering:placement-top:slide-in-from-bottom-1 exiting:animate-out exiting:fade-out exiting:placement-bottom:slide-out-to-top-1 exiting:placement-top:slide-out-to-bottom-1",
      )}
      placement="bottom end"
    >
      {children}
    </AriaPopover>
  );
}
