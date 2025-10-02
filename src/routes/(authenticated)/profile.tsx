import type { Account } from "@prisma/client";
import { useSuspenseQuery } from "@tanstack/react-query";
import { createFileRoute } from "@tanstack/react-router";
import type { ColumnDef } from "@tanstack/react-table";
import type { TFunction } from "i18next";
import { useTranslation } from "react-i18next";
import { twMerge } from "tailwind-merge";

import { Container } from "~/components/layout/container";
import { CopyValue } from "~/components/misc/copy-value";
import { UpdateProfileModal } from "~/components/profile/update-profile-modal";
import { DataTableSimple } from "~/components/table/data-table-simple";
import { Avatar } from "~/components/ui/avatar";
import { Code } from "~/components/ui/code";
import { Heading } from "~/components/ui/heading";
import { Separator } from "~/components/ui/separator";
import { listUserAccountsQueryOptions } from "~/queries/user";

export const Route = createFileRoute("/(authenticated)/profile")({
  component: RouteComponent,
  loader: async ({ context: { queryClient } }) => {
    await queryClient.ensureQueryData(listUserAccountsQueryOptions());
  },
});

function getColumns({
  t,
}: {
  t: TFunction<"translation", undefined>;
}): ColumnDef<
  Pick<Account, "id" | "accountId" | "providerId" | "createdAt">
>[] {
  return [
    {
      id: "id",
      header: t("table.id"),
      cell: ({ row }) => <CopyValue value={row.original.id} />,
    },
    {
      id: "accountId",
      header: t("table.account_id"),
      accessorKey: "accountId",
      cell: ({ row }) => <CopyValue value={row.original.accountId} />,
    },
    {
      id: "provider",
      accessorKey: "provider",
      header: t("table.provider"),
      cell: ({ row }) => <Code>{row.original.providerId}</Code>,
    },
    {
      id: "createdAt",
      header: t("table.created_at"),
      cell: ({ row }) => row.original.createdAt.toDateString(),
    },
  ];
}

function RouteComponent() {
  const auth = Route.useRouteContext({ select: ({ auth }) => auth });
  const { t } = useTranslation();
  const { data: accounts } = useSuspenseQuery(listUserAccountsQueryOptions());
  const columns = getColumns({ t });

  return (
    <Container>
      <div className="space-y-8">
        <div className="space-y-4">
          <div className="flex items-start justify-between gap-4">
            <div className="flex flex-wrap items-center gap-4">
              <Avatar
                alt={auth.user.email}
                fallback="@"
                size={16}
                src={auth.user.image ?? undefined}
              />
              {auth.user.name ? (
                <div className="space-y-0">
                  <Heading level={1}>{auth.user.name}</Heading>
                  <span
                    className={twMerge(
                      "text-sm text-gray-600",
                      "dark:text-gray-400",
                    )}
                  >
                    {auth.user.email}
                  </span>
                </div>
              ) : (
                <Heading level={1}>{auth.user.email}</Heading>
              )}
            </div>
            <UpdateProfileModal user={auth.user} />
          </div>
          <Separator />
        </div>
        <div className="space-y-4">
          <Heading level={2}>{t("profile.accounts")}</Heading>
          <DataTableSimple
            columns={columns}
            data={accounts}
            label={t("profile.accounts")}
          />
        </div>
      </div>
    </Container>
  );
}
