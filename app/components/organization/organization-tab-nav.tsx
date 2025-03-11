import { Link, useMatchRoute } from "@tanstack/react-router";

import { TabNav } from "~/components/ui/tab-nav";

interface OrganizationTabNavProps {
  organizationId: string;
}

export function OrganizationTabNav({
  organizationId,
}: OrganizationTabNavProps) {
  const matchRoute = useMatchRoute();

  return (
    <TabNav.Root>
      <TabNav.Link
        active={!!matchRoute({ to: "/organizations/$organizationId" })}
        asChild
      >
        <Link params={{ organizationId }} to="/organizations/$organizationId">
          Profile
        </Link>
      </TabNav.Link>
      <TabNav.Link
        active={!!matchRoute({ to: "/organizations/$organizationId/members" })}
        asChild
      >
        <Link
          params={{ organizationId }}
          to="/organizations/$organizationId/members"
        >
          Members
        </Link>
      </TabNav.Link>
      <TabNav.Link
        active={!!matchRoute({ to: "/organizations/$organizationId/teams" })}
        asChild
      >
        <Link
          params={{ organizationId }}
          to="/organizations/$organizationId/teams"
        >
          Teams
        </Link>
      </TabNav.Link>
    </TabNav.Root>
  );
}
