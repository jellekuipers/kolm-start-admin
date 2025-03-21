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

const tabsStyles = tv({
  base: "flex gap-4",
  variants: {
    orientation: {
      horizontal: "flex-col",
      vertical: "w-[800px] flex-row",
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

const tabListStyles = tv({
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

const tabStyles = tv({
  extend: focusRing,
  base: "flex cursor-default items-center gap-2 rounded px-3 py-1.5 font-medium",
  variants: {
    isDisabled: {
      true: "bg-slate-50 text-slate-200",
    },
    isHovered: {
      true: "bg-slate-200 text-slate-700",
    },
    isSelected: {
      false: "text-slate-600",
      true: "bg-slate-900 text-white",
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
  base: "flex-1",
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
