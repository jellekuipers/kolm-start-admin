import { createMiddleware } from "@tanstack/react-start";

import { userRoleEnum } from "@/lib/enums";
import { loggingMiddleware } from "@/middleware/logging";
import { sessionMiddleware } from "@/middleware/session";

export const adminMiddleware = createMiddleware({ type: "function" })
  .middleware([sessionMiddleware, loggingMiddleware])
  .server(({ next, context: { auth } }) => {
    if (auth.user.role !== userRoleEnum.admin) {
      throw new Error("forbidden");
    }

    return next();
  });
