import {
  Button as AriaButton,
  type ButtonProps as AriaButtonProps,
} from "react-aria-components";
import { twMerge } from "tailwind-merge";

interface ButtonProps extends AriaButtonProps {
  color?:
    | "indigo"
    | "slate"
    | "red"
    | "blue"
    | "green"
    | "yellow"
    | "purple"
    | "pink"
    | "orange"
    | "teal"
    | "cyan"
    | "lime"
    | "emerald"
    | "rose"
    | "fuchsia"
    | "violet"
    | "amber"
    | "gray";
  variant?: "default" | "light" | "outline";
}

const buttonStyles = {
  default: {
    amber: "border-amber-600 bg-amber-600 text-white",
    blue: "border-blue-600 bg-blue-600 text-white",
    cyan: "border-cyan-600 bg-cyan-600 text-white",
    emerald: "border-emerald-600 bg-emerald-600 text-white",
    fuchsia: "border-fuchsia-600 bg-fuchsia-600 text-white",
    gray: "border-gray-700 bg-gray-700 text-white",
    green: "border-green-600 bg-green-600 text-white",
    indigo: twMerge(
      "border-indigo-700 bg-indigo-700 text-white",
      "hover:bg-indigo-800 hover:border-indigo-700",
      "pressed:bg-indigo-800 pressed:border-indigo-700",
    ),
    lime: "border-lime-600 bg-lime-600 text-white",
    orange: "border-orange-600 bg-orange-600 text-white",
    pink: "border-pink-600 bg-pink-600 text-white",
    purple: "border-purple-600 bg-purple-600 text-white",
    red: "border-red-600 bg-red-600 text-white",
    rose: "border-rose-600 bg-rose-600 text-white",
    slate: "border-slate-700 bg-slate-700 text-white",
    teal: "border-teal-600 bg-teal-600 text-white",
    violet: "border-violet-600 bg-violet-600 text-white",
    yellow: "border-yellow-500 bg-yellow-500 text-white",
  },
  light: {
    amber: "bg-amber-50 border-amber-50 text-amber-700",
    blue: "bg-blue-50 border-blue-50 text-blue-700",
    cyan: "bg-cyan-50 border-cyan-50 text-cyan-700",
    emerald: "bg-emerald-50 border-emerald-50 text-emerald-700",
    fuchsia: "bg-fuchsia-50 border-fuchsia-50 text-fuchsia-700",
    gray: "bg-gray-100 border-gray-100 text-gray-700",
    green: "bg-green-50 border-green-50 text-green-700",
    indigo: twMerge(
      "border-indigo-50 bg-indigo-50 text-indigo-700",
      "hover:bg-indigo-100 hover:border-indigo-100 hover:text-indigo-800",
      "pressed:bg-indigo-100 pressed:border-indigo-100 pressed:text-indigo-800",
    ),
    lime: "bg-lime-50 border-lime-50 text-lime-700",
    orange: "bg-orange-50 border-orange-50 text-orange-700",
    pink: "bg-pink-50 border-pink-50 text-pink-700",
    purple: "bg-purple-50 border-purple-50 text-purple-700",
    red: "bg-red-50 border-red-50 text-red-600",
    rose: "bg-rose-50 border-rose-50 text-rose-700",
    slate: "border-slate-100 bg-slate-100 text-slate-700",
    teal: "bg-teal-50 border-teal-50 text-teal-700",
    violet: "bg-violet-50 border-violet-50 text-violet-700",
    yellow: "bg-yellow-50 border-yellow-50 text-yellow-700",
  },
  outline: {
    amber: "border-amber-600 bg-transparent text-amber-600",
    blue: "border-blue-600 bg-transparent text-blue-600",
    cyan: "border-cyan-600 bg-transparent text-cyan-600",
    emerald: "border-emerald-600 bg-transparent text-emerald-600",
    fuchsia: "border-fuchsia-600 bg-transparent text-fuchsia-600",
    gray: "border-gray-700 bg-transparent text-gray-700",
    green: "border-green-600 bg-transparent text-green-600",
    indigo: twMerge(
      "border-indigo-700 bg-transparent text-indigo-700",
      "hover:border-indigo-800 hover:bg-indigo-50 hover:text-indigo-700",
      "pressed:border-indigo-800 pressed:bg-indigo-50 pressed:text-indigo-700",
    ),
    lime: "border-lime-600 bg-transparent text-lime-600",
    orange: "border-orange-600 bg-transparent text-orange-600",
    pink: "border-pink-600 bg-transparent text-pink-600",
    purple: "border-purple-600 bg-transparent text-purple-600",
    red: "border-red-600 bg-transparent text-red-600",
    rose: "border-rose-600 bg-transparent text-rose-600",
    slate: "border-slate-700 text-slate-700 bg-transparent",
    teal: "border-teal-600 bg-transparent text-teal-600",
    violet: "border-violet-600 bg-transparent text-violet-600",
    yellow: "border-yellow-600 bg-transparent text-yellow-600",
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
