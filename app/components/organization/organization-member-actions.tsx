import { DotsVerticalIcon, PersonIcon, TrashIcon } from "@radix-ui/react-icons";
import { useMutation } from "@tanstack/react-query";
import { useNavigate, useRouter } from "@tanstack/react-router";

import { IconButton } from "~/components/ui/icon-button";
import { MenuButton, MenuItem, MenuSeparator } from "~/components/ui/menu";
import { removeMember } from "~/lib/organization";

interface OrganizationMemberActionsProps {
  memberId: string;
  organizationId: string;
  userId: string;
}

export function OrganizationMemberActions({
  memberId,
  organizationId,
  userId,
}: OrganizationMemberActionsProps) {
  const navigate = useNavigate();
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

  const removeMemberMutation = useMutation({
    mutationFn: async ({
      memberIdOrEmail,
      organizationId,
    }: {
      memberIdOrEmail: string;
      organizationId: string;
    }) =>
      await removeMember({
        data: {
          memberIdOrEmail,
          organizationId,
        },
      }),
    onError: onMutationError,
    onSuccess: onMutationSuccess,
  });

  return (
    <MenuButton
      label={
        <IconButton>
          <DotsVerticalIcon />
        </IconButton>
      }
    >
      <MenuItem
        onAction={() =>
          navigate({
            params: { userId },
            to: "/users/$userId",
          })
        }
      >
        <PersonIcon />
        View member
      </MenuItem>
      <MenuSeparator />
      <MenuItem
        isDisabled={removeMemberMutation.isPending}
        onAction={async () =>
          await removeMemberMutation.mutateAsync({
            memberIdOrEmail: memberId,
            organizationId: organizationId,
          })
        }
      >
        <TrashIcon />
        Remove member
      </MenuItem>
    </MenuButton>
  );
}
