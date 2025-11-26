import { createServerOnlyFn } from "@tanstack/react-start";
import { betterAuth } from "better-auth";
import { prismaAdapter } from "better-auth/adapters/prisma";
import { admin } from "better-auth/plugins";
import { tanstackStartCookies } from "better-auth/tanstack-start";

import { db } from "@/lib/db";

const config = createServerOnlyFn(() =>
  betterAuth({
    database: prismaAdapter(db, {
      provider: "sqlite",
    }),
    emailAndPassword: {
      autoSignIn: false,
      enabled: true,
      requireEmailVerification: false,
    },
    plugins: [admin(), tanstackStartCookies()],
    session: {
      cookieCache: {
        enabled: true,
        maxAge: 5 * 60,
      },
    },
    user: {
      additionalFields: {
        role: {
          input: false,
          type: "string",
        },
      },
    },
  }),
);

export const auth = config();
