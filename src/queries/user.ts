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

export const getUserByIdQueryOptions = (data: { userId: string }) =>
  queryOptions({
    queryFn: () => getUserById({ data }),
    queryKey: ["users", data.userId],
  });

export const listUserSessionsQueryOptions = (data: { userId: string }) =>
  queryOptions({
    queryFn: () => listUserSessions({ data }),
    queryKey: ["user_sessions", data.userId],
  });

export const listUserAccountsQueryOptions = () =>
  queryOptions({
    queryFn: listUserAccounts,
    queryKey: ["auth_user_accounts"],
  });
