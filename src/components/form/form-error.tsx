import { InfoIcon } from "@phosphor-icons/react";

import { Callout, CalloutIcon, CalloutText } from "@/components/ui/callout";

export interface FormErrorProps {
  error: Error;
}

export function FormError({ error }: FormErrorProps) {
  return (
    <Callout color="destructive">
      <CalloutIcon>
        <InfoIcon size={16} />
      </CalloutIcon>
      <CalloutText>{error.message}</CalloutText>
    </Callout>
  );
}
