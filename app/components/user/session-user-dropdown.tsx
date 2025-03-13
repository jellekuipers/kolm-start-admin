import { ExitIcon, PersonIcon, UpdateIcon } from "@radix-ui/react-icons";
import { useNavigate, useRouter } from "@tanstack/react-router";

import { Avatar } from "~/components/ui/avatar";
import { IconButton } from "~/components/ui/icon-button";
import {
  MenuButton,
  MenuHeader,
  MenuItem,
  MenuSeparator,
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
    <MenuButton
      label={
        <IconButton>
          <Avatar fallback="@" src={session?.user.image ?? undefined} />
        </IconButton>
      }
    >
      <MenuHeader>{session?.user.email}</MenuHeader>
      <MenuItem
        onAction={() =>
          navigate({
            to: "/profile",
          })
        }
      >
        <PersonIcon />
        View profile
      </MenuItem>
      {session?.session.impersonatedBy ? (
        <MenuItem onAction={stopImpersonatingHandler}>
          <UpdateIcon />
          Stop impersonating
        </MenuItem>
      ) : null}
      <MenuSeparator />
      <MenuItem onAction={signOutHandler}>
        <ExitIcon />
        Sign out
      </MenuItem>
    </MenuButton>
  );
}
