import {
  Tab as AriaTab,
  TabList as AriaTabList,
  type TabListProps as AriaTabListProps,
  TabPanel as AriaTabPanel,
  type TabPanelProps as AriaTabPanelProps,
  type TabProps as AriaTabProps,
  Tabs as AriaTabs,
  type TabsProps as AriaTabsProps,
} from "react-aria-components";
import { twMerge } from "tailwind-merge";

import { ring } from "@/components/ui/utils";

interface TabProps extends AriaTabProps, Omit<AriaTabProps, "children"> {
  children: React.ReactNode;
}

export function Tabs(props: AriaTabsProps) {
  return <AriaTabs {...props} className="flex flex-col gap-4" />;
}

export function TabList<T extends object>(props: AriaTabListProps<T>) {
  return <AriaTabList {...props} className="flex border-border border-b" />;
}

export function Tab({ children, ...props }: TabProps) {
  return (
    <AriaTab
      {...props}
      className={twMerge(
        "group -mb-px flex cursor-pointer items-center gap-2 border-transparent border-b-2 px-2 pb-1",
        "selected:border-primary",
        ring(),
      )}
    >
      <span
        className={twMerge(
          "flex h-8 items-center rounded px-2 font-medium text-foreground text-sm",
          "group-hover:bg-muted",
        )}
      >
        {children}
      </span>
    </AriaTab>
  );
}

export function TabPanel(props: AriaTabPanelProps) {
  return <AriaTabPanel {...props} className={twMerge("flex-1", ring())} />;
}
