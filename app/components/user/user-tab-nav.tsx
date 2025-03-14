import { Link } from "@tanstack/react-router";

interface UserTabNavProps {
  userId: string;
}

export function UserTabNav({ userId }: UserTabNavProps) {
  return (
    <div className="flex gap-2">
      <Link
        activeOptions={{ exact: true }}
        activeProps={{ className: "font-bold" }}
        params={{ userId }}
        to="/users/$userId"
      >
        Profile
      </Link>
      <Link
        activeProps={{ className: "font-bold" }}
        params={{ userId }}
        to="/users/$userId/organizations"
      >
        Organizations
      </Link>
      <Link
        activeProps={{ className: "font-bold" }}
        params={{ userId }}
        to="/users/$userId/sessions"
      >
        Sessions
      </Link>
    </div>
  );
}
