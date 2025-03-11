import { ComponentProps } from "react";
import { TabNav as RadixTabNav } from "@radix-ui/themes";

export type TabNavRootProps = ComponentProps<typeof RadixTabNav.Root>;
export type TabNavLinkProps = ComponentProps<typeof RadixTabNav.Link>;

export function Root(props: TabNavRootProps) {
  return <RadixTabNav.Root {...props} />;
}

export function Link(props: TabNavLinkProps) {
  return <RadixTabNav.Link {...props} />;
}

export const TabNav = {
  Root,
  Link,
};