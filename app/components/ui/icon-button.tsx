import {
  Button as AriaButton,
  composeRenderProps,
  type ButtonProps,
} from "react-aria-components";
import { tv } from "tailwind-variants";

import { focusRing } from "~/utils/classes";

const iconButtonStyles = tv({
  extend: focusRing,
  base: "flex size-8 items-center justify-center rounded",
  variants: {
    isDisabled: {
      true: "opacity-25",
    },
    isHovered: {
      true: "bg-slate-100",
    },
    isPressed: {
      true: "bg-slate-100",
    },
  },
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
