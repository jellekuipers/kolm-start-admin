import type { ComponentProps } from "react";
import { Avatar as RadixAvatar } from "@radix-ui/themes";

export type AvatarProps = ComponentProps<typeof RadixAvatar>;

export function Avatar(props: AvatarProps) {
  return <RadixAvatar {...props} />;
}
