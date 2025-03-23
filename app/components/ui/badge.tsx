import { twMerge } from "tailwind-merge";

interface BadgeProps {
  color?: "green" | "indigo" | "pink" | "red" | "slate";
  children: React.ReactNode;
}

const badgeColors = {
  green: "bg-green-50 text-green-700",
  indigo: "bg-indigo-50 text-indigo-700",
  pink: "bg-pink-50 text-pink-700",
  red: "bg-red-50 text-red-600",
  slate: "bg-slate-50 text-slate-700",
};

export function Badge({ children, color = "indigo" }: BadgeProps) {
  return (
    <div
      className={twMerge(
        "inline-flex rounded px-1.5 py-0.5 text-xs font-medium",
        badgeColors[color],
      )}
    >
      {children}
    </div>
  );
}
