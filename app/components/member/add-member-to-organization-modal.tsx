import { useState } from "react";
import { PlusIcon } from "@radix-ui/react-icons";

import { AddMemberForm } from "~/components/member/add-member-form";
import { CreateMemberForm } from "~/components/member/create-member-form";
import { InviteMemberForm } from "~/components/member/invite-member-form";
import { Button } from "~/components/ui/button";
import { Dialog } from "~/components/ui/dialog";
import { Heading } from "~/components/ui/heading";
import { Modal } from "~/components/ui/modal";
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
        <PlusIcon />
        Add member
      </Button>
      <Modal isDismissable isOpen={open} onOpenChange={setOpen}>
        <Dialog>
          <Heading slot="title">Add member</Heading>
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
