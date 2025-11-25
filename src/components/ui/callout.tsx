import { tv } from "tailwind-variants";

interface CalloutProps {
  children: React.ReactNode;
  color?: "primary" | "secondary" | "success" | "destructive";
}

interface CalloutIconProps {
  children: React.ReactNode;
}

interface CalloutTextProps {
  children: React.ReactNode;
}

const callOutStyles = tv({
  base: "flex items-center gap-2 rounded p-4 text-sm",
  variants: {
    color: {
      primary: "bg-accent text-accent-foreground",
      secondary: "bg-secondary text-secondary-foreground",
      success: "bg-success/10 text-success",
      destructive: "bg-destructive/10 text-destructive",
    },
  },
});

export function Callout({ color = "primary", ...props }: CalloutProps) {
  return <div {...props} className={callOutStyles({ color })} />;
}

export function CalloutIcon(props: CalloutIconProps) {
  return <div {...props} />;
}

export function CalloutText(props: CalloutTextProps) {
  return <p {...props} />;
}
