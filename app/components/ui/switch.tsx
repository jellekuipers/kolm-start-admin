import type { ComponentProps } from "react";
import { Switch as RadixSwitch } from "@radix-ui/themes";

export type SwitchProps = ComponentProps<typeof RadixSwitch>;

export function Switch(props: SwitchProps) {
  return <RadixSwitch {...props} />;
}
