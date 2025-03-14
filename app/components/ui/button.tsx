import { Button as AriaButton, ButtonProps } from "react-aria-components";
import { tv } from "tailwind-variants";

import { focusRing } from "~/utils/classes";

export const buttonStyles = tv({
  extend: focusRing,
  base: "text-white bg-gray-900 rounded px-3 py-1.5 font-medium flex items-center gap-3",
});

export function Button(props: ButtonProps) {
  return <AriaButton className={buttonStyles} {...props} />;
}
