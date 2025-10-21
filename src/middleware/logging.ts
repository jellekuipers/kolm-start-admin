import { createMiddleware } from "@tanstack/react-start";

import { logger } from "@/utils/logger";

export const loggingMiddleware = createMiddleware().server(
  async ({ next, request }) => {
    const startTime = Date.now();
    const timestamp = new Date().toISOString();

    logger(
      "info",
      `[${timestamp}] ${request.method} ${request.url} - Starting`,
    );

    try {
      const result = await next();
      const duration = Date.now() - startTime;

      logger(
        "info",
        `[${timestamp}] ${request.method} ${request.url} - ${result.response?.status} (${duration}ms)`,
      );

      return result;
    } catch (error) {
      const duration = Date.now() - startTime;
      console.error(
        `[${timestamp}] ${request.method} ${request.url} - Error (${duration}ms):`,
        error,
      );
      throw error;
    }
  },
);
