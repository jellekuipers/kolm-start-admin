import { Badge } from "~/components/ui/badge";
import { authClient } from "~/lib/auth-client";

interface SessionUserActiveOrganizationBadgeProps {
  organizationId: string;
}

export function SessionUserActiveOrganizationBadge({
  organizationId,
}: SessionUserActiveOrganizationBadgeProps) {
  const { data: activeOrganization } = authClient.useActiveOrganization();

  const isActiveOrganization = activeOrganization?.id === organizationId;

  if (!activeOrganization || !isActiveOrganization) {
    return null;
  }

  return <Badge color="green">active</Badge>;
}
