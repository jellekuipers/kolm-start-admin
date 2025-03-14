import { InvitationCard } from "~/components/invitation/invitation-card";
import { Dialog } from "~/components/ui/dialog";
import { Heading } from "~/components/ui/heading";
import { Modal } from "~/components/ui/modal";
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
    <Modal isDismissable isOpen={open} onOpenChange={setOpen}>
      <Dialog>
        <Heading slot="title">Invitation</Heading>
        <InvitationCard invitation={invitation} />
      </Dialog>
    </Modal>
  );
}
