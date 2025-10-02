import { twMerge } from "tailwind-merge";

interface CodeProps {
  children: React.ReactNode;
}

export function Code({ children }: CodeProps) {
  return (
    <code
      className={twMerge(
        "inline-flex rounded bg-gray-100 px-2 py-1 text-xs",
        "dark:bg-gray-700",
      )}
    >
      {children}
    </code>
  );
}
