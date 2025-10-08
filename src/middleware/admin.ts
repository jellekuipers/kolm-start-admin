import { redirect } from "@tanstack/react-router";
import { createMiddleware } from "@tanstack/react-start";

import { userRoleEnum } from "@/lib/enums";
import { sessionMiddleware } from "@/middleware/session";

export const adminMiddleware = createMiddleware({ type: "function" })
  .middleware([sessionMiddleware])
  .server(async ({ next, context: { auth } }) => {
    if (auth.user.role !== userRoleEnum.admin) {
      throw redirect({ to: "/" });
    }

    return next();
  });
