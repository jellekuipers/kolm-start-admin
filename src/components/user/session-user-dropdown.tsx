import {
  CircleNotchIcon,
  SignOutIcon,
  UserIcon,
  UserSwitchIcon,
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

  if (isPendingSession)
    return (
      <div className="flex size-8 items-center justify-center rounded bg-indigo-50 text-indigo-700">
        <CircleNotchIcon className="animate-spin" size={16} />
      </div>
    );

  if (!session) return null;

  return (
    <MenuTrigger>
      <IconButton aria-label="Open user menu">
        <Avatar fallback="@" size={8} src={session?.user.image ?? undefined} />
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
