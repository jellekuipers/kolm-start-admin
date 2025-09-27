import { createFileRoute, Outlet, redirect } from "@tanstack/react-router";
import { twMerge } from "tailwind-merge";

import { Logo } from "~/components/logo";
import { Code } from "~/components/ui/code";
import { Link } from "~/components/ui/link";
import { Separator } from "~/components/ui/separator";
import { SessionUserDropdown } from "~/components/user/session-user-dropdown";
import { userRoleEnum } from "~/lib/enums";

export const Route = createFileRoute("/_dashboard")({
  beforeLoad: ({ context: { auth } }) => {
    const userIsAuthenticatedAdmin = auth?.user.role === userRoleEnum.admin;

    if (!userIsAuthenticatedAdmin) {
      throw redirect({
        to: "/auth/sign-in",
      });
    }
  },
  component: LayoutComponent,
});

function LayoutComponent() {
  const routes = [
    { to: "/", label: "Dashboard" },
    { to: "/users", label: "Users" },
  ];

  return (
    <>
      <header className="flex items-center justify-between gap-2 bg-slate-50 px-4 py-2">
        <div className="flex items-center gap-2">
          <Link className="rounded" to="/">
            <Logo size={32} />
          </Link>
          <Code>v1.2.1</Code>
        </div>
        <SessionUserDropdown />
      </header>
      <Separator />
      <div className="flex items-center gap-1 overflow-x-auto p-4">
        {routes.map((route) => (
          <Link
            key={route.to}
            className={twMerge(
              "-mx-1 flex h-8 items-center justify-center rounded px-2 text-indigo-700",
              "hover:border-indigo-50 hover:bg-indigo-50 hover:no-underline",
            )}
            to={route.to}
          >
            {route.label}
          </Link>
        ))}
      </div>
      <div className="p-4">
        <Outlet />
      </div>
    </>
  );
}
