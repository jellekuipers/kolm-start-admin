import type { ComponentProps } from "react";
import { Select as RadixSelect } from "@radix-ui/themes";

export type SelectRootProps = ComponentProps<typeof RadixSelect.Root>;
export type SelectContentProps = ComponentProps<typeof RadixSelect.Content>;
export type SelectGroupProps = ComponentProps<typeof RadixSelect.Group>;
export type SelectItemProps = ComponentProps<typeof RadixSelect.Item>;
export type SelectTriggerProps = ComponentProps<typeof RadixSelect.Trigger>;

export function Root(props: SelectRootProps) {
  return <RadixSelect.Root {...props} />;
}

export function Content(props: SelectContentProps) {
  return <RadixSelect.Content {...props} />;
}

export function Group(props: SelectGroupProps) {
  return <RadixSelect.Group {...props} />;
}

export function Item(props: SelectItemProps) {
  return <RadixSelect.Item {...props} />;
}

export function Trigger(props: SelectTriggerProps) {
  return <RadixSelect.Trigger {...props} />;
}

export const Select = {
  Root,
  Content,
  Group,
  Item,
  Trigger,
};
