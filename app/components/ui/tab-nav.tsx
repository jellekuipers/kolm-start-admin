import { ComponentProps } from "react";
import { TabNav as RadixTabNav } from "@radix-ui/themes";

export type TabNavLinkProps = ComponentProps<typeof RadixTabNav.Link>;
export type TabNavRootProps = ComponentProps<typeof RadixTabNav.Root>;

export function Link(props: TabNavLinkProps) {
  return <RadixTabNav.Link {...props} />;
}

export function Root(props: TabNavRootProps) {
  return <RadixTabNav.Root {...props} />;
}

export const TabNav = {
  Link,
  Root,
};
