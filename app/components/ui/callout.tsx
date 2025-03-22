import { twMerge } from "tailwind-merge";

interface CalloutProps {
  color?: "indigo" | "red";
  children: React.ReactNode;
}

interface CalloutIconProps {
  children: React.ReactNode;
}

interface CalloutTextProps {
  children: React.ReactNode;
}

export function Callout({ color = "indigo", ...props }: CalloutProps) {
  return (
    <div
      {...props}
      className={twMerge(
        "flex items-center gap-2 rounded p-4 text-sm",
        color === "indigo" && "bg-indigo-50 text-indigo-700",
        color === "red" && "bg-red-50 text-red-600",
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
