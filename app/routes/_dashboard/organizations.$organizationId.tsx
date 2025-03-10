import { ArrowLeftIcon } from "@radix-ui/react-icons";
import {
  Avatar,
  Button,
  Container,
  Flex,
  Heading,
  Text,
} from "@radix-ui/themes";
import { useSuspenseQuery } from "@tanstack/react-query";
import { createFileRoute, Link, Outlet } from "@tanstack/react-router";

import { OrganizationActions } from "~/components/organization/organization-actions";
import { OrganizationTabNav } from "~/components/organization/organization-tab-nav";
import { organizationQueryOptions } from "~/lib/organization";

export const Route = createFileRoute(
  "/_dashboard/organizations/$organizationId",
)({
  component: RouteComponent,
  loader: async ({ context, params }) =>
    await context.queryClient.prefetchQuery(
      organizationQueryOptions({ organizationId: params.organizationId }),
    ),
});

function RouteComponent() {
  const organizationId = Route.useParams({
    select: ({ organizationId }) => organizationId,
  });

  const { data: organization } = useSuspenseQuery(
    organizationQueryOptions({ organizationId }),
  );

  if (!organization) return null;

  return (
    <Container size="3">
      <Flex direction="column" gap="6">
        <Flex justify="start">
          <Button
            asChild
            variant="ghost"
            style={{ fontWeight: "var(--font-weight-medium)" }}
          >
            <Link to="/organizations">
              <ArrowLeftIcon /> Organizations
            </Link>
          </Button>
        </Flex>
        <Flex direction="column" gap="4">
          <Flex justify="between" gap="4" wrap="wrap">
            <Flex align="center" gap="4" wrap="wrap">
              <Avatar
                fallback="@"
                size="4"
                src={organization.logo ?? undefined}
              />
              <Flex direction="column">
                <Heading>{organization.name}</Heading>
                <Text color="gray" size="1" weight="medium">
                  {organization.members.length}{" "}
                  {organization.members.length === 1 ? "member" : "members"}
                </Text>
              </Flex>
            </Flex>
            <OrganizationActions
              organization={organization}
              variant="profile"
            />
          </Flex>
          <OrganizationTabNav organizationId={organization.id} />
        </Flex>
        <Outlet />
      </Flex>
    </Container>
  );
}
