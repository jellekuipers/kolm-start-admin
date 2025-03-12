import { ButtonProps, Button as RACButton } from "react-aria-components";

export function Button(props: ButtonProps) {
  return (
    <RACButton
      className="text-white bg-gray-800 rounded px-3 py-1.5 text-sm font-medium flex items-center gap-2"
      {...props}
    />
  );
}
