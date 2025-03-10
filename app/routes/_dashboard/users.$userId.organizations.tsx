import { useMemo } from "react";
import { Avatar, Flex } from "@radix-ui/themes";
import { useSuspenseQuery } from "@tanstack/react-query";
import { createFileRoute } from "@tanstack/react-router";
import { ColumnDef } from "@tanstack/react-table";

import { MemberActions } from "~/components/member/member-actions";
import { UpdateMemberRole } from "~/components/member/update-member-role";
import { DataTableSimple } from "~/components/table/data-table-simple";
import { Link } from "~/components/ui/link";
import { AddUserToOrganizationModal } from "~/components/user/add-user-to-organization-modal";
import { membersQueryOptions } from "~/lib/member";
import { AuthOrganization, Member } from "~/types";

export const Route = createFileRoute("/_dashboard/users/$userId/organizations")(
  {
    component: RouteComponent,
    loader: async ({ context, params }) =>
      await context.queryClient.prefetchQuery(
        membersQueryOptions({ userId: params.userId }),
      ),
  },
);

const dataTableColumns: ColumnDef<
  Member & {
    organization: AuthOrganization;
  }
>[] = [
  {
    id: "image",
    header: undefined,
    cell({ row }) {
      return (
        <Avatar
          fallback="@"
          src={row.original.organization.logo ?? undefined}
        />
      );
    },
  },
  {
    id: "organizationName",
    accessorKey: "organization.name",
    header: "Name",
    cell({ row }) {
      return (
        <Link
          params={{
            organizationId: row.original.organizationId,
          }}
          to="/organizations/$organizationId"
        >
          {row.original.organization.name}
        </Link>
      );
    },
  },
  {
    id: "memberRole",
    accessorKey: "role",
    header: "Member role",
    cell({ row }) {
      return <UpdateMemberRole member={row.original} />;
    },
  },
  {
    id: "createdAt",
    accessorKey: "createdAt",
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
          <MemberActions
            memberId={row.original.id}
            organizationId={row.original.organizationId}
          />
        </Flex>
      );
    },
  },
];

function RouteComponent() {
  const userId = Route.useParams({ select: ({ userId }) => userId });

  const { data: members } = useSuspenseQuery(membersQueryOptions({ userId }));

  const columns = useMemo(() => dataTableColumns, []);

  return (
    <Flex direction="column" gap="4">
      <Flex justify="end">
        <AddUserToOrganizationModal userId={userId} />
      </Flex>
      <DataTableSimple columns={columns} data={members} />
    </Flex>
  );
}
