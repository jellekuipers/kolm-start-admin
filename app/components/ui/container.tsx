import type { ComponentProps } from "react";
import { Container as RadixContainer } from "@radix-ui/themes";

export type ContainerProps = ComponentProps<typeof RadixContainer>;

export function Container(props: ContainerProps) {
  return <RadixContainer {...props} />;
}
