import { ArrowLeft as ArrowLeftIcon } from "@phosphor-icons/react";
import { useSuspenseQuery } from "@tanstack/react-query";
import { createFileRoute, Outlet } from "@tanstack/react-router";

import { Container } from "~/components/layout/container";
import { OrganizationActions } from "~/components/organization/organization-actions";
import { OrganizationTabNav } from "~/components/organization/organization-tab-nav";
import { Avatar } from "~/components/ui/avatar";
import { Heading } from "~/components/ui/heading";
import { Link } from "~/components/ui/link";
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
        <Link to="/organizations">
          <ArrowLeftIcon size={16} /> Organizations
        </Link>
        <div className="space-y-4">
          <div className="flex flex-wrap items-start justify-between gap-4">
            <div className="flex flex-wrap items-center gap-4">
              <Avatar
                fallback="@"
                size={16}
                src={organization.logo ?? undefined}
              />
              <div className="space-y-0">
                <Heading level={1}>{organization.name}</Heading>
                <span className="text-sm text-slate-600">
                  {organization.members.length}{" "}
                  {organization.members.length === 1 ? "member" : "members"}
                </span>
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
