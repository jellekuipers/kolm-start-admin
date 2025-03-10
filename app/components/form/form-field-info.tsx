import { Text } from "@radix-ui/themes";
import type { AnyFieldApi } from "@tanstack/react-form";

export interface FormFieldInfoProps {
  field: AnyFieldApi;
}

export function FormFieldInfo({ field }: FormFieldInfoProps) {
  return (
    <>
      {field.state.meta.isTouched && field.state.meta.errors.length ? (
        <Text color="red" size="2" weight="medium">
          {field.state.meta.errors.map(({ message }) => message).join(", ")}
        </Text>
      ) : null}
    </>
  );
}
