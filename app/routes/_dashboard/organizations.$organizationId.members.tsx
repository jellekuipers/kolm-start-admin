import { useMemo } from "react";
import { useSuspenseQuery } from "@tanstack/react-query";
import { createFileRoute } from "@tanstack/react-router";
import { ColumnDef } from "@tanstack/react-table";

import { AddMemberToOrganizationModal } from "~/components/member/add-member-to-organization-modal";
import { UpdateMemberRole } from "~/components/member/update-member-role";
import { OrganizationMemberActions } from "~/components/organization/organization-member-actions";
import { DataTable } from "~/components/table/data-table";
import { Avatar } from "~/components/ui/avatar";
import { Flex } from "~/components/ui/flex";
import { Link } from "~/components/ui/link";
import { organizationQueryOptions } from "~/lib/organization";
import { OrganizationMember } from "~/types";

export const Route = createFileRoute(
  "/_dashboard/organizations/$organizationId/members",
)({
  component: RouteComponent,
  loader: async ({ context, params }) =>
    await context.queryClient.prefetchQuery(
      organizationQueryOptions({ organizationId: params.organizationId }),
    ),
});

const dataTableColumns: ColumnDef<OrganizationMember>[] = [
  {
    id: "image",
    header: undefined,
    cell({ row }) {
      return <Avatar fallback="@" src={row.original.user.image ?? undefined} />;
    },
  },
  {
    id: "email",
    accessorKey: "user.email",
    header: "Email",
    cell({ row }) {
      return (
        <Link
          params={{
            userId: row.original.userId,
          }}
          to="/users/$userId"
        >
          {row.original.user.email}
        </Link>
      );
    },
  },
  {
    id: "role",
    accessorKey: "role",
    header: "Role",
    cell({ row }) {
      return <UpdateMemberRole member={row.original} />;
    },
  },
  {
    id: "createdAt",
    header: "Member since",
    cell({ row }) {
      return row.original.createdAt.toLocaleString();
    },
  },
  {
    id: "actions",
    header: undefined,
    cell({ row }) {
      return (
        <Flex justify="end">
          <OrganizationMemberActions
            memberId={row.original.id}
            organizationId={row.original.organizationId}
            userId={row.original.userId}
          />
        </Flex>
      );
    },
  },
];

function RouteComponent() {
  const organizationId = Route.useParams({
    select: ({ organizationId }) => organizationId,
  });

  const { data: organization } = useSuspenseQuery(
    organizationQueryOptions({ organizationId }),
  );

  const columns = useMemo(() => dataTableColumns, []);

  if (!organization) return null;

  return (
    <Flex direction="column" gap="4">
      <Flex justify="end">
        <AddMemberToOrganizationModal organizationId={organizationId} />
      </Flex>
      <DataTable columns={columns} data={organization.members} />
    </Flex>
  );
}
