import { twMerge } from "tailwind-merge";

interface CardProps {
  children: React.ReactNode;
  className?: string;
}

export function Card({ children, className }: CardProps) {
  return (
    <div
      className={twMerge(
        "rounded-lg border border-border bg-card p-4",
        className,
      )}
    >
      {children}
    </div>
  );
}
