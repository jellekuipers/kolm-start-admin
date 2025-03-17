import {
  Button as AriaButton,
  composeRenderProps,
  type ButtonProps as AriaButtonProps,
} from "react-aria-components";
import { tv } from "tailwind-variants";

import { focusRing } from "~/utils/classes";

interface ButtonProps extends AriaButtonProps {
  color?: "primary" | "secondary" | "tertiary" | "destructive";
  variant?: "default" | "outline";
}

const buttonStyles = tv({
  extend: focusRing,
  base: "rounded px-3 font-medium flex items-center gap-3 h-9 border",
  variants: {
    color: {
      primary: "",
      secondary: "",
      tertiary: "",
      destructive: "",
    },
    variant: {
      default: "",
      outline: "",
    },
  },
  compoundVariants: [
    {
      variant: "default",
      color: "primary",
      class: "text-white bg-indigo-700 border-indigo-700",
    },
    {
      variant: "default",
      color: "secondary",
      class: "bg-indigo-50 text-indigo-700 border-indigo-50",
    },
    {
      variant: "default",
      color: "tertiary",
      class: "bg-slate-100 text-slate-700 border-slate-100",
    },
    {
      variant: "default",
      color: "destructive",
      class: "text-white bg-red-600 border-red-600",
    },
    {
      variant: "outline",
      color: "primary",
      class: "text-indigo-700 bg-transparent border-indigo-700",
    },
    {
      variant: "outline",
      color: "secondary",
      class: "bg-transparent text-indigo-700 border-indigo-300",
    },
    {
      variant: "outline",
      color: "tertiary",
      class: "bg-transparent text-slate-700 border-slate-200",
    },
    {
      variant: "outline",
      color: "destructive",
      class: "text-red-600 bg-transparent border-red-600",
    },
  ],
  defaultVariants: {
    variant: "default",
    color: "primary",
  },
});

export function Button({ className, color, variant, ...props }: ButtonProps) {
  return (
    <AriaButton
      {...props}
      className={composeRenderProps(className, (className, renderProps) =>
        buttonStyles({ ...renderProps, color, variant, className }),
      )}
    />
  );
}
