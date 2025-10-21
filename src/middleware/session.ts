import { createMiddleware } from "@tanstack/react-start";
import { getRequestHeaders } from "@tanstack/react-start/server";

import { auth } from "@/lib/auth";
import { loggingMiddleware } from "@/middleware/logging";

export const sessionMiddleware = createMiddleware({ type: "function" })
  .middleware([loggingMiddleware])
  .server(async ({ next }) => {
    const headers = getRequestHeaders();

    const session = await auth.api.getSession({
      headers,
    });

    if (!session) {
      throw new Error("unauthenticated");
    }

    return next({ context: { auth: session } });
  });
