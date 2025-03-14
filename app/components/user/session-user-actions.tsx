import {
  DotsThreeVertical as DotsThreeVerticalIcon,
  User as UserIcon,
} from "@phosphor-icons/react";
import { useNavigate } from "@tanstack/react-router";

import { IconButton } from "~/components/ui/icon-button";
import { MenuButton, MenuItem } from "~/components/ui/menu";

interface SessionUserActionsProps {
  userId: string;
}

export function SessionUserActions({ userId }: SessionUserActionsProps) {
  const navigate = useNavigate();

  return (
    <MenuButton
      label={
        <IconButton>
          <DotsThreeVerticalIcon size={16} />
        </IconButton>
      }
    >
      <MenuItem
        onAction={() =>
          navigate({
            params: { userId },
            to: "/users/$userId",
          })
        }
      >
        <UserIcon size={16} />
        View user
      </MenuItem>
    </MenuButton>
  );
}
