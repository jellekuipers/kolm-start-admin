import {
  DotsThreeVerticalIcon,
  UserIcon,
  UserSquareIcon,
} from "@phosphor-icons/react";
import { useNavigate } from "@tanstack/react-router";
import { MenuTrigger } from "react-aria-components";
import { useTranslation } from "react-i18next";

import { IconButton } from "@/components/ui/icon-button";
import { Menu, MenuItem } from "@/components/ui/menu";
import type { Session } from "@/lib/auth-client";

interface SessionUserActionsProps {
  user: Session["user"];
}

export function SessionUserActions({ user }: SessionUserActionsProps) {
  const { t } = useTranslation();
  const navigate = useNavigate();

  return (
    <MenuTrigger>
      <IconButton aria-label={t("aria.open_user_actions_menu")}>
        <DotsThreeVerticalIcon size={20} />
      </IconButton>
      <Menu>
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
        <MenuItem
          onAction={() =>
            navigate({
              to: "/profile",
            })
          }
        >
          <UserSquareIcon size={16} />
          {t("user.view_profile")}
        </MenuItem>
      </Menu>
    </MenuTrigger>
  );
}
