import { useState } from "react";
import {
  CrossCircledIcon,
  DotsVerticalIcon,
  PaperPlaneIcon,
} from "@radix-ui/react-icons";
import { DropdownMenu, IconButton } from "@radix-ui/themes";
import { useMutation } from "@tanstack/react-query";
import { useRouter } from "@tanstack/react-router";

import { InvitationModal } from "~/components/invitation/invitation-modal";
import { cancelInvitation } from "~/lib/invitation";
import { Invitation } from "~/types";

interface InvitationActionsProps {
  invitation: Invitation;
}

export function InvitationActions({ invitation }: InvitationActionsProps) {
  const [open, setOpen] = useState(false);
  const router = useRouter();

  const onMutationError = async (error: unknown) => {
    console.error(error);

    if (error instanceof Error) {
      alert(error.message);
    }
  };

  const onMutationSuccess = async () => {
    await router.invalidate();
  };

  const cancelInvitationMutation = useMutation({
    mutationFn: async ({ invitationId }: { invitationId: string }) =>
      await cancelInvitation({
        data: {
          invitationId,
        },
      }),
    onError: onMutationError,
    onSuccess: onMutationSuccess,
  });

  return (
    <>
      <InvitationModal invitation={invitation} open={open} setOpen={setOpen} />
      <DropdownMenu.Root>
        <DropdownMenu.Trigger>
          <IconButton variant="ghost">
            <DotsVerticalIcon />
          </IconButton>
        </DropdownMenu.Trigger>
        <DropdownMenu.Content align="end">
          <DropdownMenu.Item
            disabled={cancelInvitationMutation.isPending}
            onClick={() => setOpen(true)}
          >
            <PaperPlaneIcon />
            View invitation
          </DropdownMenu.Item>
          <DropdownMenu.Separator />
          <DropdownMenu.Item
            color="red"
            disabled={cancelInvitationMutation.isPending}
            onClick={async () =>
              await cancelInvitationMutation.mutateAsync({
                invitationId: invitation.id,
              })
            }
          >
            <CrossCircledIcon />
            Cancel
          </DropdownMenu.Item>
        </DropdownMenu.Content>
      </DropdownMenu.Root>
    </>
  );
}
