import { twMerge } from "tailwind-merge";

interface CardProps {
  children: React.ReactNode;
  className?: string;
}

export function Card({ children, className }: CardProps) {
  return (
    <div
      className={twMerge(
        "rounded-lg border border-gray-300 bg-white p-4",
        "dark:bg-gray-900 dark:border-gray-800",
        className,
      )}
    >
      {children}
    </div>
  );
}
