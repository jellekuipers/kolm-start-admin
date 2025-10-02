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

interface TabProps extends AriaTabProps, Omit<AriaTabProps, "children"> {
  children: React.ReactNode;
}

export function Tabs(props: AriaTabsProps) {
  return <AriaTabs {...props} className="flex flex-col gap-4" />;
}

export function TabList<T extends object>(props: AriaTabListProps<T>) {
  return (
    <AriaTabList
      {...props}
      className={twMerge(
        "flex border-b border-gray-300",
        "dark:border-gray-800",
      )}
    />
  );
}

export function Tab({ children, ...props }: TabProps) {
  return (
    <AriaTab
      {...props}
      className={twMerge(
        "group -mb-px flex cursor-pointer items-center gap-2 border-b-2 border-transparent px-2 pb-1",
        "outline-0 outline-offset-2 outline-indigo-700 focus-visible:outline-2",
        "selected:border-indigo-500",
      )}
    >
      <span
        className={twMerge(
          "flex h-8 items-center rounded px-2 text-sm font-medium text-gray-800",
          "group-hover:bg-gray-100",
          "dark:text-gray-200",
          "dark:group-hover:bg-gray-800",
        )}
      >
        {children}
      </span>
    </AriaTab>
  );
}

export function TabPanel(props: AriaTabPanelProps) {
  return (
    <AriaTabPanel
      {...props}
      className={twMerge(
        "flex-1",
        "outline-0 outline-offset-2 outline-indigo-700 focus-visible:outline-2",
      )}
    />
  );
}
