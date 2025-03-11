import { ComponentProps } from "react";
import { Tabs as RadixTabs } from "@radix-ui/themes";

export type TabsRootProps = ComponentProps<typeof RadixTabs.Root>;
export type TabsListProps = ComponentProps<typeof RadixTabs.List>;
export type TabsTriggerProps = ComponentProps<typeof RadixTabs.Trigger>;
export type TabsContentProps = ComponentProps<typeof RadixTabs.Content>;

export function Root(props: TabsRootProps) {
  return <RadixTabs.Root {...props} />;
}

export function List(props: TabsListProps) {
  return <RadixTabs.List {...props} />;
}

export function Trigger(props: TabsTriggerProps) {
  return <RadixTabs.Trigger {...props} />;
}

export function Content(props: TabsContentProps) {
  return <RadixTabs.Content {...props} />;
}

export const Tabs = {
  Root,
  List,
  Trigger,
  Content,
};
