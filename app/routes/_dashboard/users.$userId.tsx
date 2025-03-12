import { ArrowLeftIcon } from "@radix-ui/react-icons";
import { useSuspenseQuery } from "@tanstack/react-query";
import { createFileRoute, Link, Outlet } from "@tanstack/react-router";

import { Avatar } from "~/components/ui/avatar";
import { Badge } from "~/components/ui/badge";
import { Button } from "~/components/ui/button";
import { Container } from "~/components/ui/container";
import { Flex } from "~/components/ui/flex";
import { Heading } from "~/components/ui/heading";
import { UserActions } from "~/components/user/user-actions";
import { UserTabNav } from "~/components/user/user-tab-nav";
import { userQueryOptions } from "~/lib/user";

export const Route = createFileRoute("/_dashboard/users/$userId")({
  component: RouteComponent,
  loader: async ({ context, params }) =>
    await context.queryClient.prefetchQuery(
      userQueryOptions({ userId: params.userId }),
    ),
});

function RouteComponent() {
  const session = Route.useRouteContext({ select: ({ session }) => session });

  const userId = Route.useParams({ select: ({ userId }) => userId });

  const { data: user } = useSuspenseQuery(userQueryOptions({ userId }));

  if (!user || !session) return null;

  return (
    <Container size="3">
      <Flex direction="column" gap="6">
        <Flex justify="start">
          <Button
            asChild
            variant="ghost"
            style={{ fontWeight: "var(--font-weight-medium)" }}
          >
            <Link to="/users">
              <ArrowLeftIcon /> Users
            </Link>
          </Button>
        </Flex>
        <Flex direction="column" gap="4">
          <Flex justify="between" gap="4" wrap="wrap">
            <Flex align="center" gap="4">
              <Avatar fallback="@" size="4" src={user.image ?? undefined} />
              <Flex align="center" gap="2">
                <Heading>{user.name ?? user.email}</Heading>
                {session.user.id === user.id ? (
                  <Badge color="violet">you</Badge>
                ) : null}
                {user.banned ? <Badge color="red">banned</Badge> : null}
              </Flex>
            </Flex>
            {session.user.id !== user.id ? (
              <UserActions user={user} variant="profile" />
            ) : null}
          </Flex>
          <UserTabNav userId={user.id} />
        </Flex>
        <Outlet />
      </Flex>
    </Container>
  );
}
