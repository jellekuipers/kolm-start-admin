import {
  ArrowRight as ArrowRightIcon,
  DotsThreeVertical as DotsThreeVerticalIcon,
  Network as NetworkIcon,
  PushPin as PushPinIcon,
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
import { authClient, useSession } from "~/lib/auth-client";

interface OrganizationActionsProps {
  organizationId: string;
}

export function SessionUserOrganizationActions({
  organizationId,
}: OrganizationActionsProps) {
  const navigate = useNavigate();
  const router = useRouter();
  const session = useSession();

  const onMutationError = async (error: unknown) => {
    console.error(error);

    if (error instanceof Error) {
      alert(error.message);
    }
  };

  const onMutationSuccess = async () => {
    await router.invalidate();

    session.refetch();
  };

  const setActiveOrganizationMutation = useMutation({
    mutationFn: async ({ organizationId }: { organizationId: string }) =>
      await authClient.organization.setActive({
        organizationId,
      }),
    onError: onMutationError,
    onSuccess: onMutationSuccess,
  });

  const leaveOrganizationMutation = useMutation({
    mutationFn: async ({ organizationId }: { organizationId: string }) =>
      await authClient.organization.leave({
        organizationId,
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
        <MenuItem
          onAction={async () =>
            await setActiveOrganizationMutation.mutateAsync({
              organizationId,
            })
          }
        >
          <PushPinIcon size={16} />
          Set active organization
        </MenuItem>
        <MenuSeparator />
        <MenuItem
          color="red"
          isDisabled={leaveOrganizationMutation.isPending}
          onAction={async () =>
            await leaveOrganizationMutation.mutateAsync({
              organizationId,
            })
          }
        >
          <ArrowRightIcon size={16} />
          Leave organization
        </MenuItem>
      </Menu>
    </MenuTrigger>
  );
}
