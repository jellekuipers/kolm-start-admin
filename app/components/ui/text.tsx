import type { ComponentProps } from "react";
import { Text as RadixText } from "@radix-ui/themes";

export type TextProps = ComponentProps<typeof RadixText>;

export function Text(props: TextProps) {
  return <RadixText {...props} />;
}
