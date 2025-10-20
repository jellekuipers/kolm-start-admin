import {
    FieldError as AriaFieldError,
    type FieldErrorProps as AriaFieldErrorProps,
    Group as AriaGroup,
    type GroupProps as AriaGroupProps,
    Input as AriaInput,
    type InputProps as AriaInputProps,
    Label as AriaLabel,
    type LabelProps as AriaLabelProps,
    Text as AriaText,
    type TextProps as AriaTextProps,
} from "react-aria-components";
import { twMerge } from "tailwind-merge";

interface GroupProps extends Omit<AriaGroupProps, "className"> {
  className?: string;
}

interface InputProps extends Omit<AriaInputProps, "className"> {
  className?: string;
}

export function Description(props: AriaTextProps) {
  return (
    <AriaText
      {...props}
      slot="description"
      className={twMerge("text-sm text-gray-600", "dark:text-gray-300")}
    />
  );
}

export function FieldError(props: AriaFieldErrorProps) {
  return (
    <AriaFieldError
      {...props}
      className={twMerge("text-sm text-red-600", "dark:text-red-400")}
    />
  );
}

export function FieldGroup({ className, ...props }: GroupProps) {
  return (
    <AriaGroup
      {...props}
      className={twMerge(
        "group flex h-8 items-center overflow-hidden rounded border border-gray-300 bg-white",
        "outline-0 outline-offset-2 outline-indigo-700 focus-within:outline-2 focus-visible:outline-2",
        "disabled:border-gray-100 disabled:bg-gray-50 disabled:text-gray-200",
        "dark:border-gray-700 dark:bg-gray-800",
        "dark:disabled:border-gray-800 dark:disabled:bg-gray-900 dark:disabled:text-gray-700",
        className,
      )}
    />
  );
}

export function Input({ className, ...props }: InputProps) {
  return (
    <AriaInput
      {...props}
      className={twMerge(
        "h-8 min-w-0 bg-white px-2 text-base outline-0 lg:text-sm",
        "disabled:border-gray-100 disabled:bg-gray-50 disabled:text-gray-200",
        "dark:bg-gray-800",
        "dark:disabled:border-gray-800 dark:disabled:bg-gray-900 dark:disabled:text-gray-700",
        className,
      )}
    />
  );
}

export function Label(props: AriaLabelProps) {
  return (
    <AriaLabel
      {...props}
      className={twMerge(
        "w-fit cursor-default text-sm font-medium text-gray-600",
        "dark:text-gray-200",
      )}
    />
  );
}
