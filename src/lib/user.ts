import { queryOptions } from "@tanstack/react-query";
import { createServerFn } from "@tanstack/react-start";
import { getWebRequest } from "@tanstack/react-start/server";
import { eq } from "drizzle-orm";
import { z } from "zod";

import { db } from "~/db";
import { user } from "~/db/schema";
import { auth } from "~/lib/auth";

export const createUser = createServerFn({ method: "POST" })
  .validator(
    z.object({
      email: z.email(),
      name: z.string(),
    }),
  )
  .handler(async ({ data }) => {
    const { headers } = getWebRequest();

    const { user } = await auth.api.createUser({
      headers,
      body: {
        email: data.email,
        name: data.name,
        password: "password",
        role: "user",
      },
    });

    return user;
  });

export const listUsers = createServerFn({ method: "GET" }).handler(async () => {
  const users = await db.query.user.findMany();

  return users;
});

export const getUserById = createServerFn({ method: "GET" })
  .validator(
    z.object({
      userId: z.string(),
    }),
  )
  .handler(async ({ data }) => {
    const userById = await db.query.user.findFirst({
      where: eq(user.id, data.userId),
    });

    return userById;
  });

export const listUserAccounts = createServerFn({ method: "GET" }).handler(
  async () => {
    const { headers } = getWebRequest();

    const accounts = await auth.api.listUserAccounts({
      headers,
    });

    return accounts;
  },
);

export const listUserSessions = createServerFn({ method: "GET" })
  .validator(
    z.object({
      userId: z.string(),
    }),
  )
  .handler(async ({ data }) => {
    const { headers } = getWebRequest();

    const { sessions } = await auth.api.listUserSessions({
      headers,
      body: {
        userId: data.userId,
      },
    });

    return sessions;
  });

export const removeUser = createServerFn({ method: "POST" })
  .validator(
    z.object({
      userId: z.string(),
    }),
  )
  .handler(async ({ data }) => {
    const { headers } = getWebRequest();

    await auth.api.removeUser({
      headers,
      body: {
        userId: data.userId,
      },
    });
  });

export const setUserRole = createServerFn({ method: "POST" })
  .validator(
    z.object({
      role: z.string(),
      userId: z.string(),
    }),
  )
  .handler(async ({ data }) => {
    const { headers } = getWebRequest();

    await auth.api.setRole({
      headers,
      body: {
        userId: data.userId,
        role: data.role as "user" | "admin" | ("user" | "admin")[],
      },
    });
  });

export const banUser = createServerFn({ method: "POST" })
  .validator(
    z.object({
      userId: z.string(),
    }),
  )
  .handler(async ({ data }) => {
    const { headers } = getWebRequest();

    await auth.api.banUser({
      headers,
      body: {
        userId: data.userId,
      },
    });
  });

export const unbanUser = createServerFn({ method: "POST" })
  .validator(
    z.object({
      userId: z.string(),
    }),
  )
  .handler(async ({ data }) => {
    const { headers } = getWebRequest();

    await auth.api.unbanUser({
      headers,
      body: {
        userId: data.userId,
      },
    });
  });

export const revokeUserSession = createServerFn({ method: "POST" })
  .validator(
    z.object({
      sessionToken: z.string(),
    }),
  )
  .handler(async ({ data }) => {
    const { headers } = getWebRequest();

    await auth.api.revokeUserSession({
      headers,
      body: {
        sessionToken: data.sessionToken,
      },
    });
  });

export const revokeAllUserSessions = createServerFn({ method: "POST" })
  .validator(
    z.object({
      userId: z.string(),
    }),
  )
  .handler(async ({ data }) => {
    const { headers } = getWebRequest();

    await auth.api.revokeUserSessions({
      headers,
      body: {
        userId: data.userId,
      },
    });
  });

export const usersQueryOptions = () =>
  queryOptions({
    queryFn: async () => await listUsers(),
    queryKey: ["users"],
  });

export const userQueryOptions = ({ userId }: { userId: string }) =>
  queryOptions({
    queryFn: async () => await getUserById({ data: { userId } }),
    queryKey: ["users", userId],
  });

export const userAccountsQueryOptions = () =>
  queryOptions({
    queryFn: async () => await listUserAccounts(),
    queryKey: ["users_accounts"],
  });

export const userSessionsQueryOptions = ({ userId }: { userId: string }) =>
  queryOptions({
    queryFn: async () => await listUserSessions({ data: { userId } }),
    queryKey: ["user_sessions", userId],
  });
