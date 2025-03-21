import { twMerge } from "tailwind-merge";

interface BadgeProps {
  color?: "green" | "indigo" | "pink" | "red" | "slate";
  children: React.ReactNode;
}

export function Badge({ children, color = "indigo" }: BadgeProps) {
  return (
    <div
      className={twMerge(
        "inline-flex rounded px-2 py-0.5 text-sm font-medium",
        color === "green" && "bg-green-50 text-green-700",
        color === "indigo" && "bg-indigo-50 text-indigo-700",
        color === "pink" && "bg-pink-50 text-pink-700",
        color === "red" && "bg-red-50 text-red-600",
        color === "slate" && "bg-slate-50 text-slate-700",
      )}
    >
      {children}
    </div>
  );
}
