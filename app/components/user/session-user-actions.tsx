import { DotsVerticalIcon, PersonIcon } from "@radix-ui/react-icons";
import { useNavigate } from "@tanstack/react-router";

import { DropdownMenu } from "~/components/ui/dropdown-menu";
import { IconButton } from "~/components/ui/icon-button";

interface SessionUserActionsProps {
  userId: string;
}

export function SessionUserActions({ userId }: SessionUserActionsProps) {
  const navigate = useNavigate();

  return (
    <DropdownMenu.Root>
      <DropdownMenu.Trigger>
        <IconButton variant="ghost">
          <DotsVerticalIcon />
        </IconButton>
      </DropdownMenu.Trigger>
      <DropdownMenu.Content align="end">
        <DropdownMenu.Item
          onClick={() =>
            navigate({
              params: { userId },
              to: "/users/$userId",
            })
          }
        >
          <PersonIcon />
          View user
        </DropdownMenu.Item>
      </DropdownMenu.Content>
    </DropdownMenu.Root>
  );
}
