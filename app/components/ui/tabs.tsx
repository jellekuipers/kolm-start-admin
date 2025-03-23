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
  return <AriaTabList {...props} className="flex border-b border-slate-200" />;
}

export function Tab({ children, ...props }: TabProps) {
  return (
    <AriaTab
      {...props}
      className={twMerge(
        "group -mb-px flex cursor-pointer items-center gap-2 border-b-2 border-transparent px-2 pb-1",
        "selected:border-indigo-500",
      )}
    >
      <span
        className={twMerge(
          "flex h-8 items-center rounded px-2 text-sm font-medium text-slate-800",
          "group-hover:bg-slate-100",
        )}
      >
        {children as React.ReactNode}
      </span>
    </AriaTab>
  );
}

export function TabPanel(props: TabPanelProps) {
  return <AriaTabPanel {...props} className="flex-1" />;
}
