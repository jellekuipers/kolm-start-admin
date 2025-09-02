import { createMiddleware } from "@tanstack/react-start";

import { sessionMiddleware } from "~/middleware/session";
import { userRoleEnum } from "~/types/enums";

export const adminMiddleware = createMiddleware({ type: "function" })
  .middleware([sessionMiddleware])
  .server(async ({ next, context: { auth } }) => {
    if (auth.user.role !== userRoleEnum.admin) {
      throw new Error("forbidden");
    }

    return next();
  });
