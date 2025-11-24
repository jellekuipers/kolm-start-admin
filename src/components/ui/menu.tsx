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

import { Popover } from "@/components/ui/popover";

interface MenuProps<T>
  extends AriaMenuProps<T>,
    Omit<AriaMenuTriggerProps, "children"> {}

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

const menuItemColors = {
  default: twMerge(
    "text-foreground",
    "hover:bg-primary hover:text-primary-foreground",
  ),
  red: twMerge(
    "text-destructive",
    "hover:bg-destructive hover:text-destructive-foreground",
  ),
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
        "outline-0 outline-ring outline-offset-2 focus-visible:outline-2",
        "disabled:text-muted-foreground",
        menuItemColors[color],
      )}
    />
  );
}

export function MenuSeparator(props: AriaSeparatorProps) {
  return <AriaSeparator {...props} className="my-2 h-px bg-border" />;
}

export function MenuTrigger(props: AriaMenuTriggerProps) {
  return <AriaMenuTrigger {...props} />;
}
