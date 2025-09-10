import { useSuspenseQuery } from "@tanstack/react-query";
import { createFileRoute } from "@tanstack/react-router";
import type { ColumnDef } from "@tanstack/react-table";

import { Container } from "~/components/layout/container";
import { CopyValue } from "~/components/misc/copy-value";
import { UpdateProfileModal } from "~/components/profile/update-profile-modal";
import { DataTableSimple } from "~/components/table/data-table-simple";
import { Avatar } from "~/components/ui/avatar";
import { Code } from "~/components/ui/code";
import { Heading } from "~/components/ui/heading";
import { Separator } from "~/components/ui/separator";
import { listUserAccountsQueryOptions } from "~/queries/user";
import type { Account } from "~/types";

export const Route = createFileRoute("/_dashboard/profile")({
  component: RouteComponent,
  loader: async ({ context: { auth, queryClient } }) => {
    await queryClient.ensureQueryData(listUserAccountsQueryOptions());

    const user = auth!.user;

    return { user };
  },
});

const columns: ColumnDef<Account>[] = [
  {
    id: "id",
    header: "ID",
    cell({ row }) {
      return <CopyValue value={row.original.id} />;
    },
  },
  {
    id: "accountId",
    header: "Account ID",
    accessorKey: "accountId",
    cell({ row }) {
      return <CopyValue value={row.original.accountId} />;
    },
  },
  {
    id: "provider",
    accessorKey: "provider",
    header: "Provider",
    cell({ row }) {
      return <Code>{row.original.providerId}</Code>;
    },
  },
  {
    id: "createdAt",
    header: "Created at",
    cell({ row }) {
      return row.original.createdAt.toDateString();
    },
  },
];

function RouteComponent() {
  const { user } = Route.useLoaderData();

  const { data: accounts } = useSuspenseQuery(listUserAccountsQueryOptions());

  if (!user) return null;

  return (
    <Container>
      <div className="space-y-8">
        <div className="space-y-4">
          <div className="flex items-start justify-between gap-4">
            <div className="flex flex-wrap items-center gap-4">
              <Avatar fallback="@" size={16} src={user.image ?? undefined} />
              {user.name ? (
                <div className="space-y-0">
                  <Heading level={1}>{user.name}</Heading>
                  <span className="text-sm text-slate-600">{user.email}</span>
                </div>
              ) : (
                <Heading level={1}>{user.email}</Heading>
              )}
            </div>
            <UpdateProfileModal user={user} />
          </div>
          <Separator />
        </div>
        <div className="space-y-4">
          <Heading level={2}>Accounts</Heading>
          <DataTableSimple columns={columns} data={accounts} label="Accounts" />
        </div>
      </div>
    </Container>
  );
}
