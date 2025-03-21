import { twMerge } from "tailwind-merge";

import { Link } from "~/components/ui/link";

interface UserTabNavProps {
  userId: string;
}

export function UserTabNav({ userId }: UserTabNavProps) {
  return (
    <div className="flex border-b border-slate-200">
      <Link
        activeOptions={{ exact: true }}
        className={twMerge(
          "group -mb-px flex cursor-default items-center gap-2 border-b-2 border-transparent px-3 pb-1.5 font-medium text-slate-800 hover:no-underline",
          "data-[status=active]:border-indigo-500",
        )}
        params={{ userId }}
        to="/users/$userId"
      >
        <span
          className={twMerge("rounded px-3 py-1", "group-hover:bg-slate-100")}
        >
          Profile
        </span>
      </Link>
      <Link
        className={twMerge(
          "group -mb-px flex cursor-default items-center gap-2 border-b-2 border-transparent px-3 pb-1.5 font-medium text-slate-800 hover:no-underline",
          "data-[status=active]:border-indigo-500",
        )}
        params={{ userId }}
        to="/users/$userId/organizations"
      >
        <span
          className={twMerge("rounded px-3 py-1", "group-hover:bg-slate-100")}
        >
          Organizations
        </span>
      </Link>
      <Link
        className={twMerge(
          "group -mb-px flex cursor-default items-center gap-2 border-b-2 border-transparent px-3 pb-1.5 font-medium text-slate-800 hover:no-underline",
          "data-[status=active]:border-indigo-500",
        )}
        params={{ userId }}
        to="/users/$userId/sessions"
      >
        <span
          className={twMerge("rounded px-3 py-1", "group-hover:bg-slate-100")}
        >
          Sessions
        </span>
      </Link>
    </div>
  );
}
