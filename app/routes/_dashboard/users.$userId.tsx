import { ArrowLeft as ArrowLeftIcon } from "@phosphor-icons/react";
import { useSuspenseQuery } from "@tanstack/react-query";
import { createFileRoute, Outlet } from "@tanstack/react-router";
import { twMerge } from "tailwind-merge";

import { Container } from "~/components/layout/container";
import { Avatar } from "~/components/ui/avatar";
import { Badge } from "~/components/ui/badge";
import { Heading } from "~/components/ui/heading";
import { Link } from "~/components/ui/link";
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
    <Container>
      <div className="space-y-8">
        <Link
          className={twMerge(
            "-mx-1 inline-flex h-8 w-auto items-center rounded px-2 text-indigo-700",
            "hover:border-indigo-50 hover:bg-indigo-50 hover:no-underline",
          )}
          to="/users"
        >
          <ArrowLeftIcon size={16} /> Users
        </Link>
        <div className="space-y-6">
          <div className="flex flex-wrap items-start justify-between gap-4">
            <div className="flex items-center gap-4">
              <Avatar fallback="@" size={16} src={user.image ?? undefined} />
              <div className="flex items-center gap-2">
                <Heading level={1}>{user.name ?? user.email}</Heading>
                {session.user.id === user.id ? <Badge>you</Badge> : null}
                {user.banned ? <Badge color="red">banned</Badge> : null}
              </div>
            </div>
            {session.user.id !== user.id ? (
              <UserActions user={user} variant="profile" />
            ) : null}
          </div>
          <UserTabNav userId={user.id} />
        </div>
        <Outlet />
      </div>
    </Container>
  );
}
