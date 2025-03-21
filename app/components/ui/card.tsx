import { twMerge } from "tailwind-merge";

interface CardProps {
  children: React.ReactNode;
  className?: string;
}

export function Card({ children, className }: CardProps) {
  return (
    <div
      className={twMerge(
        "rounded-lg border border-slate-200 bg-white p-4",
        className,
      )}
    >
      {children}
    </div>
  );
}
