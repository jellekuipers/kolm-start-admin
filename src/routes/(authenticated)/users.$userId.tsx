import { ArrowLeftIcon } from "@phosphor-icons/react";
import { useSuspenseQuery } from "@tanstack/react-query";
import { createFileRoute, Outlet } from "@tanstack/react-router";
import { useTranslation } from "react-i18next";
import { twMerge } from "tailwind-merge";

import { Container } from "@/components/layout/container";
import { Avatar } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Heading } from "@/components/ui/heading";
import { Link } from "@/components/ui/link";
import { UserActions } from "@/components/user/user-actions";
import { UserTabNav } from "@/components/user/user-tab-nav";
import { getUserByIdQueryOptions } from "@/queries/user";

export const Route = createFileRoute("/(authenticated)/users/$userId")({
  component: RouteComponent,
  loader: ({ context: { queryClient }, params: { userId } }) =>
    queryClient.ensureQueryData(getUserByIdQueryOptions({ userId })),
});

function RouteComponent() {
  const auth = Route.useRouteContext({ select: ({ auth }) => auth });
  const userId = Route.useParams({ select: ({ userId }) => userId });
  const { t } = useTranslation();
  const { data: user } = useSuspenseQuery(getUserByIdQueryOptions({ userId }));

  return (
    <Container>
      <div className="space-y-8">
        <Link
          className={twMerge(
            "-mx-1 inline-flex h-8 items-center rounded px-2 text-primary",
            "hover:bg-accent hover:no-underline",
          )}
          to="/users"
        >
          <ArrowLeftIcon size={16} /> {t("navigation.users")}
        </Link>
        <div className="space-y-6">
          <div className="flex flex-wrap items-start justify-between gap-4">
            <div className="flex items-center gap-4">
              <Avatar
                alt={user.email}
                fallback="@"
                size={16}
                src={user.image ?? undefined}
              />
              <div className="flex items-center gap-2">
                <Heading level={1}>{user.name ?? user.email}</Heading>
                {auth.user.id === user.id ? (
                  <Badge>{t("user.you")}</Badge>
                ) : null}
                {user.banned ? (
                  <Badge color="destructive">{t("user.banned")}</Badge>
                ) : null}
              </div>
            </div>
            {auth.user.id !== user.id ? (
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
