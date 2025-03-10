import { Select } from "@radix-ui/themes";
import { useMutation } from "@tanstack/react-query";
import { useRouter } from "@tanstack/react-router";

import { UserRole } from "~/components/user/user-role";
import { setUserRole } from "~/lib/user";
import { User } from "~/types";

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
    <Select.Root
      defaultValue={user.role ?? "user"}
      disabled={setUserRoleMutation.isPending}
      onValueChange={async (role) =>
        await setUserRoleMutation.mutateAsync({ role, userId: user.id })
      }
    >
      <Select.Trigger variant="ghost">
        <UserRole role={user.role} />
      </Select.Trigger>
      <Select.Content>
        <Select.Item value="admin">Admin</Select.Item>
        <Select.Item value="user">User</Select.Item>
      </Select.Content>
    </Select.Root>
  );
}
