import { useSuspenseQuery } from "@tanstack/react-query";
import { createFileRoute } from "@tanstack/react-router";
import { useTranslation } from "react-i18next";

import { CopyValue } from "@/components/misc/copy-value";
import { Badge } from "@/components/ui/badge";
import {
  DataList,
  DataListItem,
  DataListLabel,
  DataListValue,
} from "@/components/ui/data-list";
import { UpdateUserRole } from "@/components/user/update-user-role";
import { getUserByIdQueryOptions } from "@/queries/user";

export const Route = createFileRoute("/(authenticated)/users/$userId/")({
  component: RouteComponent,
  loader: ({ context: { queryClient }, params: { userId } }) =>
    queryClient.ensureQueryData(getUserByIdQueryOptions({ userId })),
});

function RouteComponent() {
  const userId = Route.useParams({ select: ({ userId }) => userId });
  const { t } = useTranslation();
  const { data: user } = useSuspenseQuery(getUserByIdQueryOptions({ userId }));

  return (
    <DataList>
      <DataListItem>
        <DataListLabel>{t("table.id")}</DataListLabel>
        <DataListValue>
          <CopyValue value={user.id} />
        </DataListValue>
      </DataListItem>
      <DataListItem>
        <DataListLabel>{t("table.email")}</DataListLabel>
        <DataListValue>
          <div className="flex items-center gap-2">
            {user.email}
            {user.emailVerified ? null : (
              <Badge color="indigo">{t("user.unverified")}</Badge>
            )}
          </div>
        </DataListValue>
      </DataListItem>
      <DataListItem>
        <DataListLabel>{t("table.name")}</DataListLabel>
        <DataListValue>{user.name}</DataListValue>
      </DataListItem>
      <DataListItem>
        <DataListLabel>{t("table.role")}</DataListLabel>
        <DataListValue>
          <UpdateUserRole user={user} />
        </DataListValue>
      </DataListItem>
      <DataListItem>
        <DataListLabel>{t("table.created_at")}</DataListLabel>
        <DataListValue>{user.createdAt.toDateString()}</DataListValue>
      </DataListItem>
    </DataList>
  );
}
