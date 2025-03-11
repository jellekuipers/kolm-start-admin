import type { ComponentProps } from "react";
import { DropdownMenu as RadixDropdownMenu } from "@radix-ui/themes";

export type DropdownMenuRootProps = ComponentProps<typeof RadixDropdownMenu.Root>;
export type DropdownMenuContentProps = ComponentProps<typeof RadixDropdownMenu.Content>;
export type DropdownMenuItemProps = ComponentProps<typeof RadixDropdownMenu.Item>;
export type DropdownMenuTriggerProps = ComponentProps<typeof RadixDropdownMenu.Trigger>;
export type DropdownMenuSeparatorProps = ComponentProps<typeof RadixDropdownMenu.Separator>;

export function Root(props: DropdownMenuRootProps) {
  return <RadixDropdownMenu.Root {...props} />;
}

export function Content(props: DropdownMenuContentProps) {
  return <RadixDropdownMenu.Content {...props} />;
}

export function Item(props: DropdownMenuItemProps) {
  return <RadixDropdownMenu.Item {...props} />;
}

export function Trigger(props: DropdownMenuTriggerProps) {
  return <RadixDropdownMenu.Trigger {...props} />;
}

export function Separator(props: DropdownMenuSeparatorProps) {
  return <RadixDropdownMenu.Separator {...props} />;
}

export const DropdownMenu = {
  Root,
  Content,
  Item,
  Trigger,
  Separator,
};
