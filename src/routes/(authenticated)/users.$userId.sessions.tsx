import { useSuspenseQuery } from "@tanstack/react-query";
import { createFileRoute } from "@tanstack/react-router";
import type { ColumnDef } from "@tanstack/react-table";
import type { Session } from "better-auth";
import { useTranslation } from "react-i18next";

import { CopyValue } from "~/components/misc/copy-value";
import { SessionActions } from "~/components/session/session-actions";
import { DataTable } from "~/components/table/data-table";
import { listUserSessionsQueryOptions } from "~/queries/user";

export const Route = createFileRoute("/(authenticated)/users/$userId/sessions")(
  {
    component: RouteComponent,
    loader: async ({ context: { queryClient }, params: { userId } }) =>
      await queryClient.ensureQueryData(
        listUserSessionsQueryOptions({ userId }),
      ),
  },
);

function getColumns({
  t,
}: {
  t: (key: string) => string;
}): ColumnDef<Session>[] {
  return [
    {
      id: "id",
      accessorKey: "id",
      header: t("table.id"),
      cell: ({ row }) => <CopyValue value={row.original.id} />,
    },
    {
      id: "createdAt",
      header: t("table.created_at"),
      cell: ({ row }) => row.original.createdAt.toDateString(),
    },
    {
      id: "expiresAt",
      header: t("table.expires_at"),
      cell: ({ row }) => row.original.expiresAt.toDateString(),
    },
    {
      id: "actions",
      enableHiding: false,
      header: undefined,
      cell: ({ row }) => (
        <div className="flex justify-end">
          <SessionActions sessionToken={row.original.token} />
        </div>
      ),
    },
  ];
}

function RouteComponent() {
  const { t } = useTranslation();
  const userId = Route.useParams({ select: ({ userId }) => userId });

  const { data: userSessions } = useSuspenseQuery(
    listUserSessionsQueryOptions({ userId }),
  );

  const columns = getColumns({ t });

  return (
    <DataTable
      columns={columns}
      data={userSessions}
      label={t("session.user_sessions")}
    />
  );
}
