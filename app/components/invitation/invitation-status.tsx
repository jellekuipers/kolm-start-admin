import { Badge } from "@radix-ui/themes";

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
        return <Badge color="blue">pending</Badge>;
      case "rejected":
        return <Badge color="red">rejected</Badge>;
      case "canceled":
        return <Badge color="gray">canceled</Badge>;
      default:
        return;
    }
  };

  const badge = renderBadge(status);

  return badge;
}
