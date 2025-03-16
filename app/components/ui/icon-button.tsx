import { Button as AriaButton, ButtonProps } from "react-aria-components";
import { tv } from "tailwind-variants";

import { focusRing } from "~/utils/classes";

const iconButtonStyles = tv({
  extend: focusRing,
  base: "bg-white rounded size-8 justify-center flex items-center hover:bg-gray-100",
});

export function IconButton(props: ButtonProps) {
  return <AriaButton className={iconButtonStyles} {...props} />;
}
