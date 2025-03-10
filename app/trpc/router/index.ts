import { createTRPCRouter } from "~/trpc/init";
import { statsRouter } from "~/trpc/router/stats";

export const appRouter = createTRPCRouter({
  stats: statsRouter,
});

export type AppRouter = typeof appRouter;
