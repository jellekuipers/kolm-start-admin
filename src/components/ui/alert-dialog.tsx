import type { ReactNode } from "react";
import { chain } from "react-aria";
import type { DialogProps as AriaDialogProps } from "react-aria-components";
import { twMerge } from "tailwind-merge";

import { Button } from "@/components/ui/button";
import { Dialog } from "@/components/ui/dialog";
import { ModalHeading } from "@/components/ui/modal";

interface AlertDialogProps extends Omit<AriaDialogProps, "children"> {
  actionLabel: string;
  cancelLabel: string;
  children: ReactNode;
  onAction: () => void;
  onClose?: () => void;
  title: string;
  variant: "info" | "destructive";
}

export function AlertDialog({
  actionLabel,
  cancelLabel,
  children,
  onAction,
  onClose,
  title,
  variant,
  ...props
}: AlertDialogProps) {
  return (
    <Dialog role="alertdialog" {...props}>
      {({ close }) => (
        <>
          <ModalHeading slot="title">{title}</ModalHeading>
          <p className={twMerge("text-gray-600", "dark:text-white")}>
            {children}
          </p>
          <div className="flex justify-end gap-2">
            <Button color="gray" onPress={close}>
              {cancelLabel}
            </Button>
            <Button color="red" autoFocus onPress={chain(onAction, close)}>
              {actionLabel}
            </Button>
          </div>
        </>
      )}
    </Dialog>
  );
}
