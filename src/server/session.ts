import { createServerFn } from "@tanstack/react-start";
import { getRequestHeaders } from "@tanstack/react-start/server";

import { auth } from "~/lib/auth";

export const getServerSession = createServerFn({ method: "GET" }).handler(
  async () => {
    const headers = getRequestHeaders();
    const serverSession = await auth.api.getSession({ headers });

    if (serverSession) {
      const { session, user } = serverSession;

      return {
        session,
        user,
      };
    }
  },
);
