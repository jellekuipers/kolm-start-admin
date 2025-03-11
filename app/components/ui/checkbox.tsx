import type { ComponentProps } from "react";
import { Checkbox as RadixCheckbox } from "@radix-ui/themes";

export type CheckboxProps = ComponentProps<typeof RadixCheckbox>;

export function Checkbox(props: CheckboxProps) {
  return <RadixCheckbox {...props} />;
}
