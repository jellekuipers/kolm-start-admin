import { Label } from "radix-ui";

import { Text } from "~/components/ui/text";

interface FormLabelProps {
  htmlFor: string;
  text: string;
}

export function FormLabel({ htmlFor, text }: FormLabelProps) {
  return (
    <Label.Root asChild htmlFor={htmlFor}>
      <Text as="label" size="2" weight="medium">
        {text}
      </Text>
    </Label.Root>
  );
}
