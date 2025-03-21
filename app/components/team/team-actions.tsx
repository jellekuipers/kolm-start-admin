import { useState } from "react";
import {
  DotsThreeVertical as DotsThreeVerticalIcon,
  PencilSimple as PencilSimpleIcon,
  TrashSimple as TrashSimpleIcon,
} from "@phosphor-icons/react";
import { useMutation } from "@tanstack/react-query";
import { useRouter } from "@tanstack/react-router";

import { UpdateTeamModal } from "~/components/team/update-team-modal";
import { IconButton } from "~/components/ui/icon-button";
import {
  Menu,
  MenuItem,
  MenuSeparator,
  MenuTrigger,
} from "~/components/ui/menu";
import { removeTeam } from "~/lib/team";
import { Team } from "~/types";

interface TeamActionsProps {
  team: Team;
}

export function TeamActions({ team }: TeamActionsProps) {
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

  const removeTeamMutation = useMutation({
    mutationFn: async ({
      organizationId,
      teamId,
    }: {
      organizationId: string;
      teamId: string;
    }) =>
      await removeTeam({
        data: {
          organizationId,
          teamId,
        },
      }),
    onError: onMutationError,
    onSuccess: onMutationSuccess,
  });

  return (
    <>
      <UpdateTeamModal open={open} setOpen={setOpen} team={team} />
      <MenuTrigger>
        <IconButton>
          <DotsThreeVerticalIcon size={20} />
        </IconButton>
        <Menu>
          <MenuItem onAction={() => setOpen(true)}>
            <PencilSimpleIcon size={16} />
            Update team
          </MenuItem>
          <MenuSeparator />
          <MenuItem
            color="red"
            isDisabled={removeTeamMutation.isPending}
            onAction={async () =>
              await removeTeamMutation.mutateAsync({
                organizationId: team.organizationId,
                teamId: team.id,
              })
            }
          >
            <TrashSimpleIcon size={16} />
            Remove team
          </MenuItem>
        </Menu>
      </MenuTrigger>
    </>
  );
}
