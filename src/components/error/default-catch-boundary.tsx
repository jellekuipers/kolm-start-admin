import { InfoIcon } from "@phosphor-icons/react";
import type { ErrorComponentProps } from "@tanstack/react-router";

import { Callout, CalloutIcon, CalloutText } from "@/components/ui/callout";
import { logger } from "@/utils/logger";

export function DefaultCatchBoundary({ error }: ErrorComponentProps) {
  logger({
    level: "error",
    message: "DefaultCatchBoundary",
    data: error,
  });

  return (
    <Callout color="red">
      <CalloutIcon>
        <InfoIcon size={16} />
      </CalloutIcon>
      <CalloutText>{error.message}</CalloutText>
    </Callout>
  );
}
