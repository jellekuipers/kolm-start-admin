import { TabNav, TabNavLink } from "~/components/ui/tab-nav";

interface OrganizationTabNavProps {
  organizationId: string;
}

export function OrganizationTabNav({
  organizationId,
}: OrganizationTabNavProps) {
  return (
    <TabNav>
      <TabNavLink
        activeOptions={{ exact: true }}
        params={{ organizationId }}
        to="/organizations/$organizationId"
      >
        Profile
      </TabNavLink>
      <TabNavLink
        params={{ organizationId }}
        to="/organizations/$organizationId/members"
      >
        Members
      </TabNavLink>
      <TabNavLink
        params={{ organizationId }}
        to="/organizations/$organizationId/teams"
      >
        Teams
      </TabNavLink>
    </TabNav>
  );
}
