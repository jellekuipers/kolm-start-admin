import type { User } from "@prisma/client";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useRouter } from "@tanstack/react-router";
import { useTranslation } from "react-i18next";

import { Select, SelectItem } from "@/components/ui/select";
import { type UserRole, userRoleEnum } from "@/lib/enums";
import { getUserByIdQueryOptions } from "@/queries/user";
import { setUserRole } from "@/server/user";

interface UpdateUserRoleProps {
  user: User;
}

type UserRoleInput = {
  role: string;
  userId: string;
};

export function UpdateUserRole({ user }: UpdateUserRoleProps) {
  const { t } = useTranslation();
  const router = useRouter();
  const queryClient = useQueryClient();

  const onMutationError = async (error: unknown) => {
    console.error(error);
  };

  const onMutationSuccess = async () => {
    await router.invalidate({ sync: true });
    await queryClient.refetchQueries(
      getUserByIdQueryOptions({ userId: user.id }),
    );
  };

  const setUserRoleMutation = useMutation({
    mutationFn: (data: UserRoleInput) => setUserRole({ data }),
    onError: onMutationError,
    onSuccess: onMutationSuccess,
  });

  return (
    <Select
      aria-label={t("user.user_role")}
      className="w-48"
      isDisabled={setUserRoleMutation.isPending}
      onSelectionChange={(key) =>
        setUserRoleMutation.mutateAsync({
          role: key as UserRole,
          userId: user.id,
        })
      }
      selectedKey={user.role ?? userRoleEnum.user}
    >
      <SelectItem id={userRoleEnum.admin}>{t("role.admin")}</SelectItem>
      <SelectItem id={userRoleEnum.user}>{t("role.user")}</SelectItem>
    </Select>
  );
}
