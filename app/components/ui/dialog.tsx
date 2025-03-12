import type { ComponentProps } from "react";
import { Dialog as RadixDialog } from "@radix-ui/themes";

export type DialogCloseProps = ComponentProps<typeof RadixDialog.Close>;
export type DialogContentProps = ComponentProps<typeof RadixDialog.Content>;
export type DialogRootProps = ComponentProps<typeof RadixDialog.Root>;
export type DialogTitleProps = ComponentProps<typeof RadixDialog.Title>;
export type DialogTriggerProps = ComponentProps<typeof RadixDialog.Trigger>;

export function Close(props: DialogCloseProps) {
  return <RadixDialog.Close {...props} />;
}

export function Content(props: DialogContentProps) {
  return <RadixDialog.Content {...props} />;
}

export function Root(props: DialogRootProps) {
  return <RadixDialog.Root {...props} />;
}

export function Title(props: DialogTitleProps) {
  return <RadixDialog.Title {...props} />;
}

export function Trigger(props: DialogTriggerProps) {
  return <RadixDialog.Trigger {...props} />;
}

export const Dialog = {
  Close,
  Content,
  Root,
  Title,
  Trigger,
};
