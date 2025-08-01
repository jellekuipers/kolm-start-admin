import {
  CaretDownIcon,
  DeviceMobileSlashIcon,
  DotsThreeVerticalIcon,
  HandPalmIcon,
  HandWavingIcon,
  TrashSimpleIcon,
  UserIcon,
  UserSwitchIcon,
} from "@phosphor-icons/react";
import { useMutation } from "@tanstack/react-query";
import { useNavigate, useRouter } from "@tanstack/react-router";
import { MenuTrigger } from "react-aria-components";

import { Button } from "~/components/ui/button";
import { IconButton } from "~/components/ui/icon-button";
import { Menu, MenuItem, MenuSeparator } from "~/components/ui/menu";
import { authClient, useSession } from "~/lib/auth-client";
import {
  banUser,
  removeUser,
  revokeAllUserSessions,
  unbanUser,
} from "~/lib/user";
import type { User } from "~/types";

interface UserActionsProps {
  user: User;
  variant: "overview" | "profile";
}

export function UserActions({ user, variant }: UserActionsProps) {
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
  };

  const banUserMutation = useMutation({
    mutationFn: async ({ userId }: { userId: string }) =>
      await banUser({ data: { userId } }),
    onError: onMutationError,
    onSuccess: onMutationSuccess,
  });

  const unbanUserMutation = useMutation({
    mutationFn: async ({ userId }: { userId: string }) =>
      await unbanUser({ data: { userId } }),
    onError: onMutationError,
    onSuccess: onMutationSuccess,
  });

  const impersonateUserMutation = useMutation({
    mutationFn: async ({ userId }: { userId: string }) =>
      await authClient.admin.impersonateUser({ userId }),
    onError: onMutationError,
    onSuccess: () => session.refetch(),
  });

  const removeUserMutation = useMutation({
    mutationFn: async ({ userId }: { userId: string }) =>
      await removeUser({ data: { userId } }),
    onError: onMutationError,
    onSuccess: onMutationSuccess,
  });

  const revokeAllUserSessionsMutation = useMutation({
    mutationFn: async ({ userId }: { userId: string }) =>
      await revokeAllUserSessions({ data: { userId } }),
    onError: onMutationError,
    onSuccess: onMutationSuccess,
  });

  return (
    <MenuTrigger>
      {variant === "overview" ? (
        <IconButton>
          <DotsThreeVerticalIcon size={20} />
        </IconButton>
      ) : (
        <Button color="indigo" variant="light">
          Actions <CaretDownIcon size={16} />
        </Button>
      )}
      <Menu>
        {variant === "overview" ? (
          <MenuItem
            onAction={() =>
              navigate({
                params: { userId: user.id },
                to: "/users/$userId",
              })
            }
          >
            <UserIcon size={16} />
            View user
          </MenuItem>
        ) : null}
        {user.banned ? (
          <MenuItem
            isDisabled={unbanUserMutation.isPending}
            onAction={async () =>
              await unbanUserMutation.mutateAsync({ userId: user.id })
            }
          >
            <HandWavingIcon size={16} />
            Unban user
          </MenuItem>
        ) : (
          <MenuItem
            isDisabled={banUserMutation.isPending}
            onAction={async () =>
              await banUserMutation.mutateAsync({ userId: user.id })
            }
          >
            <HandPalmIcon size={16} />
            Ban user
          </MenuItem>
        )}
        <MenuItem
          isDisabled={impersonateUserMutation.isPending || !!user.banned}
          onAction={async () =>
            await impersonateUserMutation.mutateAsync({ userId: user.id })
          }
        >
          <UserSwitchIcon size={16} />
          Impersonate user
        </MenuItem>
        <MenuItem
          isDisabled={revokeAllUserSessionsMutation.isPending}
          onAction={async () =>
            await revokeAllUserSessionsMutation.mutateAsync({ userId: user.id })
          }
        >
          <DeviceMobileSlashIcon size={16} />
          Revoke all sessions
        </MenuItem>
        <MenuSeparator />
        <MenuItem
          color="red"
          isDisabled={removeUserMutation.isPending}
          onAction={async () =>
            await removeUserMutation.mutateAsync({ userId: user.id })
          }
        >
          <TrashSimpleIcon size={16} />
          Remove user
        </MenuItem>
      </Menu>
    </MenuTrigger>
  );
}
