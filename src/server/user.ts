import { createServerFn } from "@tanstack/react-start";
import { getRequestHeaders } from "@tanstack/react-start/server";
import { z } from "zod";

import { auth } from "~/lib/auth";
import { db } from "~/lib/db";
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
    const headers = getRequestHeaders();

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
    const users = await db.user.findMany();

    return users;
  });

export const getUserCount = createServerFn({ method: "GET" })
  .middleware([adminMiddleware])
  .handler(async () => {
    const userCount = await db.user.count();

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
    const userById = await db.user.findUnique({
      where: { id: data.userId },
    });

    return userById;
  });

export const listUserAccounts = createServerFn({ method: "GET" })
  .middleware([adminMiddleware])
  .handler(async () => {
    const headers = getRequestHeaders();

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
    const headers = getRequestHeaders();

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
    const headers = getRequestHeaders();

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
    const headers = getRequestHeaders();

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
    const headers = getRequestHeaders();

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
    const headers = getRequestHeaders();

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
    const headers = getRequestHeaders();

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
    const headers = getRequestHeaders();

    await auth.api.revokeUserSessions({
      body: {
        userId: data.userId,
      },
      headers,
    });
  });
