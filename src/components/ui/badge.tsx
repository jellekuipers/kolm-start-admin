import { twMerge } from "tailwind-merge";

interface BadgeProps {
  children: React.ReactNode;
  className?: string;
  color: "gray" | "green" | "indigo" | "red";
}

const badgeColors = {
  gray: twMerge(
    "bg-gray-50 text-gray-700",
    "dark:bg-gray-700 dark:text-gray-100",
  ),
  green: twMerge(
    "bg-green-50 text-green-700",
    "dark:bg-green-900 dark:text-green-50",
  ),
  indigo: twMerge(
    "bg-indigo-50 text-indigo-700",
    "dark:bg-indigo-700 dark:text-white",
  ),
  red: twMerge("bg-red-50 text-red-600", "dark:bg-red-900 dark:text-red-400"),
};

export function Badge({ children, className, color }: BadgeProps) {
  return (
    <div
      className={twMerge(
        "inline-flex rounded px-1.5 py-0.5 text-xs font-medium",
        badgeColors[color],
        className,
      )}
    >
      {children}
    </div>
  );
}
