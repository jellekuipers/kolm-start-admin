import { queryOptions } from "@tanstack/react-query";

import {
  getUserById,
  getUserCount,
  listUserAccounts,
  listUserSessions,
  listUsers,
} from "@/server/user";

export const listUsersQueryOptions = () =>
  queryOptions({
    queryFn: listUsers,
    queryKey: ["users"],
  });

export const getUserCountQueryOptions = () =>
  queryOptions({
    queryFn: getUserCount,
    queryKey: ["user_count"],
  });

export const getUserByIdQueryOptions = ({ userId }: { userId: string }) =>
  queryOptions({
    queryFn: async () => await getUserById({ data: { userId } }),
    queryKey: ["users", userId],
  });

export const listUserSessionsQueryOptions = ({ userId }: { userId: string }) =>
  queryOptions({
    queryFn: async () => await listUserSessions({ data: { userId } }),
    queryKey: ["user_sessions", userId],
  });

export const listUserAccountsQueryOptions = () =>
  queryOptions({
    queryFn: listUserAccounts,
    queryKey: ["auth_user_accounts"],
  });
