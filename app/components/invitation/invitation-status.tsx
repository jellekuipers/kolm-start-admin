import { Badge } from "~/components/ui/badge";

interface InvitationStatusProps {
  status: "pending" | "accepted" | "rejected" | "canceled";
}

export function InvitationStatus({ status }: InvitationStatusProps) {
  const renderBadge = (
    status: "pending" | "accepted" | "rejected" | "canceled",
  ) => {
    switch (status) {
      case "accepted":
        return <Badge color="green">accepted</Badge>;
      case "pending":
        return <Badge>pending</Badge>;
      case "rejected":
        return <Badge color="red">rejected</Badge>;
      case "canceled":
        return <Badge color="slate">canceled</Badge>;
      default:
        return;
    }
  };

  const badge = renderBadge(status);

  return badge;
}
