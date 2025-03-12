import type { ComponentProps } from "react";
import { Grid as RadixGrid } from "@radix-ui/themes";

export type GridProps = ComponentProps<typeof RadixGrid>;

export function Grid(props: GridProps) {
  return <RadixGrid {...props} />;
}
