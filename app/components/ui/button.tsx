import { Button as AriaButton, ButtonProps } from "react-aria-components";

export function Button(props: ButtonProps) {
  return (
    <AriaButton
      className="text-white bg-gray-800 rounded px-3 py-1.5 font-medium flex items-center gap-2"
      {...props}
    />
  );
}
