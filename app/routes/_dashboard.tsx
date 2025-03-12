import {
  createFileRoute,
  Link,
  Outlet,
  redirect,
} from "@tanstack/react-router";

import { Logo } from "~/components/logo";
import { Code } from "~/components/ui/code";
import { Flex } from "~/components/ui/flex";
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
      <Flex
        align="center"
        gap="4"
        justify="between"
        px="4"
        py="3"
        style={{
          backgroundColor: "var(--gray-1)",
        }}
      >
        <Flex align="center" gap="2">
          <Link style={{ display: "flex" }} to="/">
            <Logo size={32} />
          </Link>
          <Code>v0.9.0</Code>
        </Flex>
        <SessionUserDropdown />
      </Flex>
      <Separator />
      <Flex align="center" gap="4" p="4" overflowX="auto">
        {routes.map((route) => (
          <Link key={route.to} to={route.to}>
            {route.label}
          </Link>
        ))}
      </Flex>
      <div className="p-4">
        <Outlet />
      </div>
    </>
  );
}
