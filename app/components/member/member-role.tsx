import { Badge } from "~/components/ui/badge";

interface MemberRoleProps {
  role: string;
}

export function MemberRole({ role }: MemberRoleProps) {
  const renderBadge = (role: string) => {
    switch (role) {
      case "admin":
        return <Badge>admin</Badge>;
      case "member":
        return <Badge>member</Badge>;
      case "owner":
        return <Badge>owner</Badge>;
      default:
        return;
    }
  };

  const badge = renderBadge(role);

  return badge;
}
