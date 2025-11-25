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
import { tv } from "tailwind-variants";

import { Popover } from "@/components/ui/popover";
import { ring } from "@/components/ui/utils";

interface MenuProps<T>
  extends AriaMenuProps<T>,
    Omit<AriaMenuTriggerProps, "children"> {}

interface MenuItemProps extends AriaMenuItemProps {
  color?: "default" | "destructive";
}

export function Menu<T extends object>(props: MenuProps<T>) {
  return (
    <Popover placement="bottom right" offset={6}>
      <AriaMenu {...props} className="outline-0" />
    </Popover>
  );
}

export function MenuHeader(
  props: React.HTMLAttributes<HTMLElement> & React.RefAttributes<HTMLElement>,
) {
  return (
    <AriaHeader {...props} className="mb-1 px-2 py-1 font-medium text-sm" />
  );
}

const menuItemStyles = tv({
  extend: ring,
  base: [
    "flex h-8 cursor-default items-center gap-2 rounded px-2 text-sm",
    "disabled:text-muted-foreground",
  ],
  variants: {
    color: {
      default: [
        "text-foreground",
        "hover:bg-primary hover:text-primary-foreground",
      ],
      destructive: [
        "text-destructive",
        "hover:bg-destructive hover:text-destructive-foreground",
      ],
    },
  },
});

export function MenuItem({ color = "default", ...props }: MenuItemProps) {
  return <AriaMenuItem {...props} className={menuItemStyles({ color })} />;
}

export function MenuSeparator(props: AriaSeparatorProps) {
  return <AriaSeparator {...props} className="my-2 h-px bg-border" />;
}

export function MenuTrigger(props: AriaMenuTriggerProps) {
  return <AriaMenuTrigger {...props} />;
}
