import type { ComponentProps } from "react";
import { Flex as RadixFlex } from "@radix-ui/themes";

export type FlexProps = ComponentProps<typeof RadixFlex>;

export function Flex(props: FlexProps) {
  return <RadixFlex {...props} />;
}
