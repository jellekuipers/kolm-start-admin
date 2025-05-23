import { InvitationCard } from "~/components/invitation/invitation-card";
import { Dialog } from "~/components/ui/dialog";
import { Modal, ModalHeading } from "~/components/ui/modal";
import type { Invitation } from "~/types";

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
        <ModalHeading slot="title">Invitation</ModalHeading>
        <InvitationCard invitation={invitation} />
      </Dialog>
    </Modal>
  );
}
