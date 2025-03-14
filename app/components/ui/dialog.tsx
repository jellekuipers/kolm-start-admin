import { Dialog as AriaDialog, DialogProps } from "react-aria-components";

export function Dialog(props: DialogProps) {
  return (
    <AriaDialog
      className="outline-hidden relative flex flex-col space-y-4"
      {...props}
    />
  );
}
