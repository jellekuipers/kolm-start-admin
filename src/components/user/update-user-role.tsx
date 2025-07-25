import { useMutation } from "@tanstack/react-query";
import { useRouter } from "@tanstack/react-router";

import { Select, SelectItem } from "~/components/ui/select";
import { setUserRole } from "~/lib/user";
import type { User } from "~/types";

interface UpdateUserRoleProps {
  user: User;
}

export function UpdateUserRole({ user }: UpdateUserRoleProps) {
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
          role: key as string,
          userId: user.id,
        })
      }
      selectedKey={user.role ?? "user"}
    >
      <SelectItem id="admin">Admin</SelectItem>
      <SelectItem id="user">User</SelectItem>
    </Select>
  );
}
