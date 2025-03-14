import { InfoCircledIcon } from "@radix-ui/react-icons";
import { type ErrorComponentProps } from "@tanstack/react-router";

import { Callout, CalloutIcon, CalloutText } from "~/components/ui/callout";

export function DefaultCatchBoundary({ error }: ErrorComponentProps) {
  console.error(error);

  return (
    <Callout>
      <CalloutIcon>
        <InfoCircledIcon />
      </CalloutIcon>
      <CalloutText>{error.message}</CalloutText>
    </Callout>
  );
}
