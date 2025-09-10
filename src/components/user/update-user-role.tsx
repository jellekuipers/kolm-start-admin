import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useRouter } from "@tanstack/react-router";

import { Select, SelectItem } from "~/components/ui/select";
import { getUserByIdQueryOptions } from "~/queries/user";
import { setUserRole } from "~/server/user";
import type { User } from "~/types";
import { type UserRole, userRoleEnum } from "~/types/enums";

interface UpdateUserRoleProps {
  user: User;
}

export function UpdateUserRole({ user }: UpdateUserRoleProps) {
  const router = useRouter();
  const queryClient = useQueryClient();

  const onMutationError = async (error: unknown) => {
    console.error(error);

    if (error instanceof Error) {
      alert(error.message);
    }
  };

  const onMutationSuccess = async () => {
    await router.invalidate({ sync: true });
    await queryClient.refetchQueries(
      getUserByIdQueryOptions({ userId: user.id }),
    );
  };

  const setUserRoleMutation = useMutation({
    mutationFn: async ({ role, userId }: { role: string; userId: string }) =>
      await setUserRole({ data: { role, userId } }),
    onError: onMutationError,
    onSuccess: onMutationSuccess,
  });

  return (
    <Select
      aria-label="User role"
      className="w-48"
      isDisabled={setUserRoleMutation.isPending}
      onSelectionChange={async (key) =>
        await setUserRoleMutation.mutateAsync({
          role: key as UserRole,
          userId: user.id,
        })
      }
      selectedKey={user.role ?? userRoleEnum.user}
    >
      <SelectItem id={userRoleEnum.admin}>Admin</SelectItem>
      <SelectItem id={userRoleEnum.user}>User</SelectItem>
    </Select>
  );
}
