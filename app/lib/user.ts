import { queryOptions } from "@tanstack/react-query";
import { createServerFn } from "@tanstack/react-start";
import { getWebRequest, setResponseStatus } from "@tanstack/react-start/server";
import { eq } from "drizzle-orm";
import { z } from "zod";

import { user } from "~/db/schema";
import { auth } from "~/lib/auth";
import { db } from "~/db";
import type { MemberRole } from "~/types";

export const createUser = createServerFn({ method: "POST" })
  .validator(
    z.object({
      email: z.string().email(),
      name: z.string(),
      organizationId: z
        .string()
        .transform((value) => (value === "" ? null : value)),
      memberRole: z.string(),
    }),
  )
  .handler(async ({ data }) => {
    const { headers } = getWebRequest()!;

    const { user } = await auth.api.createUser({
      headers,
      body: {
        email: data.email,
        name: data.name,
        password: "password",
        role: "user",
      },
    });

    if (data.organizationId) {
      await auth.api.addMember({
        headers,
        body: {
          userId: user.id,
          organizationId: data.organizationId,
          role: data.memberRole as MemberRole,
        },
      });
    }

    return user;
  });

export const listUsers = createServerFn({ method: "GET" }).handler(async () => {
  const { headers } = getWebRequest()!;

  const { users } = await auth.api.listUsers({
    headers,
    query: {
      limit: -1,
      sortBy: "createdAt",
      sortDirection: "desc",
    },
  });

  return users;
});

export const getUserById = createServerFn({ method: "GET" })
  .validator(
    z.object({
      userId: z.string(),
    }),
  )
  .handler(async ({ data }) => {
    const { headers } = getWebRequest()!;

    const session = await auth.api.getSession({
      headers,
      query: {
        disableCookieCache: true,
      },
    });

    if (!session) {
      setResponseStatus(401);
      throw new Error("Unauthorized");
    }

    return await db.query.user.findFirst({
      where: eq(user.id, data.userId),
    });
  });

export const listUserAccounts = createServerFn({ method: "GET" }).handler(
  async () => {
    const { headers } = getWebRequest()!;

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
    const { headers } = getWebRequest()!;

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
    const { headers } = getWebRequest()!;

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
    const { headers } = getWebRequest()!;

    await auth.api.setRole({
      headers,
      body: {
        userId: data.userId,
        role: data.role,
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
    const { headers } = getWebRequest()!;

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
    const { headers } = getWebRequest()!;

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
    const { headers } = getWebRequest()!;

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
    const { headers } = getWebRequest()!;

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
