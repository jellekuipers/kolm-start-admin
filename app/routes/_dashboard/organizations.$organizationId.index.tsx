import { useSuspenseQuery } from "@tanstack/react-query";
import { createFileRoute } from "@tanstack/react-router";

import { CopyValue } from "~/components/misc/copy-value";
import { Avatar } from "~/components/ui/avatar";
import { Code } from "~/components/ui/code";
import {
  DataList,
  DataListItem,
  DataListLabel,
  DataListValue,
} from "~/components/ui/data-list";
import { Link } from "~/components/ui/link";
import { organizationQueryOptions } from "~/lib/organization";

export const Route = createFileRoute(
  "/_dashboard/organizations/$organizationId/",
)({
  component: RouteComponent,
  loader: async ({ context, params }) =>
    await context.queryClient.prefetchQuery(
      organizationQueryOptions({ organizationId: params.organizationId }),
    ),
});

function RouteComponent() {
  const organizationId = Route.useParams({
    select: ({ organizationId }) => organizationId,
  });

  const { data: organization } = useSuspenseQuery(
    organizationQueryOptions({ organizationId }),
  );

  const organizationOwner = organization?.members.find(
    (member) => member.role === "owner",
  );

  if (!organization) return null;

  return (
    <DataList>
      <DataListItem>
        <DataListLabel>Name</DataListLabel>
        <DataListValue>{organization.name}</DataListValue>
      </DataListItem>
      <DataListItem>
        <DataListLabel>Slug</DataListLabel>
        <DataListValue>
          <Code>{organization.slug}</Code>
        </DataListValue>
      </DataListItem>
      <DataListItem>
        <DataListLabel>ID</DataListLabel>
        <DataListValue>
          <CopyValue value={organization.id} />
        </DataListValue>
      </DataListItem>
      <DataListItem>
        <DataListLabel>Created at</DataListLabel>
        <DataListValue>{organization.createdAt.toLocaleString()}</DataListValue>
      </DataListItem>
      <DataListItem>
        <DataListLabel>Owner</DataListLabel>
        {organizationOwner ? (
          <DataListValue>
            <Link
              params={{ userId: organizationOwner.userId }}
              to="/users/$userId"
            >
              <div className="flex items-center gap-2">
                <Avatar
                  fallback="@"
                  size="8"
                  src={organizationOwner.user.image ?? undefined}
                />
                {organizationOwner.user.email}
              </div>
            </Link>
          </DataListValue>
        ) : (
          <DataListValue>No owner</DataListValue>
        )}
      </DataListItem>
    </DataList>
  );
}
