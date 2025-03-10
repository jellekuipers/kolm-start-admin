import { Dialog } from "@radix-ui/themes";

import { InvitationCard } from "~/components/invitation/invitation-card";
import { Invitation } from "~/types";

interface InvitationModalProps {
  invitation: Invitation;
  open: boolean;
  setOpen: (open: boolean) => void;
}

export function InvitationModal({
  invitation,
  open,
  setOpen,
}: InvitationModalProps) {
  return (
    <Dialog.Root open={open} onOpenChange={setOpen}>
      <Dialog.Content>
        <Dialog.Title>Invitation</Dialog.Title>
        <InvitationCard invitation={invitation} />
      </Dialog.Content>
    </Dialog.Root>
  );
}
