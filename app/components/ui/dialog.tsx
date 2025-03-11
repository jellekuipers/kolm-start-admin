import type { ComponentProps } from "react";
import { Dialog as RadixDialog } from "@radix-ui/themes";

export type DialogRootProps = ComponentProps<typeof RadixDialog.Root>;
export type DialogContentProps = ComponentProps<typeof RadixDialog.Content>;
export type DialogTriggerProps = ComponentProps<typeof RadixDialog.Trigger>;
export type DialogCloseProps = ComponentProps<typeof RadixDialog.Close>;
export type DialogTitleProps = ComponentProps<typeof RadixDialog.Title>;

export function Root(props: DialogRootProps) {
  return <RadixDialog.Root {...props} />;
}

export function Content(props: DialogContentProps) {
  return <RadixDialog.Content {...props} />;
}

export function Trigger(props: DialogTriggerProps) {
  return <RadixDialog.Trigger {...props} />;
}

export function Title(props: DialogTitleProps) {
  return <RadixDialog.Title {...props} />;
}

export function Close(props: DialogCloseProps) {
  return <RadixDialog.Close {...props} />;
}

export const Dialog = {
  Root,
  Content,
  Trigger,
  Title,
  Close,
};
