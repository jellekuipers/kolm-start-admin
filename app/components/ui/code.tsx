import { ComponentProps } from "react";
import { Code as RadixCode } from "@radix-ui/themes";

export type CodeProps = ComponentProps<typeof RadixCode>;

export function Code(props: CodeProps) {
  return <RadixCode {...props} />;
}