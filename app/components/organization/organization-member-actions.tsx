import { DotsVerticalIcon, PersonIcon, TrashIcon } from "@radix-ui/react-icons";
import { useMutation } from "@tanstack/react-query";
import { useNavigate, useRouter } from "@tanstack/react-router";

import { DropdownMenu } from "~/components/ui/dropdown-menu";
import { IconButton } from "~/components/ui/icon-button";
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
    <DropdownMenu.Root>
      <DropdownMenu.Trigger>
        <IconButton>
          <DotsVerticalIcon />
        </IconButton>
      </DropdownMenu.Trigger>
      <DropdownMenu.Content align="end">
        <DropdownMenu.Item
          onClick={() =>
            navigate({
              params: { userId },
              to: "/users/$userId",
            })
          }
        >
          <PersonIcon />
          View member
        </DropdownMenu.Item>
        <DropdownMenu.Separator />
        <DropdownMenu.Item
          color="red"
          disabled={removeMemberMutation.isPending}
          onClick={async () =>
            await removeMemberMutation.mutateAsync({
              memberIdOrEmail: memberId,
              organizationId: organizationId,
            })
          }
        >
          <TrashIcon />
          Remove member
        </DropdownMenu.Item>
      </DropdownMenu.Content>
    </DropdownMenu.Root>
  );
}
