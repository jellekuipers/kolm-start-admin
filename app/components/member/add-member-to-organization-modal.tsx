import { useState } from "react";
import { PlusIcon } from "@radix-ui/react-icons";

import { AddMemberForm } from "~/components/member/add-member-form";
import { CreateMemberForm } from "~/components/member/create-member-form";
import { InviteMemberForm } from "~/components/member/invite-member-form";
import { Button } from "~/components/ui/button";
import { Dialog } from "~/components/ui/dialog";
import { Heading } from "~/components/ui/heading";
import { Modal } from "~/components/ui/modal";
import { Tabs } from "~/components/ui/tabs";

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
          <Tabs.Root defaultValue="add">
            <Tabs.List>
              <Tabs.Trigger value="add">Existing user</Tabs.Trigger>
              <Tabs.Trigger value="create">Create user</Tabs.Trigger>
              <Tabs.Trigger value="invite">Invite user</Tabs.Trigger>
            </Tabs.List>
            <Tabs.Content value="add">
              <AddMemberForm
                onSuccess={() => setOpen(false)}
                organizationId={organizationId}
              />
            </Tabs.Content>
            <Tabs.Content value="create">
              <CreateMemberForm
                onSuccess={() => setOpen(false)}
                organizationId={organizationId}
              />
            </Tabs.Content>
            <Tabs.Content value="invite">
              <InviteMemberForm
                onSuccess={() => setOpen(false)}
                organizationId={organizationId}
              />
            </Tabs.Content>
          </Tabs.Root>
        </Dialog>
      </Modal>
    </>
  );
}
