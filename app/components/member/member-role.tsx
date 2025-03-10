import { Badge } from "@radix-ui/themes";

interface MemberRoleProps {
  role: string;
}

export function MemberRole({ role }: MemberRoleProps) {
  const renderBadge = (role: string) => {
    switch (role) {
      case "admin":
        return <Badge color="indigo">admin</Badge>;
      case "member":
        return <Badge color="gray">member</Badge>;
      case "owner":
        return <Badge color="pink">owner</Badge>;
      default:
        return;
    }
  };

  const badge = renderBadge(role);

  return badge;
}
