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
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useNavigate, useRouter } from "@tanstack/react-router";
import type { User } from "prisma/generated/prisma/client";
import { useState } from "react";
import { useTranslation } from "react-i18next";

import { AlertDialog } from "@/components/ui/alert-dialog";
import { Button } from "@/components/ui/button";
import { IconButton } from "@/components/ui/icon-button";
import {
  Menu,
  MenuItem,
  MenuSeparator,
  MenuTrigger,
} from "@/components/ui/menu";
import { Modal } from "@/components/ui/modal";
import { toast } from "@/components/ui/toast";
import { authClient, useSession } from "@/lib/auth-client";
import { listUsersQueryOptions } from "@/queries/user";
import {
  banUser,
  removeUser,
  revokeAllUserSessions,
  unbanUser,
} from "@/server/user";
import { logger } from "@/utils/logger";

interface UserActionsProps {
  user: User;
  variant: "overview" | "profile";
}

type UserIdInput = {
  userId: string;
};

export function UserActions({ user, variant }: UserActionsProps) {
  const { t } = useTranslation();
  const [isOpen, setIsOpen] = useState(false);
  const navigate = useNavigate();
  const router = useRouter();
  const session = useSession();
  const queryClient = useQueryClient();

  const banUserMutation = useMutation({
    mutationFn: (data: UserIdInput) => banUser({ data }),
    onError: (error: unknown) => {
      logger({
        level: "error",
        message: "user_ban_error",
        data: error,
      });

      toast.error({
        title: t("message.user_ban_error_title"),
        description: t("message.user_ban_error_description"),
      });
    },
    onSuccess: async () => {
      await router.invalidate({ sync: true });
      await queryClient.refetchQueries(listUsersQueryOptions());

      toast.success({
        title: t("message.user_ban_success_title"),
        description: t("message.user_ban_success_description"),
      });
    },
  });

  const unbanUserMutation = useMutation({
    mutationFn: (data: UserIdInput) => unbanUser({ data }),
    onError: (error: unknown) => {
      logger({
        level: "error",
        message: "user_unban_error",
        data: error,
      });

      toast.error({
        title: t("message.user_unban_error_title"),
        description: t("message.user_unban_error_description"),
      });
    },
    onSuccess: async () => {
      await router.invalidate({ sync: true });
      await queryClient.refetchQueries(listUsersQueryOptions());

      toast.success({
        title: t("message.user_unban_success_title"),
        description: t("message.user_unban_success_description"),
      });
    },
  });

  const impersonateUserMutation = useMutation({
    mutationFn: (data: UserIdInput) => authClient.admin.impersonateUser(data),
    onError: (error: unknown) => {
      logger({
        level: "error",
        message: "user_impersonate_error",
        data: error,
      });

      toast.error({
        title: t("message.user_impersonate_error_title"),
        description: t("message.user_impersonate_error_description"),
      });
    },
    onSuccess: () => {
      session.refetch();

      toast.success({
        title: t("message.user_impersonate_success_title"),
        description: t("message.user_impersonate_success_description"),
      });
    },
  });

  const removeUserMutation = useMutation({
    mutationFn: (data: UserIdInput) => removeUser({ data }),
    onError: (error: unknown) => {
      logger({
        level: "error",
        message: "user_remove_error",
        data: error,
      });

      toast.error({
        title: t("message.user_remove_error_title"),
        description: t("message.user_remove_error_description"),
      });
    },
    onSuccess: async () => {
      await router.invalidate({ sync: true });
      await queryClient.refetchQueries(listUsersQueryOptions());

      toast.success({
        title: t("message.user_remove_success_title"),
        description: t("message.user_remove_success_description"),
      });
    },
  });

  const revokeAllUserSessionsMutation = useMutation({
    mutationFn: (data: UserIdInput) => revokeAllUserSessions({ data }),
    onError: (error: unknown) => {
      logger({
        level: "error",
        message: "sessions_revoke_all_error",
        data: error,
      });

      toast.error({
        title: t("message.sessions_revoke_all_error_title"),
        description: t("message.sessions_revoke_all_error_description"),
      });
    },
    onSuccess: async () => {
      await router.invalidate({ sync: true });
      await queryClient.refetchQueries(listUsersQueryOptions());

      toast.success({
        title: t("message.sessions_revoke_all_success_title"),
        description: t("message.sessions_revoke_all_success_description"),
      });
    },
  });

  const handleRemoveUser = async () => {
    await removeUserMutation.mutateAsync({ userId: user.id });

    if (variant === "profile") {
      router.navigate({
        to: "/users",
      });
    }
  };

  return (
    <>
      <Modal isDismissable isOpen={isOpen} onOpenChange={setIsOpen}>
        <AlertDialog
          onAction={handleRemoveUser}
          title={t("user.remove_user")}
          variant="destructive"
        >
          {t("common.action_confirmation")}
        </AlertDialog>
      </Modal>
      <MenuTrigger>
        {variant === "overview" ? (
          <IconButton aria-label={t("aria.open_user_actions_menu")}>
            <DotsThreeVerticalIcon size={20} />
          </IconButton>
        ) : (
          <Button variant="light">
            {t("common.actions")} <CaretDownIcon size={16} />
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
              {t("user.view_user")}
            </MenuItem>
          ) : null}
          {user.banned ? (
            <MenuItem
              isDisabled={unbanUserMutation.isPending}
              onAction={() =>
                unbanUserMutation.mutateAsync({ userId: user.id })
              }
            >
              <HandWavingIcon size={16} />
              {t("user.unban_user")}
            </MenuItem>
          ) : (
            <MenuItem
              isDisabled={banUserMutation.isPending}
              onAction={() => banUserMutation.mutateAsync({ userId: user.id })}
            >
              <HandPalmIcon size={16} />
              {t("user.ban_user")}
            </MenuItem>
          )}
          <MenuItem
            isDisabled={impersonateUserMutation.isPending || !!user.banned}
            onAction={() =>
              impersonateUserMutation.mutateAsync({ userId: user.id })
            }
          >
            <UserSwitchIcon size={16} />
            {t("user.impersonate_user")}
          </MenuItem>
          <MenuItem
            isDisabled={revokeAllUserSessionsMutation.isPending}
            onAction={() =>
              revokeAllUserSessionsMutation.mutateAsync({
                userId: user.id,
              })
            }
          >
            <DeviceMobileSlashIcon size={16} />
            {t("user.revoke_all_sessions")}
          </MenuItem>
          <MenuSeparator />
          <MenuItem
            color="destructive"
            isDisabled={removeUserMutation.isPending}
            onAction={() => setIsOpen(true)}
          >
            <TrashSimpleIcon size={16} />
            {t("user.remove_user")}
          </MenuItem>
        </Menu>
      </MenuTrigger>
    </>
  );
}
