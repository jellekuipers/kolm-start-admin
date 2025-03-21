import {
  Dialog as AriaDialog,
  Header as AriaHeader,
  Menu as AriaMenu,
  MenuItem as AriaMenuItem,
  MenuTrigger as AriaMenuTrigger,
  Separator as AriaSeparator,
  composeRenderProps,
  type MenuProps as AriaMenuProps,
  type MenuItemProps,
  type MenuTriggerProps,
} from "react-aria-components";
import { tv } from "tailwind-variants";

import { Popover } from "~/components/ui/popover";
import { focusRing } from "~/utils/classes";

interface MenuProps<T>
  extends AriaMenuProps<T>,
    Omit<MenuTriggerProps, "children"> {}

export function Menu<T extends object>(props: MenuProps<T>) {
  return (
    <Popover placement="bottom right">
      <AriaDialog>
        <AriaMenu {...props} className="outline-hidden" />
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
  extend: focusRing,
  base: "flex h-9 cursor-default items-center gap-3 rounded px-3 font-medium",
  variants: {
    isHovered: {
      true: "bg-indigo-700 text-white",
    },
  },
});

export function MenuItem({ className, ...props }: MenuItemProps) {
  const textValue =
    props.textValue ||
    (typeof props.children === "string" ? props.children : undefined);

  return (
    <AriaMenuItem
      {...props}
      className={composeRenderProps(className, (className, renderProps) =>
        menuItemStyles({ ...renderProps, className }),
      )}
      textValue={textValue}
    />
  );
}

export function MenuSeparator(
  props: React.HTMLAttributes<HTMLElement> & React.RefAttributes<object>,
) {
  return <AriaSeparator {...props} className="my-2 h-px bg-slate-200" />;
}

export function MenuTrigger(props: MenuTriggerProps) {
  return <AriaMenuTrigger {...props} />;
}
