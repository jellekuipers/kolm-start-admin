import { Dialog as AriaDialog, type DialogProps } from "react-aria-components";

export function Dialog(props: DialogProps) {
  return (
    <AriaDialog
      {...props}
      className="outline-hidden relative flex flex-col space-y-4"
    />
  );
}
