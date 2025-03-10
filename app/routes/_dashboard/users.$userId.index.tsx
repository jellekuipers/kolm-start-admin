import { Badge, DataList, Flex } from "@radix-ui/themes";
import { useSuspenseQuery } from "@tanstack/react-query";
import { createFileRoute } from "@tanstack/react-router";

import { CopyValue } from "~/components/ui/copy-value";
import { UpdateUserRole } from "~/components/user/update-user-role";
import { userQueryOptions } from "~/lib/user";

export const Route = createFileRoute("/_dashboard/users/$userId/")({
  component: RouteComponent,
  loader: async ({ context, params }) =>
    await context.queryClient.prefetchQuery(
      userQueryOptions({ userId: params.userId }),
    ),
});

function RouteComponent() {
  const userId = Route.useParams({ select: ({ userId }) => userId });

  const { data: user } = useSuspenseQuery(userQueryOptions({ userId }));

  if (!user) return null;

  return (
    <DataList.Root orientation={{ initial: "vertical", md: "horizontal" }}>
      <DataList.Item>
        <DataList.Label>ID</DataList.Label>
        <DataList.Value>
          <CopyValue value={user.id} />
        </DataList.Value>
      </DataList.Item>
      <DataList.Item>
        <DataList.Label>Email</DataList.Label>
        <DataList.Value>
          <Flex gap="2" align="center">
            {user.email}
            {user.emailVerified ? null : <Badge>unverified</Badge>}
          </Flex>
        </DataList.Value>
      </DataList.Item>
      <DataList.Item>
        <DataList.Label>Name</DataList.Label>
        <DataList.Value>{user.name}</DataList.Value>
      </DataList.Item>
      <DataList.Item>
        <DataList.Label>Role</DataList.Label>
        <DataList.Value>
          <UpdateUserRole user={user} />
        </DataList.Value>
      </DataList.Item>
      <DataList.Item>
        <DataList.Label>Created at</DataList.Label>
        <DataList.Value>{user.createdAt.toLocaleString()}</DataList.Value>
      </DataList.Item>
    </DataList.Root>
  );
}
