import {
  Button as AriaButton,
  type ButtonProps as AriaButtonProps,
} from "react-aria-components";
import { twMerge } from "tailwind-merge";

interface ButtonProps extends Omit<AriaButtonProps, "className"> {
  className?: string;
  color?:
    | "amber"
    | "blue"
    | "cyan"
    | "emerald"
    | "fuchsia"
    | "gray"
    | "green"
    | "indigo"
    | "lime"
    | "orange"
    | "pink"
    | "purple"
    | "red"
    | "rose"
    | "slate"
    | "teal"
    | "violet"
    | "yellow";
  variant?: "default" | "light" | "outline";
}

const buttonStyles = {
  default: {
    amber: twMerge(
      "border-amber-600 bg-amber-600 text-white",
      "hover:bg-amber-700 hover:border-amber-700",
      "pressed:bg-amber-700 pressed:border-amber-700",
    ),
    blue: twMerge(
      "border-blue-600 bg-blue-600 text-white",
      "hover:bg-blue-700 hover:border-blue-700",
      "pressed:bg-blue-700 pressed:border-blue-700",
    ),
    cyan: twMerge(
      "border-cyan-600 bg-cyan-600 text-white",
      "hover:bg-cyan-700 hover:border-cyan-700",
      "pressed:bg-cyan-700 pressed:border-cyan-700",
    ),
    emerald: twMerge(
      "border-emerald-600 bg-emerald-600 text-white",
      "hover:bg-emerald-700 hover:border-emerald-700",
      "pressed:bg-emerald-700 pressed:border-emerald-700",
    ),
    fuchsia: twMerge(
      "border-fuchsia-600 bg-fuchsia-600 text-white",
      "hover:bg-fuchsia-700 hover:border-fuchsia-700",
      "pressed:bg-fuchsia-700 pressed:border-fuchsia-700",
    ),
    gray: twMerge(
      "border-gray-700 bg-gray-700 text-white",
      "hover:bg-gray-800 hover:border-gray-800",
      "pressed:bg-gray-800 pressed:border-gray-800",
    ),
    green: twMerge(
      "border-green-600 bg-green-600 text-white",
      "hover:bg-green-700 hover:border-green-700",
      "pressed:bg-green-700 pressed:border-green-700",
    ),
    indigo: twMerge(
      "border-indigo-700 bg-indigo-700 text-white",
      "hover:bg-indigo-800 hover:border-indigo-700",
      "pressed:bg-indigo-800 pressed:border-indigo-700",
    ),
    lime: twMerge(
      "border-lime-600 bg-lime-600 text-white",
      "hover:bg-lime-700 hover:border-lime-700",
      "pressed:bg-lime-700 pressed:border-lime-700",
    ),
    orange: twMerge(
      "border-orange-600 bg-orange-600 text-white",
      "hover:bg-orange-700 hover:border-orange-700",
      "pressed:bg-orange-700 pressed:border-orange-700",
    ),
    pink: twMerge(
      "border-pink-600 bg-pink-600 text-white",
      "hover:bg-pink-700 hover:border-pink-700",
      "pressed:bg-pink-700 pressed:border-pink-700",
    ),
    purple: twMerge(
      "border-purple-600 bg-purple-600 text-white",
      "hover:bg-purple-700 hover:border-purple-700",
      "pressed:bg-purple-700 pressed:border-purple-700",
    ),
    red: twMerge(
      "border-red-600 bg-red-600 text-white",
      "hover:bg-red-700 hover:border-red-700",
      "pressed:bg-red-700 pressed:border-red-700",
    ),
    rose: twMerge(
      "border-rose-600 bg-rose-600 text-white",
      "hover:bg-rose-700 hover:border-rose-700",
      "pressed:bg-rose-700 pressed:border-rose-700",
    ),
    slate: twMerge(
      "border-slate-700 bg-slate-700 text-white",
      "hover:bg-slate-800 hover:border-slate-800",
      "pressed:bg-slate-800 pressed:border-slate-800",
    ),
    teal: twMerge(
      "border-teal-600 bg-teal-600 text-white",
      "hover:bg-teal-700 hover:border-teal-700",
      "pressed:bg-teal-700 pressed:border-teal-700",
    ),
    violet: twMerge(
      "border-violet-600 bg-violet-600 text-white",
      "hover:bg-violet-700 hover:border-violet-700",
      "pressed:bg-violet-700 pressed:border-violet-700",
    ),
    yellow: twMerge(
      "border-yellow-500 bg-yellow-500 text-white",
      "hover:bg-yellow-600 hover:border-yellow-600",
      "pressed:bg-yellow-600 pressed:border-yellow-600",
    ),
  },
  light: {
    amber: twMerge(
      "bg-amber-50 border-amber-50 text-amber-700",
      "hover:bg-amber-100 hover:border-amber-100 hover:text-amber-800",
      "pressed:bg-amber-100 pressed:border-amber-100 pressed:text-amber-800",
    ),
    blue: twMerge(
      "bg-blue-50 border-blue-50 text-blue-700",
      "hover:bg-blue-100 hover:border-blue-100 hover:text-blue-800",
      "pressed:bg-blue-100 pressed:border-blue-100 pressed:text-blue-800",
    ),
    cyan: twMerge(
      "bg-cyan-50 border-cyan-50 text-cyan-700",
      "hover:bg-cyan-100 hover:border-cyan-100 hover:text-cyan-800",
      "pressed:bg-cyan-100 pressed:border-cyan-100 pressed:text-cyan-800",
    ),
    emerald: twMerge(
      "bg-emerald-50 border-emerald-50 text-emerald-700",
      "hover:bg-emerald-100 hover:border-emerald-100 hover:text-emerald-800",
      "pressed:bg-emerald-100 pressed:border-emerald-100 pressed:text-emerald-800",
    ),
    fuchsia: twMerge(
      "bg-fuchsia-50 border-fuchsia-50 text-fuchsia-700",
      "hover:bg-fuchsia-100 hover:border-fuchsia-100 hover:text-fuchsia-800",
      "pressed:bg-fuchsia-100 pressed:border-fuchsia-100 pressed:text-fuchsia-800",
    ),
    gray: twMerge(
      "bg-gray-100 border-gray-100 text-gray-700",
      "hover:bg-gray-200 hover:border-gray-200 hover:text-gray-800",
      "pressed:bg-gray-200 pressed:border-gray-200 pressed:text-gray-800",
    ),
    green: twMerge(
      "bg-green-50 border-green-50 text-green-700",
      "hover:bg-green-100 hover:border-green-100 hover:text-green-800",
      "pressed:bg-green-100 pressed:border-green-100 pressed:text-green-800",
    ),
    indigo: twMerge(
      "border-indigo-50 bg-indigo-50 text-indigo-700",
      "hover:bg-indigo-100 hover:border-indigo-100 hover:text-indigo-800",
      "pressed:bg-indigo-100 pressed:border-indigo-100 pressed:text-indigo-800",
    ),
    lime: twMerge(
      "bg-lime-50 border-lime-50 text-lime-700",
      "hover:bg-lime-100 hover:border-lime-100 hover:text-lime-800",
      "pressed:bg-lime-100 pressed:border-lime-100 pressed:text-lime-800",
    ),
    orange: twMerge(
      "bg-orange-50 border-orange-50 text-orange-700",
      "hover:bg-orange-100 hover:border-orange-100 hover:text-orange-800",
      "pressed:bg-orange-100 pressed:border-orange-100 pressed:text-orange-800",
    ),
    pink: twMerge(
      "bg-pink-50 border-pink-50 text-pink-700",
      "hover:bg-pink-100 hover:border-pink-100 hover:text-pink-800",
      "pressed:bg-pink-100 pressed:border-pink-100 pressed:text-pink-800",
    ),
    purple: twMerge(
      "bg-purple-50 border-purple-50 text-purple-700",
      "hover:bg-purple-100 hover:border-purple-100 hover:text-purple-800",
      "pressed:bg-purple-100 pressed:border-purple-100 pressed:text-purple-800",
    ),
    red: twMerge(
      "bg-red-50 border-red-50 text-red-600",
      "hover:bg-red-100 hover:border-red-100 hover:text-red-700",
      "pressed:bg-red-100 pressed:border-red-100 pressed:text-red-700",
    ),
    rose: twMerge(
      "bg-rose-50 border-rose-50 text-rose-700",
      "hover:bg-rose-100 hover:border-rose-100 hover:text-rose-800",
      "pressed:bg-rose-100 pressed:border-rose-100 pressed:text-rose-800",
    ),
    slate: twMerge(
      "border-slate-100 bg-slate-100 text-slate-700",
      "hover:bg-slate-200 hover:border-slate-200 hover:text-slate-800",
      "pressed:bg-slate-200 pressed:border-slate-200 pressed:text-slate-800",
    ),
    teal: twMerge(
      "bg-teal-50 border-teal-50 text-teal-700",
      "hover:bg-teal-100 hover:border-teal-100 hover:text-teal-800",
      "pressed:bg-teal-100 pressed:border-teal-100 pressed:text-teal-800",
    ),
    violet: twMerge(
      "bg-violet-50 border-violet-50 text-violet-700",
      "hover:bg-violet-100 hover:border-violet-100 hover:text-violet-800",
      "pressed:bg-violet-100 pressed:border-violet-100 pressed:text-violet-800",
    ),
    yellow: twMerge(
      "bg-yellow-50 border-yellow-50 text-yellow-700",
      "hover:bg-yellow-100 hover:border-yellow-100 hover:text-yellow-800",
      "pressed:bg-yellow-100 pressed:border-yellow-100 pressed:text-yellow-800",
    ),
  },
  outline: {
    amber: twMerge(
      "border-amber-600 bg-transparent text-amber-600",
      "hover:border-amber-700 hover:bg-amber-50 hover:text-amber-700",
      "pressed:border-amber-700 pressed:bg-amber-50 pressed:text-amber-700",
    ),
    blue: twMerge(
      "border-blue-600 bg-transparent text-blue-600",
      "hover:border-blue-700 hover:bg-blue-50 hover:text-blue-700",
      "pressed:border-blue-700 pressed:bg-blue-50 pressed:text-blue-700",
    ),
    cyan: twMerge(
      "border-cyan-600 bg-transparent text-cyan-600",
      "hover:border-cyan-700 hover:bg-cyan-50 hover:text-cyan-700",
      "pressed:border-cyan-700 pressed:bg-cyan-50 pressed:text-cyan-700",
    ),
    emerald: twMerge(
      "border-emerald-600 bg-transparent text-emerald-600",
      "hover:border-emerald-700 hover:bg-emerald-50 hover:text-emerald-700",
      "pressed:border-emerald-700 pressed:bg-emerald-50 pressed:text-emerald-700",
    ),
    fuchsia: twMerge(
      "border-fuchsia-600 bg-transparent text-fuchsia-600",
      "hover:border-fuchsia-700 hover:bg-fuchsia-50 hover:text-fuchsia-700",
      "pressed:border-fuchsia-700 pressed:bg-fuchsia-50 pressed:text-fuchsia-700",
    ),
    gray: twMerge(
      "border-gray-700 bg-transparent text-gray-700",
      "hover:border-gray-800 hover:bg-gray-100 hover:text-gray-800",
      "pressed:border-gray-800 pressed:bg-gray-100 pressed:text-gray-800",
    ),
    green: twMerge(
      "border-green-600 bg-transparent text-green-600",
      "hover:border-green-700 hover:bg-green-50 hover:text-green-700",
      "pressed:border-green-700 pressed:bg-green-50 pressed:text-green-700",
    ),
    indigo: twMerge(
      "border-indigo-700 bg-transparent text-indigo-700",
      "hover:border-indigo-800 hover:bg-indigo-50 hover:text-indigo-700",
      "pressed:border-indigo-800 pressed:bg-indigo-50 pressed:text-indigo-700",
    ),
    lime: twMerge(
      "border-lime-600 bg-transparent text-lime-600",
      "hover:border-lime-700 hover:bg-lime-50 hover:text-lime-700",
      "pressed:border-lime-700 pressed:bg-lime-50 pressed:text-lime-700",
    ),
    orange: twMerge(
      "border-orange-600 bg-transparent text-orange-600",
      "hover:border-orange-700 hover:bg-orange-50 hover:text-orange-700",
      "pressed:border-orange-700 pressed:bg-orange-50 pressed:text-orange-700",
    ),
    pink: twMerge(
      "border-pink-600 bg-transparent text-pink-600",
      "hover:border-pink-700 hover:bg-pink-50 hover:text-pink-700",
      "pressed:border-pink-700 pressed:bg-pink-50 pressed:text-pink-700",
    ),
    purple: twMerge(
      "border-purple-600 bg-transparent text-purple-600",
      "hover:border-purple-700 hover:bg-purple-50 hover:text-purple-700",
      "pressed:border-purple-700 pressed:bg-purple-50 pressed:text-purple-700",
    ),
    red: twMerge(
      "border-red-600 bg-transparent text-red-600",
      "hover:border-red-700 hover:bg-red-50 hover:text-red-700",
      "pressed:border-red-700 pressed:bg-red-50 pressed:text-red-700",
    ),
    rose: twMerge(
      "border-rose-600 bg-transparent text-rose-600",
      "hover:border-rose-700 hover:bg-rose-50 hover:text-rose-700",
      "pressed:border-rose-700 pressed:bg-rose-50 pressed:text-rose-700",
    ),
    slate: twMerge(
      "border-slate-700 text-slate-700 bg-transparent",
      "hover:border-slate-800 hover:bg-slate-100 hover:text-slate-800",
      "pressed:border-slate-800 pressed:bg-slate-100 pressed:text-slate-800",
    ),
    teal: twMerge(
      "border-teal-600 bg-transparent text-teal-600",
      "hover:border-teal-700 hover:bg-teal-50 hover:text-teal-700",
      "pressed:border-teal-700 pressed:bg-teal-50 pressed:text-teal-700",
    ),
    violet: twMerge(
      "border-violet-600 bg-transparent text-violet-600",
      "hover:border-violet-700 hover:bg-violet-50 hover:text-violet-700",
      "pressed:border-violet-700 pressed:bg-violet-50 pressed:text-violet-700",
    ),
    yellow: twMerge(
      "border-yellow-600 bg-transparent text-yellow-600",
      "hover:border-yellow-700 hover:bg-yellow-50 hover:text-yellow-700",
      "pressed:border-yellow-700 pressed:bg-yellow-50 pressed:text-yellow-700",
    ),
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
        "outline-0 outline-offset-2 outline-indigo-700 focus-visible:outline-2",
        buttonStyles[variant][color],
        className,
      )}
    />
  );
}
