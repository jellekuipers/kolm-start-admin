import { Link, useMatchRoute } from "@tanstack/react-router";
import { TabNav } from "~/components/ui/tab-nav";

interface UserTabNavProps {
  userId: string;
}

export function UserTabNav({ userId }: UserTabNavProps) {
  const matchRoute = useMatchRoute();

  return (
    <TabNav.Root>
      <TabNav.Link active={!!matchRoute({ to: "/users/$userId" })} asChild>
        <Link params={{ userId }} to="/users/$userId">
          Profile
        </Link>
      </TabNav.Link>
      <TabNav.Link
        active={!!matchRoute({ to: "/users/$userId/organizations" })}
        asChild
      >
        <Link params={{ userId }} to="/users/$userId/organizations">
          Organizations
        </Link>
      </TabNav.Link>
      <TabNav.Link
        active={!!matchRoute({ to: "/users/$userId/sessions" })}
        asChild
      >
        <Link params={{ userId }} to="/users/$userId/sessions">
          Sessions
        </Link>
      </TabNav.Link>
    </TabNav.Root>
  );
}
