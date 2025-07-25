import { count } from "drizzle-orm";

import { user } from "~/db/schema";
import { adminProcedure, createTRPCRouter } from "~/trpc/init";

export const statsRouter = createTRPCRouter({
  getStats: adminProcedure.query(async ({ ctx }) => {
    const [users] = await ctx.db.select({ count: count() }).from(user);

    return {
      users: users.count,
    };
  }),
});
