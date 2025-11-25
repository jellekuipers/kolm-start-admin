import { createFileRoute, Outlet, redirect } from "@tanstack/react-router";
import { useTranslation } from "react-i18next";
import { twMerge } from "tailwind-merge";

import { Logo } from "@/components/logo";
import { Link } from "@/components/ui/link";
import { Separator } from "@/components/ui/separator";
import { SessionUserDropdown } from "@/components/user/session-user-dropdown";
import { userRoleEnum } from "@/lib/enums";

export const Route = createFileRoute("/(authenticated)")({
  beforeLoad: ({ context: { auth } }) => {
    if (auth?.user.role !== userRoleEnum.admin) {
      throw redirect({
        to: "/sign-in",
      });
    }

    return { auth };
  },
  component: RouteComponent,
});

function RouteComponent() {
  const { t } = useTranslation();

  const routes = [
    { to: "/", label: t("navigation.dashboard") },
    { to: "/users", label: t("navigation.users") },
  ];

  return (
    <>
      <header className="flex items-center justify-between gap-2 px-4 py-2">
        <div className="flex items-center gap-2">
          <Link className="rounded" to="/">
            <Logo size={32} />
          </Link>
        </div>
        <SessionUserDropdown />
      </header>
      <Separator />
      <div className="-ml-2 flex items-center gap-1 overflow-x-auto p-4">
        {routes.map((route) => (
          <Link
            key={route.to}
            className={twMerge(
              "flex h-8 items-center justify-center rounded px-2 text-primary",
              "hover:bg-accent hover:no-underline",
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
