import { ComponentProps } from "react";
import { Skeleton as RadixSkeleton } from "@radix-ui/themes";

export type SkeletonProps = ComponentProps<typeof RadixSkeleton>;

export function Skeleton(props: SkeletonProps) {
  return <RadixSkeleton {...props} />;
}