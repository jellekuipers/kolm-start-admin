import { ComponentProps } from "react";
import { Spinner as RadixSpinner } from "@radix-ui/themes";

export type SpinnerProps = ComponentProps<typeof RadixSpinner>;

export function Spinner(props: SpinnerProps) {
  return <RadixSpinner {...props} />;
}