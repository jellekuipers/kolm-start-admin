import { createFileRoute, Outlet, redirect } from "@tanstack/react-router";

import { userRoleEnum } from "@/lib/enums";

export const Route = createFileRoute("/(auth)")({
  beforeLoad: ({ context: { auth } }) => {
    const userIsAuthenticatedAdmin = auth?.user.role === userRoleEnum.admin;

    if (userIsAuthenticatedAdmin) {
      throw redirect({
        to: "/",
      });
    }
  },
  component: RouteComponent,
});

function RouteComponent() {
  return <Outlet />;
}
