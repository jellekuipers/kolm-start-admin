import { twMerge } from "tailwind-merge";

interface CalloutProps {
  color: "gray" | "green" | "indigo" | "red";
  children: React.ReactNode;
}

interface CalloutIconProps {
  children: React.ReactNode;
}

interface CalloutTextProps {
  children: React.ReactNode;
}

const calloutColors = {
  gray: twMerge("bg-gray-50 text-gray-600", "dark:bg-gray-700 dark:text-white"),
  green: twMerge(
    "bg-green-50 text-green-600",
    "dark:bg-green-700 dark:text-white",
  ),
  indigo: twMerge(
    "bg-indigo-50 text-indigo-700",
    "dark:bg-indigo-700 dark:text-white",
  ),
  red: twMerge("bg-red-50 text-red-600", "dark:bg-red-700 dark:text-white"),
};

export function Callout({ color, ...props }: CalloutProps) {
  return (
    <div
      {...props}
      className={twMerge(
        "flex items-center gap-2 rounded p-4 text-sm",
        calloutColors[color],
      )}
    />
  );
}

export function CalloutIcon(props: CalloutIconProps) {
  return <div {...props} />;
}

export function CalloutText(props: CalloutTextProps) {
  return <p {...props} />;
}
