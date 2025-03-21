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
import { tv } from "tailwind-variants";

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
    <AriaHeader
      {...props}
      className="px-3 py-1.5 text-sm font-medium text-slate-600"
    />
  );
}

const menuItemStyles = tv({
  base: [
    "flex h-9 cursor-default items-center gap-3 rounded px-3",
    "hover:bg-indigo-700 hover:text-white",
  ],
});

export function MenuItem(props: MenuItemProps) {
  return <AriaMenuItem {...props} className={menuItemStyles} />;
}

export function MenuSeparator(props: SeparatorProps) {
  return <AriaSeparator {...props} className="my-2 h-px bg-slate-200" />;
}

export function MenuTrigger(props: MenuTriggerProps) {
  return <AriaMenuTrigger {...props} />;
}
