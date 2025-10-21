import type { User } from "@prisma/client";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useRouter } from "@tanstack/react-router";
import { useTranslation } from "react-i18next";

import { Select, SelectItem } from "@/components/ui/select";
import { toastQueue } from "@/components/ui/toast";
import { type UserRole, userRoleEnum } from "@/lib/enums";
import { getUserByIdQueryOptions } from "@/queries/user";
import { setUserRole } from "@/server/user";
import { logger } from "@/utils/logger";

interface UpdateUserRoleProps {
  user: User;
}

type UserRoleInput = {
  role: UserRole;
  userId: string;
};

export function UpdateUserRole({ user }: UpdateUserRoleProps) {
  const { t } = useTranslation();
  const router = useRouter();
  const queryClient = useQueryClient();

  const setUserRoleMutation = useMutation({
    mutationFn: (data: UserRoleInput) => setUserRole({ data }),
    onError: (error: unknown) => {
      logger({
        level: "error",
        message: "UpdateUserRole",
        data: error,
      });

      toastQueue.add({
        title: t("toast.user_role_update_error_title"),
        description: t("toast.user_role_update_error_description"),
        color: "red",
      });
    },
    onSuccess: async () => {
      await router.invalidate({ sync: true });
      await queryClient.refetchQueries(
        getUserByIdQueryOptions({ userId: user.id }),
      );

      toastQueue.add({
        title: t("toast.user_role_update_success_title"),
        description: t("toast.user_role_update_success_description"),
        color: "gray",
      });
    },
  });

  return (
    <Select
      aria-label={t("user.user_role")}
      className="w-48"
      isDisabled={setUserRoleMutation.isPending}
      onChange={(key) =>
        setUserRoleMutation.mutateAsync({
          role: key as UserRole,
          userId: user.id,
        })
      }
      value={user.role ?? userRoleEnum.user}
    >
      <SelectItem id={userRoleEnum.admin}>{t("role.admin")}</SelectItem>
      <SelectItem id={userRoleEnum.user}>{t("role.user")}</SelectItem>
    </Select>
  );
}
