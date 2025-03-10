import { useMemo } from "react";
import {
  Avatar,
  Code,
  Container,
  Flex,
  Heading,
  Separator,
  Text,
} from "@radix-ui/themes";
import { useSuspenseQuery } from "@tanstack/react-query";
import { createFileRoute } from "@tanstack/react-router";
import { ColumnDef } from "@tanstack/react-table";

import { UpdateProfileModal } from "~/components/profile/update-profile-modal";
import { DataTableSimple } from "~/components/table/data-table-simple";
import { CopyValue } from "~/components/ui/copy-value";
import { Link } from "~/components/ui/link";
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
      return <Code color="gray">{row.original.provider}</Code>;
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
      return <Code variant="ghost">{row.original.organization.slug}</Code>;
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
        <Flex justify="end">
          <SessionUserOrganizationActions
            organizationId={row.original.organizationId}
          />
        </Flex>
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
    <Container size="3">
      <Flex direction="column" gap="6">
        <Flex direction="column" gap="4">
          <Flex justify="between" gap="4" wrap="wrap">
            <Flex align="center" gap="4" wrap="wrap">
              <Avatar fallback="@" size="4" src={user.image ?? undefined} />
              {user.name ? (
                <Flex direction="column">
                  <Heading>{user.name}</Heading>
                  <Text color="gray" size="1" weight="medium">
                    {user.email}
                  </Text>
                </Flex>
              ) : (
                <Heading>{user.email}</Heading>
              )}
            </Flex>
            <UpdateProfileModal user={user} />
          </Flex>
          <Separator size="4" />
        </Flex>
        <Flex direction="column" gap="4">
          <Heading as="h2" size="3" weight="medium">
            Accounts
          </Heading>
          <DataTableSimple
            columns={accountsColumns}
            data={accounts}
            variant="surface"
          />
        </Flex>
        <Flex direction="column" gap="4">
          <Heading as="h2" size="3" weight="medium">
            Organizations
          </Heading>
          <DataTableSimple
            columns={membersColumns}
            data={members}
            variant="surface"
          />
        </Flex>
      </Flex>
    </Container>
  );
}
