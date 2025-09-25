import { createServerFn } from "@tanstack/react-start";
import { getRequest } from "@tanstack/react-start/server";
import { eq } from "drizzle-orm";
import { z } from "zod";

import { db } from "~/db";
import { user } from "~/db/schema";
import { auth } from "~/lib/auth";
import { adminMiddleware } from "~/middleware/admin";
import { type UserRole, userRoleEnum } from "~/types/enums";

export const createUser = createServerFn({ method: "POST" })
  .middleware([adminMiddleware])
  .inputValidator(
    z.object({
      email: z.email(),
      name: z.string(),
    }),
  )
  .handler(async ({ data }) => {
    const { headers } = getRequest();

    const { user } = await auth.api.createUser({
      body: {
        email: data.email,
        name: data.name,
        password: "password",
        role: userRoleEnum.user,
      },
      headers,
    });

    return user;
  });

export const listUsers = createServerFn({ method: "GET" })
  .middleware([adminMiddleware])
  .handler(async () => {
    const users = await db.query.user.findMany();

    return users;
  });

export const getUserCount = createServerFn({ method: "GET" })
  .middleware([adminMiddleware])
  .handler(async () => {
    const userCount = await db.$count(user);

    return userCount;
  });

export const getUserById = createServerFn({ method: "GET" })
  .middleware([adminMiddleware])
  .inputValidator(
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

export const listUserAccounts = createServerFn({ method: "GET" })
  .middleware([adminMiddleware])
  .handler(async () => {
    const { headers } = getRequest();

    const accounts = await auth.api.listUserAccounts({
      headers,
    });

    return accounts;
  });

export const listUserSessions = createServerFn({ method: "GET" })
  .middleware([adminMiddleware])
  .inputValidator(
    z.object({
      userId: z.string(),
    }),
  )
  .handler(async ({ data }) => {
    const { headers } = getRequest();

    const { sessions } = await auth.api.listUserSessions({
      body: {
        userId: data.userId,
      },
      headers,
    });

    return sessions;
  });

export const removeUser = createServerFn({ method: "POST" })
  .middleware([adminMiddleware])
  .inputValidator(
    z.object({
      userId: z.string(),
    }),
  )
  .handler(async ({ data }) => {
    const { headers } = getRequest();

    await auth.api.removeUser({
      body: {
        userId: data.userId,
      },
      headers,
    });
  });

export const setUserRole = createServerFn({ method: "POST" })
  .middleware([adminMiddleware])
  .inputValidator(
    z.object({
      role: z.string(),
      userId: z.string(),
    }),
  )
  .handler(async ({ data }) => {
    const { headers } = getRequest();

    await auth.api.setRole({
      body: {
        role: data.role as UserRole,
        userId: data.userId,
      },
      headers,
    });
  });

export const banUser = createServerFn({ method: "POST" })
  .middleware([adminMiddleware])
  .inputValidator(
    z.object({
      userId: z.string(),
    }),
  )
  .handler(async ({ data }) => {
    const { headers } = getRequest();

    await auth.api.banUser({
      body: {
        userId: data.userId,
      },
      headers,
    });
  });

export const unbanUser = createServerFn({ method: "POST" })
  .middleware([adminMiddleware])
  .inputValidator(
    z.object({
      userId: z.string(),
    }),
  )
  .handler(async ({ data }) => {
    const { headers } = getRequest();

    await auth.api.unbanUser({
      body: {
        userId: data.userId,
      },
      headers,
    });
  });

export const revokeUserSession = createServerFn({ method: "POST" })
  .middleware([adminMiddleware])
  .inputValidator(
    z.object({
      sessionToken: z.string(),
    }),
  )
  .handler(async ({ data }) => {
    const { headers } = getRequest();

    await auth.api.revokeUserSession({
      body: {
        sessionToken: data.sessionToken,
      },
      headers,
    });
  });

export const revokeAllUserSessions = createServerFn({ method: "POST" })
  .middleware([adminMiddleware])
  .inputValidator(
    z.object({
      userId: z.string(),
    }),
  )
  .handler(async ({ data }) => {
    const { headers } = getRequest();

    await auth.api.revokeUserSessions({
      body: {
        userId: data.userId,
      },
      headers,
    });
  });
