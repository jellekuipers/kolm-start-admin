import { InfoCircledIcon } from "@radix-ui/react-icons";
import { type ErrorComponentProps } from "@tanstack/react-router";

import { Callout } from "~/components/ui/callout";

export function DefaultCatchBoundary({ error }: ErrorComponentProps) {
  console.error(error);

  return (
    <Callout.Root color="red">
      <Callout.Icon>
        <InfoCircledIcon />
      </Callout.Icon>
      <Callout.Text>{error.message}</Callout.Text>
    </Callout.Root>
  );
}
