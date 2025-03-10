import { count } from "drizzle-orm";

import { organization, user } from "~/db/schema";
import { adminProcedure, createTRPCRouter } from "~/trpc/init";

export const statsRouter = createTRPCRouter({
  getStats: adminProcedure.query(async ({ ctx }) => {
    const [users] = await ctx.db.select({ count: count() }).from(user);
    const [organizations] = await ctx.db
      .select({ count: count() })
      .from(organization);

    return {
      organizations: organizations.count,
      users: users.count,
    };
  }),
});
