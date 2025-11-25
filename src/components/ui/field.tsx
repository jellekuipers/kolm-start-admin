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
import { tv } from "tailwind-variants";

import { ring } from "@/components/ui/utils";

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
      className="text-muted-foreground text-sm"
      slot="description"
    />
  );
}

export function FieldError(props: AriaFieldErrorProps) {
  return <AriaFieldError {...props} className="text-destructive text-sm" />;
}

const fieldGroupStyles = tv({
  extend: ring,
  base: [
    "group flex h-8 items-center overflow-hidden rounded border border-input bg-card",
    "disabled:border-muted disabled:bg-muted disabled:text-muted-foreground",
  ],
});

export function FieldGroup({ className, ...props }: GroupProps) {
  return <AriaGroup {...props} className={fieldGroupStyles({ className })} />;
}

const inputStyles = tv({
  base: [
    "h-8 min-w-0 bg-card px-2 text-base outline-0 lg:text-sm",
    "disabled:border-muted disabled:bg-muted disabled:text-muted-foreground",
  ],
});

export function Input({ className, ...props }: InputProps) {
  return <AriaInput {...props} className={inputStyles({ className })} />;
}

export function Label(props: AriaLabelProps) {
  return (
    <AriaLabel
      {...props}
      className="w-fit cursor-default font-medium text-muted-foreground text-sm"
    />
  );
}
