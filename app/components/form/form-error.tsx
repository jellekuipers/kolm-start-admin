import { InfoCircledIcon } from "@radix-ui/react-icons";

import { Callout, CalloutIcon, CalloutText } from "~/components/ui/callout";

export interface FormErrorProps {
  error: Error;
}

export function FormError({ error }: FormErrorProps) {
  return (
    <Callout>
      <CalloutIcon>
        <InfoCircledIcon />
      </CalloutIcon>
      <CalloutText>{error.message}</CalloutText>
    </Callout>
  );
}
