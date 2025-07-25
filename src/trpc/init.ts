import { initTRPC, TRPCError } from "@trpc/server";
import superjson from "superjson";

import { db } from "~/db";
import { auth } from "~/lib/auth";

export async function createTRPCContext({ headers }: { headers: Headers }) {
  const session = await auth.api.getSession({
    headers,
  });

  return {
    db,
    session,
  };
}

export const t = initTRPC.context<typeof createTRPCContext>().create({
  transformer: superjson,
});

export const createTRPCRouter = t.router;

const enforceUserIsAuthenticated = t.middleware(({ ctx, next }) => {
  if (!ctx.session?.user) {
    throw new TRPCError({ code: "UNAUTHORIZED" });
  }

  return next({
    ctx: {
      session: { ...ctx.session, user: ctx.session.user },
    },
  });
});

const enforceUserIsAdmin = t.middleware(({ ctx, next }) => {
  if (!ctx.session?.user) {
    throw new TRPCError({ code: "UNAUTHORIZED" });
  }

  if (ctx.session?.user.role !== "admin") {
    throw new TRPCError({ code: "FORBIDDEN" });
  }

  return next({
    ctx: {
      session: { ...ctx.session, user: ctx.session.user },
    },
  });
});

export const publicProcedure = t.procedure;
export const protectedProcedure = t.procedure.use(enforceUserIsAuthenticated);
export const adminProcedure = t.procedure.use(enforceUserIsAdmin);
