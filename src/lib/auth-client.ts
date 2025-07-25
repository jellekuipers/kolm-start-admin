import { adminClient, inferAdditionalFields } from "better-auth/client/plugins";
import { createAuthClient } from "better-auth/react";

import type { auth } from "~/lib/auth";

export const authClient = createAuthClient({
  baseURL: process.env.BETTER_AUTH_URL,
  plugins: [adminClient(), inferAdditionalFields<typeof auth>()],
});

export const { signIn, signOut, useSession } = authClient;
