import { useState } from "react";
import { Plus as PlusIcon } from "@phosphor-icons/react";

import { AddMemberForm } from "~/components/member/add-member-form";
import { CreateMemberForm } from "~/components/member/create-member-form";
import { InviteMemberForm } from "~/components/member/invite-member-form";
import { Button } from "~/components/ui/button";
import { Dialog } from "~/components/ui/dialog";
import { Modal, ModalHeading } from "~/components/ui/modal";
import { Tab, TabList, TabPanel, Tabs } from "~/components/ui/tabs";

interface AddMemberToOrganizationModalProps {
  organizationId: string;
}

export function AddMemberToOrganizationModal({
  organizationId,
}: AddMemberToOrganizationModalProps) {
  const [open, setOpen] = useState(false);

  return (
    <>
      <Button onPress={() => setOpen(true)}>
        <PlusIcon size={16} />
        Add member
      </Button>
      <Modal isDismissable isOpen={open} onOpenChange={setOpen}>
        <Dialog>
          <ModalHeading slot="title">Add member</ModalHeading>
          <Tabs>
            <TabList>
              <Tab id="add">Existing user</Tab>
              <Tab id="create">Create user</Tab>
              <Tab id="invite">Invite user</Tab>
            </TabList>
            <TabPanel id="add">
              <AddMemberForm
                onSuccess={() => setOpen(false)}
                organizationId={organizationId}
              />
            </TabPanel>
            <TabPanel id="create">
              <CreateMemberForm
                onSuccess={() => setOpen(false)}
                organizationId={organizationId}
              />
            </TabPanel>
            <TabPanel id="invite">
              <InviteMemberForm
                onSuccess={() => setOpen(false)}
                organizationId={organizationId}
              />
            </TabPanel>
          </Tabs>
        </Dialog>
      </Modal>
    </>
  );
}
