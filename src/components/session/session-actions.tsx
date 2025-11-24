import { DotsThreeVerticalIcon, TrashSimpleIcon } from "@phosphor-icons/react";
import { useMutation } from "@tanstack/react-query";
import { useRouter } from "@tanstack/react-router";
import { useTranslation } from "react-i18next";

import { IconButton } from "@/components/ui/icon-button";
import { Menu, MenuItem, MenuTrigger } from "@/components/ui/menu";
import { toastQueue } from "@/components/ui/toast";
import { revokeUserSession } from "@/server/user";
import { logger } from "@/utils/logger";

interface SessionActionsProps {
  sessionToken: string;
}

type RevokeSessionInput = {
  sessionToken: string;
};

export function SessionActions({ sessionToken }: SessionActionsProps) {
  const { t } = useTranslation();
  const router = useRouter();

  const revokeUserSessionMutation = useMutation({
    mutationFn: (data: RevokeSessionInput) => revokeUserSession({ data }),
    onError: (error: unknown) => {
      logger({
        level: "error",
        message: "session_revoke_error",
        data: error,
      });

      toastQueue.add({
        title: t("message.session_revoke_error_title"),
        description: t("message.session_revoke_error_description"),
        color: "destructive",
      });
    },
    onSuccess: async () => {
      await router.invalidate({ sync: true });

      toastQueue.add({
        title: t("message.session_revoke_success_title"),
        description: t("message.session_revoke_success_description"),
        color: "success",
      });
    },
  });

  return (
    <MenuTrigger>
      <IconButton aria-label={t("aria.open_session_actions_menu")}>
        <DotsThreeVerticalIcon size={20} />
      </IconButton>
      <Menu>
        <MenuItem
          color="red"
          isDisabled={revokeUserSessionMutation.isPending}
          onAction={() =>
            revokeUserSessionMutation.mutateAsync({
              sessionToken,
            })
          }
        >
          <TrashSimpleIcon size={16} />
          {t("session.revoke_session")}
        </MenuItem>
      </Menu>
    </MenuTrigger>
  );
}
