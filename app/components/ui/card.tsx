import type { ComponentProps } from "react";
import { Card as RadixCard } from "@radix-ui/themes";

export type CardProps = ComponentProps<typeof RadixCard>;

export function Card(props: CardProps) {
  return <RadixCard {...props} />;
}
