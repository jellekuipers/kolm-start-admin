import { Label } from "radix-ui";

import { Text } from "~/components/ui/text";

interface FormFieldLabelProps {
  htmlFor: string;
  text: string;
}

export function FormFieldLabel({ htmlFor, text }: FormFieldLabelProps) {
  return (
    <Label.Root asChild htmlFor={htmlFor}>
      <Text as="label" size="2" weight="medium">
        {text}
      </Text>
    </Label.Root>
  );
}
