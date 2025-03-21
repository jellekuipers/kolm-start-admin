import { ComponentProps } from "react";
import { Callout as RadixCallout } from "@radix-ui/themes";

export type CalloutIconProps = ComponentProps<typeof RadixCallout.Icon>;
export type CalloutRootProps = ComponentProps<typeof RadixCallout.Root>;
export type CalloutTextProps = ComponentProps<typeof RadixCallout.Text>;

export function Icon(props: CalloutIconProps) {
  return <RadixCallout.Icon {...props} />;
}

export function Root(props: CalloutRootProps) {
  return <RadixCallout.Root {...props} />;
}

export function Text(props: CalloutTextProps) {
  return <RadixCallout.Text {...props} />;
}

export const Callout = {
  Icon,
  Root,
  Text,
};
