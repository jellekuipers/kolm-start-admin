import { useMemo } from "react";
import { useSuspenseQuery } from "@tanstack/react-query";
import { createFileRoute } from "@tanstack/react-router";
import type { ColumnDef } from "@tanstack/react-table";

import { CreateInvitationModal } from "~/components/invitation/create-invitation-modal";
import { InvitationActions } from "~/components/invitation/invitation-actions";
import { InvitationStatus } from "~/components/invitation/invitation-status";
import { Container } from "~/components/layout/container";
import { DataTable } from "~/components/table/data-table";
import { Badge } from "~/components/ui/badge";
import { Heading } from "~/components/ui/heading";
import { Separator } from "~/components/ui/separator";
import { invitationsQueryOptions } from "~/lib/invitation";
import type { Invitation } from "~/types";

export const Route = createFileRoute("/_dashboard/invitations/")({
  component: RouteComponent,
  loader: async ({ context }) =>
    await context.queryClient.prefetchQuery(invitationsQueryOptions()),
});

const dataTableColumns: ColumnDef<Invitation>[] = [
  {
    id: "organizationName",
    accessorKey: "organizationName",
    header: "Organization",
  },
  {
    id: "inviterEmail",
    accessorKey: "inviterEmail",
    header: "Inviter",
  },
  {
    id: "email",
    accessorKey: "email",
    header: "Invitee",
  },
  {
    id: "expiresAt",
    accessorKey: "expiresAt",
    header: "Expires",
    cell({ row }) {
      return row.original.expiresAt.toDateString();
    },
  },
  {
    id: "status",
    accessorKey: "status",
    header: "Status",
    cell({ row }) {
      return <InvitationStatus status={row.original.status} />;
    },
  },
  {
    id: "actions",
    header: undefined,
    cell({ row }) {
      return (
        <div className="flex justify-end">
          <InvitationActions invitation={row.original} />
        </div>
      );
    },
  },
];

function RouteComponent() {
  const { data: invitations } = useSuspenseQuery(invitationsQueryOptions());

  const columns = useMemo(() => dataTableColumns, []);

  return (
    <Container>
      <div className="space-y-8">
        <div className="space-y-4">
          <div className="flex flex-wrap items-start justify-between gap-4">
            <div className="flex items-center gap-2">
              <Heading level={1}>Invitations</Heading>
              <Badge>{invitations.length}</Badge>
            </div>
            <CreateInvitationModal />
          </div>
          <Separator />
        </div>
        <DataTable label="Invitations" columns={columns} data={invitations} />
      </div>
    </Container>
  );
}
