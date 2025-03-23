import {
  Dialog as AriaDialog,
  Header as AriaHeader,
  Menu as AriaMenu,
  MenuItem as AriaMenuItem,
  MenuTrigger as AriaMenuTrigger,
  Separator as AriaSeparator,
  type MenuProps as AriaMenuProps,
  type MenuItemProps,
  type MenuTriggerProps,
  type SeparatorProps,
} from "react-aria-components";
import { twMerge } from "tailwind-merge";

import { Popover } from "~/components/ui/popover";

interface MenuProps<T>
  extends AriaMenuProps<T>,
    Omit<MenuTriggerProps, "children"> {}

export function Menu<T extends object>(props: MenuProps<T>) {
  return (
    <Popover placement="bottom right">
      <AriaDialog className="outline-none">
        <AriaMenu {...props} />
      </AriaDialog>
    </Popover>
  );
}

export function MenuHeader(
  props: React.HTMLAttributes<HTMLElement> & React.RefAttributes<object>,
) {
  return (
    <AriaHeader {...props} className="mb-1 px-2 py-1 text-sm font-medium" />
  );
}

const menuItemColors = {
  indigo: "hover:bg-indigo-700 hover:text-white",
  red: "text-red-600 hover:bg-red-600 hover:text-white",
};

export function MenuItem({
  color = "indigo",
  ...props
}: MenuItemProps & { color?: "indigo" | "red" }) {
  return (
    <AriaMenuItem
      {...props}
      className={twMerge(
        "flex h-8 cursor-default items-center gap-2 rounded px-2 text-sm",
        menuItemColors[color],
      )}
    />
  );
}

export function MenuSeparator(props: SeparatorProps) {
  return <AriaSeparator {...props} className="my-2 h-px bg-slate-200" />;
}

export function MenuTrigger(props: MenuTriggerProps) {
  return <AriaMenuTrigger {...props} />;
}
