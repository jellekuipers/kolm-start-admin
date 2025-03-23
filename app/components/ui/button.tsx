import {
  Button as AriaButton,
  type ButtonProps as AriaButtonProps,
} from "react-aria-components";
import { twMerge } from "tailwind-merge";

interface ButtonProps extends AriaButtonProps {
  color?: "indigo" | "slate" | "red";
  variant?: "default" | "light" | "outline";
}

const buttonStyles = {
  default: {
    indigo: "border-indigo-700 bg-indigo-700 text-white",
    slate: "border-slate-700 bg-slate-700 text-white",
    red: "border-red-600 bg-red-600 text-white",
  },
  light: {
    indigo: "border-indigo-50 bg-indigo-50 text-indigo-700",
    slate: "border-slate-100 bg-slate-100 text-slate-700",
    red: "bg-red-50 border-red-50 text-red-600",
  },
  outline: {
    indigo: "border-indigo-700 bg-transparent text-indigo-700",
    slate: "border-slate-700 text-slate-700 bg-transparent",
    red: "border-red-600 bg-transparent text-red-600",
  },
};

export function Button({
  className,
  color = "indigo",
  variant = "default",
  ...props
}: ButtonProps) {
  return (
    <AriaButton
      {...props}
      className={twMerge(
        "flex h-8 items-center gap-2 rounded border px-2 text-sm font-medium",
        buttonStyles[variant][color],
        className as string,
      )}
    />
  );
}
