import { useState } from "react";
import {
  DotsThreeVertical as DotsThreeVerticalIcon,
  PaperPlaneRight as PaperPlaneRightIcon,
  X as XIcon,
} from "@phosphor-icons/react";
import { useMutation } from "@tanstack/react-query";
import { useRouter } from "@tanstack/react-router";

import { InvitationModal } from "~/components/invitation/invitation-modal";
import { IconButton } from "~/components/ui/icon-button";
import {
  Menu,
  MenuItem,
  MenuSeparator,
  MenuTrigger,
} from "~/components/ui/menu";
import { cancelInvitation } from "~/lib/invitation";
import type { Invitation } from "~/types";

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
      <MenuTrigger>
        <IconButton>
          <DotsThreeVerticalIcon size={20} />
        </IconButton>
        <Menu>
          <MenuItem
            isDisabled={cancelInvitationMutation.isPending}
            onAction={() => setOpen(true)}
          >
            <PaperPlaneRightIcon size={16} />
            View invitation
          </MenuItem>
          <MenuSeparator />
          <MenuItem
            color="red"
            isDisabled={cancelInvitationMutation.isPending}
            onAction={async () =>
              await cancelInvitationMutation.mutateAsync({
                invitationId: invitation.id,
              })
            }
          >
            <XIcon size={16} />
            Cancel invitation
          </MenuItem>
        </Menu>
      </MenuTrigger>
    </>
  );
}
