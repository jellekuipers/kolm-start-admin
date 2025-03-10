import { useMemo } from "react";
import { Badge, Container, Flex, Heading, Separator } from "@radix-ui/themes";
import { useSuspenseQuery } from "@tanstack/react-query";
import { createFileRoute } from "@tanstack/react-router";
import { ColumnDef } from "@tanstack/react-table";

import { CreateInvitationModal } from "~/components/invitation/create-invitation-modal";
import { InvitationActions } from "~/components/invitation/invitation-actions";
import { InvitationStatus } from "~/components/invitation/invitation-status";
import { DataTable } from "~/components/table/data-table";
import { invitationsQueryOptions } from "~/lib/invitation";
import { Invitation } from "~/types";

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
      return row.original.expiresAt.toLocaleString();
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
        <Flex justify="end">
          <InvitationActions invitation={row.original} />
        </Flex>
      );
    },
  },
];

function RouteComponent() {
  const { data: invitations } = useSuspenseQuery(invitationsQueryOptions());

  const columns = useMemo(() => dataTableColumns, []);

  return (
    <Container size="3">
      <Flex direction="column" gap="6">
        <Flex direction="column" gap="4">
          <Flex justify="between" gap="4" wrap="wrap">
            <Flex align="center" gap="2">
              <Heading>Invitations</Heading>
              <Badge>{invitations.length}</Badge>
            </Flex>
            <CreateInvitationModal />
          </Flex>
          <Separator size="4" />
        </Flex>
        <DataTable columns={columns} data={invitations} />
      </Flex>
    </Container>
  );
}
