import {
  OverlayArrow as AriaOverlayArrow,
  Tooltip as AriaTooltip,
  type TooltipProps as AriaTooltipProps,
  TooltipTrigger as AriaTooltipTrigger,
  type TooltipTriggerComponentProps as AriaTooltipTriggerComponentProps,
} from "react-aria-components";
import { twMerge } from "tailwind-merge";

export interface TooltipProps extends Omit<AriaTooltipProps, "children"> {
  children: React.ReactNode;
}

export function Tooltip({ children, ...props }: TooltipProps) {
  return (
    <AriaTooltip
      {...props}
      offset={10}
      className={twMerge(
        "group rounded border border-border bg-muted px-3 py-1 text-foreground text-sm drop-shadow-lg will-change-transform",
        "dark:shadow-none",
        "entering:fade-in entering:placement-bottom:slide-in-from-top-1 entering:placement-top:slide-in-from-bottom-1 entering:animate-in",
        "exiting:fade-out exiting:placement-bottom:slide-out-to-top-1 exiting:placement-top:slide-out-to-bottom-1 exiting:animate-out",
      )}
    >
      <AriaOverlayArrow>
        <svg
          aria-hidden="true"
          className="fill-muted stroke-border group-placement-bottom:rotate-180 group-placement-left:-rotate-90 group-placement-right:rotate-90"
          width={8}
          height={8}
          viewBox="0 0 8 8"
        >
          <path d="M0 0 L4 4 L8 0" />
        </svg>
      </AriaOverlayArrow>
      {children}
    </AriaTooltip>
  );
}

export function TooltipTrigger(props: AriaTooltipTriggerComponentProps) {
  return <AriaTooltipTrigger {...props} />;
}
