import {
  FieldError as AriaFieldError,
  Group as AriaGroup,
  Input as AriaInput,
  Label as AriaLabel,
  Text as AriaText,
  type FieldErrorProps,
  type GroupProps,
  type InputProps,
  type LabelProps,
  type TextProps,
} from "react-aria-components";
import { twMerge } from "tailwind-merge";

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

export function FieldGroup(props: GroupProps) {
  return (
    <AriaGroup
      {...props}
      className="group flex h-8 items-center overflow-hidden rounded border border-slate-200 bg-white"
    />
  );
}

export function Input({ className, ...props }: InputProps) {
  return (
    <AriaInput
      {...props}
      className={twMerge("h-8 min-w-0 bg-white px-2", className as string)}
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
