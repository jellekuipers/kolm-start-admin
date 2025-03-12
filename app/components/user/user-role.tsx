import { Badge } from "~/components/ui/badge";

interface UserRoleProps {
  role?: string | null;
}

export function UserRole({ role }: UserRoleProps) {
  const renderBadge = (role?: string | null) => {
    switch (role) {
      case "admin":
        return <Badge>admin</Badge>;
      case "user":
        return <Badge>user</Badge>;
      default:
        return;
    }
  };

  const badge = renderBadge(role);

  return badge;
}
