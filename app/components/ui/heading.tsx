import type { ComponentProps } from "react";
import { Heading as RadixHeading } from "@radix-ui/themes";

export type HeadingProps = ComponentProps<typeof RadixHeading>;

export function Heading(props: HeadingProps) {
  return <RadixHeading {...props} />;
}
