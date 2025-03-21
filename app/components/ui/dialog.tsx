import { Dialog as AriaDialog, type DialogProps } from "react-aria-components";

export function Dialog(props: DialogProps) {
  return (
    <AriaDialog
      {...props}
      className="relative flex flex-col gap-4 outline-none"
    />
  );
}
