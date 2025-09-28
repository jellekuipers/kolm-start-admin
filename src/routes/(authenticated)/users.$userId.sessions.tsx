import { useSuspenseQuery } from "@tanstack/react-query";
import { createFileRoute } from "@tanstack/react-router";
import type { ColumnDef } from "@tanstack/react-table";
import type { Session } from "better-auth";

import { CopyValue } from "~/components/misc/copy-value";
import { SessionActions } from "~/components/session/session-actions";
import { DataTable } from "~/components/table/data-table";
import { listUserSessionsQueryOptions } from "~/queries/user";

export const Route = createFileRoute("/(authenticated)/users/$userId/sessions")({
  component: RouteComponent,
  loader: async ({ context: { queryClient }, params: { userId } }) =>
    await queryClient.ensureQueryData(listUserSessionsQueryOptions({ userId })),
});

export const columns: ColumnDef<Session>[] = [
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
    listUserSessionsQueryOptions({ userId }),
  );

  return (
    <DataTable columns={columns} data={userSessions} label="User sessions" />
  );
}
