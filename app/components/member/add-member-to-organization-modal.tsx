import { useState } from "react";
import { PlusIcon } from "@radix-ui/react-icons";

import { AddMemberForm } from "~/components/member/add-member-form";
import { CreateMemberForm } from "~/components/member/create-member-form";
import { InviteMemberForm } from "~/components/member/invite-member-form";
import { Button } from "~/components/ui/button";
import { Dialog } from "~/components/ui/dialog";
import { Tabs } from "~/components/ui/tabs";

interface AddMemberToOrganizationModalProps {
  organizationId: string;
}

export function AddMemberToOrganizationModal({
  organizationId,
}: AddMemberToOrganizationModalProps) {
  const [open, setOpen] = useState(false);

  return (
    <Dialog.Root open={open} onOpenChange={setOpen}>
      <Dialog.Trigger>
        <Button>
          <PlusIcon /> Add member
        </Button>
      </Dialog.Trigger>
      <Dialog.Content>
        <Dialog.Title>Add member</Dialog.Title>
        <Tabs.Root defaultValue="add">
          <Tabs.List>
            <Tabs.Trigger value="add">Existing user</Tabs.Trigger>
            <Tabs.Trigger value="create">Create user</Tabs.Trigger>
            <Tabs.Trigger value="invite">Invite user</Tabs.Trigger>
          </Tabs.List>
          <div className="pt-4">
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
          </div>
        </Tabs.Root>
      </Dialog.Content>
    </Dialog.Root>
  );
}
