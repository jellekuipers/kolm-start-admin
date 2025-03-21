import { useMemo } from "react";
import { useSuspenseQuery } from "@tanstack/react-query";
import { createFileRoute } from "@tanstack/react-router";
import { ColumnDef } from "@tanstack/react-table";
import { Session } from "better-auth";

import { CopyValue } from "~/components/misc/copy-value";
import { SessionActions } from "~/components/session/session-actions";
import { DataTable } from "~/components/table/data-table";
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
      return row.original.createdAt.toDateString();
    },
  },
  {
    id: "expiresAt",
    header: "Expires at",
    cell({ row }) {
      return row.original.expiresAt.toDateString();
    },
  },
  {
    id: "actions",
    enableHiding: false,
    header: undefined,
    cell({ row }) {
      return (
        <div className="flex justify-end">
          <SessionActions sessionToken={row.original.token} />
        </div>
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
