import { DotsVerticalIcon, TrashIcon } from "@radix-ui/react-icons";
import { useMutation } from "@tanstack/react-query";
import { useRouter } from "@tanstack/react-router";

import { IconButton } from "~/components/ui/icon-button";
import { MenuButton, MenuItem } from "~/components/ui/menu";
import { revokeUserSession } from "~/lib/user";

interface SessionActionsProps {
  sessionToken: string;
}

export function SessionActions({ sessionToken }: SessionActionsProps) {
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

  const revokeUserSessionMutation = useMutation({
    mutationFn: async ({ sessionToken }: { sessionToken: string }) =>
      await revokeUserSession({ data: { sessionToken } }),
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
        isDisabled={revokeUserSessionMutation.isPending}
        onAction={async () =>
          await revokeUserSessionMutation.mutateAsync({
            sessionToken,
          })
        }
      >
        <TrashIcon />
        Revoke session
      </MenuItem>
    </MenuButton>
  );
}
