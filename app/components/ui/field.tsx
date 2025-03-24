import {
  FieldError as AriaFieldError,
  Group as AriaGroup,
  Input as AriaInput,
  Label as AriaLabel,
  Text as AriaText,
  type GroupProps as AriaGroupProps,
  type InputProps as AriaInputProps,
  type FieldErrorProps,
  type LabelProps,
  type TextProps,
} from "react-aria-components";
import { twMerge } from "tailwind-merge";

interface GroupProps extends Omit<AriaGroupProps, "className"> {
  className?: string;
}

interface InputProps extends Omit<AriaInputProps, "className"> {
  className?: string;
}

export function Description(props: TextProps) {
  return (
    <AriaText
      {...props}
      slot="description"
      className="text-sm text-slate-600"
    />
  );
}

export function FieldError(props: FieldErrorProps) {
  return <AriaFieldError {...props} className="text-sm text-red-600" />;
}

export function FieldGroup({ className, ...props }: GroupProps) {
  return (
    <AriaGroup
      {...props}
      className={twMerge(
        "group flex h-8 items-center overflow-hidden rounded border border-slate-300 bg-white",
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
        "h-8 min-w-0 bg-white px-2 text-base lg:text-sm",
        className,
      )}
    />
  );
}

export function Label(props: LabelProps) {
  return (
    <AriaLabel
      {...props}
      className="w-fit cursor-default text-sm font-medium text-slate-600"
    />
  );
}
