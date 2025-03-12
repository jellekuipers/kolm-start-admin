import { ButtonProps, Button as RACButton } from "react-aria-components";

export function IconButton(props: ButtonProps) {
  return (
    <RACButton
      className="text-gray-800 bg-white rounded size-8 justify-center flex items-center hover:bg-gray-200"
      {...props}
    />
  );
}
