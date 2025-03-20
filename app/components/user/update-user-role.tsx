import { useMutation } from "@tanstack/react-query";
import { useRouter } from "@tanstack/react-router";

import { Select, SelectItem } from "~/components/ui/select";
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
    <Select
      isDisabled={setUserRoleMutation.isPending}
      onSelectionChange={async (key) =>
        await setUserRoleMutation.mutateAsync({
          role: key as string,
          userId: user.id,
        })
      }
      selectedKey={user.role ?? "user"}
      variant="unstyled"
    >
      <SelectItem id="admin">
        <UserRole role="admin" />
      </SelectItem>
      <SelectItem id="user">
        <UserRole role="user" />
      </SelectItem>
    </Select>
  );
}
