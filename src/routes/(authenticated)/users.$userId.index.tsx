import { useSuspenseQuery } from "@tanstack/react-query";
import { createFileRoute } from "@tanstack/react-router";

import { CopyValue } from "~/components/misc/copy-value";
import { Badge } from "~/components/ui/badge";
import {
  DataList,
  DataListItem,
  DataListLabel,
  DataListValue,
} from "~/components/ui/data-list";
import { UpdateUserRole } from "~/components/user/update-user-role";
import { getUserByIdQueryOptions } from "~/queries/user";

export const Route = createFileRoute("/(authenticated)/users/$userId/")({
  component: RouteComponent,
  loader: async ({ context: { queryClient }, params: { userId } }) =>
    await queryClient.ensureQueryData(getUserByIdQueryOptions({ userId })),
});

function RouteComponent() {
  const userId = Route.useParams({ select: ({ userId }) => userId });

  const { data: user } = useSuspenseQuery(getUserByIdQueryOptions({ userId }));

  if (!user) return null;

  return (
    <DataList>
      <DataListItem>
        <DataListLabel>ID</DataListLabel>
        <DataListValue>
          <CopyValue value={user.id} />
        </DataListValue>
      </DataListItem>
      <DataListItem>
        <DataListLabel>Email</DataListLabel>
        <DataListValue>
          <div className="flex items-center gap-2">
            {user.email}
            {user.emailVerified ? null : <Badge>unverified</Badge>}
          </div>
        </DataListValue>
      </DataListItem>
      <DataListItem>
        <DataListLabel>Name</DataListLabel>
        <DataListValue>{user.name}</DataListValue>
      </DataListItem>
      <DataListItem>
        <DataListLabel>Role</DataListLabel>
        <DataListValue>
          <UpdateUserRole user={user} />
        </DataListValue>
      </DataListItem>
      <DataListItem>
        <DataListLabel>Created at</DataListLabel>
        <DataListValue>{user.createdAt.toDateString()}</DataListValue>
      </DataListItem>
    </DataList>
  );
}
