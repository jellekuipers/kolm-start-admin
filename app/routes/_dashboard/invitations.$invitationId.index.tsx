import { useSuspenseQuery } from "@tanstack/react-query";
import { createFileRoute } from "@tanstack/react-router";

import { InvitationCard } from "~/components/invitation/invitation-card";
import { Container } from "~/components/layout/container";
import { Flex } from "~/components/ui/flex";
import { Heading } from "~/components/ui/heading";
import { Separator } from "~/components/ui/separator";
import { invitationQueryOptions } from "~/lib/invitation";

export const Route = createFileRoute("/_dashboard/invitations/$invitationId/")({
  component: RouteComponent,
  loader: async ({ context, params }) =>
    await context.queryClient.prefetchQuery(
      invitationQueryOptions({ invitationId: params.invitationId }),
    ),
});

function RouteComponent() {
  const invitationId = Route.useParams({
    select: ({ invitationId }) => invitationId,
  });

  const { data: invitation } = useSuspenseQuery(
    invitationQueryOptions({ invitationId }),
  );

  if (!invitation) return null;

  return (
    <Container>
      <Flex direction="column" gap="4">
        <Heading>Invitation</Heading>
        <Separator />
        <InvitationCard invitation={invitation} />
      </Flex>
    </Container>
  );
}
