import { ActiveOptions, LinkProps } from "@tanstack/react-router";
import { twMerge } from "tailwind-merge";

import { Link } from "~/components/ui/link";

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
  return <nav {...props} className="flex border-b border-slate-200" />;
}

export function TabNavLink({ children, ...props }: TabNavLinkProps) {
  return (
    <Link
      {...props}
      className={twMerge(
        "group -mb-px flex cursor-pointer items-center gap-2 border-b-2 border-transparent px-2 pb-1",
        "hover:no-underline",
        "data-[status=active]:border-indigo-500",
      )}
    >
      <span
        className={twMerge(
          "rounded px-2 py-1 font-medium text-slate-800",
          "group-hover:bg-slate-100",
        )}
      >
        {children}
      </span>
    </Link>
  );
}
