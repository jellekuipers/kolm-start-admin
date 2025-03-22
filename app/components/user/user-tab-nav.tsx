import { TabNav, TabNavLink } from "~/components/ui/tab-nav";

interface UserTabNavProps {
  userId: string;
}

export function UserTabNav({ userId }: UserTabNavProps) {
  return (
    <TabNav>
      <TabNavLink
        activeOptions={{ exact: true }}
        params={{ userId }}
        to="/users/$userId"
      >
        Profile
      </TabNavLink>
      <TabNavLink params={{ userId }} to="/users/$userId/organizations">
        Organizations
      </TabNavLink>
      <TabNavLink params={{ userId }} to="/users/$userId/sessions">
        Sessions
      </TabNavLink>
    </TabNav>
  );
}
