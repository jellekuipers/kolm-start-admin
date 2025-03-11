import type { ComponentProps } from "react";
import { DropdownMenu as RadixDropdownMenu } from "@radix-ui/themes";

export type DropdownMenuContentProps = ComponentProps<
  typeof RadixDropdownMenu.Content
>;
export type DropdownMenuItemProps = ComponentProps<
  typeof RadixDropdownMenu.Item
>;
export type DropdownMenuLabelProps = ComponentProps<
  typeof RadixDropdownMenu.Label
>;
export type DropdownMenuRootProps = ComponentProps<
  typeof RadixDropdownMenu.Root
>;
export type DropdownMenuSeparatorProps = ComponentProps<
  typeof RadixDropdownMenu.Separator
>;
export type DropdownMenuTriggerProps = ComponentProps<
  typeof RadixDropdownMenu.Trigger
>;

export function Content(props: DropdownMenuContentProps) {
  return <RadixDropdownMenu.Content {...props} />;
}

export function Item(props: DropdownMenuItemProps) {
  return <RadixDropdownMenu.Item {...props} />;
}

export function Label(props: DropdownMenuLabelProps) {
  return <RadixDropdownMenu.Label {...props} />;
}

export function Root(props: DropdownMenuRootProps) {
  return <RadixDropdownMenu.Root {...props} />;
}

export function Separator(props: DropdownMenuSeparatorProps) {
  return <RadixDropdownMenu.Separator {...props} />;
}

export function Trigger(props: DropdownMenuTriggerProps) {
  return <RadixDropdownMenu.Trigger {...props} />;
}

export const DropdownMenu = {
  Content,
  Item,
  Label,
  Root,
  Separator,
  Trigger,
};
