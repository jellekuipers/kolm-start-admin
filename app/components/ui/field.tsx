import {
  FieldErrorProps,
  GroupProps,
  InputProps,
  LabelProps,
  FieldError as RACFieldError,
  Group as RACGroup,
  Input as RACInput,
  Label as RACLabel,
  Text as RACText,
  TextProps,
} from "react-aria-components";

export function Description(props: TextProps) {
  return <RACText {...props} slot="description" />;
}

export function FieldError(props: FieldErrorProps) {
  return (
    <RACFieldError className="text-sm text-red-500 font-medium" {...props} />
  );
}

export function FieldGroup(props: GroupProps) {
  return <RACGroup {...props} />;
}

export function Input(props: InputProps) {
  return <RACInput className="border border-gray-300 rounded" {...props} />;
}

export function Label(props: LabelProps) {
  return <RACLabel className="font-medium text-sm" {...props} />;
}
