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
      className="text-muted-foreground text-sm"
      slot="description"
    />
  );
}

export function FieldError(props: AriaFieldErrorProps) {
  return <AriaFieldError {...props} className="text-destructive text-sm" />;
}

export function FieldGroup({ className, ...props }: GroupProps) {
  return (
    <AriaGroup
      {...props}
      className={twMerge(
        "group flex h-8 items-center overflow-hidden rounded border border-input bg-card",
        "outline-0 outline-ring outline-offset-2 focus-within:outline-2 focus-visible:outline-2",
        "disabled:border-muted disabled:bg-muted disabled:text-muted-foreground",
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
        "h-8 min-w-0 bg-card px-2 text-base outline-0 lg:text-sm",
        "disabled:border-muted disabled:bg-muted disabled:text-muted-foreground",
        className,
      )}
    />
  );
}

export function Label(props: AriaLabelProps) {
  return (
    <AriaLabel
      {...props}
      className="w-fit cursor-default font-medium text-muted-foreground text-sm"
    />
  );
}
