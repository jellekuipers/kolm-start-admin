import { createFileRoute, Outlet, redirect } from "@tanstack/react-router";

import { Logo } from "~/components/logo";
import { Code } from "~/components/ui/code";
import { Link } from "~/components/ui/link";
import { Separator } from "~/components/ui/separator";
import { SessionUserDropdown } from "~/components/user/session-user-dropdown";

export const Route = createFileRoute("/_dashboard")({
  beforeLoad: ({ context: { session } }) => {
    if (session?.user.role !== "admin") {
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
    { to: "/organizations", label: "Organizations" },
    { to: "/invitations", label: "Invitations" },
  ];

  return (
    <>
      <header className="px-4 py-3 flex items-center gap-2 justify-between bg-slate-50">
        <div className="flex items-center gap-2">
          <Link to="/">
            <Logo size={32} />
          </Link>
          <Code>v0.9.0</Code>
        </div>
        <SessionUserDropdown />
      </header>
      <Separator />
      <div className="flex gap-1.5 items-center overflow-x-auto p-4">
        {routes.map((route) => (
          <Link
            key={route.to}
            className="text-indigo-700 px-3 h-9 flex items-center justify-center rounded hover:bg-indigo-50 hover:border-indigo-50 -mx-1.5"
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
