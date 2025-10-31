import { CircleNotchIcon } from "@phosphor-icons/react";
import { twMerge } from "tailwind-merge";

export function Spinner() {
  return (
    <CircleNotchIcon
      className={twMerge("animate-spin fill-gray-600", "dark:fill-white")}
      size={20}
    />
  );
}
