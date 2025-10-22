import { adminClient, inferAdditionalFields } from "better-auth/client/plugins";
import { createAuthClient } from "better-auth/react";

import type { auth } from "@/lib/auth";
import { env } from "@/lib/env";

export const authClient = createAuthClient({
  baseURL: env.VITE_BASE_URL,
  plugins: [adminClient(), inferAdditionalFields<typeof auth>()],
});

export type Session = typeof authClient.$Infer.Session;

export const { signIn, signOut, useSession } = authClient;
