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
      className="text-sm text-slate-600"
    />
  );
}

export function FieldError(props: AriaFieldErrorProps) {
  return <AriaFieldError {...props} className="text-sm text-red-600" />;
}

export function FieldGroup({ className, ...props }: GroupProps) {
  return (
    <AriaGroup
      {...props}
      className={twMerge(
        "group flex h-8 items-center overflow-hidden rounded border border-slate-300 bg-white",
        "outline-0 outline-offset-2 outline-indigo-700 focus-within:outline-2 focus-visible:outline-2",
        "disabled:border-slate-100 disabled:bg-slate-50 disabled:text-slate-200",
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
        "disabled:border-slate-100 disabled:bg-slate-50 disabled:text-slate-200",
        className,
      )}
    />
  );
}

export function Label(props: AriaLabelProps) {
  return (
    <AriaLabel
      {...props}
      className="w-fit cursor-default text-sm font-medium text-slate-600"
    />
  );
}
