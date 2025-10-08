import {
  Button as AriaButton,
  type ButtonProps as AriaButtonProps,
} from "react-aria-components";
import { twMerge } from "tailwind-merge";

interface ButtonProps extends Omit<AriaButtonProps, "className"> {
  className?: string;
  color: "gray" | "green" | "indigo" | "red";
  variant?: "default" | "light" | "outline";
}

const buttonStyles = {
  default: {
    gray: twMerge(
      "border-gray-700 bg-gray-700 text-white",
      "outline-gray-700",
      "hover:bg-gray-800 hover:border-gray-800",
      "pressed:bg-gray-800 pressed:border-gray-800",
      "dark:border-gray-600 dark:bg-gray-600",
      "dark:hover:bg-gray-500 dark:hover:border-gray-500",
      "dark:pressed:bg-gray-500 dark:pressed:border-gray-500",
    ),
    green: twMerge(
      "border-green-600 bg-green-600 text-white",
      "outline-green-600",
      "hover:bg-green-700 hover:border-green-700",
      "pressed:bg-green-700 pressed:border-green-700",
      "dark:border-green-500 dark:bg-green-500",
      "dark:hover:bg-green-400 dark:hover:border-green-400",
      "dark:pressed:bg-green-400 dark:pressed:border-green-400",
    ),
    indigo: twMerge(
      "border-indigo-700 bg-indigo-700 text-white",
      "outline-indigo-700",
      "hover:bg-indigo-800 hover:border-indigo-700",
      "pressed:bg-indigo-800 pressed:border-indigo-700",
      "dark:border-indigo-600 dark:bg-indigo-600",
      "dark:hover:bg-indigo-500 dark:hover:border-indigo-500",
      "dark:pressed:bg-indigo-500 dark:pressed:border-indigo-500",
    ),
    red: twMerge(
      "border-red-600 bg-red-600 text-white",
      "outline-red-600",
      "hover:bg-red-700 hover:border-red-700",
      "pressed:bg-red-700 pressed:border-red-700",
      "dark:border-red-500 dark:bg-red-500",
      "dark:hover:bg-red-400 dark:hover:border-red-400",
      "dark:pressed:bg-red-400 dark:pressed:border-red-400",
    ),
  },
  light: {
    gray: twMerge(
      "bg-gray-100 border-gray-100 text-gray-700",
      "outline-gray-700",
      "hover:bg-gray-200 hover:border-gray-200 hover:text-gray-800",
      "pressed:bg-gray-200 pressed:border-gray-200 pressed:text-gray-800",
      "dark:bg-gray-800 dark:border-gray-800 dark:text-gray-200",
      "dark:hover:bg-gray-700 dark:hover:border-gray-700 dark:hover:text-gray-100",
      "dark:pressed:bg-gray-700 dark:pressed:border-gray-700 dark:pressed:text-gray-100",
    ),
    green: twMerge(
      "bg-green-50 border-green-50 text-green-700",
      "outline-green-600",
      "hover:bg-green-100 hover:border-green-100 hover:text-green-800",
      "pressed:bg-green-100 pressed:border-green-100 pressed:text-green-800",
      "dark:bg-green-900 dark:border-green-900 dark:text-green-300",
      "dark:hover:bg-green-800 dark:hover:border-green-800 dark:hover:text-green-200",
      "dark:pressed:bg-green-800 dark:pressed:border-green-800 dark:pressed:text-green-200",
    ),
    indigo: twMerge(
      "border-indigo-50 bg-indigo-50 text-indigo-700",
      "outline-indigo-700",
      "hover:bg-indigo-100 hover:border-indigo-100 hover:text-indigo-800",
      "pressed:bg-indigo-100 pressed:border-indigo-100 pressed:text-indigo-800",
      "dark:bg-indigo-200 dark:border-indigo-900 dark:text-indigo-800",
      "dark:hover:bg-indigo-800 dark:hover:border-indigo-800 dark:hover:text-white",
      "dark:pressed:bg-indigo-800 dark:pressed:border-indigo-800 dark:pressed:text-white",
    ),
    red: twMerge(
      "bg-red-50 border-red-50 text-red-600",
      "outline-red-600",
      "hover:bg-red-100 hover:border-red-100 hover:text-red-700",
      "pressed:bg-red-100 pressed:border-red-100 pressed:text-red-700",
      "dark:bg-red-900 dark:border-red-900 dark:text-red-300",
      "dark:hover:bg-red-800 dark:hover:border-red-800 dark:hover:text-red-200",
      "dark:pressed:bg-red-800 dark:pressed:border-red-800 dark:pressed:text-red-200",
    ),
  },
  outline: {
    gray: twMerge(
      "border-gray-700 bg-transparent text-gray-700",
      "outline-gray-700",
      "hover:border-gray-800 hover:bg-gray-100 hover:text-gray-800",
      "pressed:border-gray-800 pressed:bg-gray-100 pressed:text-gray-800",
      "dark:border-gray-600 dark:text-gray-200",
      "dark:hover:border-gray-500 dark:hover:bg-gray-800 dark:hover:text-gray-100",
      "dark:pressed:border-gray-500 dark:pressed:bg-gray-800 dark:pressed:text-gray-100",
    ),
    green: twMerge(
      "border-green-600 bg-transparent text-green-600",
      "outline-green-600",
      "hover:border-green-700 hover:bg-green-50 hover:text-green-700",
      "pressed:border-green-700 pressed:bg-green-50 pressed:text-green-700",
      "dark:border-green-500 dark:text-green-400",
      "dark:hover:border-green-400 dark:hover:bg-green-900 dark:hover:text-green-300",
      "dark:pressed:border-green-400 dark:pressed:bg-green-900 dark:pressed:text-green-300",
    ),
    indigo: twMerge(
      "border-indigo-700 bg-transparent text-indigo-700",
      "outline-indigo-700",
      "hover:border-indigo-800 hover:bg-indigo-50 hover:text-indigo-700",
      "pressed:border-indigo-800 pressed:bg-indigo-50 pressed:text-indigo-700",
      "dark:border-indigo-400 dark:text-indigo-300",
      "dark:hover:border-indigo-300 dark:hover:bg-indigo-900",
      "dark:pressed:border-indigo-300 dark:pressed:bg-indigo-900",
    ),
    red: twMerge(
      "border-red-600 bg-transparent text-red-600",
      "outline-red-600",
      "hover:border-red-700 hover:bg-red-50 hover:text-red-700",
      "pressed:border-red-700 pressed:bg-red-50 pressed:text-red-700",
      "dark:border-red-500 dark:text-white",
      "dark:hover:border-red-400 dark:hover:bg-red-900 dark:hover:text-white",
      "dark:pressed:border-red-400 dark:pressed:bg-red-900 dark:pressed:text-white",
    ),
  },
};

export function Button({
  className,
  color,
  variant = "default",
  ...props
}: ButtonProps) {
  return (
    <AriaButton
      {...props}
      className={twMerge(
        "flex h-8 items-center gap-2 rounded border px-2 text-sm font-medium",
        "outline-0 outline-offset-2 focus-visible:outline-2",
        "disabled:bg-gray-50 disabled:border-gray-50 disabled:text-gray-300",
        "dark:disabled:bg-gray-900 dark:disabled:border-gray-900 dark:disabled:text-gray-700",
        buttonStyles[variant][color],
        className,
      )}
    />
  );
}
