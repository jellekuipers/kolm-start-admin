import {
  Button as AriaButton,
  type ButtonProps as AriaButtonProps,
} from "react-aria-components";
import { tv } from "tailwind-variants";

import { ring } from "@/components/ui/utils";

const iconButtonStyles = tv({
  extend: ring,
  base: [
    "flex size-8 items-center justify-center rounded",
    "disabled:opacity-25",
    "hover:bg-muted",
    "pressed:bg-muted",
  ],
});

export function IconButton(props: AriaButtonProps) {
  return <AriaButton {...props} className={iconButtonStyles()} />;
}
