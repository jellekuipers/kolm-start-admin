import {
  Tab as AriaTab,
  TabList as AriaTabList,
  TabPanel as AriaTabPanel,
  Tabs as AriaTabs,
  type TabListProps,
  type TabPanelProps,
  type TabProps,
  type TabsProps,
} from "react-aria-components";
import { twMerge } from "tailwind-merge";

export function Tabs(props: TabsProps) {
  return <AriaTabs {...props} className="flex flex-col gap-4" />;
}

export function TabList<T extends object>(props: TabListProps<T>) {
  return (
    <AriaTabList
      {...props}
      className="flex gap-1 border-b border-slate-200 pb-2"
    />
  );
}

export function Tab(props: TabProps) {
  return (
    <AriaTab
      {...props}
      className={twMerge(
        "flex cursor-default items-center gap-2 rounded px-2 py-1 font-medium",
        "hover:bg-slate-100",
        "selected:bg-slate-100",
      )}
    />
  );
}

export function TabPanel(props: TabPanelProps) {
  return <AriaTabPanel {...props} className="flex-1" />;
}
