import { betterAuth } from "better-auth";
import { prismaAdapter } from "better-auth/adapters/prisma";
import { admin } from "better-auth/plugins";
import { reactStartCookies } from "better-auth/react-start";

import { db } from "~/lib/db";

export const auth = betterAuth({
  database: prismaAdapter(db, {
    provider: "postgresql",
  }),
  emailAndPassword: {
    autoSignIn: false,
    enabled: true,
    requireEmailVerification: false,
  },
  plugins: [admin(), reactStartCookies()],
  user: {
    additionalFields: {
      role: {
        input: false,
        type: "string",
      },
    },
  },
});
