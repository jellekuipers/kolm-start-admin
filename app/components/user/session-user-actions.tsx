import { DotsThreeVerticalIcon, UserIcon } from '@phosphor-icons/react';
import { useNavigate } from '@tanstack/react-router';

import { IconButton } from '~/components/ui/icon-button';
import { Menu, MenuItem, MenuTrigger } from '~/components/ui/menu';

interface SessionUserActionsProps {
  userId: string;
}

export function SessionUserActions({ userId }: SessionUserActionsProps) {
  const navigate = useNavigate();

  return (
    <MenuTrigger>
      <IconButton>
        <DotsThreeVerticalIcon size={16} />
      </IconButton>
      <Menu>
        <MenuItem
          onAction={() =>
            navigate({
              params: { userId },
              to: '/users/$userId',
            })
          }
        >
          <UserIcon size={16} />
          View user
        </MenuItem>
      </Menu>
    </MenuTrigger>
  );
}
