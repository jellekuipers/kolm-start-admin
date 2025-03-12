import { ButtonProps, Button as RACButton } from "react-aria-components";

export function IconButton(props: ButtonProps) {
  return (
    <RACButton
      className="text-white bg-gray-800 rounded size-8 justify-center flex items-center"
      {...props}
    />
  );
}
