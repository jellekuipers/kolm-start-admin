import { tv } from "tailwind-variants";

interface BadgeProps {
  children: React.ReactNode;
  color?: "primary" | "secondary" | "success" | "destructive";
}

const badge = tv({
  base: "inline-flex rounded px-1.5 py-0.5 font-medium text-xs",
  variants: {
    color: {
      primary: "bg-accent text-accent-foreground",
      secondary: "bg-secondary text-secondary-foreground",
      success: "bg-success/10 text-success",
      destructive: "bg-destructive/10 text-destructive",
    },
  },
});

export function Badge({ children, color = "primary" }: BadgeProps) {
  return <div className={badge({ color })}>{children}</div>;
}
