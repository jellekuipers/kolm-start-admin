import type { ActiveOptions, LinkProps } from "@tanstack/react-router";
import { twMerge } from "tailwind-merge";

import { Link } from "@/components/ui/link";
import { ring } from "@/components/ui/utils";

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
  return <nav {...props} className="flex border-border border-b" />;
}

export function TabNavLink({ children, ...props }: TabNavLinkProps) {
  return (
    <Link
      {...props}
      className={twMerge(
        "group -mb-px flex items-center gap-2 border-transparent border-b-2 px-2 pb-1",
        "hover:no-underline",
        "data-[status=active]:border-primary",
        ring(),
      )}
    >
      <span
        className={twMerge(
          "flex h-8 items-center rounded px-2 font-medium text-foreground text-sm",
          "group-hover:bg-muted",
        )}
      >
        {children}
      </span>
    </Link>
  );
}
