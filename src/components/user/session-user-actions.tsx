import { DotsThreeVerticalIcon, UserIcon } from "@phosphor-icons/react";
import { useNavigate } from "@tanstack/react-router";
import { useTranslation } from "react-i18next";

import { IconButton } from "~/components/ui/icon-button";
import { Menu, MenuItem, MenuTrigger } from "~/components/ui/menu";

interface SessionUserActionsProps {
  userId: string;
}

export function SessionUserActions({ userId }: SessionUserActionsProps) {
  const navigate = useNavigate();
  const { t } = useTranslation();

  return (
    <MenuTrigger>
      <IconButton aria-label={t("aria.open_session_user_actions_menu")}>
        <DotsThreeVerticalIcon size={16} />
      </IconButton>
      <Menu>
        <MenuItem
          onAction={() =>
            navigate({
              params: { userId },
              to: "/users/$userId",
            })
          }
        >
          <UserIcon size={16} />
          {t("user.view_user")}
        </MenuItem>
      </Menu>
    </MenuTrigger>
  );
}
