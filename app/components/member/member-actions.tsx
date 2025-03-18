import {
  DotsThreeVertical as DotsThreeVerticalIcon,
  Network as NetworkIcon,
  TrashSimple as TrashSimpleIcon,
} from "@phosphor-icons/react";
import { useMutation } from "@tanstack/react-query";
import { useNavigate, useRouter } from "@tanstack/react-router";

import { IconButton } from "~/components/ui/icon-button";
import {
  Menu,
  MenuItem,
  MenuSeparator,
  MenuTrigger,
} from "~/components/ui/menu";
import { removeMember } from "~/lib/organization";

interface MemberActionsProps {
  memberId: string;
  organizationId: string;
}

export function MemberActions({
  memberId,
  organizationId,
}: MemberActionsProps) {
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
    <MenuTrigger>
      <IconButton>
        <DotsThreeVerticalIcon size={20} />
      </IconButton>
      <Menu>
        <MenuItem
          onAction={() =>
            navigate({
              params: { organizationId },
              to: "/organizations/$organizationId",
            })
          }
        >
          <NetworkIcon size={16} />
          View organization
        </MenuItem>
        <MenuSeparator />
        <MenuItem
          isDisabled={removeMemberMutation.isPending}
          onAction={async () =>
            await removeMemberMutation.mutateAsync({
              memberIdOrEmail: memberId,
              organizationId,
            })
          }
        >
          <TrashSimpleIcon size={16} />
          Remove membership
        </MenuItem>
      </Menu>
    </MenuTrigger>
  );
}
