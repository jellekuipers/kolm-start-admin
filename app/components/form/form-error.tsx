import { InfoCircledIcon } from "@radix-ui/react-icons";

import { Callout } from "~/components/ui/callout";

export interface FormErrorProps {
  error: Error;
}

export function FormError({ error }: FormErrorProps) {
  return (
    <Callout.Root color="red">
      <Callout.Icon>
        <InfoCircledIcon />
      </Callout.Icon>
      <Callout.Text>{error.message}</Callout.Text>
    </Callout.Root>
  );
}
