import {
  SignOut as SignOutIcon,
  User as UserIcon,
  UserSwitch as UserSwitchIcon,
} from "@phosphor-icons/react";
import { useNavigate, useRouter } from "@tanstack/react-router";

import { Avatar } from "~/components/ui/avatar";
import { IconButton } from "~/components/ui/icon-button";
import {
  Menu,
  MenuHeader,
  MenuItem,
  MenuSeparator,
  MenuTrigger,
} from "~/components/ui/menu";
import { authClient, signOut, useSession } from "~/lib/auth-client";

export function SessionUserDropdown() {
  const navigate = useNavigate();
  const router = useRouter();
  const {
    data: session,
    isPending: isPendingSession,
    refetch: refetchSession,
  } = useSession();

  const stopImpersonatingHandler = async () => {
    await authClient.admin.stopImpersonating();

    refetchSession();
  };

  const signOutHandler = async () =>
    await signOut({
      fetchOptions: {
        onSuccess: () => {
          router.invalidate();
        },
      },
    });

  if (isPendingSession || !session) return null;

  return (
    <MenuTrigger>
      <IconButton>
        <Avatar fallback="@" size="10" src={session?.user.image ?? undefined} />
      </IconButton>
      <Menu>
        <MenuHeader>{session?.user.email}</MenuHeader>
        <MenuItem
          onAction={() =>
            navigate({
              to: "/profile",
            })
          }
        >
          <UserIcon size={16} />
          View profile
        </MenuItem>
        {session?.session.impersonatedBy ? (
          <MenuItem onAction={stopImpersonatingHandler}>
            <UserSwitchIcon size={16} />
            Stop impersonating
          </MenuItem>
        ) : null}
        <MenuSeparator />
        <MenuItem onAction={signOutHandler}>
          <SignOutIcon size={16} />
          Sign out
        </MenuItem>
      </Menu>
    </MenuTrigger>
  );
}
