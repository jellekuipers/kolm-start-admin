import { ButtonProps, Button as RACButton } from "react-aria-components";

export function Button(props: ButtonProps) {
  return (
    <RACButton
      className="text-white bg-indigo-500 rounded px-3 py-2 font-medium flex items-center gap-2"
      {...props}
    />
  );
}
