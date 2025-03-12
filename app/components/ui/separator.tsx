import type { ComponentProps } from "react";
import { Separator as RadixSeparator } from "@radix-ui/themes";

export type SeparatorProps = ComponentProps<typeof RadixSeparator>;

export function Separator(props: SeparatorProps) {
  return <RadixSeparator {...props} />;
}
