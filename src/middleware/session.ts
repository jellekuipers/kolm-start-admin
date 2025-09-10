import { createMiddleware } from "@tanstack/react-start";
import { getWebRequest } from "@tanstack/react-start/server";

import { auth } from "~/lib/auth";

export const sessionMiddleware = createMiddleware({ type: "function" }).server(
  async ({ next }) => {
    const { headers } = getWebRequest();

    const session = await auth.api.getSession({
      headers,
      query: {
        disableCookieCache: true,
      },
    });

    if (!session) {
      throw new Error("unauthenticated");
    }

    return next({ context: { auth: session } });
  },
);
