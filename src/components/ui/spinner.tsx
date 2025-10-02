import { CircleNotchIcon } from "@phosphor-icons/react";
import { twMerge } from "tailwind-merge";

export function Spinner() {
  return (
    <CircleNotchIcon
      className={twMerge("animate-spin text-gray-600", "dark:text-white")}
      size={20}
    />
  );
}
