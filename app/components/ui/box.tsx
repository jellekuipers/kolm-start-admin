import type { ComponentProps } from "react";
import { Box as RadixBox } from "@radix-ui/themes";

export type BoxProps = ComponentProps<typeof RadixBox>;

export function Box(props: BoxProps) {
  return <RadixBox {...props} />;
}
