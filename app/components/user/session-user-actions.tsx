import { DotsVerticalIcon, PersonIcon } from "@radix-ui/react-icons";
import { DropdownMenu, IconButton } from "@radix-ui/themes";
import { useNavigate } from "@tanstack/react-router";

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
