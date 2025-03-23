import { useMemo } from "react";
import { useSuspenseQuery } from "@tanstack/react-query";
import { createFileRoute } from "@tanstack/react-router";
import { ColumnDef } from "@tanstack/react-table";

import { MemberActions } from "~/components/member/member-actions";
import { UpdateMemberRole } from "~/components/member/update-member-role";
import { DataTable } from "~/components/table/data-table";
import { Avatar } from "~/components/ui/avatar";
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
          size={10}
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
      return row.original.createdAt.toDateString();
    },
  },
  {
    id: "actions",
    header: undefined,
    cell({ row }) {
      return (
        <div className="flex justify-end">
          <MemberActions
            memberId={row.original.id}
            organizationId={row.original.organizationId}
          />
        </div>
      );
    },
  },
];

function RouteComponent() {
  const userId = Route.useParams({ select: ({ userId }) => userId });

  const { data: members } = useSuspenseQuery(membersQueryOptions({ userId }));

  const columns = useMemo(() => dataTableColumns, []);

  return (
    <DataTable
      actions={<AddUserToOrganizationModal userId={userId} />}
      columns={columns}
      data={members}
    />
  );
}
