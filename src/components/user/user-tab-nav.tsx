import { useTranslation } from "react-i18next";

import { TabNav, TabNavLink } from "@/components/ui/tab-nav";

interface UserTabNavProps {
  userId: string;
}

export function UserTabNav({ userId }: UserTabNavProps) {
  const { t } = useTranslation();

  return (
    <TabNav>
      <TabNavLink
        activeOptions={{ exact: true }}
        params={{ userId }}
        to="/users/$userId"
      >
        {t("navigation.profile")}
      </TabNavLink>
      <TabNavLink params={{ userId }} to="/users/$userId/sessions">
        {t("navigation.sessions")}
      </TabNavLink>
    </TabNav>
  );
}
