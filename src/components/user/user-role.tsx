import { Badge } from "@/components/ui/badge";
import { userRoleEnum } from "@/lib/enums";

interface UserRoleProps {
  role?: string | null;
}

export function UserRole({ role }: UserRoleProps) {
  const renderBadge = (role?: string | null) => {
    switch (role) {
      case userRoleEnum.admin:
        return <Badge>admin</Badge>;
      case userRoleEnum.user:
        return <Badge color="secondary">user</Badge>;
      default:
        return;
    }
  };

  const badge = renderBadge(role);

  return badge;
}
