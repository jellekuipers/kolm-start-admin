import { twMerge } from "tailwind-merge";

interface BadgeProps {
  color?:
    | "amber"
    | "blue"
    | "cyan"
    | "emerald"
    | "fuchsia"
    | "gray"
    | "green"
    | "indigo"
    | "lime"
    | "neutral"
    | "orange"
    | "pink"
    | "purple"
    | "red"
    | "rose"
    | "sky"
    | "slate"
    | "stone"
    | "teal"
    | "violet"
    | "yellow"
    | "zinc";
  children: React.ReactNode;
}

const badgeColors = {
  amber: "bg-amber-50 text-amber-700",
  blue: "bg-blue-50 text-blue-700",
  cyan: "bg-cyan-50 text-cyan-700",
  emerald: "bg-emerald-50 text-emerald-700",
  fuchsia: "bg-fuchsia-50 text-fuchsia-700",
  gray: "bg-gray-50 text-gray-700",
  green: "bg-green-50 text-green-700",
  indigo: "bg-indigo-50 text-indigo-700",
  lime: "bg-lime-50 text-lime-700",
  neutral: "bg-neutral-50 text-neutral-700",
  orange: "bg-orange-50 text-orange-700",
  pink: "bg-pink-50 text-pink-700",
  purple: "bg-purple-50 text-purple-700",
  red: "bg-red-50 text-red-600",
  rose: "bg-rose-50 text-rose-700",
  sky: "bg-sky-50 text-sky-700",
  slate: "bg-slate-50 text-slate-700",
  stone: "bg-stone-50 text-stone-700",
  teal: "bg-teal-50 text-teal-700",
  violet: "bg-violet-50 text-violet-700",
  yellow: "bg-yellow-50 text-yellow-700",
  zinc: "bg-zinc-50 text-zinc-700",
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
