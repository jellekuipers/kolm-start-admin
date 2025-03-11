import { ComponentProps } from "react";
import { IconButton as RadixIconButton } from "@radix-ui/themes";

export type IconButtonProps = ComponentProps<typeof RadixIconButton>;

export function IconButton(props: IconButtonProps) {
  return <RadixIconButton {...props} />;
}