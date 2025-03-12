import {
  ChevronDownIcon,
  CircleBackslashIcon,
  CircleIcon,
  CrossCircledIcon,
  DotsVerticalIcon,
  PersonIcon,
  TrashIcon,
  UpdateIcon,
} from "@radix-ui/react-icons";
import { useMutation } from "@tanstack/react-query";
import { useNavigate, useRouter } from "@tanstack/react-router";
import { UserWithRole } from "better-auth/plugins";

import { Button } from "~/components/ui/button";
import { DropdownMenu } from "~/components/ui/dropdown-menu";
import { IconButton } from "~/components/ui/icon-button";
import { authClient, useSession } from "~/lib/auth-client";
import {
  banUser,
  removeUser,
  revokeAllUserSessions,
  unbanUser,
} from "~/lib/user";
import { User } from "~/types";

interface UserActionsProps {
  user: User | UserWithRole;
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
    <DropdownMenu.Root>
      <DropdownMenu.Trigger>
        {variant === "overview" ? (
          <IconButton>
            <DotsVerticalIcon />
          </IconButton>
        ) : (
          <Button>
            Actions <ChevronDownIcon />
          </Button>
        )}
      </DropdownMenu.Trigger>
      <DropdownMenu.Content align="end">
        {variant === "overview" ? (
          <DropdownMenu.Item
            onClick={() =>
              navigate({
                params: { userId: user.id },
                to: "/users/$userId",
              })
            }
          >
            <PersonIcon />
            View user
          </DropdownMenu.Item>
        ) : null}
        {variant === "overview" ? <DropdownMenu.Separator /> : null}
        {user.banned ? (
          <DropdownMenu.Item
            disabled={unbanUserMutation.isPending}
            onClick={async () =>
              await unbanUserMutation.mutateAsync({ userId: user.id })
            }
          >
            <CircleIcon />
            Unban user
          </DropdownMenu.Item>
        ) : (
          <DropdownMenu.Item
            disabled={banUserMutation.isPending}
            onClick={async () =>
              await banUserMutation.mutateAsync({ userId: user.id })
            }
          >
            <CrossCircledIcon />
            Ban user
          </DropdownMenu.Item>
        )}
        <DropdownMenu.Item
          disabled={impersonateUserMutation.isPending || !!user.banned}
          onClick={async () =>
            await impersonateUserMutation.mutateAsync({ userId: user.id })
          }
        >
          <UpdateIcon />
          Impersonate user
        </DropdownMenu.Item>
        <DropdownMenu.Item
          disabled={revokeAllUserSessionsMutation.isPending}
          onClick={async () =>
            await revokeAllUserSessionsMutation.mutateAsync({ userId: user.id })
          }
        >
          <CircleBackslashIcon />
          Revoke all sessions
        </DropdownMenu.Item>
        <DropdownMenu.Separator />
        <DropdownMenu.Item
          disabled={removeUserMutation.isPending}
          color="red"
          onClick={async () =>
            await removeUserMutation.mutateAsync({ userId: user.id })
          }
        >
          <TrashIcon />
          Remove user
        </DropdownMenu.Item>
      </DropdownMenu.Content>
    </DropdownMenu.Root>
  );
}
