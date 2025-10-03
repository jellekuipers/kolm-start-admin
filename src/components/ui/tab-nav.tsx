import type { ActiveOptions, LinkProps } from "@tanstack/react-router";
import { twMerge } from "tailwind-merge";

import { Link } from "@/components/ui/link";

interface TabNavProps {
  children: React.ReactNode;
}

interface TabNavLinkProps {
  activeOptions?: ActiveOptions;
  children: React.ReactNode;
  params?: LinkProps["params"];
  to: LinkProps["to"];
}

export function TabNav(props: TabNavProps) {
  return (
    <nav
      {...props}
      className={twMerge(
        "flex border-b border-gray-300",
        "dark:border-gray-800",
      )}
    />
  );
}

export function TabNavLink({ children, ...props }: TabNavLinkProps) {
  return (
    <Link
      {...props}
      className={twMerge(
        "group -mb-px flex items-center gap-2 border-b-2 border-transparent px-2 pb-1",
        "outline-0 outline-offset-2 outline-indigo-700 focus-visible:outline-2",
        "hover:no-underline",
        "data-[status=active]:border-indigo-500",
      )}
    >
      <span
        className={twMerge(
          "flex h-8 items-center rounded px-2 text-sm font-medium text-gray-800",
          "group-hover:bg-gray-100",
          "dark:text-gray-200",
          "dark:group-hover:bg-gray-800",
        )}
      >
        {children}
      </span>
    </Link>
  );
}
