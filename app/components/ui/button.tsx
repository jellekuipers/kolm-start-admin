import {
  Button as AriaButton,
  composeRenderProps,
  type ButtonProps as AriaButtonProps,
} from "react-aria-components";
import { tv } from "tailwind-variants";

import { focusRing } from "~/utils/classes";

export interface ButtonProps extends AriaButtonProps {
  variant?: "primary" | "secondary" | "destructive";
}

export const buttonStyles = tv({
  extend: focusRing,
  base: "rounded px-3 font-medium flex items-center gap-3 h-9",
  variants: {
    variant: {
      primary: "text-white bg-indigo-700",
      secondary: "bg-indigo-100 text-indigo-800",
      destructive: "text-white bg-red-700",
    },
  },
  defaultVariants: {
    variant: "primary",
  },
});

export function Button({ className, variant, ...props }: ButtonProps) {
  return (
    <AriaButton
      {...props}
      className={composeRenderProps(className, (className, renderProps) =>
        buttonStyles({ ...renderProps, variant, className }),
      )}
    />
  );
}
