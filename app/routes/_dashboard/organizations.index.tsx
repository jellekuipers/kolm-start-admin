import { useMemo } from "react";
import { useSuspenseQuery } from "@tanstack/react-query";
import { createFileRoute } from "@tanstack/react-router";
import { ColumnDef } from "@tanstack/react-table";

import { Container } from "~/components/layout/container";
import { CopyValue } from "~/components/misc/copy-value";
import { CreateOrganizationModal } from "~/components/organization/create-organization-modal";
import { OrganizationActions } from "~/components/organization/organization-actions";
import { DataTable } from "~/components/table/data-table";
import { Avatar } from "~/components/ui/avatar";
import { Badge } from "~/components/ui/badge";
import { Code } from "~/components/ui/code";
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
      return (
        <Avatar fallback="@" size={10} src={row.original.logo ?? undefined} />
      );
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
      return <Code>{row.original.slug}</Code>;
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
      return row.original.createdAt.toDateString();
    },
  },
  {
    id: "actions",
    header: undefined,
    cell({ row }) {
      return (
        <div className="flex justify-end">
          <OrganizationActions organization={row.original} variant="overview" />
        </div>
      );
    },
  },
];

function RouteComponent() {
  const { data: organizations } = useSuspenseQuery(organizationsQueryOptions());

  const columns = useMemo(() => dataTableColumns, []);

  return (
    <Container>
      <div className="space-y-8">
        <div className="space-y-4">
          <div className="flex flex-wrap items-start justify-between gap-4">
            <div className="flex items-center gap-2">
              <Heading level={1}>Organizations</Heading>
              <Badge>{organizations.length}</Badge>
            </div>
            <CreateOrganizationModal />
          </div>
          <Separator />
        </div>
        <DataTable
          columns={columns}
          data={organizations}
          label="Organizations"
        />
      </div>
    </Container>
  );
}
