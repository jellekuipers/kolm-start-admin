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
      <Popover placement="bottom right">
        <AriaDialog>
          <AriaMenu {...props} className="outline-hidden">
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
  return <AriaHeader {...props} className="px-3 py-1.5 font-medium" />;
}

export function MenuItem(props: MenuItemProps) {
  const textValue =
    props.textValue ||
    (typeof props.children === "string" ? props.children : undefined);

  return (
    <AriaMenuItem
      {...props}
      className="rounded-md px-3 py-1.5 font-medium flex items-center gap-3 hover:bg-gray-900 hover:text-white cursor-default"
      textValue={textValue}
    />
  );
}

export function MenuSeparator(
  props: React.HTMLAttributes<HTMLElement> & React.RefAttributes<object>,
) {
  return <AriaSeparator {...props} className="bg-gray-200 h-px my-2" />;
}
