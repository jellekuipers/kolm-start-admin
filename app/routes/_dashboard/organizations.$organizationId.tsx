import { ArrowLeftIcon } from "@radix-ui/react-icons";
import { useSuspenseQuery } from "@tanstack/react-query";
import { createFileRoute, Outlet } from "@tanstack/react-router";

import { Container } from "~/components/layout/container";
import { OrganizationActions } from "~/components/organization/organization-actions";
import { OrganizationTabNav } from "~/components/organization/organization-tab-nav";
import { Avatar } from "~/components/ui/avatar";
import { Heading } from "~/components/ui/heading";
import { Link } from "~/components/ui/link";
import { Text } from "~/components/ui/text";
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
    <Container>
      <div className="space-y-6">
        <Link className="flex items-center gap-2" to="/organizations">
          <ArrowLeftIcon /> Organizations
        </Link>
        <div className="space-y-4">
          <div className="flex justify-between items-start gap-4 flex-wrap">
            <div className="flex items-center gap-4 flex-wrap">
              <Avatar fallback="@" src={organization.logo ?? undefined} />
              <div className="space-y-0">
                <Heading level={1}>{organization.name}</Heading>
                <Text color="gray" size="1" weight="medium">
                  {organization.members.length}{" "}
                  {organization.members.length === 1 ? "member" : "members"}
                </Text>
              </div>
            </div>
            <OrganizationActions
              organization={organization}
              variant="profile"
            />
          </div>
          <OrganizationTabNav organizationId={organization.id} />
        </div>
        <Outlet />
      </div>
    </Container>
  );
}
