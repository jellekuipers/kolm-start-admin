import {
  Button as AriaButton,
  composeRenderProps,
  type ButtonProps as AriaButtonProps,
} from "react-aria-components";
import { tv } from "tailwind-variants";

interface ButtonProps extends AriaButtonProps {
  color?: "primary" | "secondary" | "tertiary" | "destructive";
  variant?: "default" | "outline";
}

const buttonStyles = tv({
  base: "flex h-9 items-center gap-3 rounded border px-3 font-medium",
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
      class: "border-indigo-700 bg-indigo-700 text-white",
    },
    {
      variant: "default",
      color: "secondary",
      class: "border-indigo-50 bg-indigo-50 text-indigo-700",
    },
    {
      variant: "default",
      color: "tertiary",
      class: "border-slate-100 bg-slate-100 text-slate-700",
    },
    {
      variant: "default",
      color: "destructive",
      class: "border-red-600 bg-red-600 text-white",
    },
    {
      variant: "outline",
      color: "primary",
      class: "border-indigo-700 bg-transparent text-indigo-700",
    },
    {
      variant: "outline",
      color: "secondary",
      class: "border-indigo-300 bg-transparent text-indigo-700",
    },
    {
      variant: "outline",
      color: "tertiary",
      class: "border-slate-200 bg-transparent text-slate-700",
    },
    {
      variant: "outline",
      color: "destructive",
      class: "border-red-600 bg-transparent text-red-600",
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
