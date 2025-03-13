import {
  ArrowRightIcon,
  CardStackIcon,
  DotsVerticalIcon,
  DrawingPinIcon,
} from "@radix-ui/react-icons";
import { useMutation } from "@tanstack/react-query";
import { useNavigate, useRouter } from "@tanstack/react-router";

import { IconButton } from "~/components/ui/icon-button";
import { MenuButton, MenuItem, MenuSeparator } from "~/components/ui/menu";
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
            params: { organizationId },
            to: "/organizations/$organizationId",
          })
        }
      >
        <CardStackIcon />
        View organization
      </MenuItem>
      <MenuItem
        onAction={async () =>
          await setActiveOrganizationMutation.mutateAsync({
            organizationId,
          })
        }
      >
        <DrawingPinIcon />
        Set active organization
      </MenuItem>
      <MenuSeparator />
      <MenuItem
        isDisabled={leaveOrganizationMutation.isPending}
        onAction={async () =>
          await leaveOrganizationMutation.mutateAsync({
            organizationId,
          })
        }
      >
        <ArrowRightIcon />
        Leave organization
      </MenuItem>
    </MenuButton>
  );
}
