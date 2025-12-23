import { createFileRoute } from "@tanstack/react-router";

import { metrics } from "@/utils/metrics";

export const Route = createFileRoute("/api/metrics/$")({
  server: {
    handlers: {
      GET: async () => {
        return Response.json({
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
