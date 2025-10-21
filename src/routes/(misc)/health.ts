import { createFileRoute } from "@tanstack/react-router";
import { createServerOnlyFn, json } from "@tanstack/react-start";

import { db } from "@/lib/db";

const checkDatabase = createServerOnlyFn(async () => {
  try {
    await db.$queryRaw`SELECT 1`;

    return {
      latency: 0,
      status: "connected",
    };
  } catch (error) {
    return {
      error: JSON.stringify(error),
      status: "error",
    };
  }
});

export const Route = createFileRoute("/(misc)/health")({
  server: {
    handlers: {
      GET: async () => {
        const checks = {
          database: await checkDatabase(),
          memory: process.memoryUsage(),
          status: "healthy",
          timestamp: new Date().toISOString(),
          uptime: process.uptime(),
          version: process.env.npm_package_version,
        };

        return json(checks);
      },
    },
  },
});
