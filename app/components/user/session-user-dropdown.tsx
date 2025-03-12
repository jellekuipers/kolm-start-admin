import { ExitIcon, PersonIcon, UpdateIcon } from "@radix-ui/react-icons";
import { useNavigate, useRouter } from "@tanstack/react-router";

import { Avatar } from "~/components/ui/avatar";
import { DropdownMenu } from "~/components/ui/dropdown-menu";
import { IconButton } from "~/components/ui/icon-button";
import { Skeleton } from "~/components/ui/skeleton";
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

  return (
    <Skeleton loading={isPendingSession || !session}>
      <DropdownMenu.Root>
        <DropdownMenu.Trigger>
          <IconButton variant="ghost">
            <Avatar
              fallback="@"
              src={session?.user.image ?? undefined}
              size="2"
            />
          </IconButton>
        </DropdownMenu.Trigger>
        <DropdownMenu.Content align="end">
          <DropdownMenu.Label>{session?.user.email}</DropdownMenu.Label>
          <DropdownMenu.Item
            onClick={() =>
              navigate({
                to: "/profile",
              })
            }
          >
            <PersonIcon />
            View profile
          </DropdownMenu.Item>
          {session?.session.impersonatedBy ? (
            <DropdownMenu.Item onClick={stopImpersonatingHandler}>
              <UpdateIcon />
              Stop impersonating
            </DropdownMenu.Item>
          ) : null}
          <DropdownMenu.Separator />
          <DropdownMenu.Item onClick={signOutHandler}>
            <ExitIcon />
            Sign out
          </DropdownMenu.Item>
        </DropdownMenu.Content>
      </DropdownMenu.Root>
    </Skeleton>
  );
}
