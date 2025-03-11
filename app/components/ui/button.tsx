import { ComponentProps } from "react";
import { Button as RadixButton } from "@radix-ui/themes";

export type ButtonProps = ComponentProps<typeof RadixButton>;

export function Button(props: ButtonProps) {
  return <RadixButton {...props} />;
}
