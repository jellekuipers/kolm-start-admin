import type { ComponentProps } from "react";
import { ScrollArea as RadixScrollArea } from "@radix-ui/themes";

export type ScrollAreaProps = ComponentProps<typeof RadixScrollArea>;

export function ScrollArea(props: ScrollAreaProps) {
  return <RadixScrollArea {...props} />;
}
