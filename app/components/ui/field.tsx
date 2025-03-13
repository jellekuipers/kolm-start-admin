import {
  FieldError as AriaFieldError,
  Group as AriaGroup,
  Input as AriaInput,
  Label as AriaLabel,
  Text as AriaText,
  FieldErrorProps,
  GroupProps,
  InputProps,
  LabelProps,
  TextProps,
} from "react-aria-components";

export function Description(props: TextProps) {
  return <AriaText {...props} slot="description" />;
}

export function FieldError(props: FieldErrorProps) {
  return <AriaFieldError className="text-red-500 font-medium" {...props} />;
}

export function FieldGroup(props: GroupProps) {
  return (
    <AriaGroup
      className="group flex items-center border border-gray-300 rounded overflow-hidden"
      {...props}
    />
  );
}

export function Input(props: InputProps) {
  return <AriaInput className="border border-gray-300 rounded" {...props} />;
}

export function Label(props: LabelProps) {
  return <AriaLabel className="font-medium" {...props} />;
}
