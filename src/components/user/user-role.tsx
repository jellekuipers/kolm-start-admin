import { Badge } from "~/components/ui/badge";
import { userRoleEnum } from "~/types/enums";

interface UserRoleProps {
  role?: string | null;
}

export function UserRole({ role }: UserRoleProps) {
  const renderBadge = (role?: string | null) => {
    switch (role) {
      case userRoleEnum.admin:
        return <Badge>admin</Badge>;
      case userRoleEnum.user:
        return <Badge color="slate">user</Badge>;
      default:
        return;
    }
  };

  const badge = renderBadge(role);

  return badge;
}
