import { Button as AriaButton, type ButtonProps } from "react-aria-components";
import { tv } from "tailwind-variants";

import { focusRing } from "~/utils/classes";

const iconButtonStyles = tv({
  extend: focusRing,
  base: "rounded size-9 justify-center flex items-center hover:bg-gray-100",
});

export function IconButton(props: ButtonProps) {
  return <AriaButton {...props} className={iconButtonStyles} />;
}
