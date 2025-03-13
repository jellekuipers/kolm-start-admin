import {
  Dialog as AriaDialog,
  Header as AriaHeader,
  Menu as AriaMenu,
  MenuItem as AriaMenuItem,
  MenuTrigger as AriaMenuTrigger,
  Separator as AriaSeparator,
  type MenuItemProps,
  type MenuProps,
  type MenuTriggerProps,
} from "react-aria-components";

import { Popover } from "~/components/ui/popover";

interface MenuButtonProps<T>
  extends MenuProps<T>,
    Omit<MenuTriggerProps, "children"> {
  label?: React.ReactNode;
}

export function MenuButton<T extends object>({
  children,
  label,
  ...props
}: MenuButtonProps<T>) {
  return (
    <AriaMenuTrigger {...props}>
      {label}
      <Popover>
        <AriaDialog>
          <AriaMenu className="space-y-2 outline-0" {...props}>
            {children}
          </AriaMenu>
        </AriaDialog>
      </Popover>
    </AriaMenuTrigger>
  );
}

export function MenuHeader(
  props: React.HTMLAttributes<HTMLElement> & React.RefAttributes<object>,
) {
  return <AriaHeader className="px-3 py-1.5 text-sm font-medium" {...props} />;
}

export function MenuItem(props: MenuItemProps) {
  const textValue =
    props.textValue ||
    (typeof props.children === "string" ? props.children : undefined);

  return (
    <AriaMenuItem
      className="rounded px-3 py-1.5 text-sm font-medium flex items-center gap-2 hover:bg-gray-50 cursor-default"
      textValue={textValue}
      {...props}
    />
  );
}

export function MenuSeparator(
  props: React.HTMLAttributes<HTMLElement> & React.RefAttributes<object>,
) {
  return <AriaSeparator className="bg-gray-300 h-px -mx-2" {...props} />;
}
