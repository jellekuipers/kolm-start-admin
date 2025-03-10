import { Badge } from "@radix-ui/themes";

interface UserRoleProps {
  role?: string | null;
}

export function UserRole({ role }: UserRoleProps) {
  const renderBadge = (role?: string | null) => {
    switch (role) {
      case "admin":
        return <Badge color="pink">admin</Badge>;
      case "user":
        return <Badge color="indigo">user</Badge>;
      default:
        return;
    }
  };

  const badge = renderBadge(role);

  return badge;
}
