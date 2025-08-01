import {
  Header as AriaHeader,
  Menu as AriaMenu,
  MenuItem as AriaMenuItem,
  type MenuItemProps as AriaMenuItemProps,
  type MenuProps as AriaMenuProps,
  MenuTrigger as AriaMenuTrigger,
  type MenuTriggerProps as AriaMenuTriggerProps,
  Separator as AriaSeparator,
  type SeparatorProps as AriaSeparatorProps,
} from "react-aria-components";
import { twMerge } from "tailwind-merge";

import { Popover } from "~/components/ui/popover";

interface MenuProps<T>
  extends AriaMenuProps<T>,
    Omit<AriaMenuTriggerProps, "children"> {}

export function Menu<T extends object>(props: MenuProps<T>) {
  return (
    <Popover placement="bottom right">
      <AriaMenu {...props} className="outline-0" />
    </Popover>
  );
}

export function MenuHeader(
  props: React.HTMLAttributes<HTMLElement> & React.RefAttributes<HTMLElement>,
) {
  return (
    <AriaHeader {...props} className="mb-1 px-2 py-1 text-sm font-medium" />
  );
}

const menuItemColors = {
  default: "text-slate-800 hover:bg-indigo-700 hover:text-white",
  red: "text-red-600 hover:bg-red-600 hover:text-white",
};

export function MenuItem({
  color = "default",
  ...props
}: AriaMenuItemProps & { color?: "default" | "red" }) {
  return (
    <AriaMenuItem
      {...props}
      className={twMerge(
        "flex h-8 cursor-default items-center gap-2 rounded px-2 text-sm",
        "outline-0 outline-offset-2 outline-indigo-700 focus-visible:outline-2",
        "disabled:bg-slate-50 disabled:text-slate-300",
        menuItemColors[color],
      )}
    />
  );
}

export function MenuSeparator(props: AriaSeparatorProps) {
  return <AriaSeparator {...props} className="my-2 h-px bg-slate-300" />;
}

export function MenuTrigger(props: AriaMenuTriggerProps) {
  return <AriaMenuTrigger {...props} />;
}
