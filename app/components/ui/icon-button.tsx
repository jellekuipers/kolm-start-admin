import {
  Button as AriaButton,
  composeRenderProps,
  type ButtonProps,
} from "react-aria-components";
import { tv } from "tailwind-variants";

import { focusRing } from "~/utils/classes";

const iconButtonStyles = tv({
  extend: focusRing,
  base: "rounded size-8 justify-center flex items-center hover:bg-slate-100 pressed:bg-slate-200",
});

export function IconButton({ className, ...props }: ButtonProps) {
  return (
    <AriaButton
      {...props}
      className={composeRenderProps(className, (className, renderProps) =>
        iconButtonStyles({ ...renderProps, className }),
      )}
    />
  );
}
