import { Info as InfoIcon } from "@phosphor-icons/react";
import type { ErrorComponentProps } from "@tanstack/react-router";

import { Callout, CalloutIcon, CalloutText } from "~/components/ui/callout";

export function DefaultCatchBoundary({ error }: ErrorComponentProps) {
  console.error(error);

  return (
    <Callout color="red">
      <CalloutIcon>
        <InfoIcon size={16} />
      </CalloutIcon>
      <CalloutText>{error.message}</CalloutText>
    </Callout>
  );
}
