import { CheckIcon, XIcon } from "@phosphor-icons/react";
import { useSuspenseQuery } from "@tanstack/react-query";
import { createFileRoute } from "@tanstack/react-router";
import type { ColumnDef } from "@tanstack/react-table";
import { useMemo } from "react";

import { Container } from "~/components/layout/container";
import { CopyValue } from "~/components/misc/copy-value";
import { DataTable } from "~/components/table/data-table";
import { Avatar } from "~/components/ui/avatar";
import { Badge } from "~/components/ui/badge";
import { Heading } from "~/components/ui/heading";
import { Link } from "~/components/ui/link";
import { Separator } from "~/components/ui/separator";
import { CreateUserModal } from "~/components/user/create-user-modal";
import { UserActions } from "~/components/user/user-actions";
import { UserRole } from "~/components/user/user-role";
import { usersQueryOptions } from "~/lib/user";
import type { User } from "~/types";

export const Route = createFileRoute("/_dashboard/users/")({
  component: RouteComponent,
  loader: async ({ context }) =>
    await context.queryClient.ensureQueryData(usersQueryOptions()),
});

const dataTableColumns: ColumnDef<User>[] = [
  {
    id: "image",
    enableHiding: false,
    header: undefined,
    cell({ row }) {
      return (
        <Avatar fallback="@" size={10} src={row.original.image ?? undefined} />
      );
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
      return row.original.createdAt.toDateString();
    },
  },
  {
    id: "updatedAt",
    header: "Updated at",
    cell({ row }) {
      return row.original.updatedAt.toDateString();
    },
  },
  {
    id: "emailVerified",
    header: "Email verified",
    cell({ row }) {
      return row.original.emailVerified ? (
        <CheckIcon size={16} />
      ) : (
        <XIcon size={16} />
      );
    },
  },
  {
    id: "banned",
    header: "Banned",
    cell({ row }) {
      return row.original.banned ? (
        <CheckIcon size={16} />
      ) : (
        <XIcon size={16} />
      );
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
      return row.original.banExpires?.toDateString() ?? "-";
    },
  },
  {
    id: "actions",
    enableHiding: false,
    header: undefined,
    cell({ row }) {
      return (
        <div className="flex justify-end">
          <UserActions user={row.original} variant="overview" />
        </div>
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
      <div className="space-y-8">
        <div className="space-y-4">
          <div className="flex flex-wrap items-start justify-between gap-4">
            <div className="flex items-center gap-2">
              <Heading level={1}>Users</Heading>
              <Badge>{users.length}</Badge>
            </div>
            <CreateUserModal />
          </div>
          <Separator />
        </div>
        <DataTable
          columns={columns}
          data={users}
          defaultColumnVisibility={defaultColumnVisibility}
          label="Users"
        />
      </div>
    </Container>
  );
}
