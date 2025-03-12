import { useMemo } from "react";
import { CheckIcon, Cross2Icon } from "@radix-ui/react-icons";
import { useSuspenseQuery } from "@tanstack/react-query";
import { createFileRoute } from "@tanstack/react-router";
import { ColumnDef } from "@tanstack/react-table";
import { UserWithRole } from "better-auth/plugins";

import { CopyValue } from "~/components/misc/copy-value";
import { DataTable } from "~/components/table/data-table";
import { Avatar } from "~/components/ui/avatar";
import { Badge } from "~/components/ui/badge";
import { Container } from "~/components/layout/container";
import { Flex } from "~/components/ui/flex";
import { Heading } from "~/components/ui/heading";
import { Link } from "~/components/ui/link";
import { Separator } from "~/components/ui/separator";
import { CreateUserModal } from "~/components/user/create-user-modal";
import { UserActions } from "~/components/user/user-actions";
import { UserRole } from "~/components/user/user-role";
import { usersQueryOptions } from "~/lib/user";
import { User } from "~/types";

export const Route = createFileRoute("/_dashboard/users/")({
  component: RouteComponent,
  loader: async ({ context }) =>
    await context.queryClient.prefetchQuery(usersQueryOptions()),
});

const dataTableColumns: ColumnDef<User | UserWithRole>[] = [
  {
    id: "image",
    enableHiding: false,
    header: undefined,
    cell({ row }) {
      return <Avatar fallback="@" src={row.original.image ?? undefined} />;
    },
  },
  {
    id: "id",
    header: "ID",
    cell({ row }) {
      return <CopyValue value={row.original.id} />;
    },
  },
  {
    id: "email",
    accessorKey: "email",
    header: "Email",
    cell({ row }) {
      return (
        <Link
          params={{
            userId: row.original.id,
          }}
          to="/users/$userId"
        >
          {row.original.email}
        </Link>
      );
    },
  },
  {
    id: "name",
    accessorKey: "name",
    header: "Name",
  },
  {
    id: "role",
    accessorKey: "role",
    header: "Role",
    cell({ row }) {
      return <UserRole role={row.original.role} />;
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
    id: "updatedAt",
    header: "Updated at",
    cell({ row }) {
      return row.original.updatedAt.toLocaleString();
    },
  },
  {
    id: "emailVerified",
    header: "Email verified",
    cell({ row }) {
      return row.original.emailVerified ? <CheckIcon /> : <Cross2Icon />;
    },
  },
  {
    id: "banned",
    header: "Banned",
    cell({ row }) {
      return row.original.banned ? <CheckIcon /> : <Cross2Icon />;
    },
  },
  {
    id: "banReason",
    header: "Ban reason",
    cell({ row }) {
      return row.original.banReason ?? "-";
    },
  },
  {
    id: "banExpires",
    header: "Ban expires",
    cell({ row }) {
      return row.original.banExpires?.toLocaleString() ?? "-";
    },
  },
  {
    id: "actions",
    enableHiding: false,
    header: undefined,
    cell({ row }) {
      return (
        <Flex justify="end">
          <UserActions user={row.original} variant="overview" />
        </Flex>
      );
    },
  },
];

const defaultColumnVisibility = {
  banExpires: false,
  banned: false,
  banReason: false,
  createdAt: true,
  email: true,
  emailVerified: false,
  id: false,
  name: true,
  role: true,
  updatedAt: false,
};

function RouteComponent() {
  const { data: users } = useSuspenseQuery(usersQueryOptions());

  const columns = useMemo(() => dataTableColumns, []);

  return (
    <Container>
      <Flex direction="column" gap="6">
        <Flex direction="column" gap="4">
          <Flex justify="between" gap="4" wrap="wrap">
            <Flex align="center" gap="2">
              <Heading>Users</Heading>
              <Badge>{users.length}</Badge>
            </Flex>
            <CreateUserModal />
          </Flex>
          <Separator />
        </Flex>
        <DataTable
          columns={columns}
          data={users}
          defaultColumnVisibility={defaultColumnVisibility}
        />
      </Flex>
    </Container>
  );
}
