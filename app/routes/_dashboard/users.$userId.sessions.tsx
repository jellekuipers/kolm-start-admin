import { useMemo } from "react";
import { Flex } from "@radix-ui/themes";
import { useSuspenseQuery } from "@tanstack/react-query";
import { createFileRoute } from "@tanstack/react-router";
import { ColumnDef } from "@tanstack/react-table";
import { Session } from "better-auth";

import { SessionActions } from "~/components/session/session-actions";
import { DataTable } from "~/components/table/data-table";
import { CopyValue } from "~/components/ui/copy-value";
import { userSessionsQueryOptions } from "~/lib/user";

export const Route = createFileRoute("/_dashboard/users/$userId/sessions")({
  component: RouteComponent,
  loader: async ({ context, params }) =>
    await context.queryClient.prefetchQuery(
      userSessionsQueryOptions({ userId: params.userId }),
    ),
});

export const dataTableColumns: ColumnDef<Session>[] = [
  {
    id: "id",
    accessorKey: "id",
    header: "ID",
    cell({ row }) {
      return <CopyValue value={row.original.id} />;
    },
  },
  {
    id: "createdAt",
    header: "Created at",
    cell({ row }) {
      return row.original.createdAt.toLocaleString();
    },
  },
  {
    id: "expiresAt",
    header: "Expires at",
    cell({ row }) {
      return row.original.expiresAt.toLocaleString();
    },
  },
  {
    id: "actions",
    enableHiding: false,
    header: undefined,
    cell({ row }) {
      return (
        <Flex justify="end">
          <SessionActions sessionToken={row.original.token} />
        </Flex>
      );
    },
  },
];

function RouteComponent() {
  const userId = Route.useParams({ select: ({ userId }) => userId });

  const { data: userSessions } = useSuspenseQuery(
    userSessionsQueryOptions({ userId }),
  );

  const columns = useMemo(() => dataTableColumns, []);

  return <DataTable columns={columns} data={userSessions} />;
}
