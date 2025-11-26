import {
  CircleNotchIcon,
  MoonIcon,
  SignOutIcon,
  SunIcon,
  UserIcon,
  UserSwitchIcon,
} from "@phosphor-icons/react";
import { useNavigate, useRouter } from "@tanstack/react-router";
import { useTranslation } from "react-i18next";

import { Avatar } from "@/components/ui/avatar";
import { IconButton } from "@/components/ui/icon-button";
import {
  Menu,
  MenuHeader,
  MenuItem,
  MenuSeparator,
  MenuTrigger,
} from "@/components/ui/menu";
import { useTheme } from "@/context/theme";
import { authClient, signOut, useSession } from "@/lib/auth-client";

export function SessionUserDropdown() {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const router = useRouter();
  const { theme, setTheme } = useTheme();

  const {
    data: session,
    isPending: isPendingSession,
    refetch: refetchSession,
  } = useSession();

  const stopImpersonatingHandler = async () => {
    await authClient.admin.stopImpersonating();

    refetchSession();
  };

  const setThemeHandler = () => setTheme(theme === "dark" ? "light" : "dark");

  const signOutHandler = () =>
    signOut({
      fetchOptions: {
        onSuccess: () => {
          router.invalidate();
        },
      },
    });

  if (isPendingSession)
    return (
      <div className="flex size-8 items-center justify-center rounded bg-accent text-accent-foreground">
        <CircleNotchIcon className="animate-spin" size={16} />
      </div>
    );

  if (!session) return null;

  return (
    <MenuTrigger>
      <IconButton aria-label={t("aria.open_user_menu")}>
        <Avatar
          alt={session.user.email}
          fallback="@"
          size={8}
          src={session.user.image ?? undefined}
        />
      </IconButton>
      <Menu>
        <MenuHeader>{session.user.email}</MenuHeader>
        <MenuItem
          onAction={() =>
            navigate({
              to: "/profile",
            })
          }
        >
          <UserIcon size={16} />
          {t("user.view_profile")}
        </MenuItem>
        <MenuItem onAction={setThemeHandler}>
          {theme === "dark" ? <SunIcon size={16} /> : <MoonIcon size={16} />}
          {t("user.toggle_theme")}
        </MenuItem>
        {session.session.impersonatedBy ? (
          <MenuItem onAction={stopImpersonatingHandler}>
            <UserSwitchIcon size={16} />
            {t("user.stop_impersonating")}
          </MenuItem>
        ) : null}
        <MenuSeparator />
        <MenuItem onAction={signOutHandler}>
          <SignOutIcon size={16} />
          {t("auth.sign_out")}
        </MenuItem>
      </Menu>
    </MenuTrigger>
  );
}
