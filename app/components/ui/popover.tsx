import {
  Popover as AriaPopover,
  PopoverProps as AriaPopoverProps,
} from "react-aria-components";

export interface PopoverProps extends Omit<AriaPopoverProps, "children"> {
  children: React.ReactNode;
}

export function Popover({ children, ...props }: PopoverProps) {
  return (
    <AriaPopover
      className="border border-gray-300 rounded bg-white shadow p-2 entering:animate-in entering:fade-in entering:placement-bottom:slide-in-from-top-1 entering:placement-top:slide-in-from-bottom-1 exiting:animate-out exiting:fade-out exiting:placement-bottom:slide-out-to-top-1 exiting:placement-top:slide-out-to-bottom-1 overflow-hidden"
      {...props}
    >
      {children}
    </AriaPopover>
  );
}
