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
import { Text } from "~/components/ui/text";
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
      return row.original.createdAt.toLocaleString();
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
      <div className="space-y-6">
        <div className="space-y-4">
          <div className="flex justify-between items-center gap-4">
            <div className="space-y-1">
              <div className="flex items-center gap-4 flex-wrap">
                <Avatar fallback="@" src={user.image ?? undefined} />
                {user.name ? (
                  <div className="space-y-0">
                    <Heading>{user.name}</Heading>
                    <Text color="gray" size="1" weight="medium">
                      {user.email}
                    </Text>
                  </div>
                ) : (
                  <Heading>{user.email}</Heading>
                )}
              </div>
            </div>
            <UpdateProfileModal user={user} />
          </div>
          <Separator />
        </div>
        <div className="space-y-4">
          <Heading as="h2" size="3" weight="medium">
            Accounts
          </Heading>
          <DataTableSimple
            columns={accountsColumns}
            data={accounts}
            variant="surface"
          />
        </div>
        <div className="space-y-4">
          <Heading as="h2" size="3" weight="medium">
            Organizations
          </Heading>
          <DataTableSimple
            columns={membersColumns}
            data={members}
            variant="surface"
          />
        </div>
      </div>
    </Container>
  );
}
