import { Link } from "@tanstack/react-router";

interface OrganizationTabNavProps {
  organizationId: string;
}

export function OrganizationTabNav({
  organizationId,
}: OrganizationTabNavProps) {
  return (
    <div className="flex gap-2">
      <Link
        activeOptions={{ exact: true }}
        activeProps={{ className: "font-bold" }}
        params={{ organizationId }}
        to="/organizations/$organizationId"
      >
        Profile
      </Link>
      <Link
        activeProps={{ className: "font-bold" }}
        params={{ organizationId }}
        to="/organizations/$organizationId/members"
      >
        Members
      </Link>
      <Link
        activeProps={{ className: "font-bold" }}
        params={{ organizationId }}
        to="/organizations/$organizationId/teams"
      >
        Teams
      </Link>
    </div>
  );
}
