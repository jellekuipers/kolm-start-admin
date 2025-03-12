import { useMemo } from "react";
import { useSuspenseQuery } from "@tanstack/react-query";
import { createFileRoute } from "@tanstack/react-router";
import { ColumnDef } from "@tanstack/react-table";

import { CopyValue } from "~/components/misc/copy-value";
import { CreateOrganizationModal } from "~/components/organization/create-organization-modal";
import { OrganizationActions } from "~/components/organization/organization-actions";
import { DataTable } from "~/components/table/data-table";
import { Avatar } from "~/components/ui/avatar";
import { Badge } from "~/components/ui/badge";
import { Code } from "~/components/ui/code";
import { Container } from "~/components/layout/container";
import { Flex } from "~/components/ui/flex";
import { Heading } from "~/components/ui/heading";
import { Link } from "~/components/ui/link";
import { Separator } from "~/components/ui/separator";
import { organizationsQueryOptions } from "~/lib/organization";
import { AuthOrganization, ORMOrganization } from "~/types";

export const Route = createFileRoute("/_dashboard/organizations/")({
  component: RouteComponent,
  loader: async ({ context }) =>
    await context.queryClient.prefetchQuery(organizationsQueryOptions()),
});

const dataTableColumns: ColumnDef<AuthOrganization | ORMOrganization>[] = [
  {
    id: "logo",
    header: undefined,
    cell({ row }) {
      return <Avatar fallback="@" src={row.original.logo ?? undefined} />;
    },
  },
  {
    id: "name",
    accessorKey: "name",
    header: "Name",
    cell({ row }) {
      return (
        <Link
          params={{
            organizationId: row.original.id,
          }}
          to="/organizations/$organizationId"
        >
          {row.original.name}
        </Link>
      );
    },
  },
  {
    id: "slug",
    accessorKey: "slug",
    header: "Slug",
    cell({ row }) {
      return <Code variant="ghost">{row.original.slug}</Code>;
    },
  },
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
    accessorKey: "createdAt",
    header: "Created at",
    cell({ row }) {
      return row.original.createdAt.toLocaleString();
    },
  },
  {
    id: "actions",
    header: undefined,
    cell({ row }) {
      return (
        <Flex justify="end">
          <OrganizationActions organization={row.original} variant="overview" />
        </Flex>
      );
    },
  },
];

function RouteComponent() {
  const { data: organizations } = useSuspenseQuery(organizationsQueryOptions());

  const columns = useMemo(() => dataTableColumns, []);

  return (
    <Container>
      <Flex direction="column" gap="6">
        <Flex direction="column" gap="4">
          <Flex justify="between" gap="4" wrap="wrap">
            <Flex align="center" gap="2">
              <Heading>Organizations</Heading>
              <Badge>{organizations.length}</Badge>
            </Flex>
            <CreateOrganizationModal />
          </Flex>
          <Separator />
        </Flex>
        <DataTable columns={columns} data={organizations} />
      </Flex>
    </Container>
  );
}
