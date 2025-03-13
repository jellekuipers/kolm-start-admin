import { DotsVerticalIcon, PersonIcon } from "@radix-ui/react-icons";
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
          <DotsVerticalIcon />
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
        <PersonIcon />
        View user
      </MenuItem>
    </MenuButton>
  );
}
