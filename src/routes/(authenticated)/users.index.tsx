import { CheckIcon, XIcon } from "@phosphor-icons/react";
import type { User } from "@prisma/client";
import { useSuspenseQuery } from "@tanstack/react-query";
import { createFileRoute } from "@tanstack/react-router";
import type { ColumnDef } from "@tanstack/react-table";
import type { TFunction } from "i18next";
import { useTranslation } from "react-i18next";

import { Container } from "@/components/layout/container";
import { CopyValue } from "@/components/misc/copy-value";
import { DataTable } from "@/components/table/data-table";
import { Avatar } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Heading } from "@/components/ui/heading";
import { Link } from "@/components/ui/link";
import { Separator } from "@/components/ui/separator";
import { CreateUserModal } from "@/components/user/create-user-modal";
import { UserActions } from "@/components/user/user-actions";
import { UserRole } from "@/components/user/user-role";
import { listUsersQueryOptions } from "@/queries/user";

export const Route = createFileRoute("/(authenticated)/users/")({
  component: RouteComponent,
  loader: async ({ context: { queryClient } }) =>
    await queryClient.ensureQueryData(listUsersQueryOptions()),
});

function getColumns({
  t,
}: {
  t: TFunction<"translation", undefined>;
}): ColumnDef<User>[] {
  return [
    {
      id: "image",
      enableHiding: false,
      header: undefined,
      cell: ({ row }) => (
        <Avatar
          alt={row.original.email}
          fallback="@"
          size={10}
          src={row.original.image ?? undefined}
        />
      ),
    },
    {
      id: "id",
      header: t("table.id"),
      cell: ({ row }) => <CopyValue value={row.original.id} />,
    },
    {
      id: "email",
      accessorKey: "email",
      header: t("table.email"),
      cell: ({ row }) => (
        <Link
          params={{
            userId: row.original.id,
          }}
          to="/users/$userId"
        >
          {row.original.email}
        </Link>
      ),
    },
    {
      id: "name",
      accessorKey: "name",
      header: t("table.name"),
    },
    {
      id: "role",
      accessorKey: "role",
      header: t("table.role"),
      cell: ({ row }) => <UserRole role={row.original.role} />,
    },
    {
      id: "createdAt",
      header: t("table.created_at"),
      cell: ({ row }) => row.original.createdAt.toDateString(),
    },
    {
      id: "updatedAt",
      header: t("table.updated_at"),
      cell: ({ row }) => row.original.updatedAt.toDateString(),
    },
    {
      id: "emailVerified",
      header: t("table.email_verified"),
      cell: ({ row }) =>
        row.original.emailVerified ? (
          <CheckIcon size={16} />
        ) : (
          <XIcon size={16} />
        ),
    },
    {
      id: "banned",
      header: t("table.banned"),
      cell: ({ row }) =>
        row.original.banned ? <CheckIcon size={16} /> : <XIcon size={16} />,
    },
    {
      id: "banReason",
      header: t("table.ban_reason"),
      cell: ({ row }) => row.original.banReason ?? "-",
    },
    {
      id: "banExpires",
      header: t("table.ban_expires"),
      cell: ({ row }) => row.original.banExpires?.toDateString() ?? "-",
    },
    {
      id: "actions",
      enableHiding: false,
      header: undefined,
      cell: ({ row }) => (
        <div className="flex justify-end">
          <UserActions user={row.original} variant="overview" />
        </div>
      ),
    },
  ];
}

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
  const { t } = useTranslation();
  const { data: users } = useSuspenseQuery(listUsersQueryOptions());
  const columns = getColumns({ t });

  return (
    <Container>
      <div className="space-y-8">
        <div className="space-y-4">
          <div className="flex flex-wrap items-start justify-between gap-4">
            <div className="flex items-center gap-2">
              <Heading level={1}>{t("user.users")}</Heading>
              <Badge color="indigo">{users.length}</Badge>
            </div>
            <CreateUserModal />
          </div>
          <Separator />
        </div>
        <DataTable
          columns={columns}
          data={users}
          defaultColumnVisibility={defaultColumnVisibility}
          label={t("user.users")}
        />
      </div>
    </Container>
  );
}
