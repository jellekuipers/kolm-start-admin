import { createFileRoute } from "@tanstack/react-router";
import { json } from "@tanstack/react-start";

import { metrics } from "@/utils/metrics";

export const Route = createFileRoute("/(misc)/metrics")({
  server: {
    handlers: {
      GET: async () => {
        return json({
          system: {
            memory: process.memoryUsage(),
            timestamp: new Date().toISOString(),
            uptime: process.uptime(),
          },
          application: metrics.getAllStats(),
        });
      },
    },
  },
});
