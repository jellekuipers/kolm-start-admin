import type { ReactNode } from "react";
import { chain } from "react-aria";
import type { DialogProps as AriaDialogProps } from "react-aria-components";
import { useTranslation } from "react-i18next";

import { Button } from "@/components/ui/button";
import { Dialog } from "@/components/ui/dialog";
import { Description } from "@/components/ui/field";
import { ModalHeading } from "@/components/ui/modal";

interface AlertDialogProps extends Omit<AriaDialogProps, "children"> {
  children: ReactNode;
  onAction: () => void;
  onClose?: () => void;
  title: string;
  variant: "info" | "destructive";
}

export function AlertDialog({
  children,
  onAction,
  onClose,
  title,
  variant,
  ...props
}: AlertDialogProps) {
  const { t } = useTranslation();

  return (
    <Dialog role="alertdialog" {...props}>
      {({ close }) => (
        <>
          <ModalHeading slot="title">{title}</ModalHeading>
          <Description>{children}</Description>
          <div className="flex justify-end gap-2">
            <Button color="secondary" onPress={close}>
              {t("common.cancel")}
            </Button>
            <Button
              color="destructive"
              autoFocus
              onPress={chain(onAction, close)}
            >
              {t("common.confirm")}
            </Button>
          </div>
        </>
      )}
    </Dialog>
  );
}
