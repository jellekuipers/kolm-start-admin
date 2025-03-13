import { useSuspenseQuery } from "@tanstack/react-query";
import { createFileRoute } from "@tanstack/react-router";

import { CopyValue } from "~/components/misc/copy-value";
import { Avatar } from "~/components/ui/avatar";
import { Code } from "~/components/ui/code";
import { DataList } from "~/components/ui/data-list";
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
    <DataList.Root orientation={{ initial: "vertical", md: "horizontal" }}>
      <DataList.Item>
        <DataList.Label>Name</DataList.Label>
        <DataList.Value>{organization.name}</DataList.Value>
      </DataList.Item>
      <DataList.Item>
        <DataList.Label>Slug</DataList.Label>
        <DataList.Value>
          <Code>{organization.slug}</Code>
        </DataList.Value>
      </DataList.Item>
      <DataList.Item>
        <DataList.Label>ID</DataList.Label>
        <DataList.Value>
          <CopyValue value={organization.id} />
        </DataList.Value>
      </DataList.Item>
      <DataList.Item>
        <DataList.Label>Created at</DataList.Label>
        <DataList.Value>
          {organization.createdAt.toLocaleString()}
        </DataList.Value>
      </DataList.Item>
      <DataList.Item>
        <DataList.Label>Owner</DataList.Label>
        {organizationOwner ? (
          <DataList.Value>
            <Link
              params={{ userId: organizationOwner.userId }}
              to="/users/$userId"
            >
              <div className="flex gap-2 items-center">
                <Avatar
                  fallback="@"
                  src={organizationOwner.user.image ?? undefined}
                />
                {organizationOwner.user.email}
              </div>
            </Link>
          </DataList.Value>
        ) : (
          <DataList.Value>No owner</DataList.Value>
        )}
      </DataList.Item>
    </DataList.Root>
  );
}
