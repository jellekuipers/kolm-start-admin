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
      className="px-3 py-1.5 font-medium text-slate-600 text-sm"
    />
  );
}

const menuItemStyles = tv({
  extend: focusRing,
  base: "rounded px-3 h-9 flex items-center gap-3 hover:bg-indigo-700 hover:text-white cursor-default",
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
  return <AriaSeparator {...props} className="bg-slate-200 h-px my-2" />;
}

export function MenuTrigger(props: MenuTriggerProps) {
  return <AriaMenuTrigger {...props} />;
}
