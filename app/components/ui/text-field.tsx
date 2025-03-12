import type { ComponentProps } from "react";
import { TextField as RadixTextField } from "@radix-ui/themes";

export type TextFieldRootProps = ComponentProps<typeof RadixTextField.Root>;
export type TextFieldSlotProps = ComponentProps<typeof RadixTextField.Slot>;

export function Root(props: TextFieldRootProps) {
  return <RadixTextField.Root {...props} />;
}

export function Slot(props: TextFieldSlotProps) {
  return <RadixTextField.Slot {...props} />;
}

export const TextField = {
  Root,
  Slot,
};
