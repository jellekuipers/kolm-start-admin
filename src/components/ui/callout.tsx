import { twMerge } from "tailwind-merge";

interface CalloutProps {
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

interface CalloutIconProps {
  children: React.ReactNode;
}

interface CalloutTextProps {
  children: React.ReactNode;
}

const calloutColors = {
  amber: "bg-amber-50 text-amber-600",
  blue: "bg-blue-50 text-blue-600",
  cyan: "bg-cyan-50 text-cyan-600",
  emerald: "bg-emerald-50 text-emerald-600",
  fuchsia: "bg-fuchsia-50 text-fuchsia-600",
  gray: "bg-gray-50 text-gray-600",
  green: "bg-green-50 text-green-600",
  indigo: "bg-indigo-50 text-indigo-700",
  lime: "bg-lime-50 text-lime-600",
  neutral: "bg-neutral-50 text-neutral-600",
  orange: "bg-orange-50 text-orange-600",
  pink: "bg-pink-50 text-pink-600",
  purple: "bg-purple-50 text-purple-600",
  red: "bg-red-50 text-red-600",
  rose: "bg-rose-50 text-rose-600",
  sky: "bg-sky-50 text-sky-600",
  slate: "bg-slate-50 text-slate-600",
  stone: "bg-stone-50 text-stone-600",
  teal: "bg-teal-50 text-teal-600",
  violet: "bg-violet-50 text-violet-600",
  yellow: "bg-yellow-50 text-yellow-600",
  zinc: "bg-zinc-50 text-zinc-600",
};

export function Callout({ color = "indigo", ...props }: CalloutProps) {
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
