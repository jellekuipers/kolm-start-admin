import { useMemo } from "react";
import { useSuspenseQuery } from "@tanstack/react-query";
import { createFileRoute } from "@tanstack/react-router";
import { ColumnDef } from "@tanstack/react-table";

import { Container } from "~/components/layout/container";
import { CopyValue } from "~/components/misc/copy-value";
import { UpdateProfileModal } from "~/components/profile/update-profile-modal";
import { DataTableSimple } from "~/components/table/data-table-simple";
import { Avatar } from "~/components/ui/avatar";
import { Code } from "~/components/ui/code";
import { Heading } from "~/components/ui/heading";
import { Link } from "~/components/ui/link";
import { Separator } from "~/components/ui/separator";
import { SessionUserActiveOrganizationBadge } from "~/components/user/session-user-active-organization-badge";
import { SessionUserOrganizationActions } from "~/components/user/session-user-organization-actions";
import { membersQueryOptions } from "~/lib/member";
import { userAccountsQueryOptions } from "~/lib/user";
import { Account, AuthOrganization, Member, ORMOrganization } from "~/types";

export const Route = createFileRoute("/_dashboard/profile")({
  component: RouteComponent,
  loader: async ({ context }) => {
    const user = context.session?.user;

    await context.queryClient.prefetchQuery(
      membersQueryOptions({ userId: user?.id ?? "" }),
    );

    await context.queryClient.prefetchQuery(userAccountsQueryOptions());

    return { user };
  },
});

const accountsDataTableColumns: ColumnDef<Account>[] = [
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
      return <Code>{row.original.provider}</Code>;
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

const membersDataTableColumns: ColumnDef<
  Member & {
    organization: AuthOrganization | ORMOrganization;
  }
>[] = [
  {
    id: "logo",
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
    id: "name",
    accessorKey: "organization.name",
    header: "Name",
    cell({ row }) {
      return (
        <Link
          params={{
            organizationId: row.original.organization.id,
          }}
          to="/organizations/$organizationId"
        >
          {row.original.organization.name}
        </Link>
      );
    },
  },
  {
    id: "slug",
    accessorKey: "organization.slug",
    header: "Slug",
    cell({ row }) {
      return <Code>{row.original.organization.slug}</Code>;
    },
  },
  {
    id: "id",
    accessorKey: "organization.id",
    header: "ID",
    cell({ row }) {
      return <CopyValue value={row.original.organization.id} />;
    },
  },
  {
    id: "active",
    header: undefined,
    cell({ row }) {
      return (
        <SessionUserActiveOrganizationBadge
          organizationId={row.original.organization.id}
        />
      );
    },
  },
  {
    id: "actions",
    header: undefined,
    cell({ row }) {
      return (
        <div className="flex justify-end">
          <SessionUserOrganizationActions
            organizationId={row.original.organizationId}
          />
        </div>
      );
    },
  },
];

function RouteComponent() {
  const { user } = Route.useLoaderData();

  const { data: members } = useSuspenseQuery(
    membersQueryOptions({ userId: user?.id ?? "" }),
  );

  const { data: accounts } = useSuspenseQuery(userAccountsQueryOptions());

  const accountsColumns = useMemo(() => accountsDataTableColumns, []);
  const membersColumns = useMemo(() => membersDataTableColumns, []);

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
          <DataTableSimple
            columns={accountsColumns}
            data={accounts}
            label="Accounts"
          />
        </div>
        <div className="space-y-4">
          <Heading level={2}>Organizations</Heading>
          <DataTableSimple
            columns={membersColumns}
            data={members}
            label="Organizations"
          />
        </div>
      </div>
    </Container>
  );
}
