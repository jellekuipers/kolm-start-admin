import type { ComponentProps } from "react";
import { Popover as RadixPopover } from "@radix-ui/themes";

export type PopoverRootProps = ComponentProps<typeof RadixPopover.Root>;
export type PopoverContentProps = ComponentProps<typeof RadixPopover.Content>;
export type PopoverTriggerProps = ComponentProps<typeof RadixPopover.Trigger>;

export function Root(props: PopoverRootProps) {
  return <RadixPopover.Root {...props} />;
}

export function Content(props: PopoverContentProps) {
  return <RadixPopover.Content {...props} />;
}

export function Trigger(props: PopoverTriggerProps) {
  return <RadixPopover.Trigger {...props} />;
}

export const Popover = {
  Root,
  Content,
  Trigger,
};
