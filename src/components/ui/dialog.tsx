import {
  Dialog as AriaDialog,
  type DialogProps as AriaDialogProps,
  DialogTrigger as AriaDialogTrigger,
  type DialogTriggerProps as AriaDialogTriggerProps,
} from "react-aria-components";

export function Dialog(props: AriaDialogProps) {
  return (
    <AriaDialog
      {...props}
      className="relative flex flex-col gap-4 text-foreground outline-0"
    />
  );
}

export function DialogTrigger(props: AriaDialogTriggerProps) {
  return <AriaDialogTrigger {...props} />;
}
