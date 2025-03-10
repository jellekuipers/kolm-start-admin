import { useMemo } from "react";
import { Flex } from "@radix-ui/themes";
import { useSuspenseQuery } from "@tanstack/react-query";
import { createFileRoute } from "@tanstack/react-router";
import { ColumnDef } from "@tanstack/react-table";

import { DataTable } from "~/components/table/data-table";
import { CreateTeamModal } from "~/components/team/create-team-modal";
import { TeamActions } from "~/components/team/team-actions";
import { CopyValue } from "~/components/ui/copy-value";
import { teamsQueryOptions } from "~/lib/team";
import { Team } from "~/types";

export const Route = createFileRoute(
  "/_dashboard/organizations/$organizationId/teams",
)({
  component: RouteComponent,
  loader: async ({ context, params }) =>
    await context.queryClient.prefetchQuery(
      teamsQueryOptions({ organizationId: params.organizationId }),
    ),
});

const dataTableColumns: ColumnDef<Team>[] = [
  {
    id: "name",
    accessorKey: "name",
    header: "Name",
  },
  {
    id: "id",
    accessorKey: "id",
    header: "ID",
    cell({ row }) {
      return <CopyValue value={row.original.id} />;
    },
  },
  {
    id: "actions",
    header: undefined,
    cell({ row }) {
      return (
        <Flex justify="end">
          <TeamActions team={row.original} />
        </Flex>
      );
    },
  },
];

function RouteComponent() {
  const organizationId = Route.useParams({
    select: ({ organizationId }) => organizationId,
  });

  const { data: teams } = useSuspenseQuery(
    teamsQueryOptions({ organizationId }),
  );

  const columns = useMemo(() => dataTableColumns, []);

  return (
    <Flex direction="column" gap="4">
      <Flex justify="end">
        <CreateTeamModal organizationId={organizationId} />
      </Flex>
      <DataTable columns={columns} data={teams} />
    </Flex>
  );
}
