import { createFileRoute, Outlet, redirect } from "@tanstack/react-router";

import { userRoleEnum } from "@/lib/enums";

export const Route = createFileRoute("/(auth)")({
  beforeLoad: ({ context: { auth } }) => {
    if (auth?.user.role === userRoleEnum.admin) {
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
