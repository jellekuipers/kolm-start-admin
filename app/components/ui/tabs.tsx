import React from "react";
import {
  Tab as AriaTab,
  TabList as AriaTabList,
  TabPanel as AriaTabPanel,
  Tabs as AriaTabs,
  composeRenderProps,
  type TabListProps,
  type TabPanelProps,
  type TabProps,
  type TabsProps,
} from "react-aria-components";
import { tv } from "tailwind-variants";

import { focusRing } from "~/utils/classes";

export const tabsStyles = tv({
  base: "flex gap-4",
  variants: {
    orientation: {
      horizontal: "flex-col",
      vertical: "flex-row w-[800px]",
    },
  },
});

export function Tabs({ className, ...props }: TabsProps) {
  return (
    <AriaTabs
      {...props}
      className={composeRenderProps(className, (className, renderProps) =>
        tabsStyles({ ...renderProps, className }),
      )}
    />
  );
}

export const tabListStyles = tv({
  base: "flex gap-1",
  variants: {
    orientation: {
      horizontal: "flex-row",
      vertical: "flex-col items-start",
    },
  },
});

export function TabList<T extends object>({
  className,
  ...props
}: TabListProps<T>) {
  return (
    <AriaTabList
      {...props}
      className={composeRenderProps(className, (className, renderProps) =>
        tabListStyles({ ...renderProps, className }),
      )}
    />
  );
}

export const tabStyles = tv({
  extend: focusRing,
  base: "rounded px-3 py-1.5 font-medium flex items-center gap-2 cursor-default",
  variants: {
    isSelected: {
      false:
        "text-gray-600 hover:text-gray-700 pressed:text-gray-700 hover:bg-gray-200 pressed:bg-gray-200",
      true: "text-white bg-gray-900",
    },
    isDisabled: {
      true: "bg-gray-50 text-gray-200",
    },
  },
});

export function Tab({ className, ...props }: TabProps) {
  return (
    <AriaTab
      {...props}
      className={composeRenderProps(className, (className, renderProps) =>
        tabStyles({ ...renderProps, className }),
      )}
    />
  );
}

const tabPanelStyles = tv({
  extend: focusRing,
  base: "flex-1 p-4",
});

export function TabPanel({ className, ...props }: TabPanelProps) {
  return (
    <AriaTabPanel
      {...props}
      className={composeRenderProps(className, (className, renderProps) =>
        tabPanelStyles({ ...renderProps, className }),
      )}
    />
  );
}
