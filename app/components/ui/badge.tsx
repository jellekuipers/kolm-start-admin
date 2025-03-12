import type { ComponentProps } from "react";
import { Badge as RadixBadge } from "@radix-ui/themes";

export type BadgeProps = ComponentProps<typeof RadixBadge>;

export function Badge(props: BadgeProps) {
  return <RadixBadge {...props} />;
}
