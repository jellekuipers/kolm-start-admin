import { createMiddleware } from "@tanstack/react-start";

import { logger } from "@/utils/logger";

export const loggingMiddleware = createMiddleware().server(
  async ({ next, request }) => {
    const timestamp = new Date().toISOString();

    logger({
      level: "info",
      message: `[${timestamp}] ${request.method} ${request.url}`,
    });

    return next();
  },
);
