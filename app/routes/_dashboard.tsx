import {
  createFileRoute,
  Link,
  Outlet,
  redirect,
} from "@tanstack/react-router";

import { Logo } from "~/components/logo";
import { Box } from "~/components/ui/box";
import { Button } from "~/components/ui/button";
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
          <Code color="gray" size="1">
            v0.9.0
          </Code>
        </Flex>
        <SessionUserDropdown />
      </Flex>
      <Separator size="4" />
      <Flex align="center" gap="4" p="4" overflowX="auto">
        {routes.map((route) => (
          <Button
            key={route.to}
            asChild
            style={{ fontWeight: "var(--font-weight-medium)" }}
            variant="ghost"
          >
            <Link to={route.to}>{route.label}</Link>
          </Button>
        ))}
      </Flex>
      <Box p="4">
        <Outlet />
      </Box>
    </>
  );
}
